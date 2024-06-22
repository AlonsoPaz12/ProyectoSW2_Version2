import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { ImagenesMedicasService } from './imagenes-medicas.service';
import { CrearImagenMedicaDto, ActualizarImagenMedicaDto } from './dto/imagenes-medicas.dto';

@Controller('imagenes-medicas')
export class ImagenesMedicasController {
    constructor(private readonly imagenesMedicasService: ImagenesMedicasService) {}

    @Post()
    async crearImagenMedica(@Body() crearImagenMedicaDto: CrearImagenMedicaDto) {
        return this.imagenesMedicasService.crearImagenMedica(crearImagenMedicaDto);
    }

    @Get()
    async mostrarImagenesMedicas() {
        return this.imagenesMedicasService.mostrarImagenesMedicas();
    }

    @Get(':id')
    async obtenerImagenMedicaPorId(@Param('id') id: number) {
        return this.imagenesMedicasService.obtenerImagenMedicaPorId(id);
    }

    @Put(':id')
    async actualizarImagenMedica(@Param('id') id: number, @Body() actualizarImagenMedicaDto: ActualizarImagenMedicaDto) {
        return this.imagenesMedicasService.actualizarImagenMedica(id, actualizarImagenMedicaDto);
    }

    @Delete(':id')
    async eliminarImagenMedica(@Param('id') id: number) {
        return this.imagenesMedicasService.eliminarImagenMedica(id);
    }
}
