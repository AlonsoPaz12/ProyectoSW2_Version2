import { Cita } from "src/citas/citas.entity";
import { OrdenMedica } from "src/ordenes-medicas/ordenes-medicas.entity";
import { Usuario } from "src/usuarios/usuario.entity";
import { Entity, Column, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RecetaMedica } from "src/recetas-medicas/recetas-medicas.entity";
@Entity()
export class Paciente extends Usuario{
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Cita, (date) => date.paciente)
    citas: Cita[]

    @OneToMany(() => OrdenMedica, (orden) => orden.paciente)
    ordenesMedicas: OrdenMedica[]

    @OneToMany(() => RecetaMedica, (receta) => receta.paciente)
    recetas: RecetaMedica[]
}