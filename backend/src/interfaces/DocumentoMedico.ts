import { OrdenMedica } from "src/ordenes-medicas/ordenes-medicas.entity";
import { RecetaMedica } from "src/recetas-medicas/recetas-medicas.entity";

export interface DocumentoMedico {
    CrearDocumentoMedico(resultadosExamen: (RecetaMedica|OrdenMedica)[], observacion: String): void;
}