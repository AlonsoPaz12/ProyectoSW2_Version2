// citas.entity.ts
import { Medico } from "../medicos/medicos.entity";
import { Paciente } from "../pacientes/pacientes.entity";
import { RecetaMedica } from "../recetas-medicas/recetas-medicas.entity";
import { OrdenMedica } from "../ordenes-medicas/ordenes-medicas.entity";
import { Entity, JoinColumn, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class Cita {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    motivo: string;
       
    @Column()
    observacion: string;

    @Column()
    fecha: Date;

    @Column()
    hora: string; 

    @Column()
    diagnostico: string; 

    @Column({ default: false })
    asistio: boolean;

    @ManyToOne(() => Medico, medico => medico.citas)
    @JoinColumn({ name: 'medico_id' })
    medico: Medico;

    @ManyToOne(() => Paciente, paciente => paciente.citas)
    @JoinColumn({ name: 'paciente_id' })
    paciente: Paciente;

    @OneToOne(() => RecetaMedica, receta => receta.cita, { nullable: true })
    @JoinColumn({ name: 'receta_id' })
    receta: RecetaMedica | null;

    @OneToOne(() => OrdenMedica, orden => orden.cita, { nullable: true })
    @JoinColumn({ name: 'orden_medica_id' })
    ordenMedica: OrdenMedica | null;
}
