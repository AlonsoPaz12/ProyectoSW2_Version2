import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecetaMedica } from './recetas-medicas.entity';
import { RecetaService } from './recetas-medicas.service';
import { RecetaMedicaController } from './recetas-medicas.controller';
import { Cita } from '../citas/citas.entity';
import { Paciente } from '../pacientes/pacientes.entity';
import { Medico } from '../medicos/medicos.entity';
import { MedicamentoModule } from '../medicamentos/medicamento.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([RecetaMedica, Cita, Paciente, Medico]),
        MedicamentoModule,
    ],
    providers: [RecetaService],
    controllers: [RecetaMedicaController],
    exports: [RecetaService], // Exportar RecetaService
})
export class RecetasMedicasModule {}