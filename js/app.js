/* ---------- langue ---------- */
let lang = "fr";
try {
  const saved = localStorage.getItem("preflop-lang");
  lang = saved === "en" || saved === "fr" ? saved : (navigator.language || "fr").toLowerCase().startsWith("fr") ? "fr" : "en";
} catch (e) {}
const T = () => STR[lang];

/* ---------- données Pokertrainer ---------- */
const PT = window.PT_RANGES || { pto: {}, gto: {} };
const ptCache = {};
// range codée (2 caractères base 36 par main) -> 169 fréquences entre 0 et 1
function ptGet(type, key) {
  const id = type + "|" + key;
  if (id in ptCache) return ptCache[id];
  const s = PT[type] && PT[type][key];
  const out = s ? ORDER.map((_, i) => parseInt(s.substr(i * 2, 2), 36) / 100) : null;
  ptCache[id] = out;
  return out;
}
const ONES = new Array(169).fill(1);
const ZEROS = new Array(169).fill(0);

// Un spot : w = part de chaque main qui arrive dans ce spot, f = fréquence absolue de chaque action.
function ptSpot(type, wKey, actKeys) {
  const w0 = wKey ? ptGet(type, wKey) : ONES;
  if (!w0) return null;
  const raw = actKeys.map(k => ptGet(type, k));
  if (!wKey && raw.every(a => !a)) return null;
  const w = w0.map(x => Math.min(1, x));
  const f = raw.map(a => (a || ZEROS).slice());
  for (let i = 0; i < 169; i++) {
    // quelques mains du jeu simplifié apparaissent dans une étape sans être dans la précédente : on les borne
    const sum = f.reduce((s, a) => s + a[i], 0);
    if (sum > w[i] && sum > 0) f.forEach(a => { a[i] = a[i] * w[i] / sum; });
  }
  return { w, f };
}
// Approximation : ranges en notation poker, la première qui contient la main gagne.
function approxSpot(ranges, limit) {
  const w = limit ? limit.map(x => x > 0 ? 1 : 0) : ONES;
  const taken = new Array(169).fill(false);
  const f = ranges.map(r => rangeFreqs(r).map((x, i) => {
    if (!x || taken[i] || !w[i]) return 0;
    taken[i] = true;
    return 1;
  }));
  return { w, f };
}

/* ---------- spots ---------- */
const SIT_IDS = ["rfi", "limp", "raise", "3bet", "4bet", "5bet"];
function sitValid(id, hi, n) {
  if (id === "5bet") return n > 2 && hi < n - 1;
  return (id === "rfi" || id === "3bet") ? hi < n - 1 : hi > 0;
}
function vilOptions(id, hi, n) {
  if (id === "rfi") return [];
  const all = [...Array(n).keys()];
  return (id === "3bet" || id === "5bet") ? all.filter(i => i > hi) : all.filter(i => i < hi);
}

function normalize(st) {
  st.n = Math.min(9, Math.max(2, +st.n || 6));
  const P = LAYOUT[st.n];
  let hi = P.findIndex(p => p[0] === st.hero);
  if (hi < 0) {
    if (st.hero === "BTN/SB" || st.hero === "BTN") hi = st.n === 2 ? 0 : st.n - 3;
    else if (st.hero === "SB") hi = st.n === 2 ? 0 : st.n - 2;
    else if (st.hero === "BB") hi = st.n - 1;
    else hi = 0;
  }
  st.hero = P[hi][0];
  if (!SIT_IDS.includes(st.sit) || !sitValid(st.sit, hi, st.n)) st.sit = SIT_IDS.find(s => sitValid(s, hi, st.n));
  const opts = vilOptions(st.sit, hi, st.n);
  if (!opts.length) st.vil = null;
  else if (!opts.some(i => P[i][0] === st.vil)) st.vil = P[opts[0]][0];
  if (st.sbPlan !== "mix") st.sbPlan = "raise";
  if (st.mode !== "gto") st.mode = "simple";
  return st;
}

