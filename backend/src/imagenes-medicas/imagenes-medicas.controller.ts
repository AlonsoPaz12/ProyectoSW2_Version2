import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { ImagenesMedicasService } from './imagenes-medicas.service';
import { CrearImagenMedicaDto } from './dto/imagenes-medicas.dto';

@Controller('imagenes-medicas')
export class ImagenesMedicasController {
    constructor(private imagenMedicaService: ImagenesMedicasService){}

    @Get()
    LeerResultados(){
        return this.imagenMedicaService.LeerResultados();
    }

    @Post()
    crearResultado(@Body() nuevaImagenMedica: CrearImagenMedicaDto){
        return this.imagenMedicaService.crearResultado(nuevaImagenMedica.tipo, nuevaImagenMedica.imagen, nuevaImagenMedica.nombrePaciente);
    }

    @Get(':id')
    LeerResultadoPorId(@Param('id') id:String){
        return this.imagenMedicaService.LeerResultadoPorId(id);
    }

    @Delete(':id')
    EliminarResultado(@Param('id') id:String){
        this.imagenMedicaService.EliminarResultado(id);
        return "Imagen eliminada"
    }
}
