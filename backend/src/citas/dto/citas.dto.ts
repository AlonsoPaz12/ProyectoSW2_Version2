//citas.dto.ts
import { OrdenMedica } from "src/ordenes-medicas/ordenes-medicas.entity";
import { RecetaMedica } from "src/recetas-medicas/recetas-medicas.entity";

export class CrearCitaDto{
    motivo: string;
    IDmedico: number;
    observacion: string;
    IDpaciente: number;
    fecha: Date;
    documentoMedico?: (RecetaMedica | OrdenMedica | null) [];
}

export class ActualizarCitaDto{
    motivo?: string;
    IDmedico?: number;
    observacion?: string;
    IDpaciente?: number;
    fecha?: Date;
    documentoMedico?: (RecetaMedica | OrdenMedica | null) [];
}


export class AgregarRecetaDto {
    recetaId: number;
}

export class AgregarOrdenDto {
    ordenId: number;
}