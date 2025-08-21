# 1️⃣ Etapa de build usando Maven con JDK 17
FROM maven:3.9.5-eclipse-temurin-17 AS build

WORKDIR /app

# Copiamos pom y src
COPY pom.xml .
COPY src ./src

# Construimos el proyecto y saltamos tests
RUN mvn clean package -DskipTests

# 2️⃣ Etapa runtime usando JDK 17 Alpine
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Instalamos netcat para poder verificar si SQL Server está listo
RUN apk add --no-cache netcat-openbsd

COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar ./backend.jar

COPY wait-for-sql.sh .

EXPOSE 8080

ENTRYPOINT ["sh", "wait-for-sql.sh"]
