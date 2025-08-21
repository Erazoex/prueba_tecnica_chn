-- ==========================================
-- Crear base de datos si no existe
-- ==========================================
USE master;
GO

IF NOT EXISTS (SELECT 1 FROM sys.databases WHERE name = N'SistemaPrestamos')
BEGIN
    CREATE DATABASE SistemaPrestamos;
END
GO

-- Cambiar contexto a la base de datos
USE SistemaPrestamos;
GO

-- ==========================================
-- Tabla CLIENTES
-- ==========================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Clientes]') AND type in (N'U'))
BEGIN
    CREATE TABLE Clientes (
        clienteID INT IDENTITY(1,1) PRIMARY KEY,
        nombre NVARCHAR(100) NOT NULL,
        apellido NVARCHAR(100) NOT NULL,
        numeroIdentificacion NVARCHAR(50) UNIQUE NOT NULL,
        fechaNacimiento DATE NOT NULL,
        direccion NVARCHAR(255),
        correoElectronico NVARCHAR(100) UNIQUE,
        telefono NVARCHAR(20)
    );
END
GO

-- ==========================================
-- Tabla SOLICITUDES DE PRÉSTAMO
-- ==========================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SolicitudesPrestamo]') AND type in (N'U'))
BEGIN
    CREATE TABLE SolicitudesPrestamo (
        solicitudID INT IDENTITY(1,1) PRIMARY KEY,
        clienteID INT NOT NULL,
        montoSolicitado DECIMAL(18,2) NOT NULL,
        plazoMeses INT NOT NULL,
        fechaSolicitud DATETIME DEFAULT GETDATE(),
        estado NVARCHAR(20) NOT NULL CHECK (estado IN ('Pendiente','Aprobado','Rechazado')),
        observaciones NVARCHAR(255),
        CONSTRAINT FK_Solicitud_Cliente FOREIGN KEY (clienteID) REFERENCES Clientes(clienteID) ON DELETE CASCADE
    );
END
GO

-- ==========================================
-- Tabla PRÉSTAMOS
-- ==========================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Prestamos]') AND type in (N'U'))
BEGIN
    CREATE TABLE Prestamos (
        prestamoID INT IDENTITY(1,1) PRIMARY KEY,
        solicitudID INT NOT NULL UNIQUE,
        clienteID INT NOT NULL,
        montoAprobado DECIMAL(18,2) NOT NULL,
        plazoMeses INT NOT NULL,
        tasaInteres DECIMAL(5,2) NOT NULL,
        fechaAprobacion DATETIME DEFAULT GETDATE(),
        estado NVARCHAR(20) NOT NULL CHECK (estado IN ('Activo','Pagado','Incumplido')),
        CONSTRAINT FK_Prestamo_Solicitud FOREIGN KEY (solicitudID) REFERENCES SolicitudesPrestamo(solicitudID),
        CONSTRAINT FK_Prestamo_Cliente FOREIGN KEY (clienteID) REFERENCES Clientes(clienteID)
    );
END
GO

-- ==========================================
-- Tabla PLAN DE PAGOS
-- ==========================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[PlanPagos]') AND type in (N'U'))
BEGIN
    CREATE TABLE PlanPagos (
        cuotaID INT IDENTITY(1,1) PRIMARY KEY,
        prestamoID INT NOT NULL,
        numeroCuota INT NOT NULL,
        fechaVencimiento DATE NOT NULL,
        montoCuota DECIMAL(18,2) NOT NULL,
        capital DECIMAL(18,2) NOT NULL,
        interes DECIMAL(18,2) NOT NULL,
        estado NVARCHAR(20) NOT NULL CHECK (estado IN ('Pendiente','Pagada','Atrasada')),
        CONSTRAINT FK_Cuota_Prestamo FOREIGN KEY (prestamoID) REFERENCES Prestamos(prestamoID) ON DELETE CASCADE
    );
END
GO

-- ==========================================
-- Tabla PAGOS
-- ==========================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Pagos]') AND type in (N'U'))
BEGIN
    CREATE TABLE Pagos (
        pagoID INT IDENTITY(1,1) PRIMARY KEY,
        prestamoID INT NOT NULL,
        cuotaID INT NULL,
        fechaPago DATETIME DEFAULT GETDATE(),
        montoPago DECIMAL(18,2) NOT NULL,
        capitalPagado DECIMAL(18,2) DEFAULT 0,
        interesPagado DECIMAL(18,2) DEFAULT 0,
        moraPagada DECIMAL(18,2) DEFAULT 0,
        CONSTRAINT FK_Pago_Prestamo FOREIGN KEY (prestamoID) REFERENCES Prestamos(prestamoID) ON DELETE CASCADE,
        CONSTRAINT FK_Pago_Cuota FOREIGN KEY (cuotaID) REFERENCES PlanPagos(cuotaID)
    );
END
GO
