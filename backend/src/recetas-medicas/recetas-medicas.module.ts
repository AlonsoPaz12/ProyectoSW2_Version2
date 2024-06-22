import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecetaMedica } from './recetas-medicas.entity';
import { CitaModule } from 'src/citas/citas.module';
import { RecetaMedicaController } from './recetas-medicas.controller';
import { RecetaService } from './recetas-medicas.service';
import { Cita } from 'src/citas/citas.entity';
import { Paciente } from 'src/pacientes/pacientes.entity';
import { Medico } from 'src/medicos/medicos.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([RecetaMedica, Cita, Medico, Paciente]),
        CitaModule,
    ],
    controllers: [RecetaMedicaController],
    providers: [RecetaService],
    exports: [RecetaService]

})
export class RecetasMedicasModule {}