import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdenMedica } from './ordenes-medicas.entity';
import { CitaModule } from 'src/citas/citas.module';
import { OrdenMedicaController } from './ordenes-medicas.controller';
import { OrdenMedicaService } from './ordenes-medicas.service';
import { Cita } from 'src/citas/citas.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([OrdenMedica, Cita]), 
        CitaModule,
    ],
    controllers: [OrdenMedicaController],
    providers: [OrdenMedicaService],
    exports: [OrdenMedicaService]
})
export class OrdenesMedicasModule {}
