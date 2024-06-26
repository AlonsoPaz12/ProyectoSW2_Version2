//recetas-medicas.dto
import { Medicamento } from "src/medicamentos/medicamentos.entity"

export class CrearRecetaMedicaDto {
    observacion: string;
    citaId: number;
    medicoId: number;
    pacienteId: number;
}

export class ActualizarRecetaMedicaDto {
    medicamento?: Medicamento[];
    observacion?: string;
}