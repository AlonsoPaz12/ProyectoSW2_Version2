//imagenes-medicas.controller
import { Body, Controller, Get, Param, Post, Delete, Put } from '@nestjs/common';
import { ImagenesMedicasService } from './imagenes-medicas.service';
import { CrearImagenMedicaDto, ActualizarImagenMedicaDto } from './dto/imagenes-medicas.dto';

@Controller('imagenes-medicas')
export class ImagenesMedicasController {
    constructor(private imagenMedicaService: ImagenesMedicasService){}

    @Get()
    LeerResultados(){
        return this.imagenMedicaService.LeerResultados();
    }

    @Post()
    crearResultado(@Body() nuevaImagenMedica: CrearImagenMedicaDto){
        return this.imagenMedicaService.crearResultado(nuevaImagenMedica);
    }

    @Get(':id')
    LeerResultadoPorId(@Param('id') id:number){
        return this.imagenMedicaService.LeerResultadoPorId(id);
    }

    @Put(':id')
    ActualizarResultado(@Param('id') id:number, @Body() actualizarImagenMedica: ActualizarImagenMedicaDto ){
        return this.imagenMedicaService.ActualizarResultado(id, actualizarImagenMedica);
    }

    @Delete(':id')
    EliminarResultado(@Param('id') id:number){
        this.imagenMedicaService.EliminarResultado(id);
        return "Imagen eliminada"
    }
}
