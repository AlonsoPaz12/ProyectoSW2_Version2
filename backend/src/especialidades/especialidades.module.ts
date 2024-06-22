// src/especialidades/especialidades.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspecialidadService } from './especialidades.service';
import { EspecialidadController } from './especialidades.controller';
import { Especialidad } from './especialidades.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Especialidad])],
  providers: [EspecialidadService],
  controllers: [EspecialidadController],
  exports: [EspecialidadService, TypeOrmModule],
})
export class EspecialidadModule {}
