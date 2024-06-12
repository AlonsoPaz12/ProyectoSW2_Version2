import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrdenMedica } from 'src/ordenes-medicas/ordenes-medicas.entity';

@Entity()
export class ResultadoLab{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tipo: String;

    @Column()
    resultado: String;

    @Column()
    nombrePaciente: String;

    @OneToOne(() => OrdenMedica, orden => orden.resultadoLaboratorio)
    @JoinColumn()
    orden: OrdenMedica;
}