import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Delete,
  Param,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { CarrinhosService } from './carrinhos.service';
import { CreateCarrinhoDto } from './create-carrinho.dto';
import { Carrinho } from './carrinhos.entity';
import { PedidosService } from '../Pedidos/pedidos.service';
import { CreatePedidoDto } from '../Pedidos/create-pedidos.dto';

@Controller('carrinhos')
export class CarrinhosController {
  constructor(
    private readonly carrinhosService: CarrinhosService,

    private readonly pedidosService: PedidosService,
  ) {}

  @Post('novo')
  async novoCarrinho(
    @Body() createCarrinhoDto: CreateCarrinhoDto,
  ): Promise<Carrinho> {
    return await this.carrinhosService.novoCarrinho(createCarrinhoDto);
  }

  @Get('buscar/:usuarioEmail')
  async buscarCarrinhos(
    @Param('usuarioEmail') usuarioEmail: string,
  ): Promise<Carrinho[]> {
    return await this.carrinhosService.buscarCarrinhos(usuarioEmail);
  }

  @Patch('quantidade')
  async alterarQuantidade(
    @Body('idCarrinho') idCarrinho: number,
    @Body('valor') valor: number,
  ): Promise<number> {
    const alterar = await this.carrinhosService.alterarQuantidade(
      idCarrinho,
      valor,
    );

    return alterar;
  }

  @Delete('excluir/:idCarrinho')
  @HttpCode(204)
  async excluirItem(
    @Param('idCarrinho', ParseIntPipe) idCarrinho: number,
  ): Promise<void> {
    await this.carrinhosService.excluirItem(idCarrinho);
  }

  @Delete('excluir/:userEmail')
  @HttpCode(204)
  async deletarCarrinhos(
    @Param('usuarioEmail') usuarioEmail: string,
  ): Promise<void> {
    await this.carrinhosService.deletarCarrinhos(usuarioEmail);
  }

  @Post('selecionados')
  async carrinhosSelecionados(@Body('ids') ids: number[]) {
    const pedidos = await Promise.all(
      ids.map(async (id) => {
        const resultado = await this.carrinhosService.selecionados(id);

        console.log('Resultado: ', resultado);

        const dtoPedido: CreatePedidoDto = {
          usuarioEmail: resultado.usuario.email,
          codigoLivro: resultado.livro.codigo,
          quantidade: resultado.quantidade,
          status: 'Pedido recebido',
        };

        return this.pedidosService.novoPedido(dtoPedido);
      }),
    );

    return pedidos;
  }

  @HttpCode(204)
  @Delete('limpar')
  async limparCarrinho(@Body('ids') ids: number[]) {
    const limpar = await Promise.all(
      ids.map(async (id) => {
        await this.carrinhosService.limparCarrinho(id);
      }),
    );
  }
}
