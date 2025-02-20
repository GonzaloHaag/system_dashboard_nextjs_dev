import { findCategoryWithId } from "@/actions";
import { auth } from "@/auth.config";
import { FormEditCategory } from "@/components";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { notFound, redirect } from "next/navigation";
import { toast } from "sonner";

export default async function EditarCategoriaModalPage({ params } : { params:Promise<{ id:string }>}) {

  const session = await auth();
  if (!session?.user) {
    redirect('/login')
  }
  const userId = parseInt(session.user.id);

  const categoryId = (await params).id;
  const respuesta = await findCategoryWithId(parseInt(categoryId));
  if(!respuesta.ok) {
    toast.error(respuesta.message)
    return;
  }
  if(!respuesta.categoria) {
    notFound();
  }
  const { categoria } = respuesta;
  return (
    <Dialog defaultOpen={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar categoría</DialogTitle>
          <DialogDescription>
            Los campos marcados con * son obligatorios.
          </DialogDescription>
        </DialogHeader>
        <FormEditCategory userId={ userId } category={ categoria } />
      </DialogContent>
    </Dialog>
  );
}