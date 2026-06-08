# NetProbe — Grup 08

**UDP Tabanlı Güvenilir Dosya Aktarımı, Trafik İzleme ve Ağ Performans Analiz Platformu**

| | |
|---|---|
| **Üniversite** | Bursa Teknik Üniversitesi |
| **Bölüm** | Bilgisayar Mühendisliği |
| **Ders** | Bilgisayar Ağları — Dönem Projesi |
| **Grup** | Grup 08 |
| **Proje** | NetProbe |
| **GitHub** | https://github.com/YusufMerrt/pc_aglar- |

### Proje Ekibi

- Yusuf Mert Özkul
- Nermin Baycan
- Fatma Nur Yazıcı

> ⚠️ **Sunum notu:** Tüm grup üyelerinin sunuma katılması zorunludur. Mazeretsiz devamsızlık durumunda ilgili üye sunum notu alamayacaktır.

---

## Teslim Paketi

| Dosya / Klasör | Açıklama |
|----------------|----------|
| `netprobe/` | Proje kaynak kodu ve scriptler |
| `netprobe/docs/NetProbe_Rapor.pdf` | Teknik rapor (PDF) |
| `netprobe/docs/NetProbe_Kullanim_Kilavuzu.pdf` | Kurulum ve çalıştırma kılavuzu |
| `GITHUB.txt` | Depo bağlantısı (zip kökünde) |
| **`Grup08_NetProbe.zip`** | Öğretim elemanına teslim arşivi |
| **`Grup08_NetProbe/`** | Zip içeriğinin ayrılmış klasör kopyası |

Zip oluşturmak için:

```bash
cd netprobe
python scripts/package_delivery.py
```

Çıktı: `Grup08_NetProbe/` klasörü + `Grup08_NetProbe.zip`

---

## 1. NetProbe Nedir?

**NetProbe**, UDP (User Datagram Protocol) üzerinde çalışan; TCP'nin sağladığı **güvenilirlik, sıralama ve hata kontrolü** mekanizmalarını **uygulama katmanında** tasarlayan bir dosya aktarım ve ağ analiz platformudur.

UDP doğası gereği bağlantı kurmaz, paket sırası garanti etmez ve kayıp paketi otomatik yeniden göndermez. NetProbe bu eksiklikleri **sequence number, ACK, timeout, retransmission, CRC32 checksum ve SHA256 hash** ile giderir.

### Özellikler

- Uygulama katmanı protokolü (DATA, ACK, FIN, ERR)
- Sliding window gönderici + Selective Repeat alıcı
- JSONL olay loglama ve performans metrikleri
- UDP kayıp/gecikme simülatörü
- Otomatik deney scriptleri, grafik ve PDF rapor üretimi

---

## 2. Sistem Mimarisi

```
┌─────────────┐     UDP       ┌──────────────┐     UDP       ┌─────────────┐
│   CLIENT    │ ────────────► │  SIMULATOR   │ ────────────► │   SERVER    │
│ client.py   │               │ (opsiyonel)  │               │ server.py   │
│ sender.py   │ ◄──────────── │ simulator.py │ ◄──────────── │ receiver.py │
└──────┬──────┘     ACK       └──────────────┘     ACK       └──────┬──────┘
       │                                                            │
       ▼                                                            ▼
  logger.py / metrics.py                                     received/ dosya
       │
       ▼
  analyze.py → grafikler + PDF
```

| Bileşen | Dosya | Görev |
|---------|-------|-------|
| İstemci | `client.py`, `sender.py` | Sliding window ile dosya gönderimi |
| Sunucu | `server.py`, `receiver.py` | Selective repeat ile alım ve birleştirme |
| Simülatör | `simulator.py` | UDP proxy; yapay kayıp ve gecikme |
| Analiz | `logger.py`, `metrics.py`, `analyze.py` | Loglama ve performans raporu |

---

## 3. Kurulum ve Hızlı Başlangıç

```bash
cd netprobe
pip install -r requirements.txt
export PYTHONPATH=src
```

**Terminal 1 — Sunucu:**
```bash
python src/server.py --port 9001 --out-dir received/
```

