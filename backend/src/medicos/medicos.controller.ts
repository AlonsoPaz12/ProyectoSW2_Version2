//medicos.controller.ts

import { Controller, Get, Post, Body, Param, ParseIntPipe, BadRequestException, NotFoundException } from '@nestjs/common';
import { MedicoService } from './medicos.service';
import { AgregarMedicamentoDto, CrearMedicoDto } from './dto/medicos.dto';
import { CrearHoraDisponibleDto } from 'src/horario-disponible/dto/horario-disponible.dto';
import { EliminarImagenMedicaDto, EliminarResultadoLabDto } from './dto/medicos.dto';
import { CrearRecetaMedicaDto } from '../recetas-medicas/dto/recetas-medicas.dto';
import { CrearOrdenMedicaDto } from 'src/ordenes-medicas/dto/ordenes-medicas.dto';

@Controller('medicos')
export class MedicoController {
    constructor(private readonly medicoService: MedicoService) { }

    @Post()
    async crearMedico(@Body() crearMedicoDto: CrearMedicoDto) {
        try {
            const medicoCreado = await this.medicoService.crearMedico(crearMedicoDto);
            return { message: 'Médico creado correctamente', medico: medicoCreado };
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Get()
    async mostrarMedicos() {
        return await this.medicoService.mostrarMedicos();
    }

    @Post('receta/:idCita')
    async crearRecetaMedica(
        @Param('idCita', ParseIntPipe) idCita: number,
        @Body() crearRecetaMedicaDto: CrearRecetaMedicaDto
    ) {
        try {
            const recetaCreada = await this.medicoService.crearRecetaMedica(idCita, crearRecetaMedicaDto);
            return { message: 'Receta médica creada correctamente', receta: recetaCreada };
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Post('orden/:idCita')
    async crearOrdenMedicaParaCita(
        @Param('idCita', ParseIntPipe) idCita: number,
        @Body() crearOrdenMedicaDto: CrearOrdenMedicaDto
    ) {
        try {
            const ordenCreada = await this.medicoService.crearOrdenMedica(idCita, crearOrdenMedicaDto);
            return { message: 'Orden médica creada correctamente', orden: ordenCreada };
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Post('receta/:idReceta/medicamento')
    async agregarMedicamentoAReceta(
        @Param('idReceta', ParseIntPipe) idReceta: number,
        @Body() agregarMedicamentoDto: AgregarMedicamentoDto
    ) {
        try {
            const recetaActualizada = await this.medicoService.agregarMedicamentoAReceta(idReceta, agregarMedicamentoDto);
            return { message: 'Medicamento agregado a la receta correctamente', receta: recetaActualizada };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Post(':medicoId/horas-disponibles')
    async agregarHoraDisponible(
        @Param('medicoId', ParseIntPipe) medicoId: number,
        @Body() crearHoraDisponibleDto: CrearHoraDisponibleDto
    ) {
        return await this.medicoService.agregarHoraDisponible(medicoId, crearHoraDisponibleDto);
    }

    @Get('citas/:citaId/receta')
    async verRecetaDeCita(
        @Param('citaId', ParseIntPipe) citaId: number,
    ) {
        return await this.medicoService.verRecetaDeCita(citaId);
    }

    @Get(':medicoId/proximas-citas')
    async verProximasCitas(
        @Param('medicoId', ParseIntPipe) medicoId: number,
    ) {
        return await this.medicoService.verProximasCitas(medicoId);
    }

    @Post('ordenes-medicas/:idOrdenMedica/resultado-lab/:idResultadoLab')
    async agregarResultadoLaboratorio(
        @Param('idOrdenMedica', ParseIntPipe) idOrdenMedica: number,
        @Param('idResultadoLab', ParseIntPipe) idResultadoLab: number
    ) {
        return this.medicoService.agregarResultadoLaboratorio(idOrdenMedica, idResultadoLab);
    }

    @Post('ordenes-medicas/:idOrdenMedica/imagen-medica/:idImagenMedica')
    async agregarImagenMedica(
        @Param('idOrdenMedica', ParseIntPipe) idOrdenMedica: number,
        @Param('idImagenMedica', ParseIntPipe) idImagenMedica: number
    ) {
        return this.medicoService.agregarImagenMedica(idOrdenMedica, idImagenMedica);
    }

    @Post('ordenes-medicas/eliminar-imagen-medica')
    async eliminarImagenMedica(@Body() eliminarImagenMedicaDto: EliminarImagenMedicaDto) {
        return this.medicoService.eliminarImagenMedica(eliminarImagenMedicaDto);
    }

    @Post('ordenes-medicas/eliminar-resultado-lab')
    async eliminarResultadoLab(@Body() eliminarResultadoLabDto: EliminarResultadoLabDto) {
        return this.medicoService.eliminarResultadoLab(eliminarResultadoLabDto);
    }
}


