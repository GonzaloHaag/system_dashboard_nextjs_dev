-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Superadmin');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "logoSistema" TEXT,
    "avatar" TEXT,
    "role" "Role" NOT NULL DEFAULT 'Admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);
