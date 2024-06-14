//recetas-medicas.modules.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecetaMedica } from './recetas-medicas.entity';
import { RecetasMedicasController } from './recetas-medicas.controller';
import { RecetasMedicasService } from './recetas-medicas.service';
import { MedicamentosModule } from 'src/medicamentos/medicamentos.module';
import { CitasModule } from 'src/citas/citas.module';
import { PacientesModule } from 'src/pacientes/pacientes.module';
import { MedicosModule } from 'src/medicos/medicos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecetaMedica]),
    MedicamentosModule,
    CitasModule,
    PacientesModule,
    MedicosModule,
  ],
  controllers: [RecetasMedicasController],
  providers: [RecetasMedicasService],
  exports: [RecetasMedicasService],
})
export class RecetasMedicasModule {}
