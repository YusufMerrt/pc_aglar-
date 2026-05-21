# Subagent E — Simülatör ve Deneyler

## Ne yapıldı
- `simulator.py`: UDP proxy, loss-rate, delay-ms, drop-ack
- `scripts/run_experiment.py`: JSON config ile otomatik server+client(+sim)
- 12 deney config: senaryo A/B/C/D

## Nasıl kullanılır
```bash
python scripts/run_experiment.py --config experiments/configs/scenario_c_loss_5.json
```

## Senaryolar
- A: chunk 256/1024/4096
- B: timeout 200/500/2000 ms + %5 kayıp
- C: loss 0/5/15%
- D: dosya 100KB/5MB/50MB

## Test kanıtı
`experiments/results/<name>_summary.json` üretilir.
