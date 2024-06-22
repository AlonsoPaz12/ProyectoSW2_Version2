import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdenMedica } from './ordenes-medicas.entity';
import { CitaModule } from 'src/citas/citas.module';
import { OrdenMedicaController } from './ordenes-medicas.controller';
import { OrdenMedicaService } from './ordenes-medicas.service';
import { Cita } from 'src/citas/citas.entity';
import { Paciente } from 'src/pacientes/pacientes.entity';
import { Medico } from 'src/medicos/medicos.entity'

@Module({
    imports: [
        TypeOrmModule.forFeature([OrdenMedica, Cita, Medico, Paciente]), 
        CitaModule,
    ],
    controllers: [OrdenMedicaController],
    providers: [OrdenMedicaService],
    exports: [OrdenMedicaService]
})
export class OrdenesMedicasModule {}


