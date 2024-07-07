// src/citas/cita.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cita } from './citas.entity';
import { CitaService } from './cita.service';
import { CitaController } from './citas.controller';
import { Medico } from 'src/medicos/medicos.entity';
import { Paciente } from 'src/pacientes/pacientes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cita,Medico, Paciente])],
  providers: [CitaService],
  controllers: [CitaController],
  exports: [CitaService],
})
export class CitaModule {}
