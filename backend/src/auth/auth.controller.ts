import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { PacienteService } from '../pacientes/paciente.service';
import { MedicoService } from '../medicos/medicos.service';
import { JwtService } from '@nestjs/jwt';
import { IniciarSesionDto } from 'src/medicos/dto/medicos.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly pacienteService: PacienteService,
    private readonly medicoService: MedicoService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() iniciarSesionDto: IniciarSesionDto) {
    const { correoElectronico, contrasena } = iniciarSesionDto;

    const paciente = await this.pacienteService.validarPaciente(iniciarSesionDto);
    if (paciente) {
      const token = this.generateToken(paciente);
      return { paciente, token };
    }

    const medico = await this.medicoService.validarMedico(iniciarSesionDto);
    if (medico) {
      const token = this.generateToken(medico);
      return { medico, token };
    }

    throw new BadRequestException('Credenciales inválidas');
  }

  private generateToken(user: any) {
    const payload = { correoElectronico: user.correoElectronico, sub: user.id };
    return this.jwtService.sign(payload);
  }
}