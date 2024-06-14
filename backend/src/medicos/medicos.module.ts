//medicos.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from './medicos.entity';
import { MedicosController } from './medicos.controller';
import { MedicosService } from './medicos.service';
import { CitasModule } from 'src/citas/citas.module';
import { RecetasMedicasModule } from 'src/recetas-medicas/recetas-medicas.module';

@Module({
  imports: [TypeOrmModule.forFeature([Medico]), RecetasMedicasModule,  CitasModule],
    controllers: [MedicosController], 
    providers: [MedicosService], 
    exports: [MedicosService] 
})
export class MedicosModule {}
