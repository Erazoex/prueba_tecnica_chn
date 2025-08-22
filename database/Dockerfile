FROM mcr.microsoft.com/mssql/server:2022-latest

# Variables obligatorias
ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=StrongPass1!

# Instalar sqlcmd
USER root
RUN apt-get update && \
    apt-get install -y mssql-tools unixodbc-dev && \
    ln -s /opt/mssql-tools/bin/sqlcmd /usr/bin/sqlcmd

# Crear carpeta para scripts
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY init.sql .

USER mssql

CMD /bin/bash -c "/opt/mssql/bin/sqlservr & sleep 20 && sqlcmd -S localhost -U SA -P 'StrongPass1!' -i init.sql && tail -f /dev/null"
