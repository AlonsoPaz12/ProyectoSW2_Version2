import { Controller, Post, Body, Param, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { RecetaService } from './recetas-medicas.service';
import { CrearRecetaMedicaDto } from './dto/recetas-medicas.dto';

@Controller('recetas')
export class RecetaMedicaController {
    constructor(private readonly recetaService: RecetaService) {}

    @Post()
    async crearRecetaMedica(@Body() crearRecetaMedicaDto: CrearRecetaMedicaDto) {
        try {
            const recetaCreada = await this.recetaService.crearDocumentoMedico(crearRecetaMedicaDto);
            return { message: 'Receta médica creada correctamente', receta: recetaCreada };
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
}
