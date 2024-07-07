import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { RecetaMedica } from '../recetas-medicas/recetas-medicas.entity';
import { Medicamento } from '../medicamentos/medicamentos.entity';

@Entity('recetas_detalle')
export class RecetaDetalle {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RecetaMedica, receta => receta.detalles)
  @JoinColumn({ name: 'idReceta' })
  receta: RecetaMedica;

  @ManyToOne(() => Medicamento, medicamento => medicamento.detalles)
  @JoinColumn({ name: 'idMedicamento' })
  medicamento: Medicamento;
}