import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Usuario } from './usuarios.entity';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { PedidosModule } from '../Pedidos/pedidos.module';
import { CarrinhosModule } from '../Carrinhos/carrinhos.module';
import { Pesquisa } from '../Pesquisas/pesquisas.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Pesquisa]),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    forwardRef(() => PedidosModule),
    forwardRef(() => CarrinhosModule),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [TypeOrmModule],
})
export class UsuariosModule {}
