import { Module } from '@nestjs/common';
import { Livro } from './livros.entity';
import { LivrosService } from './livros.service';
import { LivrosController } from './livros.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Livro])],
  controllers: [LivrosController],
  providers: [LivrosService],
  exports: [TypeOrmModule],
})
export class LivrosModule {}
