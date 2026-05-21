#!/usr/bin/env python3
"""Generate professional academic-format NetProbe technical report PDF."""

from __future__ import annotations

import json
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm, mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    Image,
    NextPageTemplate,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "docs" / "report_assets"
RESULTS = ROOT / "experiments" / "results"
OUT_PDF = ROOT / "docs" / "NetProbe_Rapor.pdf"

PAGE_W, PAGE_H = A4
MARGIN_L = 2.2 * cm
MARGIN_R = 2.2 * cm
MARGIN_T = 2.0 * cm
MARGIN_B = 2.2 * cm
CONTENT_W = PAGE_W - MARGIN_L - MARGIN_R

FONT_REG = "ReportSans"
FONT_BOLD = "ReportSans-Bold"


def register_fonts() -> None:
    candidates = [
        ("/System/Library/Fonts/Supplemental/Arial.ttf", "/System/Library/Fonts/Supplemental/Arial Bold.ttf"),
        ("/Library/Fonts/Arial.ttf", "/Library/Fonts/Arial Bold.ttf"),
        ("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"),
    ]
    for reg, bold in candidates:
        if Path(reg).exists():
            pdfmetrics.registerFont(TTFont(FONT_REG, reg))
            if Path(bold).exists():
                pdfmetrics.registerFont(TTFont(FONT_BOLD, bold))
            else:
                pdfmetrics.registerFont(TTFont(FONT_BOLD, reg))
            return
    raise FileNotFoundError("Türkçe destekli TTF font bulunamadı (Arial/DejaVu).")


def load_agg(name: str) -> dict:
    path = RESULTS / f"{name}_summary.json"
    if not path.exists():
        return {}
    with open(path, encoding="utf-8") as f:
        return json.load(f).get("aggregate", {})


def make_styles() -> dict:
    base = getSampleStyleSheet()
    return {
        "cover_title": ParagraphStyle(
            "cover_title", fontName=FONT_BOLD, fontSize=26, leading=32,
            alignment=TA_CENTER, textColor=colors.HexColor("#1A5276"), spaceAfter=14,
        ),
        "cover_sub": ParagraphStyle(
            "cover_sub", fontName=FONT_REG, fontSize=13, leading=18,
            alignment=TA_CENTER, textColor=colors.HexColor("#2C3E50"), spaceAfter=8,
        ),
        "cover_meta": ParagraphStyle(
            "cover_meta", fontName=FONT_REG, fontSize=11, leading=15,
            alignment=TA_CENTER, textColor=colors.HexColor("#566573"), spaceAfter=6,
        ),
        "h1": ParagraphStyle(
            "h1", fontName=FONT_BOLD, fontSize=14, leading=18,
            textColor=colors.HexColor("#1A5276"), spaceBefore=16, spaceAfter=10,
        ),
        "h2": ParagraphStyle(
            "h2", fontName=FONT_BOLD, fontSize=11, leading=14,
            textColor=colors.HexColor("#2874A6"), spaceBefore=12, spaceAfter=6,
        ),
        "body": ParagraphStyle(
            "body", fontName=FONT_REG, fontSize=10, leading=14,
            alignment=TA_JUSTIFY, spaceAfter=8,
        ),
        "bullet": ParagraphStyle(
            "bullet", fontName=FONT_REG, fontSize=10, leading=13,
            leftIndent=14, bulletIndent=0, spaceAfter=4,
        ),
        "caption": ParagraphStyle(
            "caption", fontName=FONT_REG, fontSize=9, leading=12,
            alignment=TA_CENTER, textColor=colors.HexColor("#566573"),
            spaceBefore=4, spaceAfter=14,
        ),
        "code": ParagraphStyle(
            "code", fontName=FONT_REG, fontSize=8.5, leading=11,
            backColor=colors.HexColor("#F4F6F7"), leftIndent=8, rightIndent=8,
            spaceAfter=6,
        ),
        "toc": ParagraphStyle(
            "toc", fontName=FONT_REG, fontSize=10, leading=16, leftIndent=0, spaceAfter=2,
        ),
        "footer": ParagraphStyle(
            "footer", fontName=FONT_REG, fontSize=8, textColor=colors.HexColor("#95A5A6"),
        ),
    }