const A = (cls, label, size) => ({ cls, label, size });
function getChart(st) {
  const L = T();
  const n = st.n, P = LAYOUT[n];
  const hi = P.findIndex(p => p[0] === st.hero);
  const key = P[hi][1];
  const vil = st.vil ? P.find(p => p[0] === st.vil) : null;
  const vkey = vil ? vil[1] : null;
  const hs = PT_SEAT[key], vs = PT_SEAT[vkey];
  const type = st.mode === "gto" ? "gto" : "pto";
  const tbl = L.table(n);
  const c = { acts: [], rest: A("fold", L.a.fold, L.s.fold), title: "", sub: "", tip: "", src: "approx", srcNote: "", w: ONES, f: [] };
  const usePT = (wKey, keys) => {
    const d = ptSpot(type, wKey, keys);
    if (!d) return false;
    Object.assign(c, d, { src: type });
    if (n < 6) c.srcNote = L.src.shortTable;
    return true;
  };
  const useApprox = (ranges, limit) => Object.assign(c, approxSpot(ranges, limit), { src: "approx" });

  if (st.sit === "rfi") {
    c.sub = L.sub.rfi(tbl);
    if (key === "HU") {
      c.title = L.ti.hu;
      c.acts = [A("raise", L.a.raise, L.s.huRaise)];
      useApprox([APPROX.huOpen]);
      c.tip = L.tip.hu;
    } else if (key === "SB") {
      const mix = st.sbPlan === "mix";
      c.title = mix ? L.ti.sbMix : L.ti.sbRaise;
      if (mix) {
        c.acts = [A("raise", L.a.raise, L.s.sbRaise), A("limp", L.a.limp, L.s.sbLimp)];
        useApprox([APPROX.sbMixRaise, APPROX.sbMixLimp]);
      } else {
        c.acts = [A("raise", L.a.raise, L.s.sbRaise)];
        usePT(null, ["OpenSB"]);
      }
      c.tip = mix ? L.tip.sbMix : L.tip.sbRaise;
    } else {
      c.title = L.ti.open(st.hero);
      c.acts = [A("raise", L.a.raise, L.s.open)];
      usePT(null, ["Open" + hs]);
      c.tip = L.tip.open;
    }
  } else if (st.sit === "limp") {
    c.sub = L.sub.limp(tbl, st.vil);
    if (key === "BB") {
      const vsSB = vkey === "SB" || vkey === "HU";
      c.title = vsSB ? L.ti.bbVsSb : L.ti.bbVsLimp;
      c.acts = [A("raise", L.a.raise, vsSB ? L.s.bbVsSb : L.s.isoRaise)];
      c.rest = A("limp", L.a.check, L.s.check);
      useApprox(vsSB ? APPROX.limpBBvsSB : APPROX.limpBBmulti);
      c.tip = vsSB ? L.tip.bbVsSb : L.tip.bbMulti;
    } else if (key === "SB") {
      c.title = L.ti.sbVsLimp;
      c.acts = [A("raise", L.a.raise, L.s.sbIso), A("limp", L.a.complete, L.s.complete)];
      useApprox(APPROX.limpSB);
      c.tip = L.tip.sbLimp;
    } else {
      c.title = L.ti.vsLimp(st.hero);
      c.acts = [A("raise", L.a.iso, L.s.isoRaise), A("limp", L.a.overlimp, L.s.overlimp)];
      useApprox(key === "R2" || key === "R3" ? APPROX.limpLate : APPROX.limpEarly);
      c.tip = L.tip.vsLimp;
    }
  } else if (st.sit === "raise") {
    c.sub = L.sub.raise(tbl, st.vil);
    c.title = L.ti.vsOpen(st.hero, st.vil);
    const size = key === "BB" ? (vkey === "SB" ? L.s.three9 : L.s.three125) : key === "SB" ? L.s.three125 : L.s.three75;
    c.acts = [A("raise", L.a.threebet, size), A("call", L.a.call, key === "BB" ? L.s.callBB : L.s.call)];
    if (vkey === "HU") useApprox(APPROX.huBBvsOpen);
    else usePT(null, ["3Bet" + hs + "vs" + vs, "Call" + hs + "vs" + vs]);
    c.tip = key === "BB" ? L.tip.bbDef : key === "SB" ? L.tip.sbDef : key === "R2" ? L.tip.btnDef : L.tip.ipPto;
  } else if (st.sit === "3bet") {
    const vilBlind = vkey === "SB" || vkey === "BB";
    const inPos = key === "HU" || (key !== "SB" && vilBlind);
    const to = key === "SB" ? 23 : vilBlind ? 25 : 19;
    c.title = L.ti.vs3bet(st.hero, st.vil);
    c.sub = L.sub.threebet(tbl, st.vil, inPos);
    c.acts = [A("raise", L.a.fourbet, L.s.fourbetTo(to)), A("call", L.a.call, L.s.call3)];
    if (key === "HU") useApprox(APPROX.huBTNvs3bet, rangeFreqs(APPROX.huOpen));
    else usePT("Open" + hs, ["4Bet" + hs + "vs" + vs, "Call 3Bet" + hs + "vs" + vs]);
    c.tip = L.tip.vs3bet(inPos);
  } else if (st.sit === "4bet") {
    c.title = L.ti.vs4bet(st.hero, st.vil);
    c.sub = L.sub.fourbet(tbl, st.vil);
    c.acts = [A("allin", L.a.allin, L.s.allin), A("call", L.a.call, L.s.call4)];
    if (vkey === "HU") useApprox(APPROX.huBBvs4bet, rangeFreqs(APPROX.huBBvsOpen[0]));
    else usePT("3Bet" + hs + "vs" + vs, ["5Bet" + hs + "vs" + vs, "Call 4Bet" + hs + "vs" + vs]);
    c.tip = L.tip.vs4bet;
  } else if (st.sit === "5bet") {
    c.title = L.ti.vs5bet(st.hero, st.vil);
    c.sub = L.sub.fivebet(tbl, st.vil);
    c.acts = [A("call", L.a.call, L.s.call5)];
    usePT("4Bet" + hs + "vs" + vs, ["Call 5Bet" + hs + "vs" + vs]);
    c.tip = L.tip.vs5bet;
  }
  return c;
}

