import { getCategoriesProductAdd } from "@/actions";
import { auth } from "@/auth.config";
import { FormAddProduct } from "@/components";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata:Metadata = {
    title:'Nuevo producto'
}

export default async function NuevoProductoPage() {
    const session = await auth();
    if (!session?.user) {
        redirect('/login')
    }
    const userId = parseInt(session.user.id);

    const respuesta = await getCategoriesProductAdd(userId);
    if(!respuesta.ok || !respuesta.categories) {
        return;
    }
    const { categories } = respuesta;
    return (
        <Dialog open={true}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nuevo producto</DialogTitle>
                    <DialogDescription>
                        Los campos marcados con * son obligatorios.
                    </DialogDescription>
                </DialogHeader>
                <FormAddProduct userId={ userId } categories={ categories } />
            </DialogContent>
        </Dialog>
    );
}