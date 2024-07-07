import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecetaDetalle } from './recetas-detalle.entity';
import { RecetaDetalleService } from './recetas-detalle.service';
import { RecetaDetalleController } from './recetas-detalle.controller';
import { RecetaMedica } from 'src/recetas-medicas/recetas-medicas.entity';
import { Medicamento } from 'src/medicamentos/medicamentos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecetaDetalle, RecetaMedica, Medicamento])],
  providers: [RecetaDetalleService],
  controllers: [RecetaDetalleController],
})
export class RecetaDetalleModule {}
