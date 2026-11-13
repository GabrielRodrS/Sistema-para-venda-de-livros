import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreatePesquisaDto {
  @IsString()
  @IsNotEmpty()
  texto: string;

  @IsDate()
  data: Date;
}
