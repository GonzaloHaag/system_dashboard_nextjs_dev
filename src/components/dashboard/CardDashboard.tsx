import { FormatoMoneda } from "@/lib/FormatoMoneda";
import { LucideIcon } from "lucide-react"

interface Props {
    Icon: LucideIcon;
    title: string;
    value?: number;
    price?: number; // Si viene lo pasamos por formato moneda
}
export const CardDashboard = ({ Icon, title, value, price }: Props) => {
    // Determinar qué valor mostrar y si aplicar formato de moneda
    const displayValue = value !== undefined ? value : FormatoMoneda(price || 0);
    return (
        <div className="bg-neutral-100 p-6 flex flex-col gap-y-6 shadow-md rounded group hover:bg-neutral-900 transition-colors duration-200">
            <div className="flex items-center justify-between">
                <Icon size={30} className="text-neutral-800 group-hover:text-neutral-200 transition-colors duration-200" />
                <span className="text-base text-neutral-900 group-hover:text-neutral-200 transition-colors duration-200">{title}</span>
            </div>
            <div className="flex flex-col items-start gap-y-4">
                <span className="font-medium text-3xl text-neutral-900 group-hover:text-neutral-200 transition-colors duration-200 w-40 h-10">{displayValue}</span>
                <div className="flex items-center gap-x-2">
                    <span className="text-neutral-400 text-sm">Último périodo</span>
                </div>
            </div>
        </div>
    )
}
