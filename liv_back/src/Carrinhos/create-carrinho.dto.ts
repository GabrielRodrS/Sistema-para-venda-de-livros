import { IsEmail, IsInt, Min } from 'class-validator';

export class CreateCarrinhoDto {
  @IsInt()
  @Min(1)
  codigoLivro: number; // O código do livro (referência ao livro)

  @IsEmail()
  emailUsuario: string; // O e-mail do usuário (referência ao usuário)

  @IsInt()
  @Min(1)
  quantidade: number; // Quantidade no carrinho
}