// Ce qu'on fait avec la main n°i : fréquences relatives à la part de la main qui arrive ici.
function cellInfo(c, i) {
  const w = c.w[i];
  if (w < 0.005) return { out: true, w: 0, p: c.acts.map(() => 0), rest: 0, main: -1 };
  const p = c.f.map(a => Math.min(1, a[i] / w));
  const rest = Math.max(0, 1 - p.reduce((s, x) => s + x, 0));
  const all = [...p, rest];
  const main = all.indexOf(Math.max(...all));
  return { out: false, w, p, rest, main, mixed: all.filter(x => x >= 0.05).length > 1 };
}
const choicesOf = c => [...c.acts, c.rest];
const pctTxt = x => T().pct(x * 100);

/* ---------- mains ---------- */
function esc(s) { return s.replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch])); }
function parseHand(raw) {
  const L = T();
  const s = (raw || "").trim().toLowerCase().replace(/10/g, "t").replace(/♠/g, "s").replace(/♥/g, "h").replace(/♦/g, "d").replace(/♣/g, "c").replace(/[\s,\/-]/g, "");
  if (!s) return { codes: [] };
  let m = s.match(/^([akqjt2-9])([shdc])([akqjt2-9])([shdc])$/);
  if (m) {
    let a = [m[1].toUpperCase(), m[2]], b = [m[3].toUpperCase(), m[4]];
    if (a[0] === b[0] && a[1] === b[1]) return { codes: [], err: L.errSame };
    if (ri(b[0]) < ri(a[0])) [a, b] = [b, a];
    const code = a[0] === b[0] ? a[0] + b[0] : a[0] + b[0] + (a[1] === b[1] ? "s" : "o");
    return { codes: [code], cards: [a, b] };
  }
  m = s.match(/^([akqjt2-9])([akqjt2-9])([so])?$/);
  if (m) {
    let r1 = m[1].toUpperCase(), r2 = m[2].toUpperCase();
    if (ri(r2) < ri(r1)) [r1, r2] = [r2, r1];
    if (r1 === r2) return m[3] === "s" ? { codes: [], err: L.errPair } : { codes: [r1 + r2] };
    return { codes: m[3] ? [r1 + r2 + m[3]] : [r1 + r2 + "s", r1 + r2 + "o"] };
  }
  return { codes: [], err: L.errRead(esc(raw.trim())) };
}
function cardsFor(code, exact) {
  if (exact) return exact;
  if (code.length === 2) return [[code[0], "s"], [code[1], "h"]];
  return code[2] === "s" ? [[code[0], "s"], [code[1], "s"]] : [[code[0], "s"], [code[1], "d"]];
}
function cardsHTML(cards, id) {
  return `<div class="cards"${id ? ` id="${id}"` : ""}>${cards.map(([r, s]) => `<span class="pcard${s === "h" || s === "d" ? " red" : ""}" aria-label="${r}${s}">${r === "T" ? "10" : r}<i>${SUIT[s]}</i></span>`).join("")}</div>`;
}
function randomCards() {
  const deck = [];
  for (const r of RANKS) for (const s of "shdc") deck.push([r, s]);
  const i = Math.floor(Math.random() * 52);
  let j; do { j = Math.floor(Math.random() * 52); } while (j === i);
  return [deck[i], deck[j]];
}
// couleurs au hasard qui respectent une classe de main comme "KTs", "KTo" ou "99"
function dealClass(code) {
  const S = "shdc", s1 = S[Math.floor(Math.random() * 4)];
  if (code[2] === "s") return [[code[0], s1], [code[1], s1]];
  let s2; do { s2 = S[Math.floor(Math.random() * 4)]; } while (s2 === s1);
  return [[code[0], s1], [code[1], s2]];
}
function codeOfCards([a, b]) {
  if (ri(b[0]) < ri(a[0])) [a, b] = [b, a];
  return a[0] === b[0] ? a[0] + b[0] : a[0] + b[0] + (a[1] === b[1] ? "s" : "o");
}
const rankName = c => c === "T" ? "10" : c;

