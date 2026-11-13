import {
  Param,
  Body,
  Post,
  Delete,
  Get,
  Controller,
  HttpCode,
  Query,
  ParseFloatPipe,
} from '@nestjs/common';
import { LivrosService } from './livros.service';
import { Livro } from './livros.entity';

@Controller('livros')
export class LivrosController {
  constructor(private readonly livrosService: LivrosService) {}

  @Post()
  async incluirLivros(
    @Body('codigo') codigo: number,
    @Body('titulo') titulo: string,
    @Body('disponiveis') disponiveis: number,
    @Body('autor') autor: string,
    @Body('genero') genero: string[],
    @Body('preco') preco: number,
    @Body('paginas') paginas: number,
    @Body('publicacao') publicacao: Date,
    @Body('vendas') vendas: number,
    @Body('source') source: string,
  ): Promise<Livro> {
    return await this.livrosService.incluirLivros(
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
    );
  }

  @Delete('deletar')
  @HttpCode(204)
  async deletarLivros(@Body('codigo') codigo: number): Promise<void> {
    await this.livrosService.deletarLivros(codigo);
  }

  @Get('buscar')
  async buscarLivros(): Promise<Livro[]> {
    return await this.livrosService.buscarLivros();
  }

  @Get('buscarFiltro')
  async buscarFiltro(
    @Query('genero') genero: string,
    @Query('preco', ParseFloatPipe) preco: number,
    @Query('paginas', ParseFloatPipe) paginas: number,
  ): Promise<Livro[]> {
    return this.livrosService.buscarFiltro(genero, preco, paginas);
  }

  @Get('buscarHeader/:header')
  async buscarHeader(@Param('header') header: string): Promise<Livro[]> {
    return this.livrosService.buscarHeader(header);
  }

  @Get('selecionado/:codigo')
  async selecionarLivro(@Param('codigo') codigo: number): Promise<Livro> {
    if (isNaN(codigo) || codigo <= 0) {
      throw new Error('Código inválido');
    }
    return await this.livrosService.selecionarLivro(codigo);
  }

  @Get('pesquisar')
  async selecionarPesquisa(
    @Query('pesquisa') pesquisa: string,
  ): Promise<Livro[]> {
    return await this.livrosService.selecionarPesquisa(pesquisa);
  }
}
