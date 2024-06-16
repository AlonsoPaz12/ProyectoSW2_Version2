//usuario.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum GeneroUsuario{
    MASCULINO = 'MASCULINO',
    FEMENINO = 'FEMENINO'
}

export enum RolUsuario{
    MEDICO = 'MEDICO',
    PACIENTE = 'PACIENTE'
}

@Entity()
export class Usuario{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    imageurl: string;

    @Column()
    numeroDocumento: string;
    
    @Column()
    nombres: string;
    
    @Column()
    apePaterno: string;
    
    @Column()
    apeMaterno: string;
    
    @Column()
    fechaNacimiento: Date
    
    @Column()
    numCelular: string;
    
    @Column()
    correoElectronico: string;
    
    @Column()
    contrasena: string;
    
    @Column()
    repContrasena: string;
    
    @Column()
    genero: GeneroUsuario;

}

