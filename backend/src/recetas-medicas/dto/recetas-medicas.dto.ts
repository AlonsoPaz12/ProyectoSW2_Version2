import { Medicamento } from "src/medicamentos/medicamentos.entity"

export class CrearRecetaMedicaDto{
    id: String
    medicamento: Medicamento[]
    observacion: String
}