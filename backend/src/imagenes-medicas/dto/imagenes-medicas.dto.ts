// dto/imagenes-medicas.dto.ts
export class CrearImagenMedicaDto {
    nombrePaciente: string;
    ExamDate: string;
    tipo: string;
    indicaciones: string;
    NombreDoc: string;
    NotasMedic: string;
    imagen: string;
    ordenmedicaId: number;
}

export class ActualizarImagenMedicaDto {
    nombrePaciente?: string;
    ExamDate?: string;
    tipo?: string;
    indicaciones?: string;
    NombreDoc?: string;
    NotasMedic?: string;
    imagen?: string;
    ordenmedicaId?: number;
}
