-- CreateTable
CREATE TABLE "ProductosEnVenta" (
    "id" SERIAL NOT NULL,
    "ventaId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "ProductosEnVenta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductosEnVenta_ventaId_productId_key" ON "ProductosEnVenta"("ventaId", "productId");

-- AddForeignKey
ALTER TABLE "ProductosEnVenta" ADD CONSTRAINT "ProductosEnVenta_ventaId_fkey" FOREIGN KEY ("ventaId") REFERENCES "Venta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductosEnVenta" ADD CONSTRAINT "ProductosEnVenta_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
