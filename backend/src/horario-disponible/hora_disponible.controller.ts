import { Controller, Post, Put, Param, Body, Get } from '@nestjs/common';
import { HorasDisponiblesService } from './hora_disponible.service';
import { CrearHoraDisponibleDto } from './dto/horario-disponible.dto';
import { UpdateHorariosDto } from './dto/horario-disponible.dto';
import { HoraDisponible } from './hora-disponible.entity';

@Controller('horas-disponibles')
export class HorasDisponiblesController {
    constructor(private readonly horasDisponiblesService: HorasDisponiblesService) {}


    @Post(':medicoId')
    async updateHorarios(
        @Param('medicoId') medicoId: number,
        @Body() updateHorariosDto: UpdateHorariosDto
    ): Promise<HoraDisponible[]> {
        return this.horasDisponiblesService.updateHorarios(medicoId, updateHorariosDto.horarios);
    }

    @Get(':idMedico')
    async getHorariosDisponibles(@Param('idMedico') idMedico: number) {
        return this.horasDisponiblesService.findByMedicoId(idMedico);
    }
}