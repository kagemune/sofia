-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 17, 2025 at 06:30 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dazz`
--

-- --------------------------------------------------------

--
-- Table structure for table `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`, `descripcion`, `activo`) VALUES
(1, 'Cuero Natural', 'Materiales de cuero genuino de diferentes animales', 1),
(2, 'Hilos y Cuerdas', 'Hilos especializados para calzado y cordones de cuero', 1),
(3, 'Adhesivos', 'Pegamentos y adhesivos para unión de componentes', 1),
(4, 'Herrajes', 'Tachuelas, remaches y componentes metálicos', 1),
(5, 'Suelas', 'Suelas de cuero y materiales naturales', 1),
(6, 'Acabados', 'Productos para tratamiento y acabado del cuero', 1);

-- --------------------------------------------------------

--
-- Table structure for table `insumos`
--

CREATE TABLE `insumos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `cantidad` decimal(10,2) NOT NULL,
  `unidad` varchar(20) NOT NULL,
  `proveedor` varchar(100) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock_minimo` decimal(10,2) DEFAULT 0.00,
  `stock_maximo` decimal(10,2) DEFAULT 0.00,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `insumos`
--

INSERT INTO `insumos` (`id`, `nombre`, `categoria`, `cantidad`, `unidad`, `proveedor`, `precio`, `stock_minimo`, `stock_maximo`, `fecha_creacion`, `fecha_actualizacion`, `activo`) VALUES
(1, 'Cuero de vacuno full grain', 'Cuero Natural', 150.50, 'm²', 'Curticur S.A.', 85.50, 50.00, 200.00, '2025-10-17 15:15:20', '2025-10-17 15:15:20', 1),
(2, 'Cuero de becerro primera calidad', 'Cuero Natural', 80.25, 'm²', 'Cueros Andinos', 120.75, 30.00, 150.00, '2025-10-17 15:15:20', '2025-10-17 15:15:20', 1),
(3, 'Piel de cordero suave', 'Cuero Natural', 45.75, 'm²', 'Curticur S.A.', 95.25, 20.00, 100.00, '2025-10-17 15:15:20', '2025-10-17 15:15:20', 1),
(4, 'Cuero veg-tan (curtido vegetal)', 'Cuero Natural', 60.00, 'm²', 'Cueros Andinos', 110.00, 25.00, 120.00, '2025-10-17 15:15:20', '2025-10-17 15:15:20', 1),
(5, 'Cuero de búfalo texturizado', 'Cuero Natural', 35.20, 'm²', 'Curticur S.A.', 135.40, 15.00, 80.00, '2025-10-17 15:15:20', '2025-10-17 15:15:20', 1),
(6, 'Hilo de lino encerado 1.2mm', 'Hilos y Cuerdas', 25.00, 'carretes', 'Hilos Premium Ltda', 8.75, 10.00, 50.00, '2025-10-17 15:15:31', '2025-10-17 15:15:31', 1),
(7, 'Hilo sintético reforzado 0.8mm', 'Hilos y Cuerdas', 18.50, 'carretes', 'Hilos Premium Ltda', 6.25, 8.00, 30.00, '2025-10-17 15:15:31', '2025-10-17 15:15:31', 1),
(8, 'Cordones de cuero redondo 120cm', 'Hilos y Cuerdas', 200.00, 'unidades', 'Hilos Premium Ltda', 3.50, 100.00, 500.00, '2025-10-17 15:15:31', '2025-10-17 15:15:31', 1),
(9, 'Cordones de cuero plano 90cm', 'Hilos y Cuerdas', 150.00, 'unidades', 'Hilos Premium Ltda', 2.85, 80.00, 400.00, '2025-10-17 15:15:31', '2025-10-17 15:15:31', 1),
(10, 'Hilo de poliéster para costura', 'Hilos y Cuerdas', 35.75, 'carretes', 'Hilos Premium Ltda', 5.90, 15.00, 60.00, '2025-10-17 15:15:31', '2025-10-17 15:15:31', 1),
(11, 'Pegamento de contacto profesional', 'Adhesivos', 45.25, 'litros', 'Adhesivos Colombia', 25.80, 20.00, 100.00, '2025-10-17 15:15:46', '2025-10-17 15:15:46', 1),
(12, 'Adhesivo para suela de cuero', 'Adhesivos', 32.50, 'kg', 'Adhesivos Colombia', 18.90, 15.00, 80.00, '2025-10-17 15:15:46', '2025-10-17 15:15:46', 1),
(13, 'Cemento para unión de talones', 'Adhesivos', 28.75, 'litros', 'Adhesivos Colombia', 32.45, 12.00, 60.00, '2025-10-17 15:15:46', '2025-10-17 15:15:46', 1),
(14, 'Pegamento rápido para reparaciones', 'Adhesivos', 65.00, 'unidades', 'Adhesivos Colombia', 8.25, 30.00, 150.00, '2025-10-17 15:15:46', '2025-10-17 15:15:46', 1),
(15, 'Tachuelas decorativas latón', 'Herrajes', 1200.00, 'unidades', 'Metalurgica Herrajes', 0.45, 500.00, 3000.00, '2025-10-17 15:15:58', '2025-10-17 15:15:58', 1),
(16, 'Remaches para cuero 8mm', 'Herrajes', 850.00, 'unidades', 'Metalurgica Herrajes', 0.35, 300.00, 2000.00, '2025-10-17 15:15:58', '2025-10-17 15:15:58', 1),
(17, 'Ojetes metálicos para cordones', 'Herrajes', 2000.00, 'unidades', 'Metalurgica Herrajes', 0.15, 800.00, 5000.00, '2025-10-17 15:15:58', '2025-10-17 15:15:58', 1),
(18, 'Ganchos para botas de cuero', 'Herrajes', 450.00, 'pares', 'Metalurgica Herrajes', 2.75, 200.00, 1000.00, '2025-10-17 15:15:58', '2025-10-17 15:15:58', 1),
(19, 'Tira de acero para puntera', 'Herrajes', 180.00, 'unidades', 'Metalurgica Herrajes', 4.20, 80.00, 400.00, '2025-10-17 15:15:58', '2025-10-17 15:15:58', 1),
(20, 'Suela de cuero completo', 'Suelas', 85.00, 'unidades', 'Cueros Andinos', 28.50, 40.00, 200.00, '2025-10-17 15:16:10', '2025-10-17 15:16:10', 1),
(21, 'Tacón de cuero laminado', 'Suelas', 120.00, 'unidades', 'Cueros Andinos', 15.75, 50.00, 250.00, '2025-10-17 15:16:10', '2025-10-17 15:16:10', 1),
(22, 'Plantilla de cuero vegano', 'Suelas', 200.00, 'unidades', 'Cueros Andinos', 8.90, 100.00, 500.00, '2025-10-17 15:16:10', '2025-10-17 15:16:10', 1),
(23, 'Media suela de cuero flexible', 'Suelas', 95.00, 'unidades', 'Cueros Andinos', 12.25, 45.00, 180.00, '2025-10-17 15:16:10', '2025-10-17 15:16:10', 1);

-- --------------------------------------------------------

--
-- Table structure for table `proveedores`
--

CREATE TABLE `proveedores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `contacto` varchar(100) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `proveedores`
--

