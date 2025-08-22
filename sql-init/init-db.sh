#!/bin/bash
# Esperar a que SQL Server esté disponible
until /opt/mssql-tools/bin/sqlcmd -S sqlserver -U sa -P "$SA_PASSWORD" -Q "SELECT 1" > /dev/null 2>&1; do
  echo "Esperando a SQL Server..."
  sleep 2
done

echo "Creando base de datos si no existe..."
/opt/mssql-tools/bin/sqlcmd -S sqlserver -U sa -P "$SA_PASSWORD" -Q "IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = N'SistemaPrestamos') CREATE DATABASE SistemaPrestamos"
echo "Base de datos lista."
