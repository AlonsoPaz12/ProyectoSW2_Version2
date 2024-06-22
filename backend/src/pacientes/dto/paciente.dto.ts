import { GeneroUsuario } from '../../usuarios/usuario.entity';
import { RecetaMedica } from 'src/recetas-medicas/recetas-medicas.entity';
import { OrdenMedica } from 'src/ordenes-medicas/ordenes-medicas.entity';

export class CrearPacienteDto{
    imageurl?: string;
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

export class CrearCitaDto {
    motivo?: string;
    observacion?: string;
    IDmedico: number;
    IDpaciente: number;
    fecha: Date;
    hora: string;
    diagnostico?: string;
    documentoMedico?: (RecetaMedica | OrdenMedica | null)[];
}

export class IniciarSesionDto{
    correoElectronico: string;
    contrasena: string;
}