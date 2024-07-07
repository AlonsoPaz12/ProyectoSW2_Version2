//medicos.entity.ts
import { Entity, JoinTable, ManyToMany, Column, OneToMany, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Cita } from "../citas/citas.entity";
import { RecetaMedica } from "../recetas-medicas/recetas-medicas.entity";
import { OrdenMedica } from "../ordenes-medicas/ordenes-medicas.entity";
import { Usuario } from "../usuarios/usuario.entity";
import { Especialidad } from "../especialidades/especialidades.entity";
import { Vacuna } from "../vacunas/vacunas.entity";
import { HoraDisponible } from "../horario-disponible/hora-disponible.entity"; // Importar entidad de HoraDisponible si es necesario


@Entity()
export class Medico extends Usuario{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    centroMedico: string;

    @ManyToOne(() => Especialidad, especialidad => especialidad.medicos)
    @JoinColumn({ name: 'especialidadId' }) 
    especialidad: Especialidad;

    @OneToMany(() => Cita, (cita) => cita.medico)
    citas: Cita[];

    @OneToMany(() => RecetaMedica, (receta) => receta.medico)
    recetas: RecetaMedica[];

    @OneToMany(() => OrdenMedica, (orden) => orden.medico)
    ordenes: OrdenMedica[];

    @ManyToMany(() => Vacuna, vacuna => vacuna.medicos)
    vacunas: Vacuna[];

    @OneToMany(() => HoraDisponible, horaDisponible => horaDisponible.medico)
    horasDisponibles: HoraDisponible[];
}