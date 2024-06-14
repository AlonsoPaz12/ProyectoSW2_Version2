import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicamentosService } from './medicamentos.service';
import { MedicamentosController } from './medicamentos.controller';
import { Medicamento } from './medicamentos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medicamento])],
  providers: [MedicamentosService],
  controllers: [MedicamentosController],
})
export class MedicamentosModule {}
