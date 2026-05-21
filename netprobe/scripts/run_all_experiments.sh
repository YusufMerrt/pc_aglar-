#!/bin/bash
set -e
cd "$(dirname "$0")/.."
export PYTHONPATH=src

CONFIGS=(
  scenario_a_chunk_256
  scenario_a_chunk_1024
  scenario_a_chunk_4096
  scenario_b_timeout_200
  scenario_b_timeout_500
  scenario_b_timeout_2000
  scenario_c_loss_0
  scenario_c_loss_5
  scenario_c_loss_15
  scenario_d_file_100k
  scenario_d_file_5m
)

for c in "${CONFIGS[@]}"; do
  echo "=== Running $c ==="
  python scripts/run_experiment.py --config "experiments/configs/${c}.json" || true
done

python src/analyze.py
echo "Done."
