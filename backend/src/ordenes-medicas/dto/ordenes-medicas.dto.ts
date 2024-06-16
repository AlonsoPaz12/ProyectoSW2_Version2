export class CrearOrdenMedicaDto{
    observacion: string;
    citaId: number;
}

export class ActualizarOrdenMedicaDto{
    resultadoLabId?: number;
    imagenMedicasId?: number;
    observacion?: string;
}