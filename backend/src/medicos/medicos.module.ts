//medicos.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from './medicos.entity';
import { MedicosController } from './medicos.controller';
import { MedicosService } from './medicos.service';

import { CitasModule } from 'src/citas/citas.module';
import { RecetasMedicasModule } from 'src/recetas-medicas/recetas-medicas.module';
import { MedicamentosModule } from '../medicamentos/medicamentos.module';
import { ResultadosLabModule } from '../resultados-lab/resultados-lab.module';
import { ImagenesMedicasModule } from '../imagenes-medicas/imagenes-medicas.module';
import { OrdenesMedicasModule } from '../ordenes-medicas/ordenes-medicas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Medico]),
    RecetasMedicasModule,
    MedicamentosModule,
    CitasModule,
    ResultadosLabModule,
    ImagenesMedicasModule,
    OrdenesMedicasModule,
  ],
  controllers: [MedicosController],
  providers: [MedicosService],
  exports: [MedicosService]
})
export class MedicosModule { }
