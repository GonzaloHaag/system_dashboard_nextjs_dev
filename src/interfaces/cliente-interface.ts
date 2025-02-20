export interface Cliente {
        id: number;
        nombre: string;
        ciudad: string;
        direccion: string | null;
        status: 'Activo' | 'Inactivo';
}