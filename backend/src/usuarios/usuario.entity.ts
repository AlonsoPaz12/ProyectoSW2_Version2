export enum GeneroUsuario{
    MASCULINO = 'MASCULINO',
    FEMENINO = 'FEMENINO'
}

export enum RolUsuario{
    MEDICO = 'MEDICO',
    PACIENTE = 'PACIENTE'
}

export class Usuario{
    id: String
    numeroDocumento: String
    nombres: String
    apePaterno: String
    apeMaterno: String
    fechaNacimiento: Date
    numCelular: String
    correoElectronico: String
    contrasena: String
    repContrasena: String
    genero: GeneroUsuario
    rol: RolUsuario
}

