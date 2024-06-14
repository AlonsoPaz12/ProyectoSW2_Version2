import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { RecetaMedica } from 'src/recetas-medicas/recetas-medicas.entity';
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
}