# Pasos para correr la app en desarrollo 

1. Clonar el repositorio 
2. Instalar dependencias 
```
pnpm install 
```
3. Reenombrar archivo .env.template a .env
4. Reemplazar las variables de entorno 
5. Realizar migraciones de prisma
```
pnpm prisma migrate dev
```
6. Generar cliente de prisma 
```
pnpm prisma generate
```
7. Ejecutar el seed para llenar la base con ususarios de prueba
```
pnpm run seed
```
8. Correr app en desarrollo
```
pnpm run dev
```