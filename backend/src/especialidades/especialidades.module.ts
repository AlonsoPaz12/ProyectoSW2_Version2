import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Especialidad } from './especialidades.entity';
import { EspecialidadService } from './especialidades.service';
import { EspecialidadController } from './especialidades.controller';


@Module({
    imports: [TypeOrmModule.forFeature([Especialidad])],
    providers: [EspecialidadService], 
    controllers: [EspecialidadController],
    exports: [EspecialidadService],
})
export class EspecialidadModule {}
