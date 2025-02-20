-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "imagen" TEXT,
    "color" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
