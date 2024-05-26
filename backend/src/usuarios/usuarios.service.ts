import { Injectable } from '@nestjs/common';
import { Usuario, GeneroUsuario, RolUsuario } from './usuario.entity';
import { v4 } from 'uuid';
import {ActualizarUsuarioDto} from './dto/usuario.dto';
@Injectable()
export class UsuariosService {

    private usuarios: Usuario[] = [
        {
            id: '1',
            numeroDocumento: '0121854',
            nombres: 'asdasd',
            apePaterno: 'asdasda',
            apeMaterno: 'kksksks',
            fechaNacimiento: new Date(2024,4,4),
            numCelular: '970546821',
            correoElectronico: 'adjalkd@gmail.com',
            contrasena: '**********',
            repContrasena: '**********',
            genero: GeneroUsuario.MASCULINO,
            rol: RolUsuario.PACIENTE
        }
    ]

    registrarUsuario(numeroDocumento: String, nombres: String, apePaterno: String, apeMaterno: String, fechaNacimiento: Date, numCelular: String, correoElectronico: String, contrasena: String, repContrasena: String){
        const nuevoUsuario = {
            id: v4(),
            numeroDocumento,
            nombres,
            apePaterno,
            apeMaterno,
            fechaNacimiento,
            numCelular,
            correoElectronico,
            contrasena,
            repContrasena,
            genero: GeneroUsuario.FEMENINO,
            rol: RolUsuario.PACIENTE
        }
        this.usuarios.push(nuevoUsuario);

        return nuevoUsuario;
    }

    getAll(){
        return this.usuarios;
    }

    eliminarUsuario(id: String){
        this.usuarios = this.usuarios.filter(usuario => usuario.id !== id)
    }

    obtenerUsuarioPorId(id: String): Usuario{
        return this.usuarios.find(usuario => usuario.id === id)
    }

    editarUsuario(id: string, camposActualizados: ActualizarUsuarioDto){
        const usuario = this.obtenerUsuarioPorId(id);
        const nuevoUsuario = Object.assign(usuario, camposActualizados)
        this.usuarios = this.usuarios.map(usuario => usuario.id === id ? nuevoUsuario : usuario)

        return nuevoUsuario
    }

    getId(id: String){
        return this.usuarios.find(usuario => usuario.id === id).id
    }
}
