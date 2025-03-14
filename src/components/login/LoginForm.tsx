'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '../ui/button';
import { LoginUser } from '@/actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
type Inputs =  {
  email:string;
  password:string
}
export const LoginForm = () => {

  const { register, handleSubmit,formState:{ isValid,isSubmitting }} = useForm<Inputs>();
  const router = useRouter();
  const formLoginOnSubmit:SubmitHandler<Inputs> = async (data) => {
    if(!isValid) return;
    const respuesta = await LoginUser(data.email,data.password);
    if(!respuesta.ok) {
      toast.error(respuesta.message);
      return;
    }
    // Si no retorno es porque esta ok
    router.replace('/dashboard'); 
    toast.success('Login exitoso!');
  }
  return (
    <form onSubmit={handleSubmit(formLoginOnSubmit)} className="flex flex-col gap-y-4 mt-4 w-full text-sm">
      <input autoFocus {...register('email',{ required:true })} defaultValue={'test@example.com'} type="email" placeholder="Email" required className='w-full outline-none border border-neutral-200 transition-colors duration-200 focus:border-neutral-900 py-2 px-4 rounded' />
      <input type='password' {...register('password',{ required:true })} defaultValue={'prueba123'} minLength={5} placeholder='Contraseña' required className='w-full outline-none border border-neutral-200 transition-colors duration-200 focus:border-neutral-900 py-2 px-4 rounded' />

      <Button disabled={isSubmitting} type='submit' title='Ingresar'>
        {
          isSubmitting ? 'Ingresando...' : 'Ingresar'
        }
      </Button>
    </form>
  )
}
