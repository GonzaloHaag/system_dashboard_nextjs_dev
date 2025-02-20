import { auth } from "@/auth.config";
import { LoginForm } from "@/components";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata:Metadata =  {
   title:'Login'
}

export default async function LoginPage() {

  const session = await auth();
  if(session?.user) {
    redirect('/dashboard');
  }
  return (
    <main className="w-full min-h-dvh flex justify-center bg-slate-200">
      <div className="bg-white p-4 rounded flex flex-col items-center text-center max-w-80 h-max mt-5 fadeInUp">
        <h1 className="text-xl font-medium">Bienvenido</h1>
        <p className="text-sm leading-5 mt-1 text-slate-600">Debe ingresar sus credenciales para poder ingresar al sistema.</p>
        <LoginForm />
      </div>
    </main>
  );
}