import { Cita } from "src/citas/citas.entity";
import { OrdenMedica } from "src/ordenes-medicas/ordenes-medicas.entity";
import { Usuario } from "src/usuarios/usuario.entity";
import { Entity, ManyToMany, OneToMany, ManyToOne, PrimaryGeneratedColumn, JoinTable } from 'typeorm';
import { RecetaMedica } from "src/recetas-medicas/recetas-medicas.entity";
import { Vacuna } from "src/vacunas/vacunas.entity";

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