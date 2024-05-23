import { Module } from '@nestjs/common';
import { MedicamentosController } from './medicamentos.controller';
import { MedicamentosService } from './medicamentos.service';

@Module({
  controllers: [MedicamentosController],
  providers: [MedicamentosService]
})
export class MedicamentosModule {}
