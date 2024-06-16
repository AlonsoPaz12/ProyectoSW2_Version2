import { GeneroUsuario } from '../../usuarios/usuario.entity';

export class CrearPacienteDto{
    imageurl: string;
    numeroDocumento: string;
    nombres: string;
    apePaterno: string;
    apeMaterno: string;
    fechaNacimiento: Date
    numCelular: string;
    correoElectronico: string;
    contrasena: string;
    repContrasena: string;
    genero: GeneroUsuario
}

export class ActualizarPacienteDto{
    imageurl?: string;
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
}