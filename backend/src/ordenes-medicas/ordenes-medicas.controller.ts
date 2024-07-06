import { Controller, Post, Body, NotFoundException, Get, Patch, Param, Delete } from '@nestjs/common';
import { OrdenMedicaService } from './ordenes-medicas.service';
import { CrearOrdenMedicaDto, ActualizarOrdenMedicaDto } from './dto/ordenes-medicas.dto';
import { OrdenMedica } from './ordenes-medicas.entity';

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

    @Get()
    async findAll(): Promise<OrdenMedica[]> {
        return this.ordenMedicaService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<OrdenMedica> {
        return this.ordenMedicaService.findOne(+id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateOrdenMedicaDto: ActualizarOrdenMedicaDto): Promise<OrdenMedica> {
        return this.ordenMedicaService.update(+id, updateOrdenMedicaDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.ordenMedicaService.remove(+id);
    }
}
