# Banco Nacional- Sistema de Préstamos y Pagos

Banco Nacional es una aplicación web para la gestión de clientes, solicitudes de préstamos, planes de pago y registro de pagos. Está desarrollada con **React** en el frontend, **Spring Boot** en el backend y **SQL Server** como base de datos, todo desplegado mediante **Docker Compose**.

---


---

## Servicios de Docker Compose

- **SQL Server** (`sqlserver`) - Base de datos del sistema.  
- **Backend** (`backend`) - API REST desarrollada en Spring Boot.  
- **Frontend** (`frontend`) - Aplicación web en React.

---

## Desplegar el Stack

1. Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```

2. Construir y levantar los contenedores
```bash
docker compose build
docker compose up -d    # ejecucion en segundo plano
```

3. Verificar que esten corriendo los contenedores
```bash
docker ps
```

### Comando util
```bash
docker compose down # para botar los contenedores ejecutados por docker compose
```
