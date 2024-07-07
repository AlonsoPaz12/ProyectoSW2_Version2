// dto/imagenes-medicas.dto.ts
export class CrearImagenMedicaDto {
    nombrePaciente: string;
    ExamDate: string;
    tipo: string;
    indicaciones: string;
    NombreDoc: string;
    NotasMedic: string;
    imagen: string;
}

export class ActualizarImagenMedicaDto {
    nombrePaciente?: string;
    ExamDate?: string;
    tipo?: string;
    indicaciones?: string;
    NombreDoc?: string;
    NotasMedic?: string;
    imagen?: string;
}
