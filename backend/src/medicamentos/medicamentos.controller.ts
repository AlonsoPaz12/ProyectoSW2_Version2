import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { MedicamentosService } from './medicamentos.service';
import { CrearMedicamentoDto } from './dto/medicamento.dto';

@Controller('medicamentos')
export class MedicamentosController {

    constructor(private medicamentosService: MedicamentosService){};

    @Get()
    obtenerMedicamentos(){
        return this.medicamentosService.verMedicamento();
    }

    @Post()
    crearMedicamento(@Body() nuevoMedicamento: CrearMedicamentoDto){
        return this.medicamentosService.crearMedicamento(nuevoMedicamento.tipo, nuevoMedicamento.frecuencia, nuevoMedicamento.dosis)
    }

    @Delete(':id')
    eliminarMedicamento(@Param('id') id:string){
        this.medicamentosService.eliminarMedicamento(id)
    }

}
