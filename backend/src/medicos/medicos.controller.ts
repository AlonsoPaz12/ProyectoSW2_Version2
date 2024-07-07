//medicos.controller.ts

import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { MedicoService } from './medicos.service';

import { CrearMedicoDto } from './dto/medicos.dto';
import { CrearRecetaMedicaDto } from 'src/recetas-medicas/dto/recetas-medicas.dto';
import { CrearOrdenMedicaDto } from 'src/ordenes-medicas/dto/ordenes-medicas.dto';
import { AgregarMedicamentoDto } from './dto/medicos.dto';
import { CrearHoraDisponibleDto } from 'src/horario-disponible/dto/horario-disponible.dto';

@Controller('medicos')
export class MedicoController {
  constructor(private readonly medicoService: MedicoService) {}

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
    return this.medicoService.mostrarMedicos();
  }

  @Post('orden')
  async crearOrdenMedica(
    @Body() crearOrdenMedicaDto: CrearOrdenMedicaDto,
  ) {
    try {
      const ordenCreada = await this.medicoService.crearOrdenMedica(crearOrdenMedicaDto);
      return { message: 'Orden médica creada correctamente', orden: ordenCreada };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post('receta')
  async crearRecetaMedica(@Body() crearRecetaMedicaDto: CrearRecetaMedicaDto) {
    try {
      const recetaCreada = await this.medicoService.crearRecetaMedica(crearRecetaMedicaDto);
      return { message: 'Receta médica creada correctamente', receta: recetaCreada };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post('receta/:idReceta/medicamento')
  async agregarMedicamentoAReceta(
    @Param('idReceta') idReceta: number,
    @Body() agregarMedicamentoDto: AgregarMedicamentoDto,
  ) {
    try {
      const recetaActualizada = await this.medicoService.agregarMedicamentoAReceta(idReceta, agregarMedicamentoDto);
      return { message: 'Medicamento agregado correctamente a la receta', receta: recetaActualizada };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
/*
  @Post(':medicoId/hora-disponible')
  async agregarHoraDisponible(
    @Param('medicoId') medicoId: number,
    @Body() crearHoraDisponibleDto: CrearHoraDisponibleDto,
  ) {
    try {
      const horaDisponible = await this.medicoService.agregarHoraDisponible(medicoId, crearHoraDisponibleDto);
      return { message: 'Hora disponible agregada correctamente', horaDisponible };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
    */
   
  @Get()
  async findAll() {
    try {
      const medicos = await this.medicoService.findAll();
      return { message: 'Médicos obtenidos correctamente', medicos };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get(':citaId/receta')
  async verRecetaDeCita(@Param('citaId') citaId: number) {
    try {
      const receta = await this.medicoService.verRecetaDeCita(citaId);
      return { message: 'Receta obtenida correctamente', receta };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get(':medicoId/proximas-citas')
  async verProximasCitas(@Param('medicoId') medicoId: number) {
    try {
      const proximasCitas = await this.medicoService.verProximasCitas(medicoId);
      return { message: 'Próximas citas obtenidas correctamente', proximasCitas };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get('pacientes/citas/:id')
  async verHistorialCitas(@Param('id') id: number){
    return this.medicoService.verHistorialCitas(id);
  }
}