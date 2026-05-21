# NetProbe

UDP üzerinde güvenilir dosya aktarımı, trafik izleme ve ağ performans analiz platformu.

Bursa Teknik Üniversitesi — Bilgisayar Ağları Dönem Projesi

## Özellikler

- Uygulama katmanı protokolü (DATA, ACK, FIN, ERR)
- Sliding window gönderici + Selective Repeat alıcı
- CRC32 checksum, SHA256 bütünlük doğrulama
- JSONL olay loglama ve performans metrikleri
- UDP kayıp/gecikme simülatörü
- Otomatik deney scriptleri ve grafik üretimi

## Kurulum

```bash
cd netprobe
pip install -r requirements.txt
```

## Hızlı başlangıç (kayıpsız)

**Terminal 1 — Sunucu:**
```bash
export PYTHONPATH=src
python src/server.py --port 9001 --out-dir received/
```

**Terminal 2 — İstemci:**
```bash
export PYTHONPATH=src
python src/client.py --host 127.0.0.1 --port 9001 --file /path/to/dosya.bin
```

## Simülatör ile (% kayıp)

**Terminal 1 — Simülatör:**
```bash
python src/simulator.py --listen 9000 --forward 9001 --loss-rate 0.05
```

**Terminal 2 — Sunucu:**
```bash
python src/server.py --port 9001
```

**Terminal 3 — İstemci (proxy portuna bağlan):**
```bash
python src/client.py --port 9000 --file /path/to/dosya.bin
```

## Deney çalıştırma

```bash
python scripts/run_experiment.py --config experiments/configs/scenario_a_chunk_1024.json
python src/analyze.py
```

## Proje yapısı

```
src/           — protocol, client, server, logger, metrics, simulator, analyze
scripts/       — run_experiment.py
experiments/   — configs ve results
docs/          — protocol.md, report_outline.md, subagent_reports/
viz/           — HTML dashboard
tests/         — protocol unit tests
```

## Varsayılan parametreler

| Parametre | Değer |
|-----------|-------|
| MAX_RETRIES | 5 |
| WINDOW_SIZE | 8 |
| CHUNK_SIZE | 1024 |
| TIMEOUT_MS | 1000 |

## Testler

```bash
export PYTHONPATH=src
python -m pytest tests/test_protocol.py -v
```

## Teknik rapor

- **PDF (tam rapor):** `docs/NetProbe_Rapor.pdf` — ne işe yarar, nasıl kullanılır, çalışma mantığı, grafikler
- **Markdown:** `docs/NetProbe_Teknik_Rapor.md`
- PDF oluşturma: `python scripts/generate_report_pdf.py`
- Deney grafikleri: `experiments/results/charts/` ve `docs/report_assets/`

## GitHub

Depoyu oluşturduktan sonra README içine repo bağlantınızı ekleyin.
