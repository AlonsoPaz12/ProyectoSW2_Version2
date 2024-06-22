// especialidades.controller.ts
import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { EspecialidadService } from './especialidades.service';
import { Especialidad } from './especialidades.entity';
import { CrearEspecialidadDto } from './dto/especialidad.dto';

@Controller('especialidades')
export class EspecialidadController {
    constructor(private readonly especialidadService: EspecialidadService) {}

    @Post()
    async crearEspecialidad(@Body() crearEspecialidadDto: CrearEspecialidadDto): Promise<Especialidad> {
        return await this.especialidadService.crearEspecialidad(crearEspecialidadDto);
    }

    @Get()
    async obtenerTodasEspecialidades(): Promise<Especialidad[]> {
        return await this.especialidadService.obtenerTodasEspecialidades();
    }

    @Get(':id')
    async obtenerEspecialidadPorId(@Param('id') id: string): Promise<Especialidad> {
        return await this.especialidadService.obtenerEspecialidadPorId(+id);
    }

    @Get()
    async buscarEspecialidadesPorNombre(@Query('nombre') nombre: string): Promise<Especialidad[]> {
        return await this.especialidadService.buscarEspecialidadesPorNombre(nombre);
    }
}
