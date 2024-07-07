import { Cita } from "../citas/citas.entity";
import { OrdenMedica } from "../ordenes-medicas/ordenes-medicas.entity";
import { Usuario } from "../usuarios/usuario.entity";
import { Entity, ManyToMany, OneToMany, ManyToOne, PrimaryGeneratedColumn, JoinTable } from 'typeorm';
import { RecetaMedica } from "../recetas-medicas/recetas-medicas.entity";
import { Vacuna } from "../vacunas/vacunas.entity";

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

    @ManyToMany(() => Vacuna, vacuna => vacuna.pacientes)
    vacunas: Vacuna[];
}