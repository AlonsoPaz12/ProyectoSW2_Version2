import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { RecetaDetalleService } from './recetas-detalle.service';
import { CrearRecetaDetalleDto, ActualizarRecetaDetalleDto } from './dto/recetas-detalle.dto';

@Controller('recetas-detalle')
export class RecetaDetalleController {
  constructor(private readonly recetaDetalleService: RecetaDetalleService) {}

  @Post()
  async crearRecetaDetalle(@Body() crearRecetaDetalleDto: CrearRecetaDetalleDto) {
    return this.recetaDetalleService.crearRecetaDetalle(crearRecetaDetalleDto);
  }

  @Get()
  async obtenerRecetaDetalles() {
    return this.recetaDetalleService.obtenerRecetaDetalles();
  }

  @Get(':id')
  async obtenerRecetaDetallePorId(@Param('id') id: number) {
    return this.recetaDetalleService.obtenerRecetaDetallePorId(id);
  }

  @Put(':id')
  async actualizarRecetaDetalle(@Param('id') id: number, @Body() actualizarRecetaDetalleDto: ActualizarRecetaDetalleDto) {
    return this.recetaDetalleService.actualizarRecetaDetalle(id, actualizarRecetaDetalleDto);
  }

  @Delete(':id')
  async eliminarRecetaDetalle(@Param('id') id: number) {
    return this.recetaDetalleService.eliminarRecetaDetalle(id);
  }
  
  }

