import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cita } from './citas.entity';
import { CitasController } from './citas.controller';
import { CitasService } from './citas.service';
import { RecetasMedicasModule } from 'src/recetas-medicas/recetas-medicas.module';
import { PacientesModule } from 'src/pacientes/pacientes.module';
import { MedicosModule } from 'src/medicos/medicos.module';
@Module({
  imports: [TypeOrmModule.forFeature([Cita]), RecetasMedicasModule,  PacientesModule, MedicosModule],
  controllers: [CitasController],
  providers: [CitasService]
})
export class CitasModule {}
