#!/usr/bin/env python3
"""Key out the near-white background from the hero node PNGs and export
transparent, content-cropped WebP for the 2.5D hero composition.

Source:  public/assets/images/hero/{1..9}.png   (white background)
Output:  public/assets/images/hero/nodes/<name>.webp

Run from the repo root:  python3 scripts/process-hero-assets.py
Requires Pillow:         pip install Pillow
"""
import os
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "public/assets/images/hero")
OUT = os.path.join(SRC, "nodes")
os.makedirs(OUT, exist_ok=True)

NAMES = {
    "1": "laptop", "2": "database", "3": "code", "4": "gear", "5": "analytics",
    "6": "cloud", "7": "server", "8": "api", "9": "phone",
}
SENTINEL = (255, 0, 255)  # magenta marker for background
MAXW = 1000

for num, name in NAMES.items():
    src = os.path.join(SRC, f"{num}.png")
    if not os.path.exists(src):
        print("missing", src)
        continue
    im = Image.open(src).convert("RGB")
    w, h = im.size

    # Flood-fill the edge-connected near-white background with the sentinel,
    # so interior light pixels (screen text, glows) are preserved.
    seeds = [(1, 1), (w - 2, 1), (1, h - 2), (w - 2, h - 2),
             (w // 2, 1), (w // 2, h - 2), (1, h // 2), (w - 2, h // 2)]
    for s in seeds:
        ImageDraw.floodfill(im, s, SENTINEL, thresh=40)

    px = im.load()
    alpha = Image.new("L", (w, h), 255)
    ap = alpha.load()
    for y in range(h):
        for x in range(w):
            if px[x, y] == SENTINEL:
                ap[x, y] = 0
    alpha = alpha.filter(ImageFilter.GaussianBlur(0.8))

    rgba = im.convert("RGBA")
    rp = rgba.load()
    for y in range(h):
        for x in range(w):
            if px[x, y] == SENTINEL:
                rp[x, y] = (255, 255, 255, 0)
    rgba.putalpha(alpha)

    bbox = rgba.getbbox()
    if bbox:
        pad = 12
        l, t, r, b = bbox
        rgba = rgba.crop((max(0, l - pad), max(0, t - pad),
                          min(w, r + pad), min(h, b + pad)))

    if rgba.width > MAXW:
        rgba = rgba.resize((MAXW, round(rgba.height * MAXW / rgba.width)), Image.LANCZOS)

    out = os.path.join(OUT, f"{name}.webp")
    rgba.save(out, "WEBP", quality=88, method=6)
    print(f"{name}: {rgba.size} -> {out} ({os.path.getsize(out) // 1024} KB)")

print("done")
