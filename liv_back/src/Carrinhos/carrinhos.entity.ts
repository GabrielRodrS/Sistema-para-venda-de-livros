import { Usuario } from '../Usuarios/usuarios.entity';
import { Livro } from '../Livros/livros.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Carrinho {
  @PrimaryGeneratedColumn({ name: 'idcarrinho' })
  idCarrinho: number;

  @Column()
  nome: string;

  @Column('float') // ou 'decimal', mas tem que garantir compatibilidade com o banco
  preco: number;

  @Column()
  quantidade: number;

  @Column()
  source: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.carrinhos)
  @JoinColumn({ name: 'usuarioEmail' })
  usuario: Usuario;

  @ManyToOne(() => Livro, (livro) => livro.carrinhos)
  @JoinColumn({ name: 'livroCodigo' })
  livro: Livro;
}
