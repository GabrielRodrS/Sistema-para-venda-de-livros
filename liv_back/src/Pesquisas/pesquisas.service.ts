import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pesquisa } from './pesquisas.entity';
import { Repository } from 'typeorm';
import { Usuario } from '../Usuarios/usuarios.entity';
import { CreatePesquisaDto } from './create-pesquisa.dto';

@Injectable()
export class PesquisasService {
  constructor(
    @InjectRepository(Pesquisa)
    private readonly pesquisasRepository: Repository<Pesquisa>,

    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  async criarPesquisa(
    email: string,
    createPesquisaDto: CreatePesquisaDto,
  ): Promise<Pesquisa> {
    const usuario = await this.usuariosRepository.findOne({
      where: { email: email },
    });

    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    const pesquisa = this.pesquisasRepository.create({
      texto: createPesquisaDto.texto,
      data: new Date(), // ou `createPesquisaDto.data` se a data for enviada
      usuario: usuario,
    });

    return this.pesquisasRepository.save(pesquisa);
  }

  async buscarPesquisas(email: string): Promise<Pesquisa[]> {
    const pesquisas = await this.pesquisasRepository.find({
      where: { usuario: { email: email } },
      relations: ['usuario'],
      order: { data: 'DESC' },
      take: 5,
    });

    return pesquisas;
  }
}
