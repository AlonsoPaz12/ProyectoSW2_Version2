import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrdenMedica } from 'src/ordenes-medicas/ordenes-medicas.entity';

@Entity()
export class ImagenMedica{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tipo: String;

    @Column()
    imagen: String;

    @Column()
    nombrePaciente: String;

    @OneToOne(() => OrdenMedica, orden => orden.imagenMedica)
    @JoinColumn()
    orden: OrdenMedica;

}