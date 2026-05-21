#!/usr/bin/env python3
"""ITN_Module_3.pdf: metinleri Türkçeleştirip aynı yerleşimde yeni PDF üretir."""
from __future__ import annotations

import json
import os
import re
import sys
import time
import fitz

try:
    from deep_translator import GoogleTranslator
except ImportError:
    print("pip install deep-translator pymupdf", file=sys.stderr)
    raise

INPUT_PDF = os.path.join(os.path.dirname(__file__), "ITN_Module_3.pdf")
OUTPUT_PDF = os.path.join(os.path.dirname(__file__), "ITN_Module_3_TR.pdf")
CACHE_JSON = os.path.join(os.path.dirname(__file__), "ITN_Module_3_translation_cache.json")
FONT = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_REF = "arialtr"  # insert_font ile UTF-8 (ğ, ş, ı, İ) için

# Sık tekrarlayan dipnotlar — API çağrısı azaltır
PREMAP = {
    "© 2019 Cisco and/or its affiliates. All rights reserved.   Cisco Confidential": (
        "© 2019 Cisco ve/veya bağlı kuruluşları. Tüm hakları saklıdır. Cisco Gizli"
    ),
    "© 2016  Cisco and/or its affiliates. All rights reserved.   Cisco Confidential": (
        "© 2016 Cisco ve/veya bağlı kuruluşları. Tüm hakları saklıdır. Cisco Gizli"
    ),
    "© 2016 Cisco and/or its affiliates. All rights reserved.   Cisco Confidential": (
        "© 2016 Cisco ve/veya bağlı kuruluşları. Tüm hakları saklıdır. Cisco Gizli"
    ),
}

DIGITS_ONLY = re.compile(r"^\d+$")
SKIP_TRANSLATE = re.compile(r"^[\d\s©®.\-:]+$")


def line_key(text: str) -> str:
    return " ".join(text.split())


def collect_unique_strings(doc: fitz.Document) -> set[str]:
    out: set[str] = set()
    for page in doc:
        for block in page.get_text("dict")["blocks"]:
            if block.get("type") != 0:
                continue
            for line in block["lines"]:
                raw = "".join(s["text"] for s in line["spans"])
                t = raw.strip()
                if not t:
                    continue
                if DIGITS_ONLY.match(t):
                    continue
                if t in PREMAP:
                    continue
                if SKIP_TRANSLATE.match(t) and len(t) < 30:
                    continue
                out.add(t)
    return out


def translate_missing(unique: set[str], cache: dict[str, str]) -> None:
    tr = GoogleTranslator(source="en", target="tr")
    pending = sorted(u for u in unique if u not in cache)
    total = len(pending)
    for i, text in enumerate(pending):
        if text in ("•", "▪", "▪ "):
            cache[text] = text
            continue
        try:
            if len(text) > 4500:
                parts = []
                for j in range(0, len(text), 4000):
                    parts.append(tr.translate(text[j : j + 4000]) or text[j : j + 4000])
                    time.sleep(0.2)
                cache[text] = "".join(parts)
            else:
                cache[text] = tr.translate(text) or text
        except Exception as e:
            print(f"[çeviri hatası] {e!r} :: {text[:80]!r}...", file=sys.stderr)
            cache[text] = text
        if (i + 1) % 20 == 0 or (i + 1) == total:
            with open(CACHE_JSON, "w", encoding="utf-8") as f:
                json.dump(cache, f, ensure_ascii=False, indent=2)
            print(f"  çeviri {i + 1}/{total}")
        time.sleep(0.12)


def resolve_tr(text: str, cache: dict[str, str]) -> str:
    t = text.strip()
    if not t:
        return t
    if DIGITS_ONLY.match(t):
        return t
    if t in PREMAP:
        return PREMAP[t]
    if t in ("•", "▪"):
        return t
    v = cache.get(t, t)
    if v is None:
        return t
    return v


def best_fontsize(rect: fitz.Rect, text: str, max_fs: float, pw: float, ph: float) -> float:
    """Geçici sayfada sığan en büyük punto."""
    lo, hi = 3.0, float(max(3, int(max_fs) + 2))
    best = 3.0
    for fs in range(int(hi), 2, -1):
        dd = fitz.open()
        pp = dd.new_page(width=pw, height=ph)
        ret = pp.insert_textbox(
            rect,
            text,
            fontname=FONT_REF,
            fontfile=FONT,
            fontsize=float(fs),
            color=(0, 0, 0),
            align=fitz.TEXT_ALIGN_LEFT,
        )
        dd.close()
        if ret >= 0:
            best = float(fs)
            break
    return best


def process_pages(doc: fitz.Document, cache: dict[str, str]) -> None:
    pw, ph = doc[0].rect.width, doc[0].rect.height
    for pi in range(len(doc)):
        page = doc[pi]
        items: list[tuple[fitz.Rect, str, str, float]] = []
        d = page.get_text("dict")
        for block in d["blocks"]:
            if block.get("type") != 0:
                continue
            for line in block["lines"]:
                spans = line["spans"]
                if not spans:
                    continue
                raw = "".join(s["text"] for s in spans)
                if not raw.strip():
                    continue
                bbox = line["bbox"]
                rect = fitz.Rect(bbox)
                rect += (-0.75, -0.75, 0.75, 0.75)
                max_fs = max(s["size"] for s in spans)
                items.append((rect, raw, resolve_tr(raw, cache), max_fs))

        for rect, _orig, _tr, _fs in items:
            page.add_redact_annot(rect)
        page.apply_redactions()

        for rect, _orig, tr_txt, max_fs in items:
            if tr_txt is None or not str(tr_txt).strip():
                continue
            fs_use = best_fontsize(rect, tr_txt, max_fs, pw, ph)
            page.insert_textbox(
                rect,
                tr_txt,
                fontname=FONT_REF,
                fontfile=FONT,
                fontsize=fs_use,
                color=(0, 0, 0),
                align=fitz.TEXT_ALIGN_LEFT,
            )
        print(f"  sayfa {pi + 1}/{len(doc)}")


def main() -> None:
    pdf_only = "--pdf-only" in sys.argv

    if not os.path.isfile(FONT):
        print(f"Font bulunamadı: {FONT}", file=sys.stderr)
        sys.exit(1)
    if not os.path.isfile(INPUT_PDF):
        print(f"Girdi yok: {INPUT_PDF}", file=sys.stderr)
        sys.exit(1)

    cache: dict[str, str] = {}
    if os.path.isfile(CACHE_JSON):
        with open(CACHE_JSON, encoding="utf-8") as f:
            cache = json.load(f)
        for k, v in list(cache.items()):
            if v is None:
                cache[k] = k

    if not pdf_only:
        doc = fitz.open(INPUT_PDF)
        unique = collect_unique_strings(doc)
        doc.close()
        print(f"Benzersiz çeviri satırı: {len(unique)}")
        translate_missing(unique, cache)
        with open(CACHE_JSON, "w", encoding="utf-8") as f:
            json.dump(cache, f, ensure_ascii=False, indent=2)
    else:
        print("Sadece PDF oluşturuluyor (önbellek kullanılıyor).")

    doc = fitz.open(INPUT_PDF)
    process_pages(doc, cache)
    doc.save(OUTPUT_PDF, garbage=4, deflate=True, clean=True)
    doc.close()
    print(f"Kaydedildi: {OUTPUT_PDF}")


if __name__ == "__main__":
    main()
