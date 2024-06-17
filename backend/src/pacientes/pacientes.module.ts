// pacientes.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteController } from './pacientes.controller';
import { PacienteService } from './paciente.service';
import { Paciente } from './pacientes.entity';

import { CitaModule } from 'src/citas/citas.module';
import { RecetasMedicasModule } from 'src/recetas-medicas/recetas-medicas.module';

import { Cita } from 'src/citas/citas.entity';
import { RecetaMedica } from 'src/recetas-medicas/recetas-medicas.entity';
import { Medico } from 'src/medicos/medicos.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Paciente, Cita, RecetaMedica, Medico]),
    CitaModule,
    RecetasMedicasModule,
  ],
  controllers: [PacienteController],
  providers: [PacienteService],
  exports: [PacienteService]
})
export class PacienteModule { }
