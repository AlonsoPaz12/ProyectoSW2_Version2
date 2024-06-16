//medicos.entity.ts
import { Entity, JoinTable, ManyToMany, Column, OneToMany, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Cita } from "src/citas/citas.entity";
import { RecetaMedica } from "src/recetas-medicas/recetas-medicas.entity";
import { OrdenMedica } from "src/ordenes-medicas/ordenes-medicas.entity";
import { Usuario } from "src/usuarios/usuario.entity";
import { Especialidad } from "src/especialidades/especialidades.entity";
import { Vacuna } from "src/vacunas/vacunas.entity";
import { HoraDisponible } from "src/horario-disponible/hora-disponible.entity"; // Importar entidad de HoraDisponible si es necesario


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
    @JoinTable()
    vacunas: Vacuna[];

    @OneToMany(() => HoraDisponible, horaDisponible => horaDisponible.medico)
    horasDisponibles: HoraDisponible[];
}