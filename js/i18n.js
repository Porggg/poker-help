/* ---------- textes (français / anglais) ---------- */
const STR = {
  fr: {
    pageTitle: "Ranges Préflop Cash Game",
    eyebrow: "No-limit hold'em · cash game · 100bb",
    h1: "Ranges Préflop",
    lede: "Choisis le nombre de joueurs, ta place et l'action avant toi, puis tape ta main. La grille montre quoi faire avec chaque main dans ce spot.",
    beginner: "Débutant ? Lis l'aide.",
    help: "Aide",
    helpTitle: "Aide et lexique",
    close: "Fermer",
    spotAria: "Ton spot",
    players: "Joueurs à la table",
    seat: "Ta place",
    before: "Action avant toi",
    sbPlan: "Stratégie en small blind",
    sbMix: "Relance ou limp",
    sbRaise: "Relance ou couche",
    modeLabel: "Ranges",
    modeSimple: "Simple",
    modeGto: "GTO",
    modeHintSimple: "Une seule action par main : plus facile à retenir.",
    modeHintGto: "Fréquences du solveur : une case peut mélanger plusieurs actions.",
    freqLine: x => `Fréquences : ${x}.`,
    partial: p => `Cette main n'arrive ici que ${p} du temps.`,
    hand: "Ta main",
    random: "Main au hasard",
    drillEyebrow: "Entraînement",
    drillTitle: "Quiz de spots",
    next: "Spot suivant",
    openSpot: "Voir ce spot dans la grille",
    notesTitle: "Hypothèses de ces ranges",
    notes1: "Tapis effectifs de 100bb, open à 2,5bb (3bb depuis la small blind). Toutes les situations de 3 à 9 joueurs viennent des ranges de l'application Pokertrainer.se : en mode Simple, leurs ranges « PTO » (une action par main) ; en mode GTO, leurs solutions de solveur avec les fréquences. Seuls le heads-up, les limps et le plan « relance ou limp » en small blind sont des approximations écrites à la main. La ligne sous chaque grille indique d'où elle vient.",
    notes2: "Adapte-toi aux joueurs : contre une table large et passive, relance plus de mains pour la value et bluffe moins ; contre des joueurs serrés et agressifs, couche davantage le bas de chaque range de call. En live, où les opens font 3bb ou plus, défends un peu plus serré. S'il y a déjà un joueur qui a payé l'open (spot de squeeze), garde seulement le haut de ta range de 3-bet et paye moins.",
    playersAria: n => `${n} joueurs`,
    sitAria: p => `S'asseoir en ${p}`,
    sits: {
      rfi: ["Tout le monde s'est couché", "premier à parler"],
      limp: ["Quelqu'un a limpé", "a payé 1bb"],
      raise: ["Quelqu'un a relancé", "open"],
      "3bet": ["Tu as relancé, on te 3-bet", "sur-relance"],
      "4bet": ["Tu as 3-bet, on te 4-bet", "re-sur-relance"],
      "5bet": ["Tu as 4-bet, on te fait tapis", "5-bet"],
    },
    vil: { limp: "Premier à limper", raise: "Qui a relancé", "3bet": "Qui t'a 3-bet", "4bet": "Qui a ouvert puis 4-bet", "5bet": "Qui a 3-bet puis fait tapis" },
    pos: {
      "UTG": "Under the gun : premier à parler",
      "UTG+1": "Under the gun +1",
      "UTG+2": "Under the gun +2",
      "LJ": "Lojack : milieu de parole",
      "HJ": "Hijack : 2 places avant le bouton",
      "CO": "Cutoff : juste avant le bouton",
      "BTN": "Bouton (dealer) : parle en dernier après le flop",
      "BTN/SB": "Bouton et small blind (heads-up)",
      "SB": "Small blind : met 0,5bb",
      "BB": "Big blind : met 1bb",
    },
    status: { you: "toi", youOpen: "toi · open", you3: "toi · 3-bet", you4: "toi · 4-bet", limp: "limp", raise: "relance", "3bet": "3-bet", "4bet": "4-bet", "5bet": "tapis", folded: "couché", toAct: "à parler", unknown: "?" },
    pot: { rfi: "Blinds 0,5 / 1", limp: "Pot 2,5bb +", raise: "Pot 4bb", "3bet": "Pot ≈ 11bb", "4bet": "Pot ≈ 50bb", "5bet": "Tapis" },
    a: { raise: "Relancer", limp: "Limper", fold: "Se coucher", check: "Checker", complete: "Compléter", iso: "Iso-relancer", overlimp: "Sur-limper", threebet: "3-bet", call: "Suivre", fourbet: "4-bet", allin: "Tapis", out: "Hors range" },
    s: {
      fold: "Jette ta main.",
      three75: "3-bet à <b>7,5bb</b> (3x l'open) en position.",
      three125: "3-bet à <b>12,5bb</b> (5x l'open) hors de position.",
      three9: "3-bet à <b>9bb</b> (3x l'open de 3bb).",
      huRaise: "Relance à <b>2–2,5bb</b>.",
      sbRaise: "Relance à <b>3bb</b>.",
      sbLimp: "Complète pour <b>0,5bb</b> de plus.",
      open: "Ouvre à <b>2,5bb</b> (3bb en live). Ajoute 1bb par limper.",
      bbVsSb: "Relance à <b>3,5–4bb</b>.",
      isoRaise: "Relance à <b>4bb + 1bb par limper</b>.",
      check: "Checke et vois le flop gratuitement.",
      sbIso: "Relance à <b>5bb + 1bb par limper en plus</b>.",
      complete: "Complète pour <b>0,5bb</b>.",
      overlimp: "Paye <b>1bb</b> derrière.",
      threeOop: "3-bet à <b>environ 4x</b> l'open (10–12bb) hors de position.",
      threeIp: "3-bet à <b>3x</b> l'open (environ 7,5bb) en position.",
      callBB: "Paye. Tu fermes l'action à prix réduit.",
      call: "Paye l'open.",
      fourbetTo: x => `4-bet à <b>${x}bb</b>.`,
      call3: "Paye le 3-bet.",
      allin: "Tapis (5-bet) : envoie tes <b>100bb</b>.",
      call4: "Paye le 4-bet et joue le flop avec environ 75bb derrière.",
      call5: "Paye le tapis.",
      out: "Avec cette main, tu n'arrives pas dans ce spot : d'après les ranges, tu l'aurais couchée (ou jouée autrement) plus tôt dans le coup.",
    },
    src: {
      pto: `Source : <a href="https://app.pokertrainer.se/range-viewer?format=cash&players=6&stack=100&scenario=open" target="_blank" rel="noopener">Pokertrainer.se</a>, ranges « PTO » cash 100bb (une action par main).`,
      gto: `Source : <a href="https://app.pokertrainer.se/range-viewer?format=cash&players=6&stack=100&scenario=open" target="_blank" rel="noopener">Pokertrainer.se</a>, solutions GTO cash 100bb (open 2,5bb).`,
      approx: "Approximation : Pokertrainer ne couvre pas ce spot. Range écrite à la main, à utiliser avec prudence.",
      shortTable: " À moins de 6 joueurs, on reprend les ranges des places qui ont le même nombre de joueurs derrière elles.",
    },
    table: n => n === 2 ? "Heads-up" : `${n} joueurs`,
    sub: {
      rfi: t => `${t} · tout le monde s'est couché`,
      limp: (t, v) => `${t} · ${v} a limpé`,
      raise: (t, v) => `${t} · ${v} a ouvert à 2,5bb`,
      threebet: (t, v, ip) => `${t} · tu as ouvert, ${v} a 3-bet · tu es ${ip ? "en position" : "hors de position"}`,
      fourbet: (t, v) => `${t} · ${v} a ouvert, tu as 3-bet, ${v} a 4-bet`,
      fivebet: (t, v) => `${t} · tu as ouvert, ${v} a 3-bet, tu as 4-bet, ${v} a fait tapis`,
    },
    ti: {
      hu: "Open au bouton (heads-up)",
      sbMix: "Small blind : relance ou limp",
      sbRaise: "Small blind : relance ou couche",
      open: h => `Open depuis ${h}`,
      bbVsSb: "Big blind contre limp de la small blind",
      bbVsLimp: "Big blind contre limpers",
      sbVsLimp: "Small blind contre limpers",
      vsLimp: h => `${h} contre limpers`,
      vsOpen: (h, v) => `${h} contre open ${v}`,
      vs3bet: (h, v) => `Open ${h} contre 3-bet ${v}`,
      vs4bet: (h, v) => `3-bet ${h} contre 4-bet ${v}`,
      vs5bet: (h, v) => `4-bet ${h} contre tapis ${v}`,
    },
    tip: {
      hu: "En heads-up, le bouton a la position pendant tout le coup : ouvre très large. Couche seulement les pires mains dépareillées.",
      sbMix: "Tout le monde s'est couché jusqu'à toi en small blind. Relance tes mains fortes ; limpe les mains jouables qui ne veulent pas un gros pot hors de position.",
      sbRaise: "Plan simple en small blind : jamais de limp. Relance à 3bb ou couche-toi, c'est plus facile à jouer et efficace contre des big blinds agressives.",
      open: "Premier à entrer dans le coup : relance ou couche-toi. Ne limpe jamais depuis ces places. Moins il reste de joueurs derrière toi, plus tu ouvres large.",
      bbVsSb: "Tu as la position contre la small blind. Relance tes mains fortes pour la value et checke le reste : tu ne te couches jamais ici.",
      bbMulti: "Tu as déjà 1bb dans le pot et le flop est gratuit. Relance seulement les mains fortes, car tu seras hors de position contre plusieurs joueurs.",
      sbLimp: "Compléter coûte peu avec un pot qui grossit déjà. Relance seulement les mains qui jouent bien en tête-à-tête hors de position.",
      vsLimp: "Les limpers ont souvent des mains faibles. Iso-relance pour les jouer en tête-à-tête ; sur-limpe les petites paires et les mains assorties qui gagnent de gros pots à plusieurs.",
      bbDef: "En big blind tu as déjà 1bb dans le pot et tu fermes l'action, donc tu défends large. Contre des opens de début de parole, défends plus serré.",
      sbDef: "Depuis la small blind, privilégie 3-bet ou couche. Payer invite la big blind à squeezer et te laisse hors de position.",
      btnDef: "Au bouton, tu es sûr d'avoir la position après le flop : tu peux payer quelques mains (paires moyennes, quelques mains assorties). Le reste, c'est 3-bet ou couche.",
      ipPto: "Dans ces ranges, on ne paye un open qu'au bouton et en big blind. Ailleurs, c'est 3-bet ou couche : payer laisse les joueurs derrière toi squeezer, et tu joues souvent hors de position.",
      ipDef: "En position tu peux payer plus de mains. 3-bet le haut de ta range plus quelques As assortis en bluff.",
      vs3bet: ip => "Contre un 3-bet, continue avec environ 40 à 50 % de ta range d'open. " + (ip ? "En position, tu peux payer un peu plus large que cette grille." : "Hors de position, retire d'abord les calls les plus faibles."),
      vs4bet: "À 100bb, après un 4-bet il reste environ 75bb : tu vas à tapis avec les meilleures mains (et quelques bluffs), tu payes avec quelques mains jouables, et tu couches le reste.",
      vs5bet: "Ton adversaire a fait tapis : tu ne peux plus être relancé. Paye seulement si ta main est assez forte contre sa range de tapis.",
    },
    handName: (code, r) => code.length === 2 ? `Paire de ${r(code[0])}` : `${r(code[0])}${r(code[1])} ${code[2] === "s" ? "assortis" : "dépareillés"}`,
    errSame: "C'est deux fois la même carte.",
    errPair: "Une paire ne peut pas être assortie.",
    errRead: raw => `Impossible de lire « ${raw} ». Essaie AKs, QJo, 77 ou Ah Kd.`,
    handHint: "Tape une main comme AKs, T9s, 77 ou Ah Kd, ou touche une case de la grille.",
    describe: {
      lead: (t, h) => `${t} · tu es ${h} · `,
      rfi: () => "tout le monde se couche jusqu'à toi",
      limp: v => `${v} limpe`,
      raise: v => `${v} ouvre à 2,5bb`,
      "3bet": v => `tu ouvres, ${v} te 3-bet`,
      "4bet": v => `${v} ouvre, tu 3-bet, ${v} te 4-bet`,
      "5bet": v => `tu ouvres, ${v} 3-bet, tu 4-bet, ${v} fait tapis`,
    },
    ok: "Bonne réponse.",
    no: "Raté.",
    okLine: (code, a) => `${code} : ${a}.`,
    noLine: (code, a, p) => `Ici, ${code} c'est <b>${a}</b>, pas ${p}.`,
    score: (ok, n, s) => `<b>${ok}/${n}</b> justes · série de ${s}`,
    scoreEmpty: "Choisis une action pour chaque spot",
    pct: x => x.toFixed(1).replace(".", ",") + " %",
    helpSections: [
      ["bases", "Le poker en 30 secondes", `
<p>Au <b>Texas hold'em</b>, chaque joueur reçoit 2 cartes cachées, sa « main ». Ensuite 5 cartes communes, visibles par tous, arrivent en trois fois : le <b>flop</b> (3 cartes), le <b>turn</b> (1 carte) et la <b>river</b> (1 carte). Il y a un tour d'enchères avant le flop et après chacune de ces étapes.</p>
<p>Tu gagnes le pot de deux façons : avoir la meilleure combinaison de 5 cartes à la fin, ou faire coucher tous les autres joueurs avant.</p>
<p>Le <b>préflop</b> est le premier tour d'enchères, quand tu n'as que tes 2 cartes. C'est la décision que tu prends à chaque main, et c'est celle que ce site t'aide à prendre. Bien jouer le préflop, c'est surtout savoir quelles mains jeter.</p>
<p>En <b>cash game</b>, les jetons valent de l'argent réel, les blinds ne montent pas et tu peux quitter la table quand tu veux. C'est différent du tournoi.</p>`],
      ["usage", "Utiliser le site en 4 étapes", `
<ol>
<li><b>Joueurs à la table</b> : combien de joueurs ont des cartes. « HU » veut dire heads-up, 2 joueurs.</li>
<li><b>Ta place</b> : clique sur un bouton ou directement sur la table. Ta place est en noir sur la table.</li>
<li><b>Action avant toi</b> : ce qui s'est passé avant que ce soit à toi. Si quelqu'un a misé, choisis aussi quel joueur (il apparaît en rouge sur la table).</li>
<li><b>Ta main</b> : tape-la (par exemple <code>AKs</code> ou <code>Ah Kd</code>) ou clique sur une case de la grille. Le grand bouton coloré te dit quoi faire, et la ligne en dessous combien miser.</li>
</ol>
<p>Le <b>quiz</b> en bas de page te pose des situations au hasard pour t'entraîner.</p>`],
      ["actions", "Les actions", `
<dl>
<dt>Se coucher (fold)</dt><dd>Abandonner ta main. Tu ne perds que ce que tu as déjà mis dans le pot.</dd>
<dt>Checker (check)</dt><dd>Passer sans miser. Possible seulement si personne n'a misé plus que toi, par exemple en big blind quand les autres ont seulement payé.</dd>
<dt>Suivre / payer (call)</dt><dd>Mettre autant que la dernière mise pour rester dans le coup.</dd>
<dt>Relancer (raise)</dt><dd>Miser plus que la mise actuelle. Les autres doivent payer, relancer ou se coucher.</dd>
<dt>Open</dt><dd>La première relance du coup.</dd>
<dt>Limper (limp)</dt><dd>Entrer dans le coup en payant juste la big blind au lieu de relancer. C'est souvent le signe d'un joueur faible.</dd>
<dt>Compléter</dt><dd>En small blind, ajouter 0,5bb pour égaler la big blind.</dd>
<dt>Iso-relancer</dt><dd>Relancer après un limper pour l'« isoler » et jouer contre lui seul.</dd>
<dt>Sur-limper</dt><dd>Limper toi aussi après un autre limper.</dd>
<dt>3-bet</dt><dd>Relancer une relance. La big blind compte comme la 1re mise, l'open comme la 2e, la sur-relance est donc la 3e.</dd>
<dt>4-bet</dt><dd>Relancer un 3-bet.</dd>
<dt>5-bet</dt><dd>Relancer un 4-bet. À 100bb, c'est en général un tapis.</dd>
<dt>Tapis (all-in)</dt><dd>Miser tous tes jetons.</dd>
<dt>Squeeze</dt><dd>Faire un 3-bet quand il y a déjà eu un open et au moins un joueur qui a payé.</dd>
</dl>`],
      ["positions", "Les places (positions)", `
<p>Le <b>bouton</b> (le jeton « D » sur la table) avance d'une place à chaque main. Les deux joueurs à sa gauche posent les <b>blinds</b>, des mises obligatoires qui lancent le pot. Au préflop, le premier à parler est le joueur à gauche de la big blind.</p>
<p>Après le flop, le bouton parle toujours en dernier. Parler en dernier est un gros avantage : tu vois ce que font les autres avant de décider. C'est pour ça que la grille joue beaucoup plus de mains au bouton qu'en UTG.</p>
<div class="tablewrap"><table>
<thead><tr><th>Abrév.</th><th>Nom</th><th>À retenir</th></tr></thead>
<tbody>
<tr><td>UTG</td><td>Under the gun (« sous le pistolet »)</td><td>Premier à parler au préflop, avec tout le monde derrière. Joue serré.</td></tr>
<tr><td>UTG+1, UTG+2</td><td>Under the gun +1 / +2</td><td>Juste après UTG, à 8 ou 9 joueurs. Encore en début de parole.</td></tr>
<tr><td>LJ</td><td>Lojack</td><td>3 places avant le bouton. Milieu de parole.</td></tr>
<tr><td>HJ</td><td>Hijack</td><td>2 places avant le bouton.</td></tr>
<tr><td>CO</td><td>Cutoff</td><td>Juste avant le bouton. Bonne place pour ouvrir large.</td></tr>
<tr><td>BTN</td><td>Bouton (dealer)</td><td>Parle en dernier après le flop. Meilleure place de la table.</td></tr>
<tr><td>SB</td><td>Small blind (petite blinde)</td><td>Met 0,5bb d'office. Parle en premier après le flop : place difficile.</td></tr>
<tr><td>BB</td><td>Big blind (grosse blinde)</td><td>Met 1bb d'office. Parle en dernier au préflop, donc défend beaucoup de mains.</td></tr>
</tbody></table></div>
<p>Groupes de places : <b>EP</b> (early position, début de parole : UTG à UTG+2), <b>MP</b> (middle position : LJ, HJ), <b>LP</b> (late position : CO, BTN).</p>
<p><b>IP</b> (in position) : tu parles après ton adversaire après le flop. <b>OOP</b> (out of position) : tu parles avant lui.</p>
<p>Avec moins de joueurs, on enlève des places en partant du début : à 6 joueurs il reste UTG, HJ, CO, BTN, SB, BB. En heads-up, le bouton est aussi la small blind.</p>`],
      ["mains", "Écrire une main", `
<ul>
<li>Valeurs, de la plus forte à la plus faible : <b>A</b> (as), <b>K</b> (roi, king), <b>Q</b> (dame, queen), <b>J</b> (valet, jack), <b>T</b> (10, ten), puis 9 à 2.</li>
<li><code>s</code> après deux valeurs = <b>assorties</b> (suited) : même couleur. A♠ K♠ s'écrit <code>AKs</code>.</li>
<li><code>o</code> = <b>dépareillées</b> (offsuit) : couleurs différentes. A♠ K♦ s'écrit <code>AKo</code>.</li>
<li>Deux fois la même valeur = une <b>paire</b> : <code>77</code>, <code>QQ</code>. On dit aussi « pocket pair ».</li>
<li>Pour une main exacte, mets la valeur puis la couleur en anglais : <code>s</code> ♠ pique (spades), <code>h</code> ♥ cœur (hearts), <code>d</code> ♦ carreau (diamonds), <code>c</code> ♣ trèfle (clubs). Exemple : <code>Ah Kd</code> = A♥ K♦.</li>
<li>Sans s ni o (<code>AK</code>), le site montre les deux versions.</li>
</ul>
<p>Pourquoi assorties ou non ? Deux cartes de la même couleur peuvent faire une <b>couleur</b> (5 cartes de la même couleur). Ça rend la main un peu meilleure, donc les mains assorties sont jouées plus souvent.</p>`],
      ["grille", "Lire la grille", `
<p>La grille montre les 169 mains de départ différentes.</p>
<ul>
<li><b>La diagonale</b> contient les paires, de AA en haut à gauche à 22 en bas à droite.</li>
<li><b>Au-dessus</b> de la diagonale (en haut à droite) : les mains assorties (s).</li>
<li><b>En dessous</b> (en bas à gauche) : les mains dépareillées (o).</li>
<li>Plus une case est proche du coin en haut à gauche, plus la main est forte.</li>
</ul>
<p>Couleurs : <span class="chip act-raise">rouge</span> relancer, 3-bet ou 4-bet · <span class="chip act-call">vert</span> suivre · <span class="chip act-limp">jaune</span> limper, checker ou compléter · <span class="chip act-allin">violet</span> tapis · <span class="chip act-fold">gris</span> se coucher.</p>
<p>Les pourcentages sous la grille comptent les <b>combinaisons</b> (combos). Il y a 1 326 façons de recevoir 2 cartes : une paire existe en 6 combos, une main assortie en 4, une main dépareillée en 12. AKo arrive donc 3 fois plus souvent que AKs.</p>
<p><b>Mode Simple ou GTO</b> (au-dessus de la grille). En mode Simple, chaque main a une seule action. En mode GTO, tu vois les fréquences exactes du solveur : une case moitié rouge, moitié verte veut dire « 3-bet la moitié du temps, paye l'autre moitié ». Le verdict donne alors les pourcentages. Commence par le mode Simple.</p>
<p><b>Hors range</b> (cases vides, bordure en pointillés) : à partir du 3-bet, certaines mains ne peuvent pas arriver dans le spot. Par exemple, contre un 3-bet, tu n'as que les mains que tu as ouvertes. En mode GTO, une bande vide en haut d'une case montre que la main n'arrive ici qu'une partie du temps.</p>`],
      ["lexique", "Lexique", `
<dl>
<dt>bb</dt><dd>Big blind, utilisée comme unité de mesure. « Ouvre à 2,5bb » veut dire miser 2,5 fois la big blind. À une table 1 € / 2 €, 2,5bb = 5 €.</dd>
<dt>Tapis effectif</dt><dd>Le plus petit tapis entre toi et ton adversaire, car on ne peut pas gagner plus que ça. Les ranges du site supposent 100bb, le standard en cash game.</dd>
<dt>Pot</dt><dd>Les jetons au milieu de la table, que gagne le vainqueur du coup.</dd>
<dt>Range</dt><dd>L'ensemble des mains qu'on joue d'une certaine façon dans une situation. « Ma range d'open au CO » = toutes les mains que j'ouvre depuis le cutoff.</dd>
<dt>Spot</dt><dd>Une situation précise : ta place, le nombre de joueurs et ce qui s'est passé avant toi.</dd>
<dt>Heads-up (HU)</dt><dd>Jouer à 2 joueurs.</dd>
<dt>Value</dt><dd>Miser avec une main forte pour être payé par une main moins bonne.</dd>
<dt>Bluff</dt><dd>Miser avec une main faible pour faire coucher une main meilleure. Les As assortis bas (A5s, A4s) servent souvent de bluff au 3-bet.</dd>
<dt>Serré / large</dt><dd>Jouer serré (tight) = peu de mains. Jouer large (loose) = beaucoup de mains.</dd>
<dt>Passif / agressif</dt><dd>Un joueur passif paye souvent et relance rarement. Un joueur agressif mise et relance souvent.</dd>
<dt>Rake</dt><dd>La commission prise par la salle ou le site sur chaque pot.</dd>
<dt>Solveur / GTO</dt><dd>Un logiciel qui calcule une stratégie impossible à exploiter (GTO = game theory optimal). Les ranges ici sont des versions simplifiées de ces calculs.</dd>
</dl>`],
      ["conseils", "Conseils pour débuter", `
<ul>
<li>Suis la grille à la lettre pendant plusieurs sessions, même quand une main « a l'air jolie » (comme K7o ou J5s en début de parole).</li>
<li>Joue plus de mains en fin de parole (CO, BTN) et moins en début (UTG).</li>
<li>Ne limpe pas : quand tu es le premier à entrer dans le coup, relance ou couche-toi.</li>
<li>En big blind, tu as déjà payé 1bb : tu peux défendre plus de mains, mais pas toutes.</li>
<li>Commence par apprendre les deux spots les plus fréquents : « Tout le monde s'est couché » et « Quelqu'un a relancé ». Le quiz est fait pour ça.</li>
</ul>`],
      ["sources", "D'où viennent les ranges", `
<p>Sous chaque grille, une ligne indique sa source. Un point <span class="chip act-call">vert</span> veut dire que la grille vient de Pokertrainer. Un point <span class="chip act-limp">jaune</span> veut dire que c'est une approximation.</p>
<ul>
<li><a href="https://app.pokertrainer.se/range-viewer?format=cash&players=6&stack=100&scenario=open" target="_blank" rel="noopener">Pokertrainer.se</a> (application « Range Viewer ») : toutes les situations de 6 à 9 joueurs, en cash game à 100bb avec open à 2,5bb (open, contre un open, contre un 3-bet, un 4-bet et un tapis). Le mode Simple utilise leurs ranges « PTO », le mode GTO leurs solutions de solveur. Les données ont été extraites des fichiers de leur application avec le script <code>tools/extract_pokertrainer.py</code>, et vérifiées contre les pourcentages affichés dans l'application.</li>
<li>De 3 à 5 joueurs, on reprend les ranges des places qui ont le même nombre de joueurs derrière elles (par exemple le CO à 4 joueurs utilise la range du CO).</li>
<li>Approximations écrites à la main : heads-up, limps (contre des limpers) et le plan « relance ou limp » en small blind. Pokertrainer ne couvre pas ces spots.</li>
</ul>`],
    ],
  },

  en: {
    pageTitle: "Cash Game Preflop Charts",
    eyebrow: "No-limit hold'em · cash game · 100bb",
    h1: "Preflop Charts",
    lede: "Set the table size, pick your seat and the action in front of you, then type your hand. The chart shows what to do with every hand from that spot.",
    beginner: "New to poker? Read the help.",
    help: "Help",
    helpTitle: "Help and glossary",
    close: "Close",
    spotAria: "Your spot",
    players: "Players at the table",
    seat: "Your seat",
    before: "Action before you",
    sbPlan: "Small blind plan",
    sbMix: "Raise or limp",
    sbRaise: "Raise or fold",
    modeLabel: "Ranges",
    modeSimple: "Simple",
    modeGto: "GTO",
    modeHintSimple: "One action per hand: easier to remember.",
    modeHintGto: "Solver frequencies: a square can mix several actions.",
    freqLine: x => `Frequencies: ${x}.`,
    partial: p => `This hand only reaches this spot ${p} of the time.`,
    hand: "Your hand",
    random: "Deal random hand",
    drillEyebrow: "Practice",
    drillTitle: "Spot drill",
    next: "Next spot",
    openSpot: "Open this spot in the chart",
    notesTitle: "What these charts assume",
    notes1: "100bb effective stacks, 2.5bb opens (3bb from the small blind). Every spot from 3 to 9 players comes from the Pokertrainer.se app ranges: in Simple mode their \"PTO\" ranges (one action per hand), in GTO mode their solver solutions with frequencies. Only heads-up, limps and the small blind \"raise or limp\" plan are hand-written approximations. The line under each chart says where it comes from.",
    notes2: "Adjust to the players: against loose, passive tables widen your value raises and cut bluffs; against tight, aggressive players fold more of the bottom of each calling range. In live games where opens are 3bb or bigger, defend a little tighter. With a caller already in the pot (a squeeze spot), keep only the top of the 3-bet range and call less.",
    playersAria: n => `${n} players`,
    sitAria: p => `Sit in ${p}`,
    sits: {
      rfi: ["Folded to you", "first in"],
      limp: ["Someone limped", "called 1bb"],
      raise: ["Someone raised", "open raise"],
      "3bet": ["You raised, got 3-bet", "re-raise"],
      "4bet": ["You 3-bet, got 4-bet", "re-re-raise"],
      "5bet": ["You 4-bet, got shoved on", "5-bet"],
    },
    vil: { limp: "Who limped first", raise: "Who raised", "3bet": "Who 3-bet you", "4bet": "Who opened and 4-bet", "5bet": "Who 3-bet, then shoved" },
    pos: {
      "UTG": "Under the gun: first to act",
      "UTG+1": "Under the gun +1",
      "UTG+2": "Under the gun +2",
      "LJ": "Lojack: middle position",
      "HJ": "Hijack: two seats before the button",
      "CO": "Cutoff: right before the button",
      "BTN": "Button (dealer): acts last after the flop",
      "BTN/SB": "Button and small blind (heads-up)",
      "SB": "Small blind: posts 0.5bb",
      "BB": "Big blind: posts 1bb",
    },
    status: { you: "you", youOpen: "you · raised", you3: "you · 3-bet", you4: "you · 4-bet", limp: "limped", raise: "raised", "3bet": "3-bet", "4bet": "4-bet", "5bet": "all-in", folded: "folded", toAct: "to act", unknown: "?" },
    pot: { rfi: "Blinds 0.5 / 1", limp: "Pot 2.5bb +", raise: "Pot 4bb", "3bet": "Pot ≈ 11bb", "4bet": "Pot ≈ 50bb", "5bet": "Tapis" },
    a: { raise: "Raise", limp: "Limp", fold: "Fold", check: "Check", complete: "Complete", iso: "Iso-raise", overlimp: "Over-limp", threebet: "3-bet", call: "Call", fourbet: "4-bet", allin: "All-in", out: "Not in range" },
    s: {
      fold: "Throw it away.",
      three75: "3-bet to <b>7.5bb</b> (3x the open) in position.",
      three125: "3-bet to <b>12.5bb</b> (5x the open) out of position.",
      three9: "3-bet to <b>9bb</b> (3x the 3bb open).",
      huRaise: "Raise to <b>2–2.5bb</b>.",
      sbRaise: "Raise to <b>3bb</b>.",
      sbLimp: "Complete for <b>0.5bb</b> more.",
      open: "Open to <b>2.5bb</b> (3bb live). Add 1bb per limper.",
      bbVsSb: "Raise to <b>3.5–4bb</b>.",
      isoRaise: "Raise to <b>4bb + 1bb per limper</b>.",
      check: "Check and see a free flop.",
      sbIso: "Raise to <b>5bb + 1bb per extra limper</b>.",
      complete: "Complete for <b>0.5bb</b>.",
      overlimp: "Call <b>1bb</b> behind.",
      threeOop: "3-bet to <b>about 4x</b> the open (10–12bb) out of position.",
      threeIp: "3-bet to <b>3x</b> the open (about 7.5bb) in position.",
      callBB: "Call. You close the action at a discount.",
      call: "Call the open.",
      fourbetTo: x => `4-bet to <b>${x}bb</b>.`,
      call3: "Call the 3-bet.",
      allin: "All-in (5-bet): shove your <b>100bb</b>.",
      call4: "Call the 4-bet and play the flop with about 75bb behind.",
      call5: "Call the all-in.",
      out: "You never reach this spot with this hand: according to the ranges, you'd have folded it (or played it differently) earlier in the hand.",
    },
    src: {
      pto: `Source: <a href="https://app.pokertrainer.se/range-viewer?format=cash&players=6&stack=100&scenario=open" target="_blank" rel="noopener">Pokertrainer.se</a>, "PTO" cash 100bb ranges (one action per hand).`,
      gto: `Source: <a href="https://app.pokertrainer.se/range-viewer?format=cash&players=6&stack=100&scenario=open" target="_blank" rel="noopener">Pokertrainer.se</a>, GTO cash 100bb solutions (2.5bb opens).`,
      approx: "Approximation: Pokertrainer doesn't cover this spot. Hand-written range, use with care.",
      shortTable: " With fewer than 6 players, this uses the ranges of the seat with the same number of players left behind it.",
    },
    table: n => n === 2 ? "Heads-up" : `${n}-handed`,
    sub: {
      rfi: t => `${t} · folded to you`,
      limp: (t, v) => `${t} · ${v} limped`,
      raise: (t, v) => `${t} · ${v} opened to 2.5bb`,
      threebet: (t, v, ip) => `${t} · you opened, ${v} 3-bet · you are ${ip ? "in position" : "out of position"}`,
      fourbet: (t, v) => `${t} · ${v} opened, you 3-bet, ${v} 4-bet`,
      fivebet: (t, v) => `${t} · you opened, ${v} 3-bet, you 4-bet, ${v} shoved`,
    },
    ti: {
      hu: "Button open (heads-up)",
      sbMix: "Small blind: raise or limp",
      sbRaise: "Small blind: raise or fold",
      open: h => `${h} open raise`,
      bbVsSb: "Big blind vs small blind limp",
      bbVsLimp: "Big blind vs limpers",
      sbVsLimp: "Small blind vs limpers",
      vsLimp: h => `${h} vs limpers`,
      vsOpen: (h, v) => `${h} vs ${v} open`,
      vs3bet: (h, v) => `${h} open vs ${v} 3-bet`,
      vs4bet: (h, v) => `${h} 3-bet vs ${v} 4-bet`,
      vs5bet: (h, v) => `${h} 4-bet vs ${v} all-in`,
    },
    tip: {
      hu: "Heads-up the button is in position for the whole hand, so open very wide. Fold only the weakest offsuit junk.",
      sbMix: "Everyone folded to you in the small blind. Raise your strong hands; limp hands that play well but don't want a big pot out of position.",
      sbRaise: "Simple plan for the small blind: no limps. Raise to 3bb or fold, which is easier to play and fine against aggressive big blinds.",
      open: "First in, raise or fold. Never open-limp from these seats. The fewer players left behind you, the wider you open.",
      bbVsSb: "You're in position against the small blind. Raise strong hands for value and check the rest; you never fold here.",
      bbMulti: "You already have 1bb in and the flop is free. Raise only strong hands since you'll be out of position against several players.",
      sbLimp: "Completing is cheap with the pot already growing. Raise only hands that do well heads-up out of position.",
      vsLimp: "Limpers usually hold weak hands. Iso-raise to play them heads-up; over-limp small pairs and suited hands that win big pots multiway.",
      bbDef: "In the big blind you already have 1bb in and close the action, so you defend wide. Against earlier openers, defend tighter.",
      sbDef: "From the small blind lean on 3-bet or fold. Flatting invites the big blind to squeeze and leaves you out of position.",
      btnDef: "On the button you're sure to have position after the flop, so you can call a few hands (medium pairs, some suited hands). Everything else is 3-bet or fold.",
      ipPto: "In these ranges, you only call an open from the button and the big blind. Everywhere else it's 3-bet or fold: calling lets players behind you squeeze, and you often end up out of position.",
      ipDef: "In position you can call more hands. 3-bet the top of your range plus a few suited aces as bluffs.",
      vs3bet: ip => "Against a 3-bet, keep roughly the top 40–50% of your opening range. " + (ip ? "In position you can call a bit wider than this chart." : "Out of position, cut the weakest calls first."),
      vs4bet: "At 100bb, about 75bb are left after a 4-bet: shove the best hands (plus a few bluffs), call with a few playable hands, and fold the rest.",
      vs5bet: "Your opponent is all-in, so you can't be raised again. Call only if your hand is strong enough against their shoving range.",
    },
    handName: (code, r) => code.length === 2 ? `Pocket ${r(code[0])}s` : `${r(code[0])}${r(code[1])} ${code[2] === "s" ? "suited" : "offsuit"}`,
    errSame: "That's the same card twice.",
    errPair: "A pair can't be suited.",
    errRead: raw => `Couldn't read "${raw}". Try AKs, QJo, 77 or Ah Kd.`,
    handHint: "Type a hand like AKs, T9s, 77 or Ah Kd, or tap a square in the chart.",
    describe: {
      lead: (t, h) => `${t} · you're ${h} · `,
      rfi: () => "folded to you",
      limp: v => `${v} limps`,
      raise: v => `${v} opens to 2.5bb`,
      "3bet": v => `you open, ${v} 3-bets`,
      "4bet": v => `${v} opens, you 3-bet, ${v} 4-bets`,
      "5bet": v => `you open, ${v} 3-bets, you 4-bet, ${v} shoves`,
    },
    ok: "Correct.",
    no: "Not quite.",
    okLine: (code, a) => `${code}: ${a}.`,
    noLine: (code, a, p) => `${code} is a <b>${a}</b> here, not ${p}.`,
    score: (ok, n, s) => `<b>${ok}/${n}</b> correct · streak ${s}`,
    scoreEmpty: "Pick an action for each spot",
    pct: x => x.toFixed(1) + "%",
    helpSections: [
      ["basics", "Poker in 30 seconds", `
<p>In <b>Texas hold'em</b>, each player gets 2 face-down cards, their "hand". Then 5 shared cards that everyone can use come out in three steps: the <b>flop</b> (3 cards), the <b>turn</b> (1 card) and the <b>river</b> (1 card). There's a betting round before the flop and after each of these steps.</p>
<p>You win the pot in one of two ways: hold the best 5-card hand at the end, or get everyone else to fold before that.</p>
<p><b>Preflop</b> is the first betting round, when you only have your 2 cards. You make this decision every single hand, and it's the one this site helps with. Playing preflop well is mostly about knowing which hands to throw away.</p>
<p>In a <b>cash game</b> the chips are real money, the blinds never go up, and you can leave whenever you want. That's different from a tournament.</p>`],
      ["usage", "Using the site in 4 steps", `
<ol>
<li><b>Players at the table</b>: how many players are dealt in. "HU" means heads-up, 2 players.</li>
<li><b>Your seat</b>: tap a button or tap the table. Your seat shows in black on the table.</li>
<li><b>Action before you</b>: what happened before it was your turn. If someone bet, also pick which player (they show in red on the table).</li>
<li><b>Your hand</b>: type it (for example <code>AKs</code> or <code>Ah Kd</code>) or tap a square in the chart. The big colored label tells you what to do, and the line under it how much to bet.</li>
</ol>
<p>The <b>drill</b> at the bottom of the page quizzes you on random spots.</p>`],
      ["actions", "The actions", `
<dl>
<dt>Fold</dt><dd>Give up your hand. You only lose what you already put in the pot.</dd>
<dt>Check</dt><dd>Pass without betting. Only possible when nobody bet more than you, for example in the big blind when everyone else just called.</dd>
<dt>Call</dt><dd>Put in the same amount as the last bet to stay in the hand.</dd>
<dt>Raise</dt><dd>Bet more than the current bet. The others must call, raise again or fold.</dd>
<dt>Open</dt><dd>The first raise of the hand.</dd>
<dt>Limp</dt><dd>Enter the pot by just calling the big blind instead of raising. Usually a sign of a weak player.</dd>
<dt>Complete</dt><dd>In the small blind, add 0.5bb to match the big blind.</dd>
<dt>Iso-raise</dt><dd>Raise after a limper to "isolate" them and play against them alone.</dd>
<dt>Over-limp</dt><dd>Limp as well after someone else limped.</dd>
<dt>3-bet</dt><dd>Re-raise a raise. The big blind counts as bet 1, the open as bet 2, so the re-raise is bet 3.</dd>
<dt>4-bet</dt><dd>Re-raise a 3-bet.</dd>
<dt>5-bet</dt><dd>Re-raise a 4-bet. At 100bb it's usually all-in.</dd>
<dt>All-in</dt><dd>Bet all your chips.</dd>
<dt>Squeeze</dt><dd>A 3-bet when there was an open and at least one caller already.</dd>
</dl>`],
      ["positions", "Seats (positions)", `
<p>The <b>button</b> (the "D" chip on the table) moves one seat each hand. The two players to its left post the <b>blinds</b>, forced bets that start the pot. Preflop, the first player to act is the one to the left of the big blind.</p>
<p>After the flop, the button always acts last. Acting last is a big edge: you see what the others do before you decide. That's why the charts play far more hands from the button than from UTG.</p>
<div class="tablewrap"><table>
<thead><tr><th>Short</th><th>Name</th><th>Remember</th></tr></thead>
<tbody>
<tr><td>UTG</td><td>Under the gun</td><td>First to act preflop with everyone behind. Play tight.</td></tr>
<tr><td>UTG+1, UTG+2</td><td>Under the gun +1 / +2</td><td>Right after UTG at 8 or 9 players. Still early position.</td></tr>
<tr><td>LJ</td><td>Lojack</td><td>Three seats before the button. Middle position.</td></tr>
<tr><td>HJ</td><td>Hijack</td><td>Two seats before the button.</td></tr>
<tr><td>CO</td><td>Cutoff</td><td>Right before the button. A good seat to open wide.</td></tr>
<tr><td>BTN</td><td>Button (dealer)</td><td>Acts last after the flop. Best seat at the table.</td></tr>
<tr><td>SB</td><td>Small blind</td><td>Posts 0.5bb. Acts first after the flop, a tough seat.</td></tr>
<tr><td>BB</td><td>Big blind</td><td>Posts 1bb. Acts last preflop, so it defends many hands.</td></tr>
</tbody></table></div>
<p>Seat groups: <b>EP</b> (early position: UTG to UTG+2), <b>MP</b> (middle position: LJ, HJ), <b>LP</b> (late position: CO, BTN).</p>
<p><b>IP</b> (in position): you act after your opponent after the flop. <b>OOP</b> (out of position): you act before them.</p>
<p>With fewer players, seats are removed from the front: 6-handed leaves UTG, HJ, CO, BTN, SB, BB. Heads-up, the button is also the small blind.</p>`],
      ["hands", "Writing a hand", `
<ul>
<li>Ranks from highest to lowest: <b>A</b> (ace), <b>K</b> (king), <b>Q</b> (queen), <b>J</b> (jack), <b>T</b> (ten), then 9 down to 2.</li>
<li><code>s</code> after two ranks = <b>suited</b>: same suit. A♠ K♠ is written <code>AKs</code>.</li>
<li><code>o</code> = <b>offsuit</b>: different suits. A♠ K♦ is written <code>AKo</code>.</li>
<li>Two cards of the same rank = a <b>pair</b> (pocket pair): <code>77</code>, <code>QQ</code>.</li>
<li>For an exact hand, write rank then suit: <code>s</code> ♠ spades, <code>h</code> ♥ hearts, <code>d</code> ♦ diamonds, <code>c</code> ♣ clubs. Example: <code>Ah Kd</code> = A♥ K♦.</li>
<li>Without s or o (<code>AK</code>), the site shows both versions.</li>
</ul>
<p>Why does suited matter? Two cards of the same suit can make a <b>flush</b> (5 cards of one suit). That makes the hand a bit stronger, so suited hands get played more often.</p>`],
      ["chart", "Reading the chart", `
<p>The chart shows all 169 different starting hands.</p>
<ul>
<li><b>The diagonal</b> holds the pairs, from AA top left to 22 bottom right.</li>
<li><b>Above</b> the diagonal (top right): suited hands (s).</li>
<li><b>Below</b> it (bottom left): offsuit hands (o).</li>
<li>The closer a square is to the top-left corner, the stronger the hand.</li>
</ul>
<p>Colors: <span class="chip act-raise">red</span> raise, 3-bet or 4-bet · <span class="chip act-call">green</span> call · <span class="chip act-limp">yellow</span> limp, check or complete · <span class="chip act-allin">purple</span> all-in · <span class="chip act-fold">grey</span> fold.</p>
<p>The percentages under the chart count <b>combos</b>. There are 1,326 ways to be dealt 2 cards: a pair comes in 6 combos, a suited hand in 4, an offsuit hand in 12. So AKo shows up 3 times more often than AKs.</p>
<p><b>Simple or GTO mode</b> (above the chart). In Simple mode each hand has one action. In GTO mode you see the solver's exact frequencies: a square that is half red, half green means "3-bet half the time, call the other half". The verdict then shows the percentages. Start with Simple mode.</p>
<p><b>Not in range</b> (empty squares with a dotted border): from the 3-bet on, some hands can't reach the spot. For example, facing a 3-bet you only hold hands you opened. In GTO mode, an empty band at the top of a square means the hand only reaches this spot part of the time.</p>`],
      ["glossary", "Glossary", `
<dl>
<dt>bb</dt><dd>Big blind, used as a unit. "Open to 2.5bb" means bet 2.5 times the big blind. At a $1/$2 table, 2.5bb = $5.</dd>
<dt>Effective stack</dt><dd>The smaller stack between you and your opponent, since you can't win more than that. The charts assume 100bb, the cash game standard.</dd>
<dt>Pot</dt><dd>The chips in the middle that the winner of the hand takes.</dd>
<dt>Range</dt><dd>All the hands you play a certain way in a situation. "My CO opening range" = every hand I open from the cutoff.</dd>
<dt>Spot</dt><dd>A specific situation: your seat, the number of players and what happened before you.</dd>
<dt>Heads-up (HU)</dt><dd>Playing with 2 players.</dd>
<dt>Value</dt><dd>Betting a strong hand to get called by a worse one.</dd>
<dt>Bluff</dt><dd>Betting a weak hand to make a better hand fold. Low suited aces (A5s, A4s) are common 3-bet bluffs.</dd>
<dt>Tight / loose</dt><dd>Tight = playing few hands. Loose = playing many hands.</dd>
<dt>Passive / aggressive</dt><dd>A passive player calls a lot and rarely raises. An aggressive player bets and raises a lot.</dd>
<dt>Rake</dt><dd>The fee the casino or site takes from each pot.</dd>
<dt>Solver / GTO</dt><dd>Software that computes a strategy that can't be exploited (GTO = game theory optimal). The charts here are simplified versions of that output.</dd>
</dl>`],
      ["tips", "Tips for beginners", `
<ul>
<li>Follow the charts exactly for several sessions, even when a hand "looks pretty" (like K7o or J5s from early position).</li>
<li>Play more hands from late position (CO, BTN) and fewer from early position (UTG).</li>
<li>Don't limp: when you're first into the pot, raise or fold.</li>
<li>In the big blind you've already paid 1bb, so you can defend more hands, but not all of them.</li>
<li>Learn the two most common spots first: "Folded to you" and "Someone raised". That's what the drill is for.</li>
</ul>`],
      ["sources", "Where the ranges come from", `
<p>Under each chart, a line says where it comes from. A <span class="chip act-call">green</span> dot means the chart comes from Pokertrainer. A <span class="chip act-limp">yellow</span> dot means it's an approximation.</p>
<ul>
<li><a href="https://app.pokertrainer.se/range-viewer?format=cash&players=6&stack=100&scenario=open" target="_blank" rel="noopener">Pokertrainer.se</a> ("Range Viewer" app): every spot from 6 to 9 players, cash game at 100bb with 2.5bb opens (open, facing an open, a 3-bet, a 4-bet and an all-in). Simple mode uses their "PTO" ranges, GTO mode their solver solutions. The data was extracted from their app's files with the <code>tools/extract_pokertrainer.py</code> script and checked against the percentages shown in the app.</li>
<li>From 3 to 5 players, each seat uses the ranges of the seat with the same number of players left behind it (for example the CO at 4 players uses the CO range).</li>
<li>Hand-written approximations: heads-up, limps (facing limpers) and the small blind "raise or limp" plan. Pokertrainer doesn't cover these spots.</li>
</ul>`],
    ],
  },
};

