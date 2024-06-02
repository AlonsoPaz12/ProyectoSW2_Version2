import { ImagenMedica } from "src/imagenes-medicas/imagenes-medicas.entity";
import { ResultadoLab } from "src/resultados-lab/resultados-lab.entity";


export class OrdenMedica {
    id: String;
    resultadosExamen: (ResultadoLab|ImagenMedica)[];
    observacion: String;
    
}