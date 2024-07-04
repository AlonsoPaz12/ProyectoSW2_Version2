import { Controller, Post, Body, Put, Param, NotFoundException, Get } from '@nestjs/common';
import { ImagenMedicaService } from './imagenes-medicas.service';
import { CrearImagenMedicaDto, ActualizarImagenMedicaDto } from './dto/imagenes-medicas.dto';

@Controller('imagenes-medicas')
export class ImagenMedicaController {
  constructor(private readonly imagenMedicaService: ImagenMedicaService) {}

  @Post()
  async crearImagenMedica(@Body() crearImagenMedicaDto: CrearImagenMedicaDto) {
    return await this.imagenMedicaService.crearImagenMedica(crearImagenMedicaDto);
  }

  @Put(':id')
  async actualizarImagenMedica(
    @Param('id') id: string,
    @Body() actualizarImagenMedicaDto: ActualizarImagenMedicaDto,
  ) {
    const imagenMedica = await this.imagenMedicaService.actualizarImagenMedica(+id, actualizarImagenMedicaDto);
    if (!imagenMedica) {
      throw new NotFoundException('Imagen médica no encontrada');
    }
    return imagenMedica;
  }

  @Get()
  async obtenerImagenesMedicas() {
    return await this.imagenMedicaService.obtenerTodasImagenesMedicas();
  }
}
