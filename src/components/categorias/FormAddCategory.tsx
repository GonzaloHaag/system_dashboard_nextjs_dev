'use client';
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { addCategory } from "@/actions";
import { toast } from "sonner";

interface Props {
    userId: number;
}

interface CategoryInputs {
    nombre: string;
}

export const FormAddCategory = ({ userId }: Props) => {
    const { handleSubmit, register, formState: { isValid, isSubmitting } } = useForm<CategoryInputs>({
        defaultValues: {
            nombre: '',
        }
    });

    const router = useRouter();

    const formCategorySubmit: SubmitHandler<CategoryInputs> = async (data) => {
        const respuesta = await addCategory(userId, data.nombre);
        if (!respuesta.ok) {
            toast.error(respuesta.message);
            return;
        }
        if (isValid) {
            toast.success(respuesta.message);
            router.back();
        }
    };

    return (
        <form onSubmit={handleSubmit(formCategorySubmit)} className="form_class_global">
            <div className="flex flex-col items-start gap-y-2">
                <label htmlFor="nombre-category">Nombre*</label>
                <Input id="nombre-category" type="text" {...register('nombre', { required: true })} required placeholder="Ej: relojes" />
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
    );
};
