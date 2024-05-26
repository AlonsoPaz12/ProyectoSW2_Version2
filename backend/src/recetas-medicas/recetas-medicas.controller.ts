import { Body, Controller, Param, Post, Get, Delete } from '@nestjs/common';
import { RecetasMedicasService } from './recetas-medicas.service';
import { CrearOrdenMedicaDto } from 'src/ordenes-medicas/dto/ordenes-medicas.dto';
import { CrearRecetaMedicaDto } from './dto/recetas-medicas.dto';

@Controller('recetas-medicas')
export class RecetasMedicasController {
    constructor(private recetasMedicasService: RecetasMedicasService){}

    @Post()
    CrearRecetaMedica(@Body() nuevaRecetaMedica: CrearRecetaMedicaDto){
        return this.recetasMedicasService.CrearDocumentoMedico(nuevaRecetaMedica.medicamento, nuevaRecetaMedica.observacion);
    }
    
    @Get(':id')
    LeerRecetaMedica(@Param('id') id: String){
        return this.recetasMedicasService.LeerReceta(id);
    }

    @Delete(':id')
    EliminarRecetaMedica(@Param('id') id:String){
        this.recetasMedicasService.EliminarReceta(id);
    }
}
