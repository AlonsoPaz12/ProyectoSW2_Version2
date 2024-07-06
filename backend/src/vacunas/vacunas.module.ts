import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from 'src/medicos/medicos.entity';
import { Paciente } from 'src/pacientes/pacientes.entity';
import { Vacuna } from './vacunas.entity';
import { VacunasController } from './vacunas.controller';
import { VacunaService } from './vacunas.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Paciente, Medico, Vacuna]),
    ],
    controllers: [VacunasController],
    providers: [VacunaService],
    exports: [VacunaService]
})
export class VacunasModule {}
