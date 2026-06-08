#!/usr/bin/env python3
"""NetProbe kullanım kılavuzu PDF — projeyi indiren kişi için."""

from __future__ import annotations

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import cm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
OUT_PDF = ROOT / "docs" / "NetProbe_Kullanim_Kilavuzu.pdf"

PAGE_W, PAGE_H = A4
MARGIN_L = 2.2 * cm
MARGIN_R = 2.2 * cm
MARGIN_T = 2.0 * cm
MARGIN_B = 2.2 * cm
CONTENT_W = PAGE_W - MARGIN_L - MARGIN_R
FONT_REG = "KSans"
FONT_BOLD = "KSans-Bold"


def register_fonts() -> None:
    for reg, bold in [
        ("/System/Library/Fonts/Supplemental/Arial.ttf", "/System/Library/Fonts/Supplemental/Arial Bold.ttf"),
        ("/Library/Fonts/Arial.ttf", "/Library/Fonts/Arial Bold.ttf"),
    ]:
        if Path(reg).exists():
            pdfmetrics.registerFont(TTFont(FONT_REG, reg))
            pdfmetrics.registerFont(TTFont(FONT_BOLD, Path(bold) if Path(bold).exists() else reg))
            return


def styles() -> dict:
    return {
        "cover": ParagraphStyle("cover", fontName=FONT_BOLD, fontSize=22, leading=28, alignment=TA_CENTER, textColor=colors.HexColor("#1A5276")),
        "cover_sub": ParagraphStyle("cover_sub", fontName=FONT_REG, fontSize=12, leading=16, alignment=TA_CENTER, textColor=colors.HexColor("#566573")),
        "h1": ParagraphStyle("h1", fontName=FONT_BOLD, fontSize=14, leading=18, textColor=colors.HexColor("#1A5276"), spaceBefore=14, spaceAfter=8),
        "h2": ParagraphStyle("h2", fontName=FONT_BOLD, fontSize=11, leading=14, textColor=colors.HexColor("#2874A6"), spaceBefore=10, spaceAfter=6),
        "body": ParagraphStyle("body", fontName=FONT_REG, fontSize=10, leading=14, alignment=TA_JUSTIFY, spaceAfter=8),
        "cmd": ParagraphStyle("cmd", fontName=FONT_REG, fontSize=9, leading=12, backColor=colors.HexColor("#F4F6F7"), leftIndent=10, rightIndent=10, spaceAfter=6, spaceBefore=4),
        "note": ParagraphStyle("note", fontName=FONT_REG, fontSize=9, leading=12, textColor=colors.HexColor("#7F8C8D"), leftIndent=8, spaceAfter=6),
        "step": ParagraphStyle("step", fontName=FONT_REG, fontSize=10, leading=14, leftIndent=12, spaceAfter=6),
    }


def on_page(canvas, doc):
    if doc.page > 1:
        canvas.saveState()
        canvas.setFont(FONT_REG, 8)
        canvas.setFillColor(colors.HexColor("#95A5A6"))
        canvas.drawString(MARGIN_L, 1.2 * cm, "NetProbe Kullanım Kılavuzu")
        canvas.drawRightString(PAGE_W - MARGIN_R, 1.2 * cm, f"Sayfa {doc.page}")
        canvas.restoreState()


def cmd_block(st: dict, lines: str) -> list:
    return [Paragraph(f"<font name='{FONT_REG}' size='9'>{lines.replace(chr(10), '<br/>')}</font>", st["cmd"])]


def table_simple(headers, rows, st):
    data = [headers] + rows
    t = Table(data, colWidths=[CONTENT_W * 0.35, CONTENT_W * 0.65])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#2874A6")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), FONT_BOLD),
        ("FONTNAME", (0, 1), (-1, -1), FONT_REG),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#BDC3C7")),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]))
    return t