**Terminal 2 — İstemci:**
```bash
python src/client.py --host 127.0.0.1 --port 9001 --file test_files/merhaba.txt
```

Başarılı aktarımda istemci `Transfer complete`, sunucu `File saved: received/merhaba.txt` yazar.

### Kayıplı ağ testi (3 terminal)

Localhost gerçek paket kaybı üretmez; deneylerde simülatör kullanılır:

```bash
# T1: Simülatör (%5 kayıp)
python src/simulator.py --listen 9000 --forward 9001 --loss-rate 0.05
# T2: Sunucu
python src/server.py --port 9001
# T3: İstemci (proxy portu 9000)
python src/client.py --port 9000 --file test_files/merhaba.txt
```

---

## 4. Protokol ve Güvenilirlik

### Paket türleri

| Tür | Kod | Açıklama |
|-----|-----|----------|
| DATA | 1 | Dosya parçası; seq, total_pkts, payload, CRC32 |
| ACK | 2 | Onay; ack_num |
| FIN | 3 | Aktarım sonu; SHA256 hash + dosya adı |
| ERR | 4 | Hata bildirimi |

### Güvenilirlik mekanizmaları

| Mekanizma | Uygulama |
|-----------|----------|
| Sequence number | Her paket numaralandırılır |
| ACK | Her başarılı DATA onaylanır |
| Timeout | select() tabanlı zaman aşımı |
| Retransmit | Max 5 deneme |
| Duplicate | ACK tekrar, diske yazılmaz |
| SHA256 | FIN ile hash doğrulama |
| Sliding window | Paralel 8 paket (bonus) |

Detaylı protokol: [`netprobe/docs/protocol.md`](netprobe/docs/protocol.md)

---

## 5. Deneyler ve Sonuçlar

**11 senaryo × 3 tekrar** çalıştırıldı. Özet tablo ve 10 grafik teknik raporda yer alır.

| Senaryo | Değişken | Amaç |
|---------|----------|------|
| A | chunk: 256 / 1024 / 4096 B | Header overhead etkisi |
| B | timeout: 200 / 500 / 2000 ms | Gereksiz retransmit vs gecikme |
| C | kayıp: %0 / %5 / %15 | Kayıp toleransı ve goodput |
| D | dosya: 100 KB / 5 MB | Ölçeklenebilirlik |

```bash
python scripts/run_experiment.py --config experiments/configs/scenario_a_chunk_1024.json
python src/analyze.py
python scripts/generate_report_pdf.py   # docs/NetProbe_Rapor.pdf
python scripts/smoke_test.py            # otomatik doğrulama
```

---

## 6. Proje Yapısı

```
netprobe/
├── src/              # protocol, client, server, logger, metrics, simulator, analyze
├── scripts/          # deney, PDF üretimi, teslim paketi
├── experiments/      # config dosyaları ve özet sonuçlar
├── docs/             # NetProbe_Rapor.pdf, kılavuz, grafikler
├── tests/            # protokol unit testleri
├── test_files/       # hazır test dosyası
└── viz/              # HTML dashboard (bonus)
```

---

## 7. Dokümantasyon

| Dosya | İçerik |
|-------|--------|
| **`netprobe/docs/NetProbe_Rapor.pdf`** | Teknik rapor — protokol, deneyler, grafik yorumları |
| **`netprobe/docs/NetProbe_Kullanim_Kilavuzu.pdf`** | Adım adım kurulum ve çalıştırma |
| `netprobe/docs/NetProbe_Teknik_Rapor.md` | Raporun Markdown özeti |
| `netprobe/README.md` | Proje klasörü hızlı başvuru |

---

## 8. Sonuç

NetProbe, dönem projesi föyünde belirtilen UDP güvenilir aktarım, trafik izleme ve performans analizi gereksinimlerini karşılayan çalışır bir sistemdir. Bonus kapsamında sliding window, kayıp simülatörü ve HTML dashboard eklenmiştir.

---

*Bursa Teknik Üniversitesi — Bilgisayar Ağları Dönem Projesi — Grup 08 — NetProbe*
