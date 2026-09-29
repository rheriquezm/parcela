#!/usr/bin/env bash
# Levanta (o actualiza) el sitio de Parcela Don Misa en Docker.
# Uso:  ./servir.sh
# Luego abre:  http://localhost:8090

set -e
cd "$(dirname "$0")"

NOMBRE="parcela-web"
IMAGEN="parcela-don-misa:latest"
PUERTO="8090"

echo "→ Construyendo la imagen…"
docker build -t "$IMAGEN" .

echo "→ Recreando el contenedor…"
docker rm -f "$NOMBRE" >/dev/null 2>&1 || true
docker run -d --name "$NOMBRE" --restart unless-stopped -p "$PUERTO:80" "$IMAGEN" >/dev/null

echo
echo "✔ Listo. Abre en el navegador:  http://localhost:$PUERTO"
echo "  (Para detenerlo:  docker stop $NOMBRE)"
