import { Injectable } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Paciente } from './pacientes.entity';
import { GeneroUsuario, RolUsuario } from 'src/usuarios/usuario.entity';
import { Cita } from 'src/citas/citas.entity';

@Injectable()
export class PacientesService extends UsuariosService{
    private pacientes: Paciente[] = [
        {
            Citas: [],
            id: '1',
            numeroDocumento: '12345',
            nombres: 'Sebastian',
            apePaterno: 'Guzman',
            apeMaterno: 'Soto',
            fechaNacimiento: new Date('2003-04-18'),
            numCelular: '9999999',
            correoElectronico: 'espantaviejas@gmail.com',
            contrasena: 'asdf1234',
            repContrasena: 'asdf1234',
            genero: GeneroUsuario.MASCULINO,
            rol: RolUsuario.PACIENTE
        }
    ]
    


}