/* ---------- état ---------- */
let state = { n: 6, hero: "BTN", sit: "rfi", vil: null, sbPlan: "raise", mode: "simple", hand: "AJo" };
try { Object.assign(state, JSON.parse(localStorage.getItem("preflop-state") || "{}")); } catch (e) {}
function save() { try { localStorage.setItem("preflop-state", JSON.stringify(state)); } catch (e) {} }
const $ = id => document.getElementById(id);

function seg(el, items, current, onPick) {
  el.innerHTML = items.map(it => `<button type="button" data-v="${esc(String(it.v))}" aria-pressed="${String(it.v) === String(current)}"${it.disabled ? " disabled" : ""}${it.aria ? ` aria-label="${esc(it.aria)}"` : ""}${it.title ? ` title="${esc(it.title)}"` : ""}>${it.html}</button>`).join("");
  el.onclick = e => { const b = e.target.closest("button"); if (b && !b.disabled) onPick(b.dataset.v); };
}

function seatStatus(i, hi, vi, sit) {
  const S = T().status;
  if (i === hi) return { "3bet": S.youOpen, "4bet": S.you3, "5bet": S.you4 }[sit] || S.you;
  if (i === vi) return S[sit];
  if (sit === "limp") return i < hi ? (i < vi ? S.folded : S.unknown) : S.toAct;
  if (sit === "3bet") return (i < hi || i < vi) ? S.folded : S.toAct;
  if (sit === "4bet" || sit === "5bet") return S.folded;
  return i < hi ? S.folded : S.toAct;
}

function renderTable() {
  const L = T(), n = state.n, P = LAYOUT[n];
  const hi = P.findIndex(p => p[0] === state.hero);
  const vi = state.vil ? P.findIndex(p => p[0] === state.vil) : -1;
  const b = n === 2 ? 0 : n - 3;
  let html = `<div class="felt"><div class="pot">${L.pot[state.sit]}</div></div>`;
  P.forEach((p, i) => {
    const ang = Math.PI / 2 + (i - b) * 2 * Math.PI / n;
    const x = 50 + 45 * Math.cos(ang), y = 50 + 41 * Math.sin(ang);
    const st = seatStatus(i, hi, vi, state.sit);
    const cls = i === hi ? "you" : i === vi ? "vil" : st === L.status.folded ? "out" : "";
    html += `<button type="button" class="seat ${cls}" data-v="${p[0]}" style="left:${x}%;top:${y}%" title="${esc(L.pos[p[0]])}" aria-label="${esc(L.sitAria(p[0]))}"><b>${p[0]}</b><small>${st}</small></button>`;
    if (i === b) {
      const dx = 50 + 31 * Math.cos(ang - 0.38), dy = 50 + 27 * Math.sin(ang - 0.38);
      html += `<span class="dealer" style="left:${dx}%;top:${dy}%">D</span>`;
    }
  });
  const t = $("table");
  t.innerHTML = html;
  t.onclick = e => { const s = e.target.closest(".seat"); if (s) { state.hero = s.dataset.v; update(); } };
}

