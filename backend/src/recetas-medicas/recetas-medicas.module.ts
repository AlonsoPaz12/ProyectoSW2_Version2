import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecetaMedica } from './recetas-medicas.entity';
import { CitaModule } from 'src/citas/citas.module';
import { RecetaMedicaController } from './recetas-medicas.controller';
import { RecetaService } from './recetas-medicas.service';
import { Cita } from 'src/citas/citas.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([RecetaMedica, Cita]),
        CitaModule,
    ],
    controllers: [RecetaMedicaController],
    providers: [RecetaService],
    exports: [RecetaService]
})
export class RecetasMedicasModule {}