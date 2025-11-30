#!/bin/sh
# File: ./init-minio/create-buckets.sh

set -euo pipefail

echo "Waiting for MinIO server to become ready..."

# This is the only line you really need – it waits AND creates the alias
until mc alias set minio http://minio:9000 minioadmin minioadmin >/dev/null 2>&1; do
  printf "."
  sleep 2
done

echo
echo "MinIO is ready – creating buckets"

# Now "local" alias exists → everything works
mc mb --ignore-existing minio/uploads
mc mb --ignore-existing minio/chao-admin
mc mb --ignore-existing minio/chao-web
mc mb --ignore-existing minio/public
mc mb --ignore-existing minio/temp

mc anonymous set public minio/uploads
mc anonymous set public minio/public
mc anonymous set none   minio/chao-admin
mc anonymous set none   minio/chao-web
mc anonymous set none   minio/temp

echo
echo "All buckets created and policies applied!"
echo "Public URLs:"
echo "   http://localhost:9000/uploads/"
echo "   http://localhost:9000/public/"