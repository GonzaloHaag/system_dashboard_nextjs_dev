/*
  Warnings:

  - You are about to drop the `_PedidoToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PedidoToProduct" DROP CONSTRAINT "_PedidoToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_PedidoToProduct" DROP CONSTRAINT "_PedidoToProduct_B_fkey";

-- DropTable
DROP TABLE "_PedidoToProduct";

-- CreateTable
CREATE TABLE "ProductosEnPedido" (
    "id" SERIAL NOT NULL,
    "pedidoId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "ProductosEnPedido_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductosEnPedido_pedidoId_productId_key" ON "ProductosEnPedido"("pedidoId", "productId");

-- AddForeignKey
ALTER TABLE "ProductosEnPedido" ADD CONSTRAINT "ProductosEnPedido_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductosEnPedido" ADD CONSTRAINT "ProductosEnPedido_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
