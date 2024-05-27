import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MedicosService } from './medicos.service';
import { CrearRecetaMedicaDto } from 'src/recetas-medicas/dto/recetas-medicas.dto';
import { CrearImagenMedicaDto } from 'src/imagenes-medicas/dto/imagenes-medicas.dto';
import { CrearResultadoLabDto } from 'src/resultados-lab/dto/resultados-lab.dto';

@Controller('medicos')
export class MedicosController {
    constructor(private medicoService: MedicosService){}

    @Get()
    LeerMedico(){
        return this.medicoService.LeerMedico();
    }

    @Get(':idmed')
    visualizarProximasCitas(@Param('idmed') idmed: String){
        return this.medicoService.VisualizacionProximasCitas(idmed);
    }

    @Get('recetas/medicas/:idpac/:idmed')
    visualizarRecetasMedicas(@Param('idpac') idpac:String, @Param('idmed') idmed: String){
        return this.medicoService.VisualizarRecetasMedicas(idpac,idmed);
    }

    @Get('resultados/de/laboratorio/:idpac/:idmed')
    visualizarResultadosLab(@Param('idpac') idpac:String, @Param('idmed') idmed: String){
        return this.medicoService.VisualizacionResultadosLaboratorio(idpac,idmed)
    }

    @Post('AgregarReceta/:idcita/:IDMedico')
    agregarRecetaMedica(
        @Body() nuevaReceta: CrearRecetaMedicaDto, 
        @Param('idcita') idcita: String,
        @Param('IDMedico') IDMedico: String
    ){
        return this.medicoService.AgregarRecetaMedica(nuevaReceta.observacion,nuevaReceta.medicamento, idcita, IDMedico)
    }

    @Post('AgregarImagen/:idcita/:IDMedico')
    agregarImagenMedica(
        @Body() nuevaImagen: CrearImagenMedicaDto,
        @Param('idcita') idcita: String,
        @Param('IDMedico') IDMedico: String
    ){
        return this.medicoService.AgregarImagenMedica(idcita, IDMedico, nuevaImagen.tipo, nuevaImagen.imagen, nuevaImagen.nombrePaciente)
    }

    @Post('AgregarResultadoLab/:idcita/:IDMedico')
    agregarResultadoLab(
        @Body() nuevoRes: CrearResultadoLabDto,
        @Param('idcita') idcita: String,
        @Param('IDMedico') IDMedico: String
    ){
        return this.medicoService.AgregarResultadoLab(idcita, IDMedico, nuevoRes.tipo, nuevoRes.resultado, nuevoRes.Nombrepaciente)
    }

}
