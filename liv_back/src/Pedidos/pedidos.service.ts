import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './pedidos.entity';
import { Repository } from 'typeorm';
import { Usuario } from '../Usuarios/usuarios.entity';
import { Livro } from '../Livros/livros.entity';
import { CreatePedidoDto } from './create-pedidos.dto';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidosRepository: Repository<Pedido>,

    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,

    @InjectRepository(Livro)
    private readonly livrosRepository: Repository<Livro>,
  ) {}

  async novoPedido(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const usuario = await this.usuariosRepository.findOne({
      where: { email: createPedidoDto.usuarioEmail },
    });
    const livro = await this.livrosRepository.findOne({
      where: { codigo: createPedidoDto.codigoLivro },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    if (!livro) {
      throw new NotFoundException('Livro não encontrado!');
    }

    const pedido = new Pedido();

    pedido.usuario = usuario;
    pedido.livro = livro;
    pedido.autor = livro.autor;
    pedido.codigo = livro.codigo;
    pedido.data = livro.publicacao;
    pedido.paginas = livro.paginas;
    pedido.preco = livro.preco;
    pedido.quantidade = createPedidoDto.quantidade;
    pedido.status = createPedidoDto.status;
    pedido.titulo = livro.titulo;
    pedido.source = livro.source;

    livro.vendas = livro.vendas + createPedidoDto.quantidade;

    await this.livrosRepository.save(livro);

    // Aqui fazemos o ajuste para garantir que genero seja um array de strings
    // Se o genero já for um array, não há necessidade de fazer nada
    if (Array.isArray(livro.genero)) {
      pedido.genero = livro.genero;
    } else {
      // Caso o genero seja um objeto (como o que você mencionou), transformamos ele em um array de strings
      try {
        pedido.genero = Object.values(JSON.parse(livro.genero)); // Fazemos o parse se for uma string JSON
      } catch (error) {
        // Caso a conversão falhe, setamos um array vazio
        pedido.genero = [];
        console.log(error);
      }
    }

    return this.pedidosRepository.save(pedido);
  }

  async buscarPedidos(usuarioEmail: string): Promise<Pedido[]> {
    const pedidos = await this.pedidosRepository.find({
      where: { usuario: { email: usuarioEmail } },
      relations: ['usuario'],
    });

    if (pedidos.length === 0) {
      throw new NotFoundException('Nenhum pedido foi encontrado!');
    }

    return pedidos;
  }

  async pedidoCancelamento(idPedido: number, codigo: number): Promise<void> {
    const pedido = await this.pedidosRepository.findOne({
      where: { idPedido },
    });

    if (!pedido) {
      throw new NotFoundException('Não foi possível encontrar o pedido!');
    }

    const livro = await this.livrosRepository.findOne({ where: { codigo } });

    livro.vendas = livro.vendas - pedido.quantidade;

    await this.livrosRepository.save(livro);

    pedido.status = 'Pedido de cancelamento';

    await this.pedidosRepository.save(pedido);

    return null;
  }

  async buscarFiltro(email: string, filtro: string): Promise<Pedido[]> {
    if (filtro === 'Quantidade comprada') {
      const pedidos = await this.pedidosRepository.find({
        where: { usuario: { email } },
        relations: ['usuario'],
        order: { quantidade: 'DESC' },
      });

      if (pedidos.length === 0) {
        throw new NotFoundException(
          'Não foi possível encontrar nenhum pedido!',
        );
      }

      return pedidos;
    }

    if (filtro === 'Preço de compra') {
      const pedidos = await this.pedidosRepository.find({
        where: { usuario: { email } },
        relations: ['usuario'],
        order: { preco: 'DESC' },
      });

      if (pedidos.length === 0) {
        throw new NotFoundException(
          'Não foi possível encontrar nenhum pedido!',
        );
      }

      return pedidos;
    }

    if (filtro === 'Data recente') {
      const pedidos = await this.pedidosRepository.find({
        where: { usuario: { email } },
        relations: ['usuario'],
        order: { data: 'DESC' },
      });

      if (pedidos.length === 0) {
        throw new NotFoundException(
          'Não foi possível encontrar nenhum pedido!',
        );
      }

      return pedidos;
    }

    const pedidos = await this.pedidosRepository.find({
      where: { usuario: { email }, status: filtro },
      relations: ['usuario'],
    });

    if (pedidos.length === 0) {
      throw new NotFoundException('Não foi possível encontrar nenhum pedido!');
    }

    return pedidos;
  }
}
