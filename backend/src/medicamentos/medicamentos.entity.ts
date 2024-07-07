import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { RecetaMedica } from '../recetas-medicas/recetas-medicas.entity';
import { RecetaDetalle } from '../recetas-detalle/recetas-detalle.entity';

@Entity()
export class Medicamento{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    tipo: string;

    @Column()
    frecuencia: string;

    @Column()
    dosis: string;

    @ManyToMany(() => RecetaMedica, receta => receta.medicamentos)
    @JoinTable()
    recetas: RecetaMedica[];

    @OneToMany(() => RecetaDetalle, detalle => detalle.medicamento)
    detalles: RecetaDetalle[];      /*añadiendo para la rela con recetas detalle*/
    
}