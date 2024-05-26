import { ResultadoExamen } from "src/interfaces/ResultadoExamen";

export class CrearOrdenMedicaDto{
    id: String;
    resultadosExamen: ResultadoExamen[];
    observacion: String;
}