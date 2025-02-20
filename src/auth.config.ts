import NextAuth,{ type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from './lib/prisma';
import { compareSync } from 'bcryptjs';
export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ request: { } }) {
          return true;
        },
    
        jwt({ token, user }) {
          if ( user ) {
            token.data = user;
          }
    
          return token;
        },
    
        session({ session, token }) {
          session.user = token.data as any;
          return session;
        },
    
    
    
      },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(5) })
                    .safeParse(credentials);

                    if(!parsedCredentials.success) return null;

                    const { email,password } = parsedCredentials.data;

                    // Buscar correo
                    const findUser = await prisma.usuario.findUnique({
                        where : {
                            email : email.toLowerCase()
                        }
                    });
                    if(!findUser) return null; // Si no lo encuentra corto 

                    // Comparar contraseñas 

                    if(!compareSync(password,findUser.password)) return null; // Si no matchean return null

                    // Retornar user
                    return {
                        id:`${findUser.id}`,
                        email: findUser.email,
                        nombre: findUser.nombre,
                        nombreSistema: findUser.nombreSistema,
                        logoSistema: findUser.logoSistema,
                        avatar: findUser.avatar,
                        role: findUser.role
                    }
            },
        }),
    ]
}

export const { signIn,signOut,auth } = NextAuth(authConfig);