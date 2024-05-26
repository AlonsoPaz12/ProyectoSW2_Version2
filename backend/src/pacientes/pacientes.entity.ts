import { Cita } from "src/citas/citas.entity";
import { Usuario } from "src/usuarios/usuario.entity";


export class Paciente extends Usuario{
    Citas: Cita[];
}