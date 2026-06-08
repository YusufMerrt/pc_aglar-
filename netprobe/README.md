# NetProbe — Grup 08

UDP üzerinde güvenilir dosya aktarımı, trafik izleme ve ağ performans analiz platformu.

| | |
|---|---|
| **Üniversite** | Bursa Teknik Üniversitesi |
| **Ders** | Bilgisayar Ağları — Dönem Projesi |
| **Grup** | Grup 08 |
| **GitHub** | https://github.com/YusufMerrt/pc_aglar- |

**Proje ekibi:** Yusuf Mert Özkul, Nermin Baycan, Fatma Nur Yazıcı

> Depo kökündeki [`README.md`](../README.md) dosyası tam proje dokümantasyonunu içerir — GitHub'a girince önce onu okuyun.

---

## Hızlı başlangıç

```bash
pip install -r requirements.txt
export PYTHONPATH=src

# Terminal 1
python src/server.py --port 9001 --out-dir received/

# Terminal 2
python src/client.py --port 9001 --file test_files/merhaba.txt
```

## Teslim zip'i oluşturma

```bash
python scripts/package_delivery.py
# → ../Grup08_NetProbe/  ve  ../Grup08_NetProbe.zip
```

## Dokümantasyon

| Dosya | Açıklama |
|-------|----------|
| **`docs/NetProbe_Rapor.pdf`** | Teknik rapor (teslim zorunlu) |
| **`docs/NetProbe_Kullanim_Kilavuzu.pdf`** | Kurulum kılavuzu |
| `docs/protocol.md` | Protokol detayı |

## Test

```bash
export PYTHONPATH=src
python scripts/smoke_test.py
python -m pytest tests/test_protocol.py -v
```
