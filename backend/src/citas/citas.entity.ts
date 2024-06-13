import { Medico } from "src/medicos/medicos.entity";
import { Paciente } from "src/pacientes/pacientes.entity";
import { RecetaMedica } from "src/recetas-medicas/recetas-medicas.entity";
import { Entity, JoinColumn, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class Cita{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    motivo: string;
       
    @Column()
    observacion: string;

    @Column()
    fecha: Date;

    @Column()
    asistio: boolean

    @ManyToOne(() => Medico, medico => medico.citas)
    @JoinColumn({ name: 'medico_id' })
    medico: Medico;

    @ManyToOne(() => Paciente, paciente => paciente.citas)
    @JoinColumn({ name: 'paciente_id' })
    paciente: Paciente;

    @OneToOne(() => RecetaMedica, receta => receta.cita)
    @JoinColumn({ name: 'receta_id' })
    receta: RecetaMedica
}