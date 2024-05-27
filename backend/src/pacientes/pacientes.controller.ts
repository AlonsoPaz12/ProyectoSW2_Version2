import { Body, Controller, Delete, Param, Post, Get } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { CrearCitaDto } from 'src/citas/dto/citas.dto';

@Controller('pacientes')
export class PacientesController {
    constructor(private pacienteService: PacientesService){}

    @Get()
    LeerPaciente(){
        return this.pacienteService.LeerPaciente();
    }

    @Post(':IDpaciente')
    registrarCita(@Body() nuevaCita: CrearCitaDto){
        return this.pacienteService.registrarCita(nuevaCita.motivo, nuevaCita.IDmedico, nuevaCita.Observacion, nuevaCita.IDpaciente, nuevaCita.fecha, nuevaCita.documentoMedico);
    }

    @Delete(':id/:idpac')
    anularCita(@Param('id') id: String, @Param('idpac') idpac:String){
        this.pacienteService.anularCita(id, idpac);
    }

    @Get(':idpac')
    visualizarHistorialCitas(@Param('idpac') idpac:String){
        return this.pacienteService.visualizarHistorialCitas(idpac);
    }

    @Get(':id/:idpac')
    visualizarMedicamentos(@Param('id') id:String, @Param('idpac') idpac:String){
        return this.pacienteService.visualizarMedicamentos(id,idpac);
    }

    @Get('recetas/medicas/:idpac')
    visualizarRecetasMedicas(@Param('idpac') idpac:String){
        return this.pacienteService.visualizarRecetasMedicas(idpac);
    }
}
