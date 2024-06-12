import { Body, Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';
import { OrdenesMedicasService } from './ordenes-medicas.service';
import { ActualizarOrdenMedicaDto, CrearOrdenMedicaDto } from './dto/ordenes-medicas.dto';

@Controller('ordenes-medicas')
export class OrdenesMedicasController {
    constructor(private ordenesMedicasService: OrdenesMedicasService){}
    @Post()
    CrearDocumentoMedico(@Body() nuevaOrdenMedica: CrearOrdenMedicaDto){
        return this.ordenesMedicasService.CrearDocumentoMedico(nuevaOrdenMedica);
    }

    @Get()
    LeerOrdenMedica(){
        return this.ordenesMedicasService.LeerOrdenMedica();
    }

    @Get(':id')
    LeerOrdenMedicaPorId(@Param('id') id: number){
        return this.ordenesMedicasService.LeerOrdenMedicaPorId(id);
    }

    @Patch(':id')
    ActualizarOrdenMedica(@Param('id') id:number, @Body() actualizarOrdenMedicaDto: ActualizarOrdenMedicaDto){
        return this.ordenesMedicasService.ActualizarOrdenMedica(id, actualizarOrdenMedicaDto)
    }

    @Delete(':id')
    EliminarOrdenMedica(@Param('id') id:number){
        return this.ordenesMedicasService.EliminarOrdenMedica(id)
    }
}
