# Création des favicons + image OG — Horizons Sauvages
# Usage: python build/tools/make-brand.py
from PIL import Image, ImageDraw, ImageOps
from pathlib import Path
import math

ROOT = Path(__file__).resolve().parents[2]
ASSETS = ROOT / "assets_src" / "img"

NIGHT = (16, 27, 18, 255)
IVORY = (244, 237, 221, 255)
GOLD = (217, 168, 85, 255)
TERRA = (180, 80, 31, 255)


def draw_logo(size: int, bg=NIGHT, circle=True) -> Image.Image:
    """Reproduit le logo SVG : anneau, soleil couchant, deux lignes d'horizon, acacia."""
    s = 4  # supersampling
    S = size * s
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    cx = cy = S / 2
    r = S * 0.468

    if circle:
        # disque de fond
        d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=bg)
        ring_w = max(2, int(S * 0.045))
        d.ellipse([cx - r + ring_w / 2, cy - r + ring_w / 2, cx + r - ring_w / 2, cy + r - ring_w / 2],
                  outline=IVORY, width=ring_w)

    # soleil
    sun_r = S * 0.185
    sy = cy + S * 0.03
    d.ellipse([cx - sun_r, sy - sun_r, cx + sun_r, sy + sun_r], fill=TERRA)

    # deux lignes d'horizon (arcs doux)
    lw = max(2, int(S * 0.045))
    for k, (col, dy) in enumerate([(IVORY, 0.19), (GOLD, 0.30)]):
        y0 = cy + S * dy
        half = S * 0.335
        steps = 60
        pts = []
        for i in range(steps + 1):
            t = i / steps
            x = cx - half + 2 * half * t
            # bosse douce vers le haut
            y = y0 - S * 0.045 * math.sin(math.pi * t)
            pts.append((x, y))
        d.line(pts, fill=col, width=lw, joint="curve")

    # acacia stylisé au-dessus du soleil
    trunk_top = sy - sun_r * 0.6
    base_y = sy + sun_r * 0.9
    d.line([(cx, base_y), (cx, trunk_top)], fill=IVORY, width=max(2, int(S * 0.032)))
    # branches : courbes écartées
    for sign in (-1, 1):
        for lift, spread in [(0.16, 0.13), (0.28, 0.085), (0.38, 0.045)]:
            x1, y1 = cx, trunk_top + S * 0.02
            x2 = cx + sign * S * spread
            y2 = trunk_top - S * lift
            d.line([(x1, y1), (x2, y2)], fill=IVORY, width=max(2, int(S * 0.024)))
    return img.resize((size, size), Image.LANCZOS)


def main():
    out = ROOT / "assets_src" / "brand"
    out.mkdir(parents=True, exist_ok=True)

    # favicon.svg (version vectorielle cohérente avec le logo du site)
    svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <circle cx="32" cy="32" r="31" fill="#101B12"/>
  <circle cx="32" cy="32" r="29.5" fill="none" stroke="#F4EDDD" stroke-width="2.6"/>
  <circle cx="32" cy="34" r="12" fill="#B4501F"/>
  <path d="M10.5 45c6.8-4.4 14-6.6 21.5-6.6S46.7 40.6 53.5 45" stroke="#F4EDDD" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  <path d="M10.5 50.4c6.8-4.4 14-6.6 21.5-6.6S46.7 46 53.5 50.4" stroke="#D9A855" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  <path d="M32 21v-5.4m0 5.4c-2.9-1.7-5.6-4.8-6.6-7.7m6.6 7.7c2.9-1.7 5.6-4.8 6.6-7.7M32 15.8c-1.9-.9-3.4-2.7-3.8-4.6m3.8 4.6c1.9-.9 3.4-2.7 3.8-4.6" stroke="#F4EDDD" stroke-width="2.3" fill="none" stroke-linecap="round"/>
</svg>"""
    (out / "favicon.svg").write_text(svg, encoding="utf-8")

    logo = draw_logo(512)
    logo.save(out / "favicon-512.png")
    logo.resize((192, 192), Image.LANCZOS).save(out / "favicon-192.png")
    logo.resize((32, 32), Image.LANCZOS).save(out / "favicon-32.png")
    logo.resize((16, 16), Image.LANCZOS).save(out / "favicon-16.png")
    logo.save(out / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

    # apple-touch-icon : fond plein, sans transparence
    at = Image.new("RGBA", (512, 512), NIGHT)
    lg = draw_logo(512, circle=False)
    at.alpha_composite(lg)
    at = ImageOps.expand(at.convert("RGB"), border=0)
    at.resize((180, 180), Image.LANCZOS).save(out / "apple-touch-icon.png")

    # image Open Graph : photo + bandeau sombre bas
    src = Image.open(ASSETS / "dest-tanzanie.jpg").convert("RGB")
    og = ImageOps.fit(src, (1200, 630), Image.LANCZOS, centering=(0.5, 0.4))
    og.save(out / "partage-og.jpg", quality=88)
    print("Favicons + image OG générés dans assets_src/brand/")


if __name__ == "__main__":
    main()
