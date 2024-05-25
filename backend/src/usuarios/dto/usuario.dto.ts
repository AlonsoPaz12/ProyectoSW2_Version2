import { GeneroUsuario, RolUsuario} from './../usuario.entity';

export class CrearUsuarioDto{
    numeroDocumento: String
    nombres: String
    apePaterno: String
    apeMaterno: String
    fechaNacimiento: Date
    numCelular: String
    correoElectronico: String
    contrasena: String
    repContrasena: String
}

export class ActualizarUsuarioDto{
    numeroDocumento?: String
    nombres?: String
    apePaterno?: String
    apeMaterno?: String
    fechaNacimiento?: Date
    numCelular?: String
    correoElectronico?: String
    contrasena?: String
    repContrasena?: String
    genero?: GeneroUsuario
    rol?: RolUsuario
}