import { OrdenMedica } from "src/ordenes-medicas/ordenes-medicas.entity";
import { RecetaMedica } from "src/recetas-medicas/recetas-medicas.entity";

export class CrearCitaDto{
    id: String;
    motivo: String;
    IDmedico: String;
    Observacion: String;
    IDpaciente: String;
    fecha: Date;
    documentoMedico: (RecetaMedica | OrdenMedica)[];
}