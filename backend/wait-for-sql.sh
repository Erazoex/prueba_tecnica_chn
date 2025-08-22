#!/bin/sh

# Host y puerto de SQL Server
HOST="sqlserver"
PORT=1433
SLEEP_AFTER_CONNECT=20  # segundos extra para que se cree la base

echo "Esperando a $HOST:$PORT..."

# Espera hasta que el puerto esté disponible
while ! nc -z $HOST $PORT; do
  sleep 1
done

echo "$HOST:$PORT disponible. Esperando $SLEEP_AFTER_CONNECT segundos extra para que se cree la base..."
sleep $SLEEP_AFTER_CONNECT

echo "Iniciando backend..."
exec java -jar backend.jar
