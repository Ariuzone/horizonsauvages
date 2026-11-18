# Conversion des photos en WebP optimisés + copie dans site/assets/img
# Usage: python build/tools/process-images.py
from PIL import Image, ImageOps
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "assets_src" / "img"
DST = ROOT / "assets_src" / "webp"

# tailles produites : large -> heroes ; moyen -> cartes
SIZES = [(1600, 78), (820, 74)]

def process(src: Path, outdir: Path, stem: str):
    outdir.mkdir(parents=True, exist_ok=True)
    img = Image.open(src).convert("RGB")
    # EXIF : rotation auto
    img = ImageOps.exif_transpose(img)
    outs = []
    for w, q in SIZES:
        if img.width > w:
            h = round(img.height * w / img.width)
            v = img.resize((w, h), Image.LANCZOS)
        else:
            v = img
        f = outdir / f"{stem}-{w}w.webp"
        v.save(f, "WEBP", quality=q, method=6)
        outs.append((f.name, v.width, v.height, f.stat().st_size))
    return outs

def main():
    manifest = json.loads((ROOT / "assets_src" / "raw" / "commons-manifest.json").read_text(encoding="utf-8"))
    total = 0
    for key, meta in sorted(manifest.items()):
        src = SRC / meta["file"]
        if not src.exists():
            print("!! manquant :", key)
            continue
        outdir = DST / meta["outDir"]
        outs = process(src, outdir, key)
        total += sum(o[3] for o in outs)
        print(f"{key}: " + ", ".join(f"{n} ({b//1024} Ko)" for n, _, _, b in outs))
    print(f"\nTotal WebP : {total/1024/1024:.1f} Mo")

if __name__ == "__main__":
    main()
