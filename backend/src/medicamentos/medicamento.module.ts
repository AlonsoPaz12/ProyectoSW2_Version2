import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medicamento } from './medicamentos.entity';
import { MedicamentoService } from './medicamentos.service';
import { MedicamentoController } from './medicamentos.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Medicamento])],
    providers: [MedicamentoService],
    controllers: [MedicamentoController],
    exports: [MedicamentoService]
})
export class MedicamentoModule {}
