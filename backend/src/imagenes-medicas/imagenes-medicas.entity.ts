// imagenes-medicas.entity.ts
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrdenMedica } from '../ordenes-medicas/ordenes-medicas.entity';

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

    @ManyToOne(() => OrdenMedica, orden => orden.imagenesMedicas)
    @JoinColumn({ name: "ordenId" })  
    orden: OrdenMedica;
}
