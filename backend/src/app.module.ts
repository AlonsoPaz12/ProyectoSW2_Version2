//app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';

import { EspecialidadModule } from './especialidades/especialidades.module'; 
import { MedicoModule } from './medicos/medicos.module';
import { PacienteModule } from './pacientes/pacientes.module';
import { CitaModule } from './citas/citas.module';
import { RecetasMedicasModule } from './recetas-medicas/recetas-medicas.module';
import { HoraDisponibleModule } from './horario-disponible/horario-disponible.module';
import { OrdenesMedicasModule } from './ordenes-medicas/ordenes-medicas.module';
import { ResultadoLabModule } from './resultados-lab/resultados-lab.module';
import { ImagenMedicaModule } from './imagenes-medicas/imagenes-medica.module';
import { ComponentesModule } from './componentes-resultado/componentes_resultado.module';
import { MedicamentoModule } from './medicamentos/medicamento.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    CitaModule,
    ComponentesModule,
    EspecialidadModule,
    HoraDisponibleModule,
    ImagenMedicaModule,
    MedicamentoModule,
    MedicoModule,
    OrdenesMedicasModule,
    PacienteModule,
    RecetasMedicasModule,
    ResultadoLabModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

