#!/usr/bin/env python3
"""Grup08_NetProbe.zip teslim paketi oluşturur (sadece proje + rapor)."""

from __future__ import annotations

import shutil
import subprocess
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPO = ROOT.parent
PKG_NAME = "Grup08_NetProbe"
PKG_DIR = REPO / PKG_NAME
ZIP_PATH = REPO / f"{PKG_NAME}.zip"
GITHUB_URL = "https://github.com/YusufMerrt/pc_aglar-"

# Teslim paketine dahil edilecek göreli yollar (netprobe kökünden)
INCLUDE_PATHS = [
    "src",
    "tests",
    "test_files",
    "viz",
    "experiments/configs",
    "requirements.txt",
    "README.md",
    "docs/NetProbe_Rapor.pdf",
    "docs/NetProbe_Kullanim_Kilavuzu.pdf",
    "docs/protocol.md",
]

# Çalıştırma scriptleri — PDF/grafik üretim kodları dahil değil
INCLUDE_SCRIPTS = [
    "run_experiment.py",
    "smoke_test.py",
    "run_all_experiments.sh",
]

EXCLUDE_NAMES = {
    "__pycache__",
    ".DS_Store",
    ".git",
    ".env",
    "received",
    "received_smoke",
}


def should_skip(path: Path) -> bool:
    return any(part in EXCLUDE_NAMES for part in path.parts)


def copy_tree(src: Path, dst: Path) -> None:
    if not src.exists():
        return
    if src.is_file():
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dst)
        return
    for item in src.rglob("*"):
        if should_skip(item.relative_to(src)):
            continue
        rel = item.relative_to(src)
        target = dst / rel
        if item.is_dir():
            target.mkdir(parents=True, exist_ok=True)
        else:
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(item, target)


def write_github_txt() -> None:
    (PKG_DIR / "GITHUB.txt").write_text(
        f"NetProbe — Grup 08\n"
        f"Bursa Teknik Üniversitesi — Bilgisayar Ağları Dönem Projesi\n\n"
        f"GitHub Depo:\n{GITHUB_URL}\n\n"
        f"Proje ekibi:\n"
        f"  - Yusuf Mert Özkul\n"
        f"  - Nermin Baycan\n"
        f"  - Fatma Nur Yazıcı\n",
        encoding="utf-8",
    )


def make_zip() -> None:
    if ZIP_PATH.exists():
        ZIP_PATH.unlink()
    with zipfile.ZipFile(ZIP_PATH, "w", zipfile.ZIP_DEFLATED) as zf:
        for path in sorted(PKG_DIR.rglob("*")):
            if path.is_file():
                arcname = Path(PKG_NAME) / path.relative_to(PKG_DIR)
                zf.write(path, arcname)


def build() -> None:
    print("[teslim] PDF rapor güncelleniyor...")
    subprocess.run([sys.executable, str(ROOT / "scripts" / "generate_report_pdf.py")], check=True)

    if PKG_DIR.exists():
        shutil.rmtree(PKG_DIR)
    PKG_DIR.mkdir(parents=True)

    for rel in INCLUDE_PATHS:
        src = ROOT / rel
        dst = PKG_DIR / rel
        if src.is_dir():
            copy_tree(src, dst)
        elif src.exists():
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dst)
        else:
            print(f"[teslim] UYARI: eksik — {rel}")

    scripts_dst = PKG_DIR / "scripts"
    scripts_dst.mkdir(parents=True, exist_ok=True)
    for name in INCLUDE_SCRIPTS:
        src = ROOT / "scripts" / name
        if src.exists():
            shutil.copy2(src, scripts_dst / name)
        else:
            print(f"[teslim] UYARI: eksik script — {name}")

    write_github_txt()
    make_zip()

    n_files = sum(1 for p in PKG_DIR.rglob("*") if p.is_file())
    size_mb = ZIP_PATH.stat().st_size / (1024 * 1024)
    print(f"[teslim] {n_files} dosya → {PKG_DIR}")
    print(f"[teslim] Zip: {ZIP_PATH} ({size_mb:.1f} MB)")


if __name__ == "__main__":
    build()
