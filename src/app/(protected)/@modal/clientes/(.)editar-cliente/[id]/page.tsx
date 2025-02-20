import { findClientWithId } from "@/actions";
import { auth } from "@/auth.config";
import { FormEditClient } from "@/components";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { notFound, redirect } from "next/navigation";

export default async function EditarClienteModalPage({ params }: { params: Promise<{ id: string }> }) {

  const session = await auth();
  if (!session?.user) {
    redirect('/login')
  }
  const userId = parseInt(session.user.id);

  const idClient = (await params).id;

  const respuesta = await findClientWithId( parseInt(idClient) );
  if(!respuesta.ok) {
    return;
  }
  const { client } = respuesta;
  if(!client) {
    notFound();
  }
  return (
    <Dialog open={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar cliente</DialogTitle>
          <DialogDescription>
            Los campos marcados con * son obligatorios.
          </DialogDescription>
        </DialogHeader>
        <FormEditClient userId={ userId } client={ client } />
      </DialogContent>
    </Dialog>
  );
}