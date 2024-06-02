import { ImagenMedica } from "src/imagenes-medicas/imagenes-medicas.entity";
import { ResultadoLab } from "src/resultados-lab/resultados-lab.entity";


export class CrearOrdenMedicaDto{
    id: String;
    resultadosExamen: (ResultadoLab|ImagenMedica)[];
    observacion: String;
}