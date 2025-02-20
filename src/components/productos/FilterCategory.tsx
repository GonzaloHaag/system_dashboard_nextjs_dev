'use client';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectItem,SelectTrigger, SelectValue } from "../ui/select"

interface Props {
    categories: {
        id: number;
        nombre: string;
        createdAt: Date;
        usuarioId: number;
    }[]
}
export const FilterCategory = ({ categories }: Props) => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleCategoryParams(term:string) {
        console.log(term);
        const params = new URLSearchParams(searchParams);
        if(term) {
            params.set('category',term)
        }
        else {
            params.delete('category')
        }
        replace(`${pathname}?${params.toString()}`);
    }
    return (
        <div className="flex">
            <Select defaultValue={searchParams.get('category')?.toString()} onValueChange={(e) => handleCategoryParams(e)}>
                <SelectTrigger className="w-[240px]">
                    <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="todas">Todas</SelectItem>
                        {
                            categories.map((category) => (
                                <SelectItem key={category.id} value={category.nombre}>{category.nombre}</SelectItem>
                            ))
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}
