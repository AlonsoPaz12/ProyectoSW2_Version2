// src/medicos/hora-disponible.entity.ts

import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Medico } from 'src/medicos/medicos.entity';

@Entity()
export class HoraDisponible {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    fecha: Date;

    @Column({ type: 'time' })
    horaInicio: string;

    @Column({ type: 'time' })
    horaFin: string;

    @ManyToOne(() => Medico, medico => medico.horasDisponibles)
    @JoinColumn({ name: 'medicoId' })
    medico: Medico;
}
