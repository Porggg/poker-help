/* ---------- table ---------- */
const RANKS = "AKQJT98765432";
const ri = c => RANKS.indexOf(c);
const SUIT = { s: "♠", h: "♥", d: "♦", c: "♣" };

// Places dans l'ordre de parole préflop. Deuxième valeur = clé de range : R8 = 8 joueurs derrière (UTG à 9) ... R2 = bouton.
const LAYOUT = {
  2: [["BTN/SB","HU"],["BB","BB"]],
  3: [["BTN","R2"],["SB","SB"],["BB","BB"]],
  4: [["CO","R3"],["BTN","R2"],["SB","SB"],["BB","BB"]],
  5: [["UTG","R4"],["CO","R3"],["BTN","R2"],["SB","SB"],["BB","BB"]],
  6: [["UTG","R5"],["HJ","R4"],["CO","R3"],["BTN","R2"],["SB","SB"],["BB","BB"]],
  7: [["UTG","R6"],["LJ","R5"],["HJ","R4"],["CO","R3"],["BTN","R2"],["SB","SB"],["BB","BB"]],
  8: [["UTG","R7"],["UTG+1","R6"],["LJ","R5"],["HJ","R4"],["CO","R3"],["BTN","R2"],["SB","SB"],["BB","BB"]],
  9: [["UTG","R8"],["UTG+1","R7"],["UTG+2","R6"],["LJ","R5"],["HJ","R4"],["CO","R3"],["BTN","R2"],["SB","SB"],["BB","BB"]],
};
// Nom de la place dans les données Pokertrainer (9 joueurs : EP1 = UTG, EP2 = UTG+1, EP3 = UTG+2).
const PT_SEAT = { R8: "EP1", R7: "EP2", R6: "EP3", R5: "LJ", R4: "HJ", R3: "CO", R2: "BTN", SB: "SB", BB: "BB" };

/* ---------- approximations ----------
   Écrites à la main, utilisées seulement pour les spots que Pokertrainer ne couvre pas :
   heads-up, limps, et le plan « relance ou limp » en small blind. */
const APPROX = {
  sbMixRaise: "66+, A7s+, A5s-A4s, K9s+, QTs+, JTs, A9o+, KJo+",
  sbMixLimp: "55-22, A6s, A3s-A2s, K2s-K8s, Q2s-Q9s, J4s-J9s, T5s-T9s, 95s-98s, 85s-87s, 74s-76s, 63s-65s, 52s-54s, 42s-43s, 32s, A2o-A8o, K5o-KTo, Q8o-QJo, J8o-JTo, T8o-T9o, 98o, 87o, 76o",
  huOpen: "22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 84s+, 73s+, 63s+, 52s+, 42s+, 32s, A2o+, K2o+, Q2o+, J5o+, T6o+, 96o+, 86o+, 75o+, 65o, 54o",
  // [3-bet, call] big blind contre l'open du bouton en heads-up
  huBBvsOpen: ["88+, A7s+, A5s-A2s, K9s+, QTs+, JTs, A9o+, KJo+", "77-22, A6s, K2s+, Q2s+, J2s+, T3s+, 94s+, 84s+, 73s+, 63s+, 52s+, 42s+, 32s, A8o-A2o, K2o+, Q5o+, J7o+, T7o+, 97o+, 86o+, 76o, 65o"],
  // [4-bet, call] bouton contre le 3-bet de la big blind en heads-up
  huBTNvs3bet: ["TT+, AJs+, AQo+, A5s-A2s", "99-22, ATs-A6s, K5s+, Q7s+, J7s+, T7s+, 96s+, 86s+, 75s+, 64s+, 54s, AJo-A5o, K9o+, QTo+, JTo"],
  // [tapis, call] big blind contre le 4-bet du bouton en heads-up
  huBBvs4bet: ["QQ+, AKs, AKo", "JJ-99, AQs, AJs, KQs, A5s"],
  // [relance, limp/complète] contre des limpers
  limpLate: ["55+, A7s+, A5s-A4s, K9s+, Q9s+, J9s+, T9s, ATo+, KJo+, QJo", "44-22, A6s, A3s-A2s, K6s-K8s, Q8s, J8s, T8s, 97s+, 86s+, 75s+, 64s+, 54s"],
  limpEarly: ["77+, A9s+, A5s, KTs+, QJs, AJo+, KQo", "66-22, A8s-A6s, A4s-A2s, K9s, QTs, JTs, T9s, 98s, 87s, 76s, 65s"],
  limpSB: ["99+, AJs+, KQs, AQo+", "88-22, ATs-A2s, K6s-KJs, Q8s-QJs, J8s-JTs, T8s-T9s, 97s+, 86s+, 75s+, 64s+, 54s, ATo-AJo, KTo+, QJo"],
  limpBBvsSB: ["77+, A8s+, A5s-A3s, K9s+, QTs+, JTs, T9s, A9o+, KJo+, QJo"],
  limpBBmulti: ["99+, AJs+, KQs, AQo+, A5s-A4s"],
};

/* ---------- lecture des ranges écrites en notation poker ---------- */
const sfx = (h, s) => s ? [h + s] : [h + "s", h + "o"];
function expand(tok) {
  tok = tok.trim();
  if (!tok) return [];
  const out = [];
  let plus = false;
  if (tok.endsWith("+")) { plus = true; tok = tok.slice(0, -1); }
  if (tok.includes("-")) {
    const [a, b] = tok.split("-");
    if (a[0] === a[1]) {
      const x = ri(a[0]), y = ri(b[0]);
      for (let k = Math.min(x, y); k <= Math.max(x, y); k++) out.push(RANKS[k] + RANKS[k]);
    } else {
      const x = ri(a[1]), y = ri(b[1]);
      for (let k = Math.min(x, y); k <= Math.max(x, y); k++) out.push(...sfx(a[0] + RANKS[k], a[2] || ""));
    }
    return out;
  }
  if (tok[0] === tok[1]) {
    if (plus) for (let k = 0; k <= ri(tok[0]); k++) out.push(RANKS[k] + RANKS[k]);
    else out.push(tok.slice(0, 2));
    return out;
  }
  if (plus) for (let k = ri(tok[0]) + 1; k <= ri(tok[1]); k++) out.push(...sfx(tok[0] + RANKS[k], tok[2] || ""));
  else out.push(...sfx(tok.slice(0, 2), tok[2] || ""));
  return out;
}
const combos = c => c.length === 2 ? 6 : c[2] === "s" ? 4 : 12;
function cellCode(i, j) {
  if (i === j) return RANKS[i] + RANKS[i];
  return i < j ? RANKS[i] + RANKS[j] + "s" : RANKS[j] + RANKS[i] + "o";
}
// les 169 mains dans l'ordre de la grille (le même que data/ranges.js)
const ORDER = [];
for (let i = 0; i < 13; i++) for (let j = 0; j < 13; j++) ORDER.push(cellCode(i, j));
const IDX = Object.fromEntries(ORDER.map((h, i) => [h, i]));

// range en notation poker -> 169 fréquences (0 ou 1)
function rangeFreqs(str) {
  const f = new Array(169).fill(0);
  str.split(",").forEach(t => expand(t).forEach(h => { f[IDX[h]] = 1; }));
  return f;
}
