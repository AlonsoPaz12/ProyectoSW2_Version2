import { Controller, Get, Post, Delete, Put, Patch, Body, Param  } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto } from './dto/usuario.dto';
import {ActualizarUsuarioDto} from './dto/usuario.dto';

@Controller('usuarios')
export class UsuariosController {
    constructor(private usuariosService: UsuariosService){}

    @Post()
    registrarUsuario(@Body() nuevoUsuario: CrearUsuarioDto){
        return this.usuariosService.registrarUsuario(nuevoUsuario.numeroDocumento, nuevoUsuario.nombres, nuevoUsuario.apePaterno, nuevoUsuario.apeMaterno, nuevoUsuario.fechaNacimiento, nuevoUsuario.numCelular, nuevoUsuario.correoElectronico, nuevoUsuario.contrasena, nuevoUsuario.repContrasena)
        
    }

    @Get()
    iniciarSesion(){
        return this.usuariosService.getAll();
    }

    @Delete(':id')
    eliminarUsuario(@Param('id') id:string){
        this.usuariosService.eliminarUsuario(id)
    }

    @Patch(":id")
    actualizarUsuario(@Param("id") id:string, @Body() camposActualizados: ActualizarUsuarioDto){
       return this.usuariosService.editarUsuario(id, camposActualizados)
    }

}
