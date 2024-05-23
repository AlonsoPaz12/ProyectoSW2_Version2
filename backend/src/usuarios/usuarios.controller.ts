import { Controller, Get } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {

    constructor(private usuariosService: UsuariosService){}

    @Get()
    getAllUsuarios(){
        return this.usuariosService.getAllUsuarios();
    }



}