class NumberedCanvas:
    """Page footer with number."""

    def __init__(self, doc):
        self.doc = doc

    def __call__(self, canvas, doc):
        canvas.saveState()
        canvas.setFont(FONT_REG, 8)
        canvas.setFillColor(colors.HexColor("#95A5A6"))
        if doc.page == 1:
            pass
        else:
            canvas.drawString(MARGIN_L, 1.2 * cm, "NetProbe — Bilgisayar Ağları Dönem Projesi")
            canvas.drawRightString(PAGE_W - MARGIN_R, 1.2 * cm, f"Sayfa {doc.page}")
            canvas.setStrokeColor(colors.HexColor("#D5D8DC"))
            canvas.setLineWidth(0.5)
            canvas.line(MARGIN_L, 1.55 * cm, PAGE_W - MARGIN_R, 1.55 * cm)
        canvas.restoreState()


def cover_page(styles: dict) -> list:
    story = []
    story.append(Spacer(1, 5.5 * cm))
    story.append(Paragraph("NetProbe", styles["cover_title"]))
    story.append(Spacer(1, 0.4 * cm))
    story.append(Paragraph(
        "UDP Tabanlı Güvenilir Dosya Aktarımı,<br/>"
        "Trafik İzleme ve Ağ Performans Analiz Platformu",
        styles["cover_sub"],
    ))
    story.append(Spacer(1, 2.5 * cm))
    story.append(Paragraph("Bursa Teknik Üniversitesi", styles["cover_meta"]))
    story.append(Paragraph("Bilgisayar Mühendisliği Bölümü", styles["cover_meta"]))
    story.append(Paragraph("Bilgisayar Ağları Dersi — Dönem Projesi", styles["cover_meta"]))
    story.append(Spacer(1, 1.5 * cm))
    story.append(Paragraph("Teknik Rapor", styles["cover_meta"]))
    story.append(PageBreak())
    return story


def toc_page(styles: dict) -> list:
    items = [
        "1. Giriş ve Proje Özeti",
        "2. NetProbe Nedir? Ne İşe Yarar?",
        "3. Sistem Mimarisi",
        "4. Çalışma Mantığı ve Protokol",
        "5. Kurulum ve Kullanım Kılavuzu",
        "6. Güvenilirlik Mekanizmaları",
        "7. Loglama ve Performans Metrikleri",
        "8. Deneysel Çalışma ve Sonuçlar",
        "9. Sonuç ve Değerlendirme",
        "Kaynaklar ve Ekler",
    ]
    story = [Paragraph("İçindekiler", styles["h1"]), Spacer(1, 0.5 * cm)]
    for item in items:
        story.append(Paragraph(item, styles["toc"]))
    story.append(PageBreak())
    return story


def figure(path: Path, caption: str, styles: dict, width: float | None = None, aspect: float = 0.52) -> list:
    if not path.exists():
        return []
    w = width or CONTENT_W * 0.85
    img = Image(str(path), width=w, height=w * aspect)
    img.hAlign = "CENTER"
    return [Spacer(1, 0.25 * cm), img, Paragraph(caption, styles["caption"])]


def table_block(headers: list[str], rows: list[list[str]], col_widths: list[float] | None = None) -> Table:
    data = [headers] + rows
    t = Table(data, colWidths=col_widths or [CONTENT_W * 0.2, CONTENT_W * 0.15, CONTENT_W * 0.65])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1A5276")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), FONT_BOLD),
        ("FONTNAME", (0, 1), (-1, -1), FONT_REG),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#BDC3C7")),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#F8F9F9")]),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    return t


