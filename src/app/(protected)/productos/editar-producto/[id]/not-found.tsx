import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundProductPage() {
    return (
        <div className="flex flex-col items-center h-full bg-gray-100">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Producto no encontrado</h1>
                <p className="text-xl text-gray-600 mb-8">Lo sentimos, el producto que estás buscando no existe.</p>
                <Button asChild>
                    <Link href="/productos" title="Productos">Ver todos los productos</Link>
                </Button>
            </div>
        </div>
    );
}