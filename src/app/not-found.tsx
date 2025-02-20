import Link from "next/link";

export default function NotFoundPage() {
    return (
        <div className="min-h-dvh bg-gray-100 flex flex-col justify-center items-center px-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <h2 className="text-3xl font-semibold text-gray-600 mb-6">Página no encontrada</h2>
                <p className="text-xl text-gray-500 mb-8">Lo sentimos, la página que estás buscando no existe.</p>
                <Link
                    href="/dashboard"
                    title="Inicio"
                    className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
                >
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
}