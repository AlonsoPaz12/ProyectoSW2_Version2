// pacientes.controller.ts
import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, NotFoundException } from '@nestjs/common'; // Asegúrate de importar NotFoundException aquí
import { PacienteService } from './paciente.service';
import { CrearPacienteDto, CrearCitaDto } from './dto/paciente.dto';

@Controller('pacientes')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Post()
  async crearPaciente(@Body() crearPacienteDto: CrearPacienteDto) {
    const pacienteCreado = await this.pacienteService.crearPaciente(crearPacienteDto);
    return { message: 'Paciente creado correctamente', paciente: pacienteCreado };
  }

  @Get()
  async mostrarPacientes() {
    const pacientes = await this.pacienteService.mostrarPacientes();
    return { pacientes };
  }

  @Get(':id')
  async encontrarPacienteId(@Param('id', ParseIntPipe) id: number) {
    const paciente = await this.pacienteService.encontrarPacienteId(id);
    if (!paciente) {
      throw new NotFoundException(`Paciente con ID ${id} no encontrado`);
    }
    return { paciente };
  }

  @Delete(':id')
  async eliminarPaciente(@Param('id', ParseIntPipe) id: number) {
    await this.pacienteService.eliminarPaciente(id);
    return { message: 'Paciente eliminado correctamente' };
  }

  @Post('agendar-cita')
  async agendarCita(@Body() crearCitaDto: CrearCitaDto) {
    const citaAgendada = await this.pacienteService.agendarCita(crearCitaDto);
    return { message: 'Cita agendada correctamente', cita: citaAgendada };
  }

  @Post('anular-cita/:idCita')
  async anularCita(@Param('idCita', ParseIntPipe) idCita: number) {
    await this.pacienteService.anularCita(idCita);
    return { message: 'Cita anulada correctamente' };
  }

  @Get(':idPaciente/citas')
  async visualizarCitas(@Param('idPaciente', ParseIntPipe) idPaciente: number) {
    const citas = await this.pacienteService.visualizarCitas(idPaciente);
    return { citas };
  }

  @Get('cita/:idCita/receta')
  async visualizarRecetaMedicaPorCita(@Param('idCita', ParseIntPipe) idCita: number) {
    const receta = await this.pacienteService.visualizarRecetaMedicaPorCita(idCita);
    return { receta };
  }
}
