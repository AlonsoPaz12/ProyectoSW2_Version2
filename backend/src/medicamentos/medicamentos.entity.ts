import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import { RecetaMedica } from 'src/recetas-medicas/recetas-medicas.entity';
@Entity()
export class Medicamento{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tipo: String;

    @Column()
    frecuencia: String;

    @Column()
    dosis: String;

    @ManyToMany(() => RecetaMedica, receta => receta.medicamentos)
    @JoinTable()
    recetas: RecetaMedica[];

}