import { Module, forwardRef } from '@nestjs/common';
import { CarrinhosService } from './carrinhos.service';
import { CarrinhosController } from './carrinhos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrinho } from './carrinhos.entity';
import { LivrosModule } from '../Livros/livros.module';
import { UsuariosModule } from '../Usuarios/usuarios.module';
import { PedidosModule } from '../Pedidos/pedidos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Carrinho]),
    LivrosModule,
    forwardRef(() => UsuariosModule),
    PedidosModule,
  ],
  providers: [CarrinhosService],
  controllers: [CarrinhosController],
  exports: [TypeOrmModule],
})
export class CarrinhosModule {}
