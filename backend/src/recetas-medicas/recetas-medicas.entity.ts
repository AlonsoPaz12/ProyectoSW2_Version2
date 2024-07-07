//recetas-medicas.entity
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Medicamento } from "../medicamentos/medicamentos.entity";
import { Medico } from '../medicos/medicos.entity';
import { Cita } from '../citas/citas.entity';
import { Paciente } from '../pacientes/pacientes.entity';
import { RecetaDetalle } from '../recetas-detalle/recetas-detalle.entity';

@Entity()
export class RecetaMedica{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    observacion: string;

    @ManyToOne(() => Medico, medico => medico.recetas)
    @JoinColumn({ name: 'medico_id' })
    medico: Medico;

    @ManyToMany(() => Medicamento, medicamento => medicamento.recetas)
    @JoinTable()
    medicamentos: Medicamento[];

    @OneToOne(() => Cita, cita => cita.receta)
    @JoinColumn({ name: 'cita_id' })
    cita: Cita

    @ManyToOne(() => Paciente, paciente => paciente.recetas)
    @JoinColumn({ name: 'paciente_id' })
    paciente: Paciente
    
    @OneToMany(() => RecetaDetalle, detalle => detalle.receta)
    detalles: RecetaDetalle[];
    
}