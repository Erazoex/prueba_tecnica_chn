#!/bin/bash
/opt/mssql/bin/sqlservr &

echo "Esperando a que SQL Server esté listo..."
until /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "$SA_PASSWORD" -Q "SELECT 1" &> /dev/null
do
  sleep 1
done

echo "SQL Server listo. Ejecutando init.sql..."
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "$SA_PASSWORD" -i /init.sql

echo "init.sql ejecutado correctamente."
wait
