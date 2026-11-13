import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Usuario } from '../Usuarios/usuarios.entity';

@Entity()
export class Pesquisa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  texto: string;

  @Column()
  data: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.pesquisas)
  usuario: Usuario;
}
