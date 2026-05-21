# Subagent D — Loglama ve Metrikler

## Ne yapıldı
- `logger.py`: JSONL olaylar (send, ack_received, timeout, retransmit, transfer_complete, error)
- `metrics.py`: throughput, goodput, packet_loss_rate, retransmission_rate, avg_rtt_ms, completion_time_s

## Nasıl yapıldı
- Her olay `{"t": unix_time, "event": ..., ...}` formatında
- Transfer sonunda `run_*_metrics.json` yazılır

## Goodput tanımı
`goodput_bps = file_bytes * 8 / completion_time_s`

## Nasıl kullanılır
Client otomatik log/metrics üretir; `--log` ve `--metrics-out` ile yol belirlenir.

## Test kanıtı
Başarılı transfer sonrası `experiments/results/run_*_metrics.json` oluşur.