function renderControls() {
  const L = T(), n = state.n, P = LAYOUT[n];
  const hi = P.findIndex(p => p[0] === state.hero);
  seg($("players"), [2, 3, 4, 5, 6, 7, 8, 9].map(v => ({ v, html: v === 2 ? "HU" : v, aria: L.playersAria(v) })), n, v => { state.n = +v; update(); });
  seg($("seats"), P.map(p => ({ v: p[0], html: p[0], title: L.pos[p[0]] })), state.hero, v => { state.hero = v; update(); });
  seg($("sits"), SIT_IDS.map(id => ({ v: id, html: `${L.sits[id][0]}<small>${L.sits[id][1]}</small>`, disabled: !sitValid(id, hi, n) })), state.sit, v => { state.sit = v; update(); });
  const opts = vilOptions(state.sit, hi, n);
  $("vilField").hidden = !opts.length;
  if (opts.length) {
    $("vilLbl").textContent = L.vil[state.sit];
    seg($("vils"), opts.map(i => ({ v: P[i][0], html: P[i][0], title: L.pos[P[i][0]] })), state.vil, v => { state.vil = v; update(); });
  }
  const sbShow = state.sit === "rfi" && P[hi][1] === "SB";
  $("sbField").hidden = !sbShow;
  if (sbShow) seg($("sbplan"), [{ v: "raise", html: L.sbRaise }, { v: "mix", html: L.sbMix }], state.sbPlan, v => { state.sbPlan = v; update(); });
  seg($("mode"), [{ v: "simple", html: L.modeSimple }, { v: "gto", html: L.modeGto }], state.mode, v => { state.mode = v; update(); if (drill) { drill.c = getChart({ ...drill.st, mode: state.mode }); drill.st.mode = state.mode; renderDrill(); } });
  $("modeHint").textContent = state.mode === "gto" ? L.modeHintGto : L.modeHintSimple;
}

const COLOR = { raise: "var(--raise)", call: "var(--call)", limp: "var(--limp)", allin: "var(--allin)", fold: "var(--fold)" };
function cellStyle(c, info) {
  if (info.out || state.mode !== "gto" || c.src === "approx" || !info.mixed && info.w > 0.995) return "";
  // segments proportionnels aux fréquences, et une bande « hors range » en haut si la main n'arrive ici qu'en partie
  const parts = [...info.p, info.rest];
  const cls = choicesOf(c).map(a => a.cls);
  let at = 0;
  const stops = parts.map((x, k) => { const a = at; at += x * 100; return `${COLOR[cls[k]]} ${a.toFixed(1)}% ${at.toFixed(1)}%`; }).join(",");
  const top = ((1 - info.w) * 100).toFixed(1);
  return `background:linear-gradient(var(--out) 0 ${top}%,transparent ${top}%),linear-gradient(90deg,${stops})`;
}
function freqSummary(c, info) {
  return choicesOf(c).map((a, k) => [a.label, k < c.acts.length ? info.p[k] : info.rest]).filter(([, x]) => x >= 0.005).map(([l, x]) => `${l} ${pctTxt(x)}`).join(" · ");
}

function renderChart() {
  const L = T(), c = getChart(state);
  const sel = new Set(parseHand($("hand").value).codes);
  $("chartTitle").textContent = c.title;
  $("chartSub").textContent = c.sub;
  const all = choicesOf(c);
  const tally = new Array(all.length + 1).fill(0);
  let html = "";
  ORDER.forEach((code, i) => {
    const info = cellInfo(c, i), k = combos(code);
    c.f.forEach((a, j) => { tally[j] += a[i] * k; });
    tally[all.length - 1] += Math.max(0, c.w[i] - c.f.reduce((s, a) => s + a[i], 0)) * k;
    tally[all.length] += (1 - c.w[i]) * k;
    const cls = info.out ? "out" : all[info.main].cls;
    const tip = info.out ? L.a.out : freqSummary(c, info);
    html += `<button type="button" class="cell act-${cls}${sel.has(code) ? " sel" : ""}" style="${cellStyle(c, info)}" data-h="${code}" title="${code} : ${esc(tip)}">${code}</button>`;
  });
  const g = $("grid");
  g.innerHTML = html;
  g.onclick = e => { const b = e.target.closest(".cell"); if (b) { $("hand").value = b.dataset.h; state.hand = b.dataset.h; renderVerdict(); renderChartSel(); save(); } };
  const items = [...all.map((a, i) => [a.cls, a.label, tally[i]]), ["out", L.a.out, tally[all.length]]].filter(([cls, , x]) => cls !== "out" || x > 0.5);
  $("legend").innerHTML = items.map(([cls, label, x]) => `<span><i class="act-${cls}"></i>${label} <b>${L.pct(x / 13.26)}</b></span>`).join("");
  $("mixbar").innerHTML = items.map(([cls, , x]) => `<div class="act-${cls}" style="width:${x / 13.26}%"></div>`).join("");
  $("tip").textContent = c.tip;
  $("src").className = "src" + (c.src === "approx" ? " approx" : "");
  $("src").innerHTML = L.src[c.src] + c.srcNote;
}
function renderChartSel() {
  const sel = new Set(parseHand($("hand").value).codes);
  document.querySelectorAll("#grid .cell").forEach(el => el.classList.toggle("sel", sel.has(el.dataset.h)));
}

