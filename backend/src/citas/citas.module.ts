// src/citas/cita.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cita } from './citas.entity';
import { CitaService } from './cita.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cita])],
  providers: [CitaService],
  exports: [CitaService],
})
export class CitaModule {}
