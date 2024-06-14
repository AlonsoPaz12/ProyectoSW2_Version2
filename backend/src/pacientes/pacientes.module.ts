import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from './pacientes.entity';
import { CitasModule } from '../citas/citas.module';
import { MedicamentosModule } from '../medicamentos/medicamentos.module';
import { RecetasMedicasModule } from '../recetas-medicas/recetas-medicas.module';
import { PacientesController } from './pacientes.controller';
import { PacientesService } from './pacientes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Paciente]),
    CitasModule,
    MedicamentosModule,
    RecetasMedicasModule,
  ],
  controllers: [PacientesController],
  providers: [PacientesService],
  exports: [PacientesService],
})
export class PacientesModule {}
