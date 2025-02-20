import { auth } from "@/auth.config";
import { FormAddClient } from "@/components";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Metadata } from "next";
import { redirect } from "next/navigation";


export const metadata:Metadata = {
    title:'Nuevo cliente'
}

export default async function NuevoClientePage() {
    const session = await auth();
    if (!session?.user) {
        redirect('/login')
    }
    const userId = parseInt(session.user.id);
    return (
        <Dialog open={true}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nuevo cliente</DialogTitle>
                    <DialogDescription>
                        Los campos marcados con * son obligatorios.
                    </DialogDescription>
                </DialogHeader>
                <FormAddClient userId={userId} />
            </DialogContent>
        </Dialog>
    );
}