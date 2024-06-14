import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cita } from './citas.entity';
import { CitasController } from './citas.controller';
import { CitasService } from './citas.service';
import { RecetasMedicasModule } from 'src/recetas-medicas/recetas-medicas.module';
import { PacientesModule } from 'src/pacientes/pacientes.module';
import { MedicosModule } from 'src/medicos/medicos.module';
import { OrdenesMedicasModule } from 'src/ordenes-medicas/ordenes-medicas.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Cita]), 
    MedicosModule,
    PacientesModule,
    RecetasMedicasModule,
    OrdenesMedicasModule,
  ],
  controllers: [CitasController],
  providers: [CitasService],
  exports: [CitasService],
})
export class CitasModule {}
