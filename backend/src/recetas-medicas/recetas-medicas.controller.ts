import { Controller, Get, Post, Body, Param, Delete, NotFoundException } from '@nestjs/common';
import { RecetasMedicasService } from './recetas-medicas.service';
import { CrearRecetaMedicaDto } from './dto/recetas-medicas.dto';
import { Medicamento } from 'src/medicamentos/medicamentos.entity';

@Controller('recetas-medicas')
export class RecetasMedicasController {
    constructor(private recetasMedicasService: RecetasMedicasService){}

    @Post()
    async crearRecetaMedica(@Body() recetaDto: CrearRecetaMedicaDto) {
        return this.recetasMedicasService.crearDocumentoMedico(recetaDto);
    }
    
    @Get(':id')
    obtenerRecetaPorId(@Param('id') id: number){
        return this.recetasMedicasService.obtenerRecetaPorId(id);
    }

    @Post(':id/medicamentos')
    async agregarMedicamentoAReceta(@Param('id') id: number, @Body() medicamento: Medicamento) {
        try {
            const recetaActualizada = await this.recetasMedicasService.agregarMedicamentoAReceta(id, medicamento);
            return recetaActualizada;
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Delete(':id')
    async eliminarRecetaMedica(@Param('id') id: number) {
        try {
            await this.recetasMedicasService.eliminarReceta(id);
        } catch (error) {
            throw new NotFoundException(`Receta médica con ID ${id} no encontrada`);
        }
    }

    @Get('medico/:idMedico')
    async obtenerRecetasPorMedico(@Param('idMedico') idMedico: number) {
        try {
            const recetas = await this.recetasMedicasService.obtenerRecetasPorMedico(idMedico);
            return recetas;
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
}
