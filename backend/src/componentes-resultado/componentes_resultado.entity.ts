import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ResultadoLab } from '../resultados-lab/resultados-lab.entity';

@Entity()
export class ComponenteResultado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  valor: string;

  @ManyToOne(() => ResultadoLab, resultadoLab => resultadoLab.componentes)
  resultadoLab: ResultadoLab;
}

