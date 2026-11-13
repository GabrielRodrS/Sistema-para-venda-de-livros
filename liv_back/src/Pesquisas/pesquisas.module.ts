import { Module } from '@nestjs/common';
import { PesquisasService } from './pesquisas.service';
import { PesquisasController } from './pesquisas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pesquisa } from './pesquisas.entity';
import { UsuariosModule } from '../Usuarios/usuarios.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pesquisa]), UsuariosModule],
  providers: [PesquisasService],
  controllers: [PesquisasController],
})
export class PesquisasModule {}
