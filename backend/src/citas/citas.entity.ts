import { Medico } from "src/medicos/medicos.entity";
import { Paciente } from "src/pacientes/pacientes.entity";

export class Cita{
    id: String;
    motivo: String;
    IDmedico: String;
    Observacion: String;
    IDpaciente: String;
    fecha: Date;
    documentoMedico: any[];
    asistio: boolean
}