#!/bin/sh

# Host y puerto de SQL Server
HOST="sqlserver"
PORT=1433

# Espera hasta que SQL Server acepte conexiones
echo "Esperando a $HOST:$PORT..."
while ! nc -z $HOST $PORT; do
  sleep 1
done

echo "$HOST:$PORT disponible. Iniciando backend..."
exec java -jar backend.jar
