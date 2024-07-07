// citas.controller.ts
import { Controller, Get, Param, NotFoundException, Query  } from '@nestjs/common';
import { CitaService } from './cita.service';
import { Cita } from './citas.entity';

@Controller('citas')
export class CitaController {
  constructor(private readonly citasService: CitaService) {}

    @Get()
    async obtenerTodasCitas(): Promise<Cita[]> {
      return this.citasService.obtenerTodasCitas();
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
}
