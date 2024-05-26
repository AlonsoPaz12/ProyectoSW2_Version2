import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { ImagenesMedicasService } from './imagenes-medicas.service';
import { CrearImagenMedicaDto } from './dto/imagenes-medicas.dto';

@Controller('imagenes-medicas')
export class ImagenesMedicasController {
    constructor(private imagenMedicaService: ImagenesMedicasService){}

    @Post()
    crearResultado(@Body() nuevaImagenMedica: CrearImagenMedicaDto){
        return this.imagenMedicaService.crearResultado(nuevaImagenMedica.tipo, nuevaImagenMedica.imagen, nuevaImagenMedica.nombrePaciente);
    }

    @Get(':id')
    LeerResultado(@Param('id') id:String){
        return this.imagenMedicaService.LeerResultado(id);
    }

    @Delete(':id')
    EliminarResultado(@Param('id') id:String){
        this.imagenMedicaService.EliminarResultado(id);
        return "Imagen eliminada"
    }
}
