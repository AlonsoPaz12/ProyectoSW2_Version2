//medicos.dto.ts

import { GeneroUsuario } from '../../usuarios/usuario.entity';

export class CrearMedicoDto{
    especialidad: string;
    centroMedico: string;
    numeroDocumento: string;
    nombres: string;
    apePaterno: string;
    apeMaterno: string;
    fechaNacimiento: Date;
    numCelular: string;
    correoElectronico: string;
    contrasena: string;
    repContrasena: string;
    genero: GeneroUsuario;
}

export class ActualizarMedicoDto{
    especialidad?: string;
    centroMedico?: string;
    numeroDocumento?: string;
    nombres?: string;
    apePaterno?: string;
    apeMaterno?: string;
    fechaNacimiento?: Date;
    numCelular?: string;
    correoElectronico?: string;
    contrasena?: string;
    repContrasena?: string;
    genero?: GeneroUsuario;
}