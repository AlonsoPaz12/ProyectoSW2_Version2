import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { OrdenMedicaService } from './ordenes-medicas.service';
import { CrearOrdenMedicaDto } from './dto/ordenes-medicas.dto';

@Controller('ordenes-medicas')
export class OrdenMedicaController {
    constructor(private readonly ordenMedicaService: OrdenMedicaService) {}

    @Post()
    async crearOrdenMedica(@Body() crearOrdenMedicaDto: CrearOrdenMedicaDto) {
        try {
            const ordenCreada = await this.ordenMedicaService.crearDocumentoMedico(crearOrdenMedicaDto);
            return { message: 'Orden médica creada correctamente', ordenMedica: ordenCreada };
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
}
