import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrinho } from './carrinhos.entity';
import { Livro } from '../Livros/livros.entity';
import { Usuario } from '../Usuarios/usuarios.entity';
import { CreateCarrinhoDto } from './create-carrinho.dto';

@Injectable()
export class CarrinhosService {
  constructor(
    @InjectRepository(Carrinho)
    private readonly carrinhosRepository: Repository<Carrinho>,

    @InjectRepository(Livro)
    private readonly livrosRepository: Repository<Livro>,

    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  async novoCarrinho(createCarrinhoDto: CreateCarrinhoDto): Promise<Carrinho> {
    const livro = await this.livrosRepository.findOne({
      where: { codigo: createCarrinhoDto.codigoLivro },
    });
    const usuario = await this.usuariosRepository.findOne({
      where: { email: createCarrinhoDto.emailUsuario },
    });

    if (!livro) {
      throw new Error('Livro não encontrado!');
    }

    if (!usuario) {
      throw new Error('Usuário não encontrado!');
    }

    const carrinho = new Carrinho();
    carrinho.nome = livro.titulo;
    carrinho.preco = livro.preco;
    carrinho.source = livro.source;
    carrinho.quantidade = createCarrinhoDto.quantidade;
    carrinho.usuario = usuario;
    carrinho.livro = livro;

    return this.carrinhosRepository.save(carrinho);
  }

  async buscarCarrinhos(usuarioEmail: string): Promise<Carrinho[]> {
    const resultado = await this.carrinhosRepository.find({
      where: { usuario: { email: usuarioEmail } },
      relations: ['usuario', 'livro'],
    });

    if (resultado.length === 0) {
      throw new NotFoundException('Nada encontrado!');
    }

    return resultado;
  }

  async alterarQuantidade(idCarrinho: number, valor: number): Promise<number> {
    const resultado = await this.carrinhosRepository.findOne({
      where: { idCarrinho },
    });

    if (!resultado) {
      throw new NotFoundException('Nenhum item encontrado!');
    }

    if (resultado.quantidade > 1 || valor == 1) {
      resultado.quantidade = resultado.quantidade + valor;
    }

    this.carrinhosRepository.save(resultado);

    return resultado.quantidade;
  }

  async excluirItem(idCarrinho: number): Promise<void> {
    const carrinho = await this.carrinhosRepository.findOne({
      where: { idCarrinho },
    });

    if (!carrinho) {
      throw new NotFoundException('Nenhum Item foi encontrado!');
    }

    await this.carrinhosRepository.delete(carrinho);

    return;
  }

  async deletarCarrinhos(usuarioEmail: string): Promise<void> {
    const carrinho = await this.carrinhosRepository.find({
      where: { usuario: { email: usuarioEmail } },
      relations: ['usuario'],
    });

    if (carrinho.length === 0) {
      throw new NotFoundException('Nenhum item encontrado!');
    }
    await this.carrinhosRepository.remove(carrinho);

    return null;
  }

  async selecionados(id: number): Promise<Carrinho> {
    const carrinho = await this.carrinhosRepository.findOne({
      where: { idCarrinho: id },
      relations: ['livro', 'usuario'],
    });

    if (!carrinho) {
      throw new NotFoundException('Item não encontrado!');
    }

    return carrinho;
  }

  async limparCarrinho(id: number) {
    const carrinho = await this.carrinhosRepository.findOne({
      where: { idCarrinho: id },
    });

    if (!carrinho) {
      throw new NotFoundException('Não foi possível excluir este item!');
    }

    await this.carrinhosRepository.delete(id);
  }
}
