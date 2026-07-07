#!/usr/bin/env bash
# Publica la última versión del sitio en la VPS.
# Uso: VPS_HOST=usuario@ip [VPS_DIR=~/ufpcombat] ./deploy.sh
set -euo pipefail

if [[ -z "${VPS_HOST:-}" ]]; then
  echo "Define VPS_HOST, ej: VPS_HOST=root@203.0.113.10 ./deploy.sh" >&2
  exit 1
fi

VPS_DIR="${VPS_DIR:-~/ufpcombat}"

ssh "$VPS_HOST" "cd $VPS_DIR && git pull --ff-only && docker compose up -d --build && docker image prune -f"
echo "✓ Desplegado — verifica https://ufpcombat.com"
