import { Module, forwardRef } from '@nestjs/common';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './pedidos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './pedidos.entity';
import { UsuariosModule } from '../Usuarios/usuarios.module';
import { LivrosModule } from '../Livros/livros.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido]),
    forwardRef(() => UsuariosModule),
    LivrosModule,
  ],
  controllers: [PedidosController],
  providers: [PedidosService],
  exports: [PedidosService, TypeOrmModule],
})
export class PedidosModule {}