def build_story(styles: dict) -> list:
    agg_256 = load_agg("scenario_a_chunk_256")
    agg_1024 = load_agg("scenario_a_chunk_1024")
    agg_4096 = load_agg("scenario_a_chunk_4096")
    agg_loss5 = load_agg("scenario_c_loss_5")

    ct_256 = agg_256.get("completion_time_s", {}).get("mean", 0)
    ct_1024 = agg_1024.get("completion_time_s", {}).get("mean", 0)
    ct_4096 = agg_4096.get("completion_time_s", {}).get("mean", 0)
    rr_5 = agg_loss5.get("retransmission_rate", {}).get("mean", 0)
    ct_loss5 = agg_loss5.get("completion_time_s", {}).get("mean", 0)

    s: list = []
    s += cover_page(styles)
    s += toc_page(styles)

    # 1. Giriş
    s.append(Paragraph("1. Giriş ve Proje Özeti", styles["h1"]))
    s.append(Paragraph(
        "Bu rapor, Bilgisayar Ağları dersi dönem projesi kapsamında geliştirilen <b>NetProbe</b> "
        "sisteminin tasarımını, çalışma prensibini, kullanımını ve deneysel performans sonuçlarını "
        "sunmaktadır. NetProbe, UDP protokolü üzerinde uygulama katmanında güvenilir dosya aktarımı "
        "sağlayan; trafik olaylarını kaydeden ve ağ performans metriklerini ölçen entegre bir platformdur.",
        styles["body"],
    ))
    s.append(Paragraph(
        "Projenin temel motivasyonu, TCP'nin sunduğu güvenilirlik mekanizmalarının (sıralama, onay, "
        "yeniden gönderim) UDP üzerinde sıfırdan nasıl tasarlanabileceğini uygulamalı olarak "
        "göstermektir.",
        styles["body"],
    ))

    # 2. Ne işe yarar
    s.append(Paragraph("2. NetProbe Nedir? Ne İşe Yarar?", styles["h1"]))
    s.append(Paragraph("2.1 Tanım", styles["h2"]))
    s.append(Paragraph(
        "UDP bağlantısız ve güvenilmez bir taşıma protokolüdür: paket sırası garanti edilmez, "
        "kayıp paketler otomatik yeniden iletilmez. NetProbe bu eksiklikleri uygulama katmanında "
        "sequence number, ACK, timeout, retransmission, CRC32 checksum ve SHA256 hash ile giderir.",
        styles["body"],
    ))
    s.append(Paragraph("2.2 Kullanım Alanları", styles["h2"]))
    for item in [
        "UDP ve TCP arasındaki farkları uygulamalı öğrenmek",
        "Basit bir uygulama katmanı protokolü tasarlamak",
        "Ağ trafiğini loglayarak protokol davranışını gözlemlemek",
        "Paket boyutu, timeout ve kayıp oranının performansa etkisini ölçmek",
    ]:
        s.append(Paragraph(f"• {item}", styles["bullet"]))

    # 3. Mimari
    s.append(PageBreak())
    s.append(Paragraph("3. Sistem Mimarisi", styles["h1"]))
    s.append(Paragraph(
        "Sistem dört ana bileşenden oluşur: <b>İstemci</b> (dosya gönderimi), <b>Simülatör</b> "
        "(opsiyonel kayıp/gecikme), <b>Sunucu</b> (dosya alımı ve birleştirme) ve <b>Analiz</b> "
        "(metrik ve grafik üretimi).",
        styles["body"],
    ))
    s += figure(ASSETS / "fig01_mimari.png",
                "Şekil 1. NetProbe sistem mimarisi ve bileşenler arası veri akışı", styles, CONTENT_W * 0.92)

    s.append(table_block(
        ["Bileşen", "Dosya", "Görev"],
        [
            ["İstemci", "client.py, sender.py", "Sliding window ile dosya gönderimi"],
            ["Sunucu", "server.py, receiver.py", "Selective repeat ile alım ve birleştirme"],
            ["Simülatör", "simulator.py", "UDP proxy; yapay kayıp ve gecikme"],
            ["Analiz", "logger.py, metrics.py, analyze.py", "Loglama ve performans raporu"],
        ],
        [CONTENT_W * 0.22, CONTENT_W * 0.32, CONTENT_W * 0.46],
    ))

    # 4. Çalışma mantığı
    s.append(PageBreak())
    s.append(Paragraph("4. Çalışma Mantığı ve Protokol", styles["h1"]))
    s.append(Paragraph("4.1 Aktarım Akışı", styles["h2"]))
    s += figure(ASSETS / "fig02_akis.png",
                "Şekil 2. Tipik paket alışverişi (DATA, ACK, retransmit, FIN)", styles, CONTENT_W * 0.88)

    steps = [
        ("1", "Client dosyayı chunk'lara böler ve her parçaya sequence number atar."),
        ("2", "Sliding window (varsayılan 8) ile birden fazla paket paralel gönderilir."),
        ("3", "Server her geçerli DATA için ACK döner; duplicate paketler tekrar yazılmaz."),
        ("4", "Timeout durumunda client paketi yeniden gönderir (en fazla 5 deneme)."),
        ("5", "Tüm parçalar alındığında client FIN paketi ile SHA256 hash gönderir."),
        ("6", "Server dosyayı birleştirir ve hash değerini doğrular."),
    ]
    for num, text in steps:
        s.append(Paragraph(f"<b>Adım {num}:</b> {text}", styles["body"]))

    s.append(Paragraph("4.2 Paket Türleri", styles["h2"]))
    s.append(table_block(
        ["Tür", "Kod", "Açıklama"],
        [
            ["DATA", "1", "Dosya parçası; seq, total_pkts, payload, CRC32"],
            ["ACK", "2", "Onay; ack_num"],
            ["FIN", "3", "Aktarım sonu; SHA256 hash + dosya adı"],
            ["ERR", "4", "Hata bildirimi"],
        ],
        [CONTENT_W * 0.18, CONTENT_W * 0.12, CONTENT_W * 0.70],
    ))
    s.append(Spacer(1, 0.4 * cm))

    # 5. Kullanım
    s.append(Paragraph("5. Kurulum ve Kullanım Kılavuzu", styles["h1"]))
    s.append(Paragraph("5.1 Kurulum", styles["h2"]))
    s.append(Paragraph(
        "<font name='ReportSans' size='8.5'>cd netprobe<br/>"
        "pip install -r requirements.txt<br/>"
        "export PYTHONPATH=src</font>",
        styles["code"],
    ))
    s.append(Paragraph("5.2 Kayıpsız Aktarım (localhost)", styles["h2"]))
    s.append(Paragraph(
        "<b>Terminal 1:</b> python src/server.py --port 9001 --out-dir received/<br/>"
        "<b>Terminal 2:</b> python src/client.py --port 9001 --file dosya.bin",
        styles["body"],
    ))
    s.append(Paragraph("5.3 Kayıplı Ortam (simülatör ile)", styles["h2"]))
    s.append(Paragraph(
        "Localhost gerçek paket kaybı üretmez. Bu nedenle deneylerde UDP proxy simülatörü kullanılır: "
        "istemci porta 9000'e bağlanır, simülatör paketleri %X oranında düşürerek sunucuya (9001) iletir.",
        styles["body"],
    ))
    s.append(Paragraph(
        "<b>Terminal 1:</b> python src/simulator.py --listen 9000 --forward 9001 --loss-rate 0.05<br/>"
        "<b>Terminal 2:</b> python src/server.py --port 9001<br/>"
        "<b>Terminal 3:</b> python src/client.py --port 9000 --file dosya.bin",
        styles["body"],
    ))

    s.append(table_block(
        ["Parametre", "Varsayılan", "Açıklama"],
        [
            ["CHUNK_SIZE", "1024 B", "Dosya parça boyutu"],
            ["WINDOW_SIZE", "8", "Sliding window genişliği"],
            ["TIMEOUT_MS", "1000 ms", "ACK bekleme süresi"],
            ["MAX_RETRIES", "5", "Paket başına max yeniden gönderim"],
        ],
        [CONTENT_W * 0.28, CONTENT_W * 0.22, CONTENT_W * 0.50],
    ))

    # 6. Güvenilirlik
    s.append(PageBreak())
    s.append(Paragraph("6. Güvenilirlik Mekanizmaları", styles["h1"]))
    s.append(table_block(
        ["Mekanizma", "Uygulama", "Föy Gereksinimi"],
        [
            ["Sequence number", "Her paket numaralandırılır", "Zorunlu"],
            ["ACK", "Her başarılı DATA onaylanır", "Zorunlu"],
            ["Timeout", "select() tabanlı zaman aşımı", "Zorunlu"],
            ["Retransmit", "Max 5 deneme, sonra hata", "Zorunlu"],
            ["Duplicate", "ACK tekrar, diske yazılmaz", "Zorunlu"],
            ["SHA256", "FIN ile hash doğrulama", "Zorunlu"],
            ["Sliding window", "Paralel 8 paket", "Bonus"],
        ],
        [CONTENT_W * 0.28, CONTENT_W * 0.44, CONTENT_W * 0.28],
    ))

    # 7. Metrikler
    s.append(Spacer(1, 0.5 * cm))
    s.append(Paragraph("7. Loglama ve Performans Metrikleri", styles["h1"]))
    s.append(Paragraph(
        "Tüm olaylar JSONL formatında kaydedilir: send, ack_received, timeout, retransmit, "
        "transfer_complete, error. Transfer sonunda metrics.json dosyası üretilir.",
        styles["body"],
    ))
    s.append(table_block(
        ["Metrik", "Tanım"],
        [
            ["Throughput", "file_bytes × 8 / completion_time (bps)"],
            ["Goodput", "Bu projede throughput ile aynı tanım"],
            ["Retransmission rate", "retransmit sayısı / gönderilen paket"],
            ["Packet loss rate", "timeout sayısı / gönderilen paket"],
            ["avg_rtt_ms", "Ortalama ACK gecikmesi (ms)"],
        ],
        [CONTENT_W * 0.35, CONTENT_W * 0.65],
    ))

    # 8. Deneyler
    s.append(PageBreak())
    s.append(Paragraph("8. Deneysel Çalışma ve Sonuçlar", styles["h1"]))
    s.append(Paragraph("8.1 Deney Ortamı", styles["h2"]))
    s.append(Paragraph(
        "İşletim sistemi: macOS / Linux; Python 3.11; localhost UDP. Kayıp deneyleri "
        "simulator.py proxy üzerinden yapılmıştır. Her senaryo 3 tekrarlı çalıştırılmış, "
        "tablolarda ortalama değerler verilmiştir.",
        styles["body"],
    ))

    s.append(Paragraph("8.2 Senaryo A — Paket Boyutu (512 KB, kayıpsız)", styles["h2"]))
    if (ASSETS / "fig03_senaryo_a_sure.png").exists():
        s += figure(ASSETS / "fig03_senaryo_a_sure.png",
                    "Şekil 3. Paket boyutunun tamamlanma süresine etkisi", styles, CONTENT_W * 0.78)
    if (ASSETS / "fig04_senaryo_a_throughput.png").exists():
        s += figure(ASSETS / "fig04_senaryo_a_throughput.png",
                    "Şekil 4. Paket boyutunun throughput değerine etkisi", styles, CONTENT_W * 0.78)

    s.append(Paragraph(
        f"<b>Yorum:</b> Ölçülen tamamlanma süreleri — 256 B: {ct_256:.3f} s, "
        f"1024 B: {ct_1024:.3f} s, 4096 B: {ct_4096:.3f} s. Küçük chunk daha fazla paket "
        "ürettiğinden header overhead artar ve süre uzar. Büyük chunk paket sayısını azaltarak "
        "verimi yükseltir.",
        styles["body"],
    ))

    s.append(Paragraph("8.3 Senaryo C — Kayıp Oranı (1 MB, simülatör)", styles["h2"]))
    if (ASSETS / "fig05_senaryo_c_sure.png").exists():
        s += figure(ASSETS / "fig05_senaryo_c_sure.png",
                    "Şekil 5. Kayıp oranının tamamlanma süresine etkisi", styles, CONTENT_W * 0.78)
    if (ASSETS / "fig06_senaryo_c_retrans.png").exists():
        s += figure(ASSETS / "fig06_senaryo_c_retrans.png",
                    "Şekil 6. Kayıp oranının yeniden gönderim oranına etkisi", styles, CONTENT_W * 0.78)

    s.append(Paragraph(
        f"<b>Yorum:</b> %5 kayıpta ortalama retransmission rate ≈ {rr_5:.2%}, tamamlanma süresi "
        f"≈ {ct_loss5:.1f} s. Kayıp arttıkça timeout ve retransmit artar; goodput düşer. "
        "%15 kayıpta MAX_RETRIES=5 sınırı nedeniyle aktarım başarısız olabilir — bu, "
        "protokolün sınırlarını açıkça gösteren beklenen bir sonuçtur.",
        styles["body"],
    ))

    # 9. Sonuç
    s.append(PageBreak())
    s.append(Paragraph("9. Sonuç ve Değerlendirme", styles["h1"]))
    s.append(Paragraph(
        "NetProbe, dönem projesi föyünde belirtilen UDP güvenilir aktarım, trafik izleme ve "
        "performans analizi gereksinimlerini karşılayan çalışır bir sistemdir. Temel istemci-sunucu "
        "mimarisi, ACK/timeout/retransmit mekanizmaları, loglama ve deneysel analiz altyapısı "
        "başarıyla tamamlanmıştır.",
        styles["body"],
    ))
    s.append(Paragraph(
        "Bonus kapsamında sliding window, kayıp simülatörü ve HTML dashboard eklenmiştir. "
        "Gelecek çalışmalarda TCP ile karşılaştırmalı deney ve Wireshark analizi planlanabilir.",
        styles["body"],
    ))

    s.append(Paragraph("Kaynaklar ve Ekler", styles["h1"]))
    s.append(Paragraph(
        "• Proje kaynak kodu: netprobe/src/<br/>"
        "• Protokol spesifikasyonu: docs/protocol.md<br/>"
        "• Deney konfigürasyonları: experiments/configs/<br/>"
        "• README: Kurulum ve çalıştırma adımları",
        styles["body"],
    ))

    return s


def build_pdf() -> None:
    register_fonts()
    styles = make_styles()

    doc = BaseDocTemplate(
        str(OUT_PDF),
        pagesize=A4,
        leftMargin=MARGIN_L,
        rightMargin=MARGIN_R,
        topMargin=MARGIN_T,
        bottomMargin=MARGIN_B,
        title="NetProbe Teknik Rapor",
        author="Bursa Teknik Üniversitesi",
    )

    frame = Frame(
        MARGIN_L, MARGIN_B,
        CONTENT_W, PAGE_H - MARGIN_T - MARGIN_B,
        id="normal",
    )
    doc.addPageTemplates([
        PageTemplate(id="cover", frames=frame, onPage=NumberedCanvas(doc)),
        PageTemplate(id="body", frames=frame, onPage=NumberedCanvas(doc)),
    ])

    story = build_story(styles)
    doc.build(story)
    print(f"[pdf] Rapor oluşturuldu: {OUT_PDF}")


if __name__ == "__main__":
    import subprocess
    import sys

    ASSETS.mkdir(parents=True, exist_ok=True)
    subprocess.run([sys.executable, str(ROOT / "scripts" / "generate_report_assets.py")], check=True)
    build_pdf()
