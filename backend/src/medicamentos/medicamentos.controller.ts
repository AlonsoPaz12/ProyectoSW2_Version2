import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Medicamento } from './medicamentos.entity';
import { MedicamentosService } from './medicamentos.service';
import { CrearMedicamentoDto } from './dto/medicamento.dto';

@Controller('medicamentos')
export class MedicamentosController {
  constructor(private readonly medicamentosService: MedicamentosService) {}

  @Post('create')
  async crearMedicamento(@Body() medicamento: CrearMedicamentoDto) {
    return this.medicamentosService.crearMedicamento(medicamento);
  }

  @Get(':id')
  async verMedicamentoPorId(@Param('id') id: number) {
    return this.medicamentosService.verMedicamentoPorId(id);
  }

  @Get()
  async verMedicamentos() {
    return this.medicamentosService.verMedicamentos();
  }

  @Delete(':id')
  async eliminarMedicamento(@Param('id') id: number) {
    return this.medicamentosService.eliminarMedicamento(id);
  }

  @Put(':id')
  async actualizarMedicamento(@Param('id') id: number, @Body() medicamento: Medicamento) {
    return this.medicamentosService.actualizarMedicamento(id, medicamento);
  }

  @Get('buscar/:nombre')
  async buscarMedicamentoPorNombre(@Param('nombre') nombre: string) {
    return this.medicamentosService.buscarMedicamentoPorNombre(nombre);
  }
}
