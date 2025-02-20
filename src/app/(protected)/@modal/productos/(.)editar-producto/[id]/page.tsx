import { findProductWithId, getCategoriesProductAdd } from "@/actions";
import { auth } from "@/auth.config";
import { FormEditProduct } from "@/components";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

export const metadata:Metadata = {
    title:'Editar producto'
}

export default async function EditarProductoModalPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user) {
        redirect('/login')
    }
    const userId = parseInt(session.user.id);
    const productId = (await params).id;
    const respuestaC = await getCategoriesProductAdd(userId);
    const respuestaP = await findProductWithId(parseInt(productId));
    if(!respuestaC.ok || !respuestaC.categories) {
        return;
    }
    if(!respuestaP.ok) {
        return;
    }
    if(!respuestaP.product) {
        notFound();
    }
    const { categories } = respuestaC;
    const { product } = respuestaP;
    return (
        <Dialog open={true}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar producto</DialogTitle>
                    <DialogDescription>
                        Los campos marcados con * son obligatorios.
                    </DialogDescription>
                </DialogHeader>
                <FormEditProduct userId={ userId } categories={ categories } product={ product } />
            </DialogContent>
        </Dialog>
    );
}