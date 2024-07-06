export class CrearOrdenMedicaDto {
    observacion: string;
    citaId: number;
    medicoId: number;
    pacienteId: number;
}
export class ActualizarOrdenMedicaDto {
    observacion?: string;
    citaId?: number;
    medicoId?: number;
    pacienteId?: number;
    resultadoLabId?: number;
    imagenMedicasId?: number[]; 
}