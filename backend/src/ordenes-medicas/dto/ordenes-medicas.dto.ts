export class CrearOrdenMedicaDto{
    observacion: string;
    citaId: number;
    medicoId: number;
    pacienteId: number;
}

export class ActualizarOrdenMedicaDto{
    resultadoLabId?: number;
    imagenMedicasId?: number;
    observacion?: string;
}