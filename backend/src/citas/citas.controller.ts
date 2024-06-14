import { Controller, Get, Post, Body, Param, Delete, Patch, NotFoundException } from '@nestjs/common';
import { CitasService } from './citas.service';
import { CrearCitaDto, AgregarRecetaDto, AgregarOrdenDto } from './dto/citas.dto';

@Controller('citas')
export class CitasController {
    constructor(
        private readonly citasService: CitasService,
    ) {}

    @Post()
    async crearCita(@Body() crearCitaDto: CrearCitaDto) {
        const nuevaCita = await this.citasService.crearCita(crearCitaDto);
        return nuevaCita;
    }

    @Get(':id')
    async obtenerCitaPorId(@Param('id') id: number) {
        try {
            const cita = await this.citasService.obtenerCitaPorId(id);
            return cita;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(`Cita con ID ${id} no encontrada`);
            }
            throw error; // Lanza otros errores no manejados explícitamente
        }
    }

    @Delete(':id')
    async eliminarCita(@Param('id') id: number) {
        await this.citasService.eliminarCita(id);
    }

    @Patch(':id/receta')
    async agregarRecetaMedica(@Param('id') id: number, @Body() agregarRecetaDto: AgregarRecetaDto) {
        const { recetaId } = agregarRecetaDto;

        try {
            const cita = await this.citasService.agregarRecetaMedica(id, recetaId);
            return cita;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(`No se pudo agregar la receta médica a la cita con ID ${id}`);
            }
            throw error; // Lanza otros errores no manejados explícitamente
        }
    }

    @Patch(':id/orden') 
    async agregarOrdenMedica(@Param('id') id: number, @Body() agregarOrdenDto: AgregarOrdenDto) {
        const { ordenId } = agregarOrdenDto;
        
        try {
            const cita = await this.citasService.agregarOrdenMedica(id, ordenId);
            return cita;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(`No se pudo agregar la orden médica a la cita con ID ${id}`);
            }
            throw error; // Lanza otros errores no manejados explícitamente
        }
    }

    @Get('proximas/:idMedico')
    async obtenerProximasCitasMedico(@Param('idMedico') idMedico: number) {
        const citas = await this.citasService.obtenerProximasCitasMedico(+idMedico);
        return citas;
    }
}

