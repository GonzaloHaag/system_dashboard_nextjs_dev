-- CreateEnum
CREATE TYPE "MetodoPago" AS ENUM ('TarjetaCredito', 'TarjetaDebito', 'MercadoPago', 'Efectivo', 'Transferencia');

-- AlterTable
ALTER TABLE "Pedido" ADD COLUMN     "metodoPago" "MetodoPago" NOT NULL DEFAULT 'MercadoPago';
