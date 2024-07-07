export class CrearOrdenMedicaDto{
    observacion: string;
    imagenMedicaId: number;
    resultadoLabId: number;
    citaId: number;
    medicoId: number;
    pacienteId: number;
}

export class ActualizarOrdenMedicaDto{
    resultadoLabId?: number;
    imagenMedicaId?: number;
    observacion?: string;
}