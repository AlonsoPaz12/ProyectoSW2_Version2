// citas.controller.ts
import { Controller, Get,Put,Param, NotFoundException,Query, Patch, Body, Post   } from '@nestjs/common';
import { CitaService } from './cita.service';
import { Cita } from './citas.entity';
import { ActualizarCitaDto } from './dto/citas.dto';
@Controller('citas')
export class CitaController {
  constructor(private readonly citasService: CitaService) {}

  @Get()
  async obtenerTodasCitas(): Promise<Cita[]> {
    try {
      const citas = await this.citasService.obtenerTodasCitas();
      return citas;
    } catch (error) {
      throw new NotFoundException('Error al obtener todas las citas.');
    }
  }

    @Get('medico/:id')
  async obtenerCitasPorIdMedico(@Param('id') id: string): Promise<Partial<Cita>[]> {
    const medicoId = parseInt(id, 10);
    if (isNaN(medicoId)) {
      throw new NotFoundException(`El ID proporcionado no es un número válido: ${id}`);
    }
    return this.citasService.obtenerCitasPorIdMedico(medicoId);
  }

  @Get('fecha')
  async obtenerCitasPorFecha(@Query('fecha') fecha: string): Promise<Cita[]> {
    if (!fecha) {
      throw new NotFoundException('Fecha no proporcionada');
    }
    const fechaDate = new Date(fecha);
    return this.citasService.obtenerCitasPorFecha(fechaDate);
  }
  @Get('porMedicoYPaciente')
  async obtenerCitasPorMedicoYPaciente(
    @Query('medicoId') medicoId: number,
    @Query('pacienteId') pacienteId: number
  ): Promise<Partial<Cita>[]> {
    return this.citasService.obtenerCitasPorMedicoYPaciente(medicoId, pacienteId);
  }
  @Put(':id')
async updateCita(
  @Param('id') id: number,
  @Body() updateCitaDto: any,
): Promise<{ status: string, ok: boolean, data?: Cita, message?: string }> {
  try {
    const cita = await this.citasService.updateCita(id, updateCitaDto);

    if (!cita) {
      throw new NotFoundException(`Cita con ID ${id} no encontrada`);
    }

    return {
      status: 'success',
      ok: true,
      data: cita,
    };
  } catch (error) {
    return {
      status: 'error',
      ok: false,
      message: error.message,
    };
  }
}

@Get('con-paciente/:id')
  async obtenerCitasConPaciente(@Param('id') pacienteid: number): Promise<Partial<Cita>[]> {
    try {
      const citas = await this.citasService.obtenerCitasConPaciente(pacienteid);
      return citas;
    } catch (error) {
      throw new NotFoundException(`Error al obtener las citas del paciente: ${error.message}`);
    }
  }

  
@Patch(':id')
async editarCita(@Param('id') citaId: string, @Body() actualizarCitaDto: ActualizarCitaDto): Promise<Cita> {
  const id = parseInt(citaId, 10);

  if (isNaN(id)) {
    throw new NotFoundException(`El ID proporcionado no es un número válido: ${citaId}`);
  }

  return this.citasService.editarCita(id, actualizarCitaDto);
}

@Post()
async guardarCita(@Body() cita: Cita): Promise<Cita> {
  return this.citasService.guardarCita(cita);
}

}
