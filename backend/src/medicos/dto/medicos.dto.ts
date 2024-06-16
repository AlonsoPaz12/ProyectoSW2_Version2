//medicos.dto.ts
import { GeneroUsuario } from '../../usuarios/usuario.entity';

export class AgregarMedicamentoDto{
    nombre: string;
    tipo: string;
    frecuencia: string;
    dosis: string;
    idMedicamento: number;
    idReceta: number;
}

export class EliminarImagenMedicaDto {
    ordenMedicaId: number;
}

export class EliminarResultadoLabDto {
    ordenMedicaId: number;
}

export class CrearMedicoDto{
    centroMedico: string;
    imageurl: string;
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