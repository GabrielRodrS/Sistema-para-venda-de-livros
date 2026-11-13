import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Livro } from './livros.entity';
import { Repository, Like } from 'typeorm';

@Injectable()
export class LivrosService {
  constructor(
    @InjectRepository(Livro)
    private readonly livrosRepository: Repository<Livro>,
  ) {}

  async incluirLivros(
    codigo: number,
    titulo: string,
    disponiveis: number,
    autor: string,
    genero: string[],
    preco: number,
    paginas: number,
    publicacao: Date,
    vendas: number,
    source: string,
  ): Promise<Livro> {
    const novoLivro = this.livrosRepository.create({
      codigo,
      titulo,
      disponiveis,
      autor,
      genero,
      preco,
      paginas,
      publicacao,
      vendas,
      source,
    });
    return this.livrosRepository.save(novoLivro);
  }

  async deletarLivros(codigo: number): Promise<void> {
    const buscarLivro = await this.livrosRepository.findOne({
      where: { codigo },
    });

    if (!buscarLivro) {
      throw new NotFoundException('Livro não encontrado!');
    }

    const resultado = await this.livrosRepository.delete({ codigo });

    if (resultado.affected === 0) {
      throw new NotFoundException('Problema ao deletar livro!');
    }
  }

  async buscarLivros(): Promise<Livro[]> {
    const livros = await this.livrosRepository.find();

    if (livros.length === 0) {
      throw new NotFoundException('Nenhum livro encontrado!');
    }
    return livros;
  }

  async buscarFiltro(
    genero: string,
    preco: number,
    paginas: number,
  ): Promise<Livro[]> {
    const filtrar = this.livrosRepository.createQueryBuilder('livro');

    if (genero && genero.trim() !== '') {
      filtrar.andWhere('livro.genero @> ARRAY[:...genero]', {
        genero: genero.split(',').map((g) => g.trim()),
      });
    }

    if (typeof preco === 'number' && !isNaN(preco) && preco > 0) {
      filtrar.andWhere('livro.preco <= :preco', { preco });
    }

    if (typeof paginas === 'number' && paginas > 0) {
      filtrar.andWhere('livro.paginas <= :paginas', { paginas });
    }

    return filtrar.getMany();
  }

  async buscarHeader(header: string): Promise<Livro[]> {
    const campoDeOrdenacao: string = this.getCampoDeOrdenacao(header);
    return this.livrosRepository
      .createQueryBuilder('livro')
      .orderBy(campoDeOrdenacao, header === 'Menores preços' ? 'ASC' : 'DESC')
      .getMany();
  }

  private getCampoDeOrdenacao(header: string): string {
    switch (header) {
      case 'Mais vendidos':
        return 'livro.vendas';
      case 'Menores preços':
        return 'livro.preco';
      case 'Maiores preços':
        return 'livro.preco';
      case 'Quantidade disponível':
        return 'livro.disponiveis';
      default:
        return 'livro.publicacao';
    }
  }

  async selecionarLivro(codigo: number): Promise<Livro> {
    const pegarLivro = await this.livrosRepository.findOne({
      where: { codigo },
    });

    if (!pegarLivro) {
      throw new NotFoundException('Livro não encontrado no banco!');
    }

    return pegarLivro;
  }

  async selecionarPesquisa(pesquisa: string): Promise<Livro[]> {
    if (!pesquisa || pesquisa.trim() === '') {
      return [];
    }

    const pesquisaSanitizada = pesquisa.trim();

    return await this.livrosRepository.find({
      where: { titulo: Like(`%${pesquisaSanitizada}%`) },
    });
  }
}
