import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { ResultadoLabService } from './resultados-lab.service';
import { CrearResultadoLabDto, ActualizarResultadoLabDto } from './dto/resultados-lab.dto';

@Controller('resultados-lab')
export class ResultadoLabController {
  constructor(private readonly resultadoLabService: ResultadoLabService) {}

  @Post()
  async crearResultadoLab(@Body() crearResultadoLabDto: CrearResultadoLabDto) {
    return this.resultadoLabService.crearResultadoLab(crearResultadoLabDto);
  }

  @Get()
  async obtenerResultadosLab() {
    return this.resultadoLabService.obtenerResultadosLab();
  }

  @Get(':id')
  async obtenerResultadoLabPorId(@Param('id') id: number) {
    return this.resultadoLabService.obtenerResultadoLabPorId(id);
  }

  @Put(':id')
  async actualizarResultadoLab(@Param('id') id: number, @Body() actualizarResultadoLabDto: ActualizarResultadoLabDto) {
    return this.resultadoLabService.actualizarResultadoLab(id, actualizarResultadoLabDto);
  }

  @Delete(':id')
  async eliminarResultadoLab(@Param('id') id: number) {
    return this.resultadoLabService.eliminarResultadoLab(id);
  }
}
