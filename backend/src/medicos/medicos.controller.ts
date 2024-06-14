//medicos.controller.ts

import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { MedicosService } from './medicos.service';
import { Medico } from './medicos.entity';
import { CrearMedicoDto } from './dto/medicos.dto';

@Controller('medicos')
export class MedicosController {
    constructor(private readonly medicosService: MedicosService) {}

    @Post()
    async crearMedico(@Body() crearMedicoDto: CrearMedicoDto) {
        return this.medicosService.crearMedico(crearMedicoDto);
    }

    @Get(':id')
    async obtenerMedicoPorId(@Param('id') id: number): Promise<Medico> {
        return this.medicosService.obtenerMedicoPorId(id);
    }

    @Delete(':id')
    async eliminarMedico(@Param('id') id: number): Promise<void> {
        return this.medicosService.eliminarMedico(id);
    }
}
