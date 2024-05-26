import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CrearResultadoLabDto } from './dto/resultados-lab.dto';
import { ResultadosLabService } from './resultados-lab.service';

@Controller('resultados-lab')
export class ResultadosLabController {

    constructor(private resultadoLabService: ResultadosLabService){}

    @Post()
    crearResultado(@Body() nuevoResultadoLab: CrearResultadoLabDto){
        return this.resultadoLabService.crearResultado(nuevoResultadoLab.tipo, nuevoResultadoLab.resultado, nuevoResultadoLab.Nombrepaciente);
    }

    @Get(':id')
    LeerResultado(@Param('id') id:String){
        return this.resultadoLabService.LeerResultado(id);
    }

    @Delete(':id')
    EliminarResultado(@Param('id') id:string){
        this.resultadoLabService.EliminarResultado(id);
    }

}
