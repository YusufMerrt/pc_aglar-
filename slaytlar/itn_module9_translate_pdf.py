#!/usr/bin/env python3
"""
ITN_Module_9.pdf: Türkçe PDF üretir.
Blok içinde alt alta / satır kaydırmalı metinleri birleştirir; tablo iki sütun ve dipnot+sayfa
numarasını ayırır.
"""
from __future__ import annotations

import json
import os
import re
import sys
import time
from statistics import median

import fitz

try:
    from deep_translator import GoogleTranslator
except ImportError:
    print("pip install deep-translator pymupdf", file=sys.stderr)
    raise

BASE = os.path.dirname(__file__)
INPUT_PDF = os.path.join(BASE, "ITN_Module_9.pdf")
OUTPUT_PDF = os.path.join(BASE, "ITN_Module_9_TR.pdf")
CACHE_JSON = os.path.join(BASE, "ITN_Module_9_translation_cache.json")
FONT = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_REF = "arialtr"

PREMAP = {
    "© 2019 Cisco and/or its affiliates. All rights reserved.   Cisco Confidential": (
        "© 2019 Cisco ve/veya bağlı kuruluşları. Tüm hakları saklıdır. Cisco Gizli"
    ),
    "© 2019, 2021  Cisco and/or its affiliates. All rights reserved.   Cisco Confidential": (
        "© 2019, 2021 Cisco ve/veya bağlı kuruluşları. Tüm hakları saklıdır. Cisco Gizli"
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
NUM_LABEL = re.compile(r"^\d+\.$")


def text_of(line: dict) -> str:
    return "".join(s["text"] for s in line["spans"])


def line_height(line: dict) -> float:
    b = line["bbox"]
    return b[3] - b[1]


def bbox_width(bbox: tuple) -> float:
    return bbox[2] - bbox[0]


def horizontal_overlap_bbox(a: tuple, b: tuple) -> float:
    x0a, y0a, x1a, y1a = a
    x0b, y0b, x1b, y1b = b
    left = max(x0a, x0b)
    right = min(x1a, x1b)
    if right <= left:
        return 0.0
    iw = right - left
    wa = x1a - x0a
    wb = x1b - x0b
    return iw / max(min(wa, wb), 1e-6)


def is_narrow_row_label(bbox: tuple, t: str) -> bool:
    """Satır etiketi: 1. 2. • — yan yana metinle birleştirilir, dipnot iki sütun sayılmaz."""
    w = bbox_width(bbox)
    ts = t.strip()
    if w < 44 and NUM_LABEL.match(ts):
        return True
    if w < 30 and ts in ("•", "▪"):
        return True
    return False


def is_side_by_side_same_row(
    pa: tuple, la: tuple, prev_text: str, next_text: str, y_tol: float = 2.8
) -> bool:
    """Aynı satırda yan yana iki sütun (dipnot + sayfa no, tablo başlıkları)."""
    if abs(pa[1] - la[1]) > y_tol:
        return False
    if is_narrow_row_label(pa, prev_text) or is_narrow_row_label(la, next_text):
        return False
    if horizontal_overlap_bbox(pa, la) >= 0.18:
        return False
    return abs(pa[0] - la[0]) > 24


def cluster_block_lines(lines: list) -> list[list]:
    """Blok içi satırları okuma sırasına göre kümelere ayır."""
    if not lines:
        return []
    sorted_lines = sorted(lines, key=lambda L: (L["bbox"][1], L["bbox"][0]))
    heights = [line_height(L) for L in sorted_lines]
    med_h = float(median(heights)) if heights else 10.0
    thr = max(12.0, 2.75 * med_h)

    clusters: list[list] = []
    cur: list = [sorted_lines[0]]

    for L in sorted_lines[1:]:
        prev = cur[-1]
        pa, la = prev["bbox"], L["bbox"]
        tp, tn = text_of(prev).strip(), text_of(L).strip()

        if is_side_by_side_same_row(pa, la, tp, tn):
            clusters.append(cur)
            cur = [L]
            continue

        gap = la[1] - pa[3]

        # Numara etiketi (1.) + sağdaki metin aynı satır
        if NUM_LABEL.match(tp) and bbox_width(pa) < 44 and abs(pa[1] - la[1]) < 5 and la[0] > pa[0]:
            cur.append(L)
            continue

        # Madde işareti + sağdaki metin aynı satır
        if tp in ("•", "▪") and gap < 10 and la[0] >= pa[0] - 15:
            cur.append(L)
            continue

        # Tablo: aynı satır, örtüşmeyen iki sütun
        if abs(pa[1] - la[1]) < 4.5 and gap < 14 and horizontal_overlap_bbox(pa, la) < 0.12 and abs(la[0] - pa[0]) > 38:
            clusters.append(cur)
            cur = [L]
            continue

        merge = False
        if gap <= thr:
            if abs(la[0] - pa[0]) < 6 or horizontal_overlap_bbox(pa, la) > 0.2:
                merge = True
            elif la[0] >= pa[0] - 3 and la[0] <= pa[0] + 100 and horizontal_overlap_bbox(pa, la) > 0.05:
                merge = True

        if merge:
            cur.append(L)
        else:
            clusters.append(cur)
            cur = [L]

    clusters.append(cur)
    return clusters


def join_cluster_text(lines: list) -> str:
    s = ""
    for L in lines:
        t = text_of(L).strip()
        if not t:
            continue
        if not s:
            s = t
        elif s.endswith("-"):
            s = s[:-1] + t
        elif s.endswith(("•", "▪")):
            s = s + " " + t
        else:
            s = s + " " + t
    return s


def union_bbox(lines: list) -> fitz.Rect:
    r = fitz.Rect(lines[0]["bbox"])
    for L in lines[1:]:
        r |= fitz.Rect(L["bbox"])
    return r


def max_fontsize(lines: list) -> float:
    m = 6.0
    for L in lines:
        for s in L["spans"]:
            m = max(m, float(s["size"]))
    return m


def collect_unique_strings(doc: fitz.Document) -> set[str]:
    out: set[str] = set()
    for page in doc:
        for block in page.get_text("dict")["blocks"]:
            if block.get("type") != 0:
                continue
            for cluster in cluster_block_lines(block["lines"]):
                raw = join_cluster_text(cluster)
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
    return t if v is None else v


def best_fontsize(rect: fitz.Rect, text: str, max_fs: float, pw: float, ph: float) -> float:
    for fs in range(int(max(3, int(max_fs) + 2)), 2, -1):
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
            return float(fs)
    return 3.0


def process_pages(doc: fitz.Document, cache: dict[str, str]) -> None:
    pw, ph = doc[0].rect.width, doc[0].rect.height
    for pi in range(len(doc)):
        page = doc[pi]
        items: list[tuple[fitz.Rect, str, str, float]] = []
        for block in page.get_text("dict")["blocks"]:
            if block.get("type") != 0:
                continue
            for cluster in cluster_block_lines(block["lines"]):
                raw = join_cluster_text(cluster)
                if not raw.strip():
                    continue
                rect = union_bbox(cluster)
                rect += (-0.75, -0.75, 0.75, 0.75)
                fs = max_fontsize(cluster)
                items.append((rect, raw, resolve_tr(raw, cache), fs))

        for rect, _o, _t, _f in items:
            page.add_redact_annot(rect)
        page.apply_redactions()

        for rect, _o, tr_txt, fs in items:
            if tr_txt is None or not str(tr_txt).strip():
                continue
            fs_use = best_fontsize(rect, tr_txt, fs, pw, ph)
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
        print(f"Benzersiz çeviri birimi (birleştirilmiş): {len(unique)}")
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
