import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { VacunaService } from './vacunas.service';
import { CrearVacunaDto } from './dto/vacuna.dto';

@Controller('vacunas')
export class VacunasController {
    constructor(private readonly vacunaService: VacunaService){}

    @Post()
    async crearVacuna(@Body() crearVacunaDto: CrearVacunaDto){
        const vacunaCreada = await this.vacunaService.crearVacuna(crearVacunaDto);
        return { message: 'Vacuna creada correctamente', vacuna: vacunaCreada};
    }

    @Get()
    async mostrarVacunas(){
        const vacunas = await this.vacunaService.mostrarVacunas();
        return { vacunas };
    }

    @Get(':id')
    async encontrarVacunaId(@Param('id', ParseIntPipe) id: number){
        const vacuna = await this.vacunaService.encontrarVacunaId(id);
        if(!vacuna){
            throw new NotFoundException(`Vacuna con ID ${id} no encontrado`);
        }
        return { vacuna };
    }

    @Delete(':id')
    async eliminarVacuna(@Param('id', ParseIntPipe) id: number){
        await this.vacunaService.eliminarVacuna(id);
        return { message: 'Vacuna eliminada correctamente' }
    }
}
