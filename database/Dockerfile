FROM mcr.microsoft.com/mssql/server:2022-latest

ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=StrongPass1!

# Cambiar a root para instalar sqlcmd
USER root
RUN apt-get update && \
    apt-get install -y mssql-tools unixodbc-dev && \
    ln -s /opt/mssql-tools/bin/sqlcmd /usr/bin/sqlcmd

# Copiar script de inicializacion
COPY init.sql /init.sql

USER mssql

CMD /opt/mssql/bin/sqlservr
