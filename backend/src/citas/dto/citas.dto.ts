//citas.dto.ts
import { OrdenMedica } from "src/ordenes-medicas/ordenes-medicas.entity";
import { RecetaMedica } from "src/recetas-medicas/recetas-medicas.entity";

export class ActualizarCitaDto{
    motivo?: string;
    observacion?: string;
    IDmedico?: number;
    IDpaciente?: number;
    fecha?: Date;
    hora?: string; 
    diagnostico?: string;
    documentoMedico?: (RecetaMedica | OrdenMedica | null) [];
}