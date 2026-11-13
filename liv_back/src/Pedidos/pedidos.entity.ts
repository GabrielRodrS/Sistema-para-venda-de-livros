import { Usuario } from '../Usuarios/usuarios.entity';
import { Livro } from '../Livros/livros.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn({ name: 'idpedido' })
  idPedido: number;

  @Column()
  titulo: string;

  @Column('decimal')
  preco: number;

  @Column()
  codigo: number;

  @Column()
  paginas: number;

  @Column()
  autor: string;

  @Column()
  data: Date;

  @Column()
  quantidade: number;

  @Column()
  status: string;

  @Column()
  source: string;

  @Column('text', { array: true })
  genero: string[];

  @ManyToOne(() => Usuario, (usuario) => usuario.pedidos)
  @JoinColumn({ name: 'usuarioEmail' })
  usuario: Usuario;

  @ManyToOne(() => Livro, (livro) => livro.pedidos)
  @JoinColumn({ name: 'livroCodigo' })
  livro: Livro;
}
