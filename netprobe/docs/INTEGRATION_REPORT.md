# NetProbe — Entegrasyon ve Kullanım Raporu

## Genel Bakış

NetProbe, UDP üzerinde uygulama katmanı güvenilirlik sağlayan bir dosya aktarım sistemidir. Proje 6 modül halinde geliştirilmiş ve entegre edilmiştir.

## Ne Yapıldı

| Modül | Dosya | Görev |
|-------|-------|-------|
| A | protocol.py, config.py | Paket formatı, CRC32, varsayılanlar |
| B | server.py, receiver.py | Selective Repeat alıcı, dosya birleştirme |
| C | client.py, sender.py | Sliding window gönderici |
| D | logger.py, metrics.py | JSONL log, performans metrikleri |
| E | simulator.py, run_experiment.py | Kayıp simülasyonu, 12 deney config |
| F | analyze.py, README, viz | Grafik, dokümantasyon, dashboard |

## Nasıl Yapıldı

1. **Protokol:** 16 byte DATA/FIN header + payload; 9 byte ACK; CRC32 bütünlük
2. **Güvenilirlik:** Sliding window (8), max 5 retransmit, duplicate ACK-without-write
3. **Bütünlük:** SHA256 hash FIN paketinde; server karşılaştırır
4. **Deneyler:** JSON config → subprocess ile server/client/sim → summary JSON
5. **Analiz:** summary dosyalarından matplotlib grafikleri

## Nasıl Kullanılır

### 1. Kurulum
```bash
cd netprobe
pip install -r requirements.txt
export PYTHONPATH=src
```

### 2. Manuel transfer
```bash
# Terminal 1
python src/server.py --port 9001

# Terminal 2
python src/client.py --port 9001 --file dosya.bin
```

### 3. Smoke test
```bash
python scripts/smoke_test.py
```

### 4. Deney + analiz
```bash
python scripts/run_experiment.py --config experiments/configs/scenario_a_chunk_1024.json
python src/analyze.py
```

### 5. Dashboard
`viz/dashboard.html` dosyasını tarayıcıda açın; `experiments/results/*_summary.json` yükleyin.

## Teslim Paketi

Zip içeriği:
- `netprobe/` kaynak kod
- `docs/INTEGRATION_REPORT.md` (bu dosya)
- `docs/subagent_reports/` modül raporları
- `docs/report_outline.md` → PDF rapor iskeleti
- Örnek loglar: `experiments/results/` (deney çalıştırıldıktan sonra)

## Demo Senaryosu (Sunum)

1. Kayıpsız 1 MB dosya aktarımı — hash OK mesajı
2. Simülatör %10 kayıp — retransmit logları
3. `analyze.py` grafik gösterimi
4. Protokol diyagramı (`docs/protocol.md`)

## Subagent Raporları

- [agent_a.md](subagent_reports/agent_a.md) — Protokol
- [agent_b.md](subagent_reports/agent_b.md) — Sunucu
- [agent_c.md](subagent_reports/agent_c.md) — İstemci
- [agent_d.md](subagent_reports/agent_d.md) — Log/Metrik
- [agent_e.md](subagent_reports/agent_e.md) — Simülatör/Deney
- [agent_f.md](subagent_reports/agent_f.md) — Analiz/Docs
