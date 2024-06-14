//recetas-medicas.dto
import { Medicamento } from "src/medicamentos/medicamentos.entity"

export class CrearRecetaMedicaDto{
    medicamento: Medicamento[];
    observacion: string;
}

export class ActualizarRecetaMedicaDto{
    medicamento?: Medicamento[];
    observacion?: string;
}