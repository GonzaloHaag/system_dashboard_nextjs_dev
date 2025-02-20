import { SquarePenIcon } from "lucide-react";
import Link from "next/link";

interface ButtonEditProps {
    id: number; //Id de la categoria, cliente, producto...
    basePath: string;
    className?:string;
}
export const ButtonEdit = ({ id,basePath,className } : ButtonEditProps ) => {
    return (
        <Link href={`/${basePath}/${id}`} type="button" title="Editar">
            <SquarePenIcon className={`text-green-600 ${className}`} />
        </Link>
    )
}