function verdictHTML(c, code, cards) {
  const L = T(), info = cellInfo(c, IDX[code]), all = choicesOf(c);
  let pill, lines;
  if (info.out) {
    pill = `<span class="pill act-out">${L.a.out}</span>`;
    lines = `<span class="vsize">${L.s.out}</span>`;
  } else {
    const a = all[info.main];
    pill = `<span class="pill act-${a.cls}">${a.label}</span>`;
    lines = `<span class="vsize">${a.size}</span>`;
    if (state.mode === "gto" && c.src !== "approx" && (info.mixed || info.w < 0.995)) {
      lines += `<span class="vsize freq">${L.freqLine(freqSummary(c, info))}${info.w < 0.995 ? " " + L.partial(pctTxt(info.w)) : ""}</span>`;
    }
  }
  return `<div class="vrow">${cardsHTML(cards)}<div class="vact"><span class="vsize">${L.handName(code, rankName)} · ${esc(c.title)}</span>${pill}${lines}</div></div>`;
}
function renderVerdict() {
  const L = T(), p = parseHand($("hand").value), v = $("verdict");
  if (!p.codes.length) { v.innerHTML = `<p class="hint">${p.err || L.handHint}</p>`; return; }
  const c = getChart(state);
  v.innerHTML = p.codes.map(code => verdictHTML(c, code, cardsFor(code, p.cards))).join("");
}

function update() {
  normalize(state);
  renderControls();
  renderTable();
  renderChart();
  renderVerdict();
  save();
}

/* ---------- textes statiques et aide ---------- */
function applyLang() {
  const L = T();
  document.documentElement.lang = lang;
  document.title = L.pageTitle;
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = L[el.dataset.i18n]; });
  document.querySelectorAll("[data-i18n-aria]").forEach(el => el.setAttribute("aria-label", L[el.dataset.i18nAria]));
  document.querySelectorAll("#lang button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  $("helpNav").innerHTML = L.helpSections.map(([id, title]) => `<a href="#help-${id}">${title}</a>`).join("");
  $("helpBody").innerHTML = L.helpSections.map(([id, title, html]) => `<section><h3 id="help-${id}">${title}</h3>${html}</section>`).join("");
}
$("lang").addEventListener("click", e => {
  const b = e.target.closest("button[data-lang]");
  if (!b || b.dataset.lang === lang) return;
  lang = b.dataset.lang;
  try { localStorage.setItem("preflop-lang", lang); } catch (e) {}
  applyLang();
  update();
  if (drill) { drill.c = getChart(drill.st); renderDrill(); }
  renderScore();
});

const help = $("help");
function openHelp() { if (typeof help.showModal === "function") help.showModal(); else help.setAttribute("open", ""); $("helpBody").scrollTop = 0; }
function closeHelp() { if (typeof help.close === "function") help.close(); else help.removeAttribute("open"); }
$("helpOpen").addEventListener("click", openHelp);
$("helpOpen2").addEventListener("click", openHelp);
$("helpClose").addEventListener("click", closeHelp);
help.addEventListener("click", e => { if (e.target === help) closeHelp(); });
$("helpNav").addEventListener("click", e => {
  const a = e.target.closest("a");
  if (!a) return;
  e.preventDefault();
  const target = document.getElementById(a.getAttribute("href").slice(1));
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
});

$("hand").value = state.hand || "";
$("hand").addEventListener("input", () => { state.hand = $("hand").value; renderVerdict(); renderChartSel(); save(); });
$("rand").addEventListener("click", () => {
  $("hand").value = randomCards().map(c => c[0] + c[1]).join(" ");
  state.hand = $("hand").value; renderVerdict(); renderChartSel(); save();
});

