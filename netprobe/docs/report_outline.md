# NetProbe Teknik Rapor İskeleti (8–12 sayfa)

## 1. Giriş
- UDP vs TCP; neden uygulama katmanında güvenilirlik
- Proje amacı ve kapsam

## 2. Problem Tanımı
- UDP’nin güvenilir olmaması
- Dosya aktarımı, loglama, performans ölçümü gereksinimleri

## 3. Sistem Mimarisi
- Client, server, simulator, analyze bileşenleri
- Mimari diyagram (README veya draw.io)

## 4. Protokol Tasarımı
- Paket formatları (`docs/protocol.md`)
- Sequence, ACK, FIN (hash + dosya adı), ERR

## 5. Güvenilirlik Mekanizmaları
- Sliding window, selective repeat
- Timeout, max 5 retransmit, duplicate handling
- SHA256 bütünlük kontrolü

## 6. Gerçekleme Detayları
- Modüller: protocol, sender, receiver, logger, metrics
- Dil: Python 3, socket, struct, zlib

## 7. Deney Ortamı
- OS, Python sürümü, localhost / simülatör
- Metrik tanımları:
  - **Goodput:** `file_bytes * 8 / completion_time_s`
  - **Throughput:** aynı (bu projede)
  - **Retransmission rate:** retransmit / send

## 8. Sonuçlar ve Tartışma

### Senaryo A — Paket boyutu
- Grafik: `completion_time_s`, `throughput_bps`
- Yorum: Küçük chunk → daha fazla paket → overhead artışı

### Senaryo B — Timeout
- Grafik: retransmission_rate, completion_time_s
- Yorum: Kısa timeout → gereksiz retransmit; uzun timeout → yavaş recovery

### Senaryo C — Kayıp oranı
- Grafik: goodput, retransmission_rate
- Yorum: Kayıp ↑ → retransmit ↑ → goodput ↓

### Senaryo D — Dosya boyutu
- Grafik: completion_time_s
- Yorum: Büyük dosya → daha uzun aktarım; verimlilik eğilimi

## 9. Karşılaşılan Sorunlar ve Çözümler
- localhost kayıpsızlığı → simülatör
- Duplicate paketler → ACK tekrar, yazma yok

## 10. Sonuç ve Gelecek İş
- TCP karşılaştırması, Wireshark, çoklu istemci

## Görev dağılımı (solo)
Tüm modüller tek geliştirici tarafından yazıldı; Cursor subagent’lar geliştirme yardımı olarak kullanıldı.
