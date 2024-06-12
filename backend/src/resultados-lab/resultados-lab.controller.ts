import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CrearResultadoLabDto, ActualizarResultadoLabDto } from './dto/resultados-lab.dto';
import { ResultadosLabService } from './resultados-lab.service';

@Controller('resultados-lab')
export class ResultadosLabController {

    constructor(private resultadoLabService: ResultadosLabService){}

    @Get()
    LeerResultado(){
        return this.resultadoLabService.LeerResultados();
    }

    @Post()
    crearResultado(@Body() nuevoResultadoLab: CrearResultadoLabDto){
        return this.resultadoLabService.crearResultado(nuevoResultadoLab);
    }

    @Get(':id')
    LeerResultadoPorId(@Param('id') id:number){
        return this.resultadoLabService.LeerResultadoPorId(id);
    }

    @Put(':id')
    ActualizarResultado(@Param('id') id: number, @Body() actualizarResultadoLabDto: ActualizarResultadoLabDto){
        return this.resultadoLabService.ActualizarResultado(id, actualizarResultadoLabDto)
    }

    @Delete(':id')
    EliminarResultado(@Param('id') id:number){
        this.resultadoLabService.EliminarResultado(id);
        return "Resultado eliminado"
    }

}
