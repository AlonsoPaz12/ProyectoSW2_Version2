import { ResultadoExamen } from "./ResultadoExamen";

export interface DocumentoMedico {
    CrearDocumentoMedico(resultadosExamen: ResultadoExamen[], observacion: String): void;
}