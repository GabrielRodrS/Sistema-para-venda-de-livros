import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './create-pedidos.dto';
import { Pedido } from './pedidos.entity';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post('novo')
  async novoPedido(@Body() createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    return await this.pedidosService.novoPedido(createPedidoDto);
  }

  @Get('buscar/:userEmail')
  async buscarPedidos(
    @Param('userEmail') userEmail: string,
  ): Promise<Pedido[]> {
    return await this.pedidosService.buscarPedidos(userEmail);
  }

  @Patch('cancelar')
  async pedidoCancelamento(
    @Body('idPedido') idPedido: number,
    @Body('codigo') codigo: number,
  ): Promise<void> {
    const pedido = await this.pedidosService.pedidoCancelamento(
      idPedido,
      codigo,
    );
    return null;
  }

  @Post('buscar/filtro')
  async buscarFiltro(
    @Body('email') email: string,
    @Body('filtro') filtro: string,
  ): Promise<Pedido[]> {
    return await this.pedidosService.buscarFiltro(email, filtro);
  }
}
