import { Skeleton } from "../ui/skeleton"

export const PedidosFetcherSkeleton = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="p-2">
                <div className="flex items-center gap-x-2 justify-center">
                    <h2 className="font-semibold">Pendientes</h2>
                    <div className="flex items-center justify-center text-center w-5 h-5 p-3 rounded-full bg-slate-300 text-xs animate-pulse">

                    </div>
                </div>
                <Skeleton className="w-full h-[200px] mt-2" />
            </div>
            <div className="p-2">
                <div className="flex items-center gap-x-2 justify-center">
                    <h2 className="font-semibold">En progreso</h2>
                    <div className="flex items-center justify-center text-center w-5 h-5 p-3 rounded-full bg-slate-300 text-xs animate-pulse">

                    </div>
                </div>
                <Skeleton className="w-full h-[200px] mt-2" />
            </div>
            <div className="p-2">
                <div className="flex items-center gap-x-2 justify-center">
                    <h2 className="font-semibold">Completados</h2>
                    <div className="flex items-center justify-center text-center w-5 h-5 p-3 rounded-full bg-slate-300 text-xs animate-pulse">

                    </div>
                </div>
                <Skeleton className="w-full h-[200px] mt-2" />
            </div>
        </div>

    )
}
