// src/medicos/dto/hora-disponible.dto.ts


export class CrearHoraDisponibleDto {
    diaSemana: string;
    horaInicio: string;
    horaFin: string;
    seleccionado: boolean;
}

export class UpdateHorariosDto {
    horarios: CrearHoraDisponibleDto[];
}