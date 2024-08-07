import { Controller, Post, Body, NotFoundException, Get, Patch, Put, Param, Delete } from '@nestjs/common';
import { OrdenMedicaService } from './ordenes-medicas.service';
import { ActualizarImagenMedicaDto } from 'src/imagenes-medicas/dto/imagenes-medicas.dto';
import { ActualizarResultadoLabDto } from 'src/resultados-lab/dto/resultados-lab.dto';
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
    async obtenerTodasOrdenes() {
        return this.ordenMedicaService.obtenerTodasOrdenes();
    }

    @Put(':id')
    async actualizarOrdenMedica(@Param('id') id: number, @Body() actualizarOrdenDto: ActualizarOrdenMedicaDto, @Body() actualizarImagenDto: ActualizarImagenMedicaDto, @Body() actualizarResultadoDto: ActualizarResultadoLabDto){
        try{
            const orden = await this.ordenMedicaService.actualizarOrdenMedica(id, actualizarOrdenDto, actualizarImagenDto, actualizarResultadoDto);
            return orden;
        }catch(error){
            throw new NotFoundException(error.message);
        }
    }
}
