import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { PesquisasService } from './pesquisas.service';
import { Pesquisa } from './pesquisas.entity';
import { CreatePesquisaDto } from './create-pesquisa.dto';

@Controller('pesquisas')
export class PesquisasController {
  constructor(private readonly pesquisasService: PesquisasService) {}

  @Post('criar/:email')
  async criarPesquisa(
    @Param('email') email: string,
    @Body() createPesquisaDto: CreatePesquisaDto,
  ): Promise<Pesquisa> {
    return this.pesquisasService.criarPesquisa(email, createPesquisaDto);
  }

  @Get('buscar')
  async buscarPesquisas(@Query('email') email: string): Promise<Pesquisa[]> {
    return await this.pesquisasService.buscarPesquisas(email);
  }
}
