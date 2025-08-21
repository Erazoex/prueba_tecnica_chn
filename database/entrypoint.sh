#!/bin/bash
# Inicia SQL Server en segundo plano
/opt/mssql/bin/sqlservr &

# Espera activamente hasta que SQL Server esté listo
echo "Esperando a que SQL Server esté listo..."
until /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "$SA_PASSWORD" -Q "SELECT 1" &> /dev/null
do
  sleep 1
done

echo "SQL Server listo. Ejecutando init.sql..."
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "$SA_PASSWORD" -i /init.sql

echo "init.sql ejecutado correctamente."
wait
