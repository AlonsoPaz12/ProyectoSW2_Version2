import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdenesMedicasService } from './ordenes-medicas.service';
import { CrearOrdenMedicaDto } from './dto/ordenes-medicas.dto';

@Controller('ordenes-medicas')
export class OrdenesMedicasController {
    constructor(private ordenesMedicasService: OrdenesMedicasService){}
    @Post()
    CrearDocumentoMedico(@Body() nuevaOrdenMedica: CrearOrdenMedicaDto){
        return this.ordenesMedicasService.CrearDocumentoMedico(nuevaOrdenMedica.resultadosExamen,nuevaOrdenMedica.observacion);
    }

    @Get(':id')
    LeerOrdenMedica(@Param('id') id: String){
        return this.ordenesMedicasService.LeerOrdenMedica(id);
    }
}
