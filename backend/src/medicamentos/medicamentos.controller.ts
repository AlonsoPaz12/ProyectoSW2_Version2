import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, HttpStatus } from '@nestjs/common';
import { MedicamentoService } from './medicamentos.service';
import { CrearMedicamentoDto, ActualizarMedicamentoDto } from './dto/medicamento.dto';

@Controller('medicamentos')
export class MedicamentoController {
    constructor(private readonly medicamentoService: MedicamentoService) {}

    @Post()
    async crearMedicamento(@Body() crearMedicamentoDto: CrearMedicamentoDto) {
        try {
            const medicamento = await this.medicamentoService.crearMedicamento(crearMedicamentoDto);
            return { medicamento };
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Put(':id')
    async editarMedicamento(@Param('id') id: number, @Body() actualizarMedicamentoDto: ActualizarMedicamentoDto) {
        try {
            const medicamento = await this.medicamentoService.editarMedicamento(id, actualizarMedicamentoDto);
            return { medicamento };
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Delete(':id')
    async eliminarMedicamento(@Param('id') id: number) {
        try {
            await this.medicamentoService.eliminarMedicamento(id);
            return { message: 'Medicamento eliminado correctamente' };
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
}
