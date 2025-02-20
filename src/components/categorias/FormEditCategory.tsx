'use client';

import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { editCategoryWithId } from "@/actions";
import { toast } from "sonner";
import { Categoria } from "@/interfaces";

interface Props {
    userId:number;
    category:Categoria;
}
interface CategoryInputs {
    nombre: string
}

export const FormEditCategory = ({ userId,category } : Props ) => {

    const { handleSubmit, register,formState:{ isValid,isSubmitting } } = useForm({
        defaultValues: {
            nombre: category.nombre,
        }
    });

    const router = useRouter();

    const formCategorySubmit: SubmitHandler<CategoryInputs> = async (data) => {
        const respuesta = await editCategoryWithId(userId,category.id,data.nombre);
        if(!respuesta.ok) {
            toast.error(respuesta.message)
            return;
        }
        if(isValid) {
            toast.success(respuesta.message);
            router.back()
        }
    }


    return (
        <form onSubmit={handleSubmit(formCategorySubmit)} className="form_class_global">
            <div className="flex flex-col items-start gap-y-2">
                <label htmlFor="nombre-category">Nombre*</label>
                <Input id="nombre-category" type="text" {...register('nombre', { required: true })} required placeholder="Ej:relojes" />
            </div>
            <div className="flex items-center gap-x-4 justify-end">
                <Button variant={'outline'} type="button" onClick={() => router.back()} title="Cancelar">
                    Cancelar
                </Button>
                <Button variant={'default'} type="submit" disabled={isSubmitting} title="Guardar">
                    {isSubmitting ? 'Guardando...' : 'Guardar'}
                </Button>
            </div>
        </form>
    )
}
