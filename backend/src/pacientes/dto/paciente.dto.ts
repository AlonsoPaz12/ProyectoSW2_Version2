import { GeneroUsuario, RolUsuario} from '../../usuarios/usuario.entity';

export class CrearPacienteDto{
    numeroDocumento: string;
    nombres: string;
    apePaterno: string;
    apeMaterno: string;
    fechaNacimiento: Date
    numCelular: string;
    correoElectronico: string;
    contrasena: string;
    repContrasena: string;
}

export class ActualizarPacienteDto{
    numeroDocumento?: string;
    nombres?: string;
    apePaterno?: string;
    apeMaterno?: string;
    fechaNacimiento?: Date
    numCelular?: string;
    correoElectronico?: string;
    contrasena?: string;
    repContrasena?: string;
    genero?: GeneroUsuario
    rol?: RolUsuario
}