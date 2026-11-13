import { IsEmail } from 'class-validator';
import { Carrinho } from '../Carrinhos/carrinhos.entity';
import { Pedido } from '../Pedidos/pedidos.entity';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Pesquisa } from '../Pesquisas/pesquisas.entity';

@Entity()
export class Usuario {
  @Column()
  nome: string;

  @Column()
  telefone: string;

  @IsEmail()
  @PrimaryColumn({ unique: true })
  email: string;

  @Column()
  senha: string;

  @OneToMany(() => Carrinho, (carrinho) => carrinho.usuario)
  carrinhos: Carrinho[];

  @OneToMany(() => Pedido, (pedido) => pedido.usuario)
  pedidos: Pedido[];

  @OneToMany(() => Pesquisa, (pesquisa) => pesquisa.usuario)
  pesquisas: Pesquisa[];
}
