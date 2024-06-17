// medicos.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MedicoController } from './medicos.controller';

import { MedicoService } from './medicos.service';

import { Medico } from './medicos.entity';
import { Medicamento } from 'src/medicamentos/medicamentos.entity';
import { ResultadoLab } from 'src/resultados-lab/resultados-lab.entity';
import { ImagenMedica } from 'src/imagenes-medicas/imagenes-medicas.entity';
import { RecetaMedica } from 'src/recetas-medicas/recetas-medicas.entity';
import { Paciente } from 'src/pacientes/pacientes.entity';
import { Cita } from 'src/citas/citas.entity';
import { HoraDisponible } from 'src/horario-disponible/hora-disponible.entity';
import { OrdenMedica } from 'src/ordenes-medicas/ordenes-medicas.entity';
import { Especialidad } from 'src/especialidades/especialidades.entity';

import { MedicamentoModule } from 'src/medicamentos/medicamento.module';
import { ResultadoLabModule } from 'src/resultados-lab/resultados-lab.module';
import { ImagenMedicaModule } from 'src/imagenes-medicas/imagenes-medica.module';
import { RecetasMedicasModule } from 'src/recetas-medicas/recetas-medicas.module';
import { PacienteModule } from 'src/pacientes/pacientes.module';
import { CitaModule } from 'src/citas/citas.module';
import { HoraDisponibleModule } from 'src/horario-disponible/horario-disponible.module';
import { OrdenesMedicasModule } from 'src/ordenes-medicas/ordenes-medicas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Medico, Medicamento, ResultadoLab, ImagenMedica, RecetaMedica, Paciente, Cita, HoraDisponible, OrdenMedica, Especialidad]),
    RecetasMedicasModule,
    PacienteModule,
    CitaModule,
    MedicamentoModule,
    HoraDisponibleModule,
    OrdenesMedicasModule,
    ResultadoLabModule,
    ImagenMedicaModule,
  ],
  controllers: [MedicoController],
  providers: [MedicoService],
  exports: [MedicoService]
})
export class MedicoModule { }
