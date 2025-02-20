/** Archivo de node js, pnpm run seed para ejecutarlo */
import prisma from "../lib/prisma";
import { hashSync } from 'bcryptjs';

async function main() {
        await prisma.usuario.deleteMany();
        await prisma.usuario.createMany({
            data : [
                {
                    email:'elpochomates13@gmail.com',
                    nombre:'Sofia Peralta',
                    nombreSistema:'Elpochomates',
                    password: hashSync('prueba123',5),
                    logoSistema:'/images/logo_pocho.webp'
                },
                {
                    email:'test@example.com',
                    nombre:'Prueba',
                    nombreSistema:'Prueba sistema',
                    password:hashSync('prueba123',5),
                    role:"Superadmin"
                }
            ]
        });

        console.log('Seed executed');
}
(() => {
    if(process.env.NODE_ENV === 'production') return;
    main();
})();