import { Repository } from 'typeorm';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuarios.entity';
import { JwtService } from '@nestjs/jwt';
import { Pedido } from '../Pedidos/pedidos.entity';
import { Carrinho } from '../Carrinhos/carrinhos.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,

    @InjectRepository(Pedido)
    private readonly pedidosRepository: Repository<Pedido>,

    @InjectRepository(Carrinho)
    private readonly carrinhosRepository: Repository<Carrinho>,
  ) {}

  async criarUsuarios(
    nome: string,
    telefone: string,
    email: string,
    senha: string,
  ): Promise<Usuario> {
    const usuario = this.usuariosRepository.create({
      nome,
      telefone,
      email,
      senha,
    });

    return this.usuariosRepository.save(usuario);
  }

  async deletarUsuarios(email: string, senha: string): Promise<void> {
    const usuario = await this.usuariosRepository.findOne({
      where: { email },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    if (usuario.senha !== senha) {
      throw new UnauthorizedException('Senha de usuário incorreta!');
    }

    const pedidos = await this.pedidosRepository.find({
      where: { usuario: { email } },
      relations: ['usuario'],
    });

    await this.pedidosRepository.delete({ usuario: { email } });

    const carrinhos = await this.carrinhosRepository.find({
      where: { usuario: { email } },
      relations: ['usuario'],
    });

    await this.carrinhosRepository.delete({ usuario: { email } });

    const resultado = await this.usuariosRepository.delete({ email });

    if (resultado.affected === 0) {
      throw new NotFoundException('Erro ao deletar usuário!');
    }

    await this.usuariosRepository.delete({ email });
  }

  async LogarUsuarios(email: string, senha: string): Promise<Usuario | null> {
    const usuario = await this.usuariosRepository.findOne({ where: { email } });

    if (usuario && senha === usuario.senha) {
      return usuario;
    }

    throw new UnauthorizedException('Credenciais inválidas!');
  }

  async altNome(email: string, nome: string): Promise<string> {
    const usuario = await this.usuariosRepository.findOne({ where: { email } });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    usuario.nome = nome;
    await this.usuariosRepository.save(usuario);

    return usuario.nome;
  }

  async altTelefone(email: string, telefone: string): Promise<string> {
    const usuario = await this.usuariosRepository.findOne({ where: { email } });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    usuario.telefone = telefone;

    await this.usuariosRepository.save(usuario);

    return usuario.telefone;
  }

  async altEmail(
    novoEmail: string,
    email: string,
    senha: string,
  ): Promise<string> {
    const usuario = await this.usuariosRepository.findOneBy({ email });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (senha != usuario.senha) {
      throw new UnauthorizedException('Senha incorreta!');
    }

    usuario.email = novoEmail;
    await this.usuariosRepository.save(usuario);

    const usuarioAtualizado = await this.usuariosRepository.findOneBy({
      email: novoEmail,
    });

    const pedidosAtualizar = await this.pedidosRepository.find({
      where: { usuario: { email } },
      relations: ['usuario'],
    });

    for (const pedido of pedidosAtualizar) {
      pedido.usuario = usuarioAtualizado;
      await this.pedidosRepository.save(pedido);
    }

    const carrinhosAtualizar = await this.carrinhosRepository.find({
      where: { usuario: { email } },
      relations: ['usuario'],
    });

    for (const carrinho of carrinhosAtualizar) {
      carrinho.usuario = usuarioAtualizado;
      await this.carrinhosRepository.save(carrinho);
    }

    this.usuariosRepository.delete({ email });

    return usuarioAtualizado.email;
  }

  async altSenha(email: string, senhaNova: string, senhaAtual: string) {
    const usuario = await this.usuariosRepository.findOne({ where: { email } });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    if (usuario.senha !== senhaAtual) {
      throw new UnauthorizedException('Senha incorreta!');
    }

    usuario.senha = senhaNova;

    await this.usuariosRepository.save(usuario);

    return { message: 'Senha alterada com sucesso!' };
  }
}
