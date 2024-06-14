//medicos.entity.ts

import { Cita } from "src/citas/citas.entity";
import { RecetaMedica } from "src/recetas-medicas/recetas-medicas.entity";
import { OrdenMedica } from "src/ordenes-medicas/ordenes-medicas.entity";
import { Usuario } from "src/usuarios/usuario.entity";
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Medico extends Usuario{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    especialidad: string;

    @Column()
    centroMedico: string;

    @OneToMany(() => Cita, (cita) => cita.medico)
    citas: Cita[];

    @OneToMany(() => RecetaMedica, (receta) => receta.medico)
    recetas: RecetaMedica[];

    @OneToMany(() => OrdenMedica, (orden) => orden.medico)
    ordenes: OrdenMedica[];
}