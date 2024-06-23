export class CrearVacunaDto{
    nombre: string;
    fecha: Date;
    dosis: number;
    fabricante: string;
    lugarDeVacunacion: string;
    medicos: number[];
    pacientes: number[];
}

export class ActualizarPacienteDto{
    nombre?: string;
    fecha?: Date;
    dosis?: number;
    fabricante?: string;
    lugarDeVacunacion?: string;
}