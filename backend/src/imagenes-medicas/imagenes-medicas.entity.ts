//imagenes-medicas.entity
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrdenMedica } from 'src/ordenes-medicas/ordenes-medicas.entity';

@Entity()
export class ImagenMedica{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tipo: string;

    @Column()
    imagen: string;

    @Column()
    nombrePaciente: string;

    @OneToOne(() => OrdenMedica, orden => orden.imagenMedica)
    @JoinColumn({ name: 'orden_medica_id' })
    orden: OrdenMedica;

}