export class CrearMedicamentoDto{
    nombre: string;
    tipo: string;
    frecuencia: string;
    dosis: string;
}

export class ActualizarMedicamentoDto{
    nombre?: string;
    tipo?: string;
    frecuencia?: string;
    dosis?: string;
}