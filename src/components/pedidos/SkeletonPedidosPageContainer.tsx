import { Skeleton } from "../ui/skeleton"

export const SkeletonPedidosPageContainer = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, index) => (
                <div key={index} className="border rounded-lg p-4">
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <div className="space-y-2">
                        {[...Array(3)].map((_, itemIndex) => (
                            <Skeleton key={itemIndex} className="h-12 w-full" />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
