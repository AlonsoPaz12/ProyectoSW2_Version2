import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CitasService } from './citas.service';
import { CrearCitaDto } from './dto/citas.dto';

@Controller('citas')
export class CitasController {
    constructor(private citasService: CitasService){}

    @Post()
    CrearCita(@Body() nuevaCita: CrearCitaDto){
        return this.citasService.CrearCita(nuevaCita.motivo, nuevaCita.IDmedico, nuevaCita.Observacion, nuevaCita.IDpaciente, nuevaCita.fecha, nuevaCita.documentoMedico)
    }

    @Get('id:')
    LeerCita(@Param('id') id:String){
        return this.citasService.LeerCita(id);
    }

    @Delete(':id')
    EliminarCita(@Param('id') id: String){
        this.citasService.EliminarCita(id)
    }
}
