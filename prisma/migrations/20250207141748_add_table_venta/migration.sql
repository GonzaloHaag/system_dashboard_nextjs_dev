-- CreateTable
CREATE TABLE "Venta" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "precioTotal" DOUBLE PRECISION NOT NULL,
    "ganancias" DOUBLE PRECISION,
    "fecha" TIMESTAMP(3) NOT NULL,
    "metodoPago" "MetodoPago" NOT NULL,

    CONSTRAINT "Venta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Venta" ADD CONSTRAINT "Venta_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venta" ADD CONSTRAINT "Venta_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
