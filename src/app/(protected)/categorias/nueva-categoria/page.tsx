import { auth } from "@/auth.config";
import { FormAddCategory } from "@/components";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { redirect } from "next/navigation";

export default async function NuevaCategoriaPage() {
    const session = await auth();
    if (!session?.user) {
        redirect('/login')
    }
    const userId = parseInt(session.user.id);
    return (
        <Dialog open={true}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nueva categoría</DialogTitle>
                    <DialogDescription>
                        Los campos marcados con * son obligatorios.
                    </DialogDescription>
                </DialogHeader>
                <FormAddCategory userId={userId} />
            </DialogContent>
        </Dialog>
    );
}