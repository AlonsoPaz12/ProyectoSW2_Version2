import { Cita } from "src/citas/citas.entity";
import { Usuario } from "src/usuarios/usuario.entity";

export class Medico extends Usuario{
    citas: Cita[];
    especialidad: String;
    centroMedico: String;
}