import { Controller, Post, Body, Param, NotFoundException, ParseIntPipe, Get, Logger,Delete} from '@nestjs/common';
import { RecetaService } from './recetas-medicas.service';
import { CrearRecetaMedicaDto } from './dto/recetas-medicas.dto';

@Controller('recetas')
export class RecetaMedicaController {
    private readonly logger = new Logger(RecetaMedicaController.name);

    constructor(private readonly recetaService: RecetaService) {}

    @Post()
    async crearRecetaMedica(@Body() crearRecetaMedicaDto: CrearRecetaMedicaDto) {
        this.logger.log('Método crearRecetaMedica llamado');
        try {
            const recetaCreada = await this.recetaService.crearDocumentoMedico(crearRecetaMedicaDto);
            return { message: 'Receta médica creada correctamente', receta: recetaCreada };
        } catch (error) {
            this.logger.error(error.message);
            throw new NotFoundException(error.message);
        }
    }

    @Post('agregar-medicamento')
    async agregarMedicamentoAReceta(@Body() body: { recetaId: number, medicamentoId: number }) {
        const { recetaId, medicamentoId } = body;
        return await this.recetaService.agregarMedicamentoAReceta(recetaId, medicamentoId);
    }

    @Get()
    async obtenerTodasRecetas() {
        this.logger.log('Método obtenerTodasRecetas llamado');
        try {
            const recetas = await this.recetaService.obtenerTodasRecetas();
            return recetas;
        } catch (error) {
            this.logger.error(error.message);
            throw new NotFoundException(error.message);
        }
    }
    @Delete(':recetaId/medicamentos/:medicamentoId')
    async eliminarMedicamentoDeReceta(
        @Param('recetaId', ParseIntPipe) recetaId: number,
        @Param('medicamentoId', ParseIntPipe) medicamentoId: number,
    ) {
        return this.recetaService.eliminarMedicamentoDeReceta(recetaId, medicamentoId);
    }
}