def build() -> None:
    register_fonts()
    st = styles()
    story = []

    story.append(Spacer(1, 4 * cm))
    story.append(Paragraph("NetProbe", st["cover"]))
    story.append(Spacer(1, 0.3 * cm))
    story.append(Paragraph("Kurulum ve Çalıştırma Kılavuzu", st["cover_sub"]))
    story.append(Spacer(1, 1.5 * cm))
    story.append(Paragraph("Projeyi indiren herkes için adım adım rehber", st["cover_sub"]))
    story.append(PageBreak())

    story.append(Paragraph("Bu kılavuz ne için?", st["h1"]))
    story.append(Paragraph(
        "Bu PDF, NetProbe projesini ZIP veya GitHub üzerinden indiren birinin bilgisayarında "
        "projeyi kurmasını, sunucuyu ve istemciyi çalıştırmasını ve test etmesini adım adım anlatır. "
        "Teknik rapor (NetProbe_Rapor.pdf) protokol ve deneyleri anlatır; bu dosya sadece <b>pratik kullanım</b> içindir.",
        st["body"],
    ))

    story.append(Paragraph("1. Gereksinimler", st["h1"]))
    story.append(table_simple(
        ["Gereksinim", "Açıklama"],
        [
            ["Python", "3.10 veya üzeri (python3 --version ile kontrol)"],
            ["İşletim sistemi", "Windows, macOS veya Linux"],
            ["Terminal", "macOS: Terminal, Windows: PowerShell/CMD"],
            ["İnternet", "Sadece ilk kurulumda pip paketleri için"],
        ],
        st,
    ))
    story.append(Spacer(1, 0.3 * cm))

    story.append(Paragraph("2. Projeyi açma", st["h1"]))
    story.append(Paragraph("<b>Adım 1:</b> İndirdiğiniz ZIP dosyasını bir klasöre çıkartın.", st["step"]))
    story.append(Paragraph("<b>Adım 2:</b> Terminali açın ve proje klasörüne girin:", st["step"]))
    story += cmd_block(st, "cd /path/to/netprobe\n# Örnek (Mac): cd ~/Desktop/pc_agları/netprobe")
    story.append(Paragraph(
        "<i>İpucu:</i> Klasöre Finder'da sağ tık → 'Klasörü Terminal'de Aç' (Mac) ile doğrudan gidebilirsiniz.",
        st["note"],
    ))

    story.append(Paragraph("3. Kurulum (tek seferlik)", st["h1"]))
    story.append(Paragraph("<b>Adım 3:</b> Python paketlerini yükleyin:", st["step"]))
    story += cmd_block(st, "pip install -r requirements.txt\n# veya: pip3 install -r requirements.txt")
    story.append(Paragraph("<b>Adım 4:</b> Her yeni terminal oturumunda şu değişkeni ayarlayın:", st["step"]))
    story += cmd_block(st, "export PYTHONPATH=src")
    story.append(Paragraph(
        "Windows PowerShell için: <font name='KSans' size='9'>$env:PYTHONPATH=\"src\"</font>",
        st["note"],
    ))

    story.append(PageBreak())
    story.append(Paragraph("4. En basit test — dosya gönderme", st["h1"]))
    story.append(Paragraph(
        "İki terminal penceresi açmanız gerekir. Biri <b>sunucu</b>, diğeri <b>istemci</b> olacak.",
        st["body"],
    ))

    story.append(Paragraph("4.1 Test dosyası", st["h2"]))
    story.append(Paragraph(
        "Projede hazır test dosyası vardır: <b>test_files/merhaba.txt</b>. Doğrudan kullanabilirsiniz. "
        "Kendi dosyanızı denemek için önce klasörü oluşturun (yoksa 'no such file or directory' hatası alırsınız):",
        st["body"],
    ))
    story += cmd_block(st, "# Hazır dosya (önerilen):\n# test_files/merhaba.txt\n\n# Kendi dosyanız için:\nmkdir -p test_files\necho 'Merhaba NetProbe' > test_files/merhaba.txt")

    story.append(Paragraph("4.2 Terminal 1 — Sunucuyu başlat", st["h2"]))
    story += cmd_block(st, "cd netprobe          # proje klasörüne gir\nexport PYTHONPATH=src\npython src/server.py --port 9001 --out-dir received/")
    story.append(Paragraph(
        "Şunu görmelisiniz: <i>[server] Listening on UDP port 9001...</i> — Sunucu çalışıyor demektir. Bu terminali kapatmayın.",
        st["note"],
    ))

    story.append(Paragraph("4.3 Terminal 2 — Dosyayı gönder", st["h2"]))
    story += cmd_block(st, "cd netprobe\nexport PYTHONPATH=src\npython src/client.py --host 127.0.0.1 --port 9001 --file test_files/merhaba.txt")
    story.append(Paragraph(
        "Başarılı ise: <i>Transfer complete</i> yazar. Sunucu terminalinde: <i>File saved: received/merhaba.txt</i>",
        st["note"],
    ))
    story.append(Paragraph("<b>Adım 5:</b> Dosyanın geldiğini kontrol edin:", st["step"]))
    story += cmd_block(st, "cat received/merhaba.txt\n# veya received/ klasörünü Finder'da açın")

    story.append(PageBreak())
    story.append(Paragraph("5. Kayıplı ağ testi (simülatör)", st["h1"]))
    story.append(Paragraph(
        "Gerçek localhost'ta paket kaybı olmaz. Kayıp denemek için <b>3 terminal</b> gerekir:",
        st["body"],
    ))
    story.append(Paragraph("Terminal 1 — Simülatör (%5 kayıp):", st["h2"]))
    story += cmd_block(st, "export PYTHONPATH=src\npython src/simulator.py --listen 9000 --forward 9001 --loss-rate 0.05")
    story.append(Paragraph("Terminal 2 — Sunucu:", st["h2"]))
    story += cmd_block(st, "export PYTHONPATH=src\npython src/server.py --port 9001")
    story.append(Paragraph("Terminal 3 — İstemci (simülatöre bağlanır, port 9000):", st["h2"]))
    story += cmd_block(st, "export PYTHONPATH=src\npython src/client.py --port 9000 --file test_files/merhaba.txt")

    story.append(Paragraph("6. Otomatik test (smoke test)", st["h1"]))
    story += cmd_block(st, "export PYTHONPATH=src\npython scripts/smoke_test.py")
    story.append(Paragraph(
        "Her şey doğruysa: <i>All tests passed.</i> — Kurulum ve aktarım çalışıyor.",
        st["note"],
    ))

    story.append(Paragraph("7. Deney ve rapor üretme", st["h1"]))
    story.append(Paragraph("7.1 Tek deney çalıştırma", st["h2"]))
    story += cmd_block(st,
        "export PYTHONPATH=src\n"
        "python scripts/run_experiment.py \\\n"
        "  --config experiments/configs/scenario_a_chunk_1024.json\n"
        "# Sonuç: experiments/results/scenario_a_chunk_1024_summary.json"
    )
    story.append(Paragraph("7.2 Grafik üretme", st["h2"]))
    story += cmd_block(st, "python src/analyze.py\n# Çıktı: experiments/results/charts/*.png")
    story.append(Paragraph("7.3 Teknik rapor PDF (grafikli, deney yorumlu)", st["h2"]))
    story += cmd_block(st, "python scripts/generate_report_pdf.py\n# Çıktı: docs/NetProbe_Rapor.pdf")
    story.append(Paragraph("7.4 Bu kılavuzu yeniden üretme", st["h2"]))
    story += cmd_block(st, "python scripts/generate_kullanim_pdf.py\n# Çıktı: docs/NetProbe_Kullanim_Kilavuzu.pdf")
    story.append(Paragraph("7.5 Hazır deney listesi", st["h2"]))
    story.append(table_simple(
        ["Config dosyası", "Ne test eder?"],
        [
            ["scenario_a_chunk_256.json", "Paket boyutu 256 B"],
            ["scenario_a_chunk_1024.json", "Paket boyutu 1024 B"],
            ["scenario_b_timeout_500.json", "Timeout 500 ms, %5 kayıp"],
            ["scenario_c_loss_5.json", "%5 paket kaybı"],
            ["scenario_d_file_5m.json", "5 MB dosya"],
        ],
        st,
    ))

    story.append(PageBreak())
    story.append(Paragraph("8. İstemci parametreleri", st["h1"]))
    story.append(table_simple(
        ["Parametre", "Örnek", "Açıklama"],
        [
            ["--file", "test_files/merhaba.txt", "Gönderilecek dosya (zorunlu)"],
            ["--port", "9001", "Hedef UDP portu"],
            ["--host", "127.0.0.1", "Sunucu adresi"],
            ["--chunk-size", "1024", "Parça boyutu (byte)"],
            ["--timeout", "1000", "ACK bekleme (ms)"],
            ["--window", "8", "Sliding window boyutu"],
        ],
        st,
    ))

    story.append(PageBreak())
    story.append(Paragraph("9. Sık karşılaşılan sorunlar", st["h1"]))
    story.append(table_simple(
        ["Sorun", "Çözüm"],
        [
            ["ModuleNotFoundError: protocol", "export PYTHONPATH=src komutunu çalıştırın"],
            ["Address already in use", "Başka bir sunucu aynı portu kullanıyor; kapatın veya --port 9011 deneyin"],
            ["File not found", "--file yolunun doğru olduğundan emin olun"],
            ["Transfer FAILED", "Sunucunun çalıştığını kontrol edin; kayıplı testte simülatörü de başlatın"],
            ["pip bulunamadı", "python3 -m pip install -r requirements.txt deneyin"],
        ],
        st,
    ))

    story.append(Spacer(1, 0.5 * cm))
    story.append(Paragraph("10. Dokümantasyon dosyaları", st["h1"]))
    story.append(table_simple(
        ["Dosya", "İçerik"],
        [
            ["docs/NetProbe_Kullanim_Kilavuzu.pdf", "Bu kılavuz — kurulum ve çalıştırma"],
            ["docs/NetProbe_Rapor.pdf", "Teknik rapor — protokol, deneyler, grafik açıklamaları"],
            ["README.md", "Hızlı başvuru (GitHub için)"],
        ],
        st,
    ))

    story.append(Paragraph("11. Klasör yapısı (özet)", st["h1"]))
    story += cmd_block(st,
        "netprobe/\n"
        "  src/          → Ana programlar (client, server, ...)\n"
        "  scripts/      → smoke_test, deney, PDF üretimi\n"
        "  test_files/   → Hazır test dosyası (merhaba.txt)\n"
        "  received/     → Sunucunun kaydettiği dosyalar\n"
        "  experiments/  → Deney config ve sonuçlar\n"
        "  docs/         → PDF raporlar"
    )

    story.append(Paragraph("12. Sunum / demo kontrol listesi", st["h1"]))
    for item in [
        "Terminal 1: sunucu — Listening on UDP port 9001",
        "Terminal 2: client — Transfer complete",
        "cat received/merhaba.txt → Merhaba NetProbe",
        "İsteğe bağlı: python scripts/smoke_test.py → All tests passed",
        "Sunumda göster: docs/NetProbe_Rapor.pdf",
    ]:
        story.append(Paragraph(f"• {item}", st["step"]))

    story.append(Paragraph("13. Hızlı komut özeti", st["h1"]))
    story.append(Paragraph(
        "<b>Sunucu:</b> python src/server.py --port 9001 --out-dir received/<br/>"
        "<b>İstemci:</b> python src/client.py --port 9001 --file test_files/merhaba.txt<br/>"
        "<b>Test:</b> python scripts/smoke_test.py<br/>"
        "<b>Rapor PDF:</b> python scripts/generate_report_pdf.py",
        st["body"],
    ))

    doc = BaseDocTemplate(
        str(OUT_PDF), pagesize=A4,
        leftMargin=MARGIN_L, rightMargin=MARGIN_R,
        topMargin=MARGIN_T, bottomMargin=MARGIN_B,
    )
    frame = Frame(MARGIN_L, MARGIN_B, CONTENT_W, PAGE_H - MARGIN_T - MARGIN_B, id="f")
    doc.addPageTemplates([PageTemplate(id="main", frames=frame, onPage=on_page)])
    doc.build(story)
    print(f"[kılavuz] Oluşturuldu: {OUT_PDF}")


if __name__ == "__main__":
    build()
