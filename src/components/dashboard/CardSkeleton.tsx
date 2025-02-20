import { type LucideIcon } from "lucide-react"
import { Skeleton } from "../ui/skeleton";

interface Props {
    Icon: LucideIcon;
    title: string;
}
export const CardSkeleton = ({ Icon, title }: Props) => {
    return (
        <div className="bg-neutral-100 p-6 flex flex-col gap-y-6 shadow-md rounded group hover:bg-neutral-900 transition-colors duration-200">
            <div className="flex items-center justify-between">
                <Icon size={30} className="text-neutral-800 group-hover:text-neutral-200 transition-colors duration-200" />
                <span className="text-base text-neutral-900 group-hover:text-neutral-200 transition-colors duration-200">{title}</span>
            </div>
            <div className="flex flex-col items-start gap-y-4">
                <Skeleton className="w-40 h-10" />
                <div className="flex items-center gap-x-2">
                    <span className="text-neutral-400 text-sm">Último périodo</span>
                </div>
            </div>
        </div>
    )
}
