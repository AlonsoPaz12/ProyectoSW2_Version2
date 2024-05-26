import { Injectable } from '@nestjs/common';
import { Medico } from './medicos.entity';
import { GeneroUsuario, RolUsuario } from 'src/usuarios/usuario.entity';

@Injectable()
export class MedicosService {
    private medicos: Medico[] = [
        {
            citas: [],
            especialidad: 'Cardiologia',
            centroMedico: 'La victoria',
            id: 'MED-1',
            numeroDocumento: '33333',
            nombres: 'Gustavo',
            apePaterno: 'Pimba',
            apeMaterno: 'skibidi',
            fechaNacimiento: new Date('1990-09-23'),
            numCelular: '999888999',
            correoElectronico: 'doctor1@gmail.com',
            contrasena: 'soydoctor',
            repContrasena: 'soydoctor',
            genero: GeneroUsuario.MASCULINO,
            rol: RolUsuario.MEDICO
        }
    ]
}