/* ---------- entraînement ---------- */
let drill = null;
const score = { ok: 0, n: 0, streak: 0 };
function describe(st) {
  const D = T().describe;
  return D.lead(T().table(st.n), st.hero) + D[st.sit](st.vil);
}
// tire un index au hasard, proportionnellement aux poids
function pickWeighted(weights) {
  const total = weights.reduce((s, x) => s + x, 0);
  let r = Math.random() * total;
  for (let i = 0; i < weights.length; i++) { r -= weights[i]; if (r <= 0) return i; }
  return weights.length - 1;
}
function newDrill() {
  let st, c;
  do {
    const n = 2 + Math.floor(Math.random() * 8), P = LAYOUT[n];
    const hi = Math.floor(Math.random() * n);
    const sits = SIT_IDS.filter(s => sitValid(s, hi, n));
    const weighted = sits.flatMap(s => s === "rfi" || s === "raise" ? [s, s, s] : s === "limp" ? [s] : [s, s]);
    const sit = weighted[Math.floor(Math.random() * weighted.length)];
    const opts = vilOptions(sit, hi, n);
    st = normalize({ n, hero: P[hi][0], sit, vil: opts.length ? P[opts[Math.floor(Math.random() * opts.length)]][0] : null, sbPlan: state.sbPlan, mode: state.mode });
    c = getChart(st);
  } while (!c.w.some(x => x > 0));
  // surtout des mains qui se jouent, pour éviter un quiz rempli de couches évidentes
  const played = ORDER.map((code, i) => combos(code) * (c.f.reduce((s, a) => s + a[i], 0) + 0.15 * c.w[i]));
  const any = ORDER.map((code, i) => combos(code) * c.w[i]);
  const i = pickWeighted(Math.random() < 0.7 ? played : any);
  const cards = dealClass(ORDER[i]);
  drill = { st, c, code: ORDER[i], cards, pick: null };
  renderDrill();
}
function isRight(c, code, k) {
  const info = cellInfo(c, IDX[code]);
  const x = k < c.acts.length ? info.p[k] : info.rest;
  return k === info.main || (state.mode === "gto" && c.src !== "approx" && x >= 0.3);
}
function renderDrill() {
  const L = T(), d = drill, choices = choicesOf(d.c);
  const info = cellInfo(d.c, IDX[d.code]);
  $("dDesc").textContent = describe(d.st);
  $("dCards").outerHTML = cardsHTML(d.cards, "dCards");
  $("dBtns").innerHTML = choices.map((a, i) => {
    const done = d.pick !== null;
    const right = isRight(d.c, d.code, i);
    return `<button type="button" data-i="${i}"${done && right ? ' aria-pressed="true"' : ""}${done && !right && i !== d.pick ? " disabled" : ""}>${a.label}</button>`;
  }).join("");
  if (d.pick === null) { $("dFeed").innerHTML = ""; return; }
  const best = choices[info.main];
  const freq = state.mode === "gto" && d.c.src !== "approx" && info.mixed ? " " + L.freqLine(freqSummary(d.c, info)) : "";
  $("dFeed").innerHTML = isRight(d.c, d.code, d.pick)
    ? `<span class="ok">${L.ok}</span> ${L.okLine(d.code, choices[d.pick].label)}${freq} ${best.size}`
    : `<span class="no">${L.no}</span> ${L.noLine(d.code, best.label, choices[d.pick].label)}${freq} ${best.size}`;
}
$("dBtns").addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b || !drill || drill.pick !== null) return;
  drill.pick = +b.dataset.i;
  const ok = isRight(drill.c, drill.code, drill.pick);
  score.n++; if (ok) { score.ok++; score.streak++; } else score.streak = 0;
  renderDrill();
  renderScore();
});
function renderScore() {
  const L = T();
  $("score").innerHTML = score.n ? L.score(score.ok, score.n, score.streak) : L.scoreEmpty;
}
$("dNext").addEventListener("click", newDrill);
$("dOpen").addEventListener("click", () => {
  if (!drill) return;
  Object.assign(state, drill.st);
  $("hand").value = drill.cards.map(c => c[0] + c[1]).join(" ");
  state.hand = $("hand").value;
  update();
  $("verdict").scrollIntoView({ behavior: "smooth", block: "center" });
});

applyLang();
update();
renderScore();
newDrill();
