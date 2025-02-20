import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            email: string;
            nombre: string;
            nombreSistema: string;
            logoSistema: string | null;
            avatar: string | null;
            role: 'Admin' | 'Superadmin';
        } & DefaultSession['user'];
    }
}