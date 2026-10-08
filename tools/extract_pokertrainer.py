"""Extrait les ranges préflop cash 100bb de l'application Pokertrainer (app.pokertrainer.se).

Les fichiers JavaScript de l'application (téléchargés dans sources/raw/) contiennent les ranges
sous forme de blocs JSON.parse('...'). Ce script lit seulement ces blocs JSON, sans exécuter
le code, et écrit data/ranges.js pour le site.

Utilisation (depuis le dossier poker-help) :
    python3 -I tools/extract_pokertrainer.py
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "sources" / "raw"
OUT = ROOT / "data" / "ranges.js"

RANKS = "AKQJT98765432"
# même ordre que la grille du site : ligne par ligne, assorties au-dessus de la diagonale
ORDER = [
    RANKS[i] * 2 if i == j else (RANKS[i] + RANKS[j] + "s" if i < j else RANKS[j] + RANKS[i] + "o")
    for i in range(13) for j in range(13)
]
COMBOS = {h: 6 if len(h) == 2 else 4 if h[2] == "s" else 12 for h in ORDER}

BLOB = re.compile(r"(?:const |,)([A-Za-z_$][\w$]*)=JSON\.parse\('((?:[^'\\]|\\.)*)'\)")


def blobs(text):
    """Nom de variable -> données JSON pour chaque bloc JSON.parse('...') du fichier."""
    out = {}
    for name, body in BLOB.findall(text):
        out[name] = json.loads(body.replace("\\'", "'"))
    return out


def load():
    gto_file = next(RAW.glob("7698.*.js")).read_text(encoding="utf-8")
    pto_file = next(RAW.glob("7155.*.js")).read_text(encoding="utf-8")

    # le service de l'application associe chaque jeu de ranges à une variable : this.Cash_100_GTO=h, etc.
    names = dict(re.findall(r"this\.(Cash_100(?:_\w+)?)=([A-Za-z_$][\w$]*)", gto_file))
    gto_vars = blobs(gto_file)
    gto = gto_vars[names["Cash_100_GTO"]]

    pto_match = re.search(r"s\.exports=JSON\.parse\('((?:[^'\\]|\\.)*)'\)", pto_file)
    pto = json.loads(pto_match.group(1).replace("\\'", "'"))
    return {"pto": pto, "gto": gto}


def pct(rng):
    return round(sum(rng.get(h, 0) * COMBOS[h] for h in ORDER) / 13.26, 1)


def check(name, ds):
    """Vérifie que chaque étape reste dans la range de l'étape d'avant."""
    problems = []
    seats = sorted({k[4:] for k in ds if k.startswith("Open")})

    def get(key):
        return ds.get(key, {})

    for hero in seats + ["BB"]:
        for vil in seats:
            if hero == vil:
                continue
            steps = [
                # (actions de cette étape, poids de la main en entrant)
                ([f"3Bet{hero}vs{vil}", f"Call{hero}vs{vil}"], None),
                ([f"4Bet{hero}vs{vil}", f"Call 3Bet{hero}vs{vil}"], f"Open{hero}"),
                ([f"5Bet{hero}vs{vil}", f"Call 4Bet{hero}vs{vil}"], f"3Bet{hero}vs{vil}"),
                ([f"Call 5Bet{hero}vs{vil}"], f"4Bet{hero}vs{vil}"),
            ]
            for acts, base in steps:
                if not any(a in ds for a in acts):
                    continue
                for h in ORDER:
                    total = sum(get(a).get(h, 0) for a in acts)
                    cap = 1 if base is None else get(base).get(h, 0)
                    if total > cap + 0.02:
                        problems.append(f"{name} {acts[0]} {h}: {total:.2f} > {cap:.2f}")
    return problems


def encode(rng):
    # 2 caractères base 36 par main : fréquence en pourcentage (0 à 100)
    return "".join(_b36(round(rng.get(h, 0) * 100)) for h in ORDER)


def _b36(n):
    digits = "0123456789abcdefghijklmnopqrstuvwxyz"
    return digits[n // 36] + digits[n % 36]


def main():
    data = load()
    keep = re.compile(r"^(Open|Limp|3Bet|4Bet|5Bet|Call)")
    out = {}
    for name, ds in data.items():
        ds = {k: v for k, v in ds.items() if keep.match(k) and any(x > 0 for x in v.values())}
        problems = check(name, ds)
        print(f"{name}: {len(ds)} ranges, {len(problems)} incohérences")
        for p in problems[:10]:
            print("  ", p)
        for seat in ["EP1", "EP2", "EP3", "LJ", "HJ", "CO", "BTN", "SB"]:
            print(f"   Open{seat}: {pct(ds.get('Open' + seat, {}))} %")
        out[name] = {k: encode(v) for k, v in sorted(ds.items())}

    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(
        "// Généré par tools/extract_pokertrainer.py, ne pas modifier à la main.\n"
        "// Source : Pokertrainer.se (app.pokertrainer.se, Range Viewer), cash 100bb, open 2,5bb.\n"
        "// Chaque range : 169 mains dans l'ordre de la grille, 2 caractères base 36 par main = fréquence en %.\n"
        "window.PT_RANGES = " + json.dumps(out, separators=(",", ":")) + ";\n",
        encoding="utf-8",
    )
    print(f"écrit {OUT.relative_to(ROOT)} ({OUT.stat().st_size // 1024} Ko)")


if __name__ == "__main__":
    main()
