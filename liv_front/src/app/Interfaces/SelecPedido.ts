export default interface SelecPedido {
  idPedido: number;
  titulo: string;
  preco: number;
  codigo: number;
  paginas: number;
  autor: string;
  data: Date;
  quantidade: number;
  status: string;
  source: string;
  genero: string[];
}
