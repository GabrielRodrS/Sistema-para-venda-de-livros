import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Carrinho } from '../Carrinhos/carrinhos.entity';
import { Pedido } from '../Pedidos/pedidos.entity';

@Entity()
export class Livro {
  @PrimaryColumn()
  codigo: number;

  @Column({ nullable: true })
  titulo: string;

  @Column({ nullable: true })
  disponiveis: number;

  @Column({ nullable: true })
  autor: string;

  @Column('simple-array', { nullable: true })
  genero: string[];

  @Column('decimal', { nullable: true })
  preco: number;

  @Column({ nullable: true })
  paginas: number;

  @Column({ nullable: true })
  publicacao: Date;

  @Column({ default: 0, nullable: true })
  vendas: number;

  @Column({ nullable: true })
  source: string;

  @OneToMany(() => Carrinho, (carrinho) => carrinho.livro)
  carrinhos: Carrinho[];

  @OneToMany(() => Pedido, (pedido) => pedido.livro)
  pedidos: Pedido[];
}
