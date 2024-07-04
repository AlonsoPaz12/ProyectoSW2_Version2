import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ImagenMedica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombrePaciente: string;

  @Column()
  ExamDate: string;

  @Column()
  tipo: string;

  @Column()
  indicaciones: string;

  @Column()
  NombreDoc: string;

  @Column()
  NotasMedic: string;

  @Column()
  imagen: string;

  @Column({ nullable: true })
  ordenId: number;
}
