//imagenes-medicas.dto
export class CrearImagenMedicaDto {
    tipo: string;
    imagen: string;
    nombrePaciente: string;
    ordenmedicaId: number;
}

export class ActualizarImagenMedicaDto {
    tipo?: string;
    imagen?: string;
    nombrePaciente?: string;
    ordenmedicaId?: number;
}
