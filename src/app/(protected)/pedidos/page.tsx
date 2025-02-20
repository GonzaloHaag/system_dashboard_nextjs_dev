import { auth } from "@/auth.config";
import { PedidosFetcher, PedidosFetcherSkeleton, SearchBarAndButtons } from "@/components";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Pedidos'
}

export default async function PedidosPage(props: {
    searchParams?: Promise<{
        search?: string;
    }>
}) {

    const session = await auth();
    if (!session?.user) {
        redirect('/login')
    }
    const userId = parseInt(session.user.id);
    const searchParams = await props.searchParams;
    const searchQuery = searchParams?.search ?? '';
    return (
        <section className="w-full flex flex-col gap-y-6">
            <SearchBarAndButtons placeholder="Buscar pedido..." textButton="Nuevo pedido" linkHref='/pedidos/nuevo-pedido' />
            <hr />
            <span className="text-sm text-gray-500">Nota* Los pedidos completados se moveran a ventas. Puedes eliminarlos sin problemas.</span>
            <Suspense key={ searchQuery } fallback={<PedidosFetcherSkeleton />}>
                <PedidosFetcher userId={userId} searchQuery={ searchQuery } />
            </Suspense>
        </section>

    );
}