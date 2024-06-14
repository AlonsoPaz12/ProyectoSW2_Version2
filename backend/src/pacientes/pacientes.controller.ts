// pacientes.controller.ts

import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { CrearPacienteDto, ActualizarPacienteDto } from './dto/paciente.dto';

@Controller('pacientes')
export class PacientesController {
    constructor(private readonly pacientesService: PacientesService) {}

    @Post()
    async crearPaciente(@Body() crearPacienteDto: CrearPacienteDto) {
        return this.pacientesService.crearPaciente(crearPacienteDto);
    }

    @Put(':id')
    async actualizarPaciente(@Param('id') id: number, @Body() actualizarPacienteDto: ActualizarPacienteDto) {
        return this.pacientesService.actualizarPaciente(id, actualizarPacienteDto);
    }

    @Get()
    async verPacientes() {
        return this.pacientesService.verPacientes();
    }

    @Get(':id')
    async obtenerPacientePorId(@Param('id') id: number) {
        return this.pacientesService.obtenerPacientePorId(id);
    }

    @Post('citas')
    async registrarCita(@Body() body: any) {
        const { motivo, IDmedico, observacion, IDpaciente, fecha, documentoMedico } = body;
        return this.pacientesService.registrarCita(motivo, IDmedico, observacion, IDpaciente, fecha, documentoMedico);
    }

    @Delete('citas/:idCita/pacientes/:idPaciente')
    async anularCita(@Param('idCita') idCita: number, @Param('idPaciente') idPaciente: number) {
        return this.pacientesService.anularCita(idCita, idPaciente);
    }

    @Get(':id/historial-citas')
    async visualizarHistorialCitas(@Param('id') id: number) {
        return this.pacientesService.visualizarHistorialCitas(id);
    }

    @Get(':id/medicamentos/:idcita')
    async visualizarMedicamentos(@Param('id') id: number, @Param('idcita') idcita: number) {
        return this.pacientesService.visualizarMedicamentos(id, idcita);
    }

    @Get(':id/recetas-medicas')
    async visualizarRecetasMedicas(@Param('id') id: number) {
        return this.pacientesService.visualizarRecetasMedicas(id);
    }
}

