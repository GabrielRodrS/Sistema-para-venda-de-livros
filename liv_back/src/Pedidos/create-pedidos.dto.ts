import { IsEmail, IsInt, Min } from 'class-validator';

export class CreatePedidoDto {
  @IsInt()
  @Min(1)
  quantidade: number;

  @IsEmail()
  usuarioEmail: string;

  @IsInt()
  codigoLivro: number;

  status: string;
}