INSERT INTO `proveedores` (`id`, `nombre`, `contacto`, `telefono`, `email`, `direccion`, `activo`, `fecha_creacion`) VALUES
(1, 'Curticur S.A.', 'Carlos Mendoza', '+57 1 2345678', 'ventas@curticur.com', 'Calle 123 #45-67, Bogotá', 1, '2025-10-17 15:14:39'),
(2, 'Hilos Premium Ltda', 'María González', '+57 1 3456789', 'pedidos@hilospremium.co', 'Av. Principal 890, Medellín', 1, '2025-10-17 15:14:39'),
(3, 'Adhesivos Colombia', 'Roberto Silva', '+57 1 4567890', 'info@adhesivoscol.com', 'Carrera 56 #78-90, Cali', 1, '2025-10-17 15:14:39'),
(4, 'Metalurgica Herrajes', 'Ana Torres', '+57 1 5678901', 'ventas@metalherrajes.com', 'Zona Industrial, Barranquilla', 1, '2025-10-17 15:14:39'),
(5, 'Cueros Andinos', 'Jorge Ramírez', '+57 1 6789012', 'contacto@cuerosandinos.co', 'Km 15 Vía La Calera, Bogotá', 1, '2025-10-17 15:14:39');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `rol` enum('admin','usuario') DEFAULT 'usuario',
  `activo` tinyint(1) DEFAULT 1,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `password`, `nombre`, `email`, `rol`, `activo`, `fecha_creacion`) VALUES
(1, 'admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrador Principal', 'admin@empresa.com', 'admin', 1, '2025-10-17 15:15:03'),
(2, 'inventario1', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Ana García', 'ana.garcia@empresa.com', 'usuario', 1, '2025-10-17 15:15:03'),
(3, 'produccion1', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Carlos López', 'carlos.lopez@empresa.com', 'usuario', 1, '2025-10-17 15:15:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indexes for table `insumos`
--
ALTER TABLE `insumos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `insumos`
--
ALTER TABLE `insumos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
