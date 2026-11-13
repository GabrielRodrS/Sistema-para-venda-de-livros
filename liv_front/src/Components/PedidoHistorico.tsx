import Image from "next/image";
import { useRouter } from "next/navigation";
import SelecPedido from "../app/Interfaces/SelecPedido";
import axios from "axios";

interface PedidoHistoricoProps {
  pedido: SelecPedido;
}

export default function PedidoHistorico({ pedido }: PedidoHistoricoProps) {
  const router = useRouter();

  const cancelar = async () => {
    const dados = { idPedido: pedido.idPedido, codigo: pedido.codigo };
    try {
      await axios.patch("http://localhost:3000/pedidos/cancelar", dados);
      window.location.reload();
    } catch (error) {
      console.error("Erro ao pedir cancelamento!", error);
    }
  };

  return (
    <div className="flex flex-row justify-center border-b-3 border-gray-900">
      <div className="h-45 w-full bg-white flex flex-row py-2 justify-start space-x-4">
        <Image
          src={pedido?.source || "livro1.jpg"}
          alt="Livro"
          width={170}
          height={170}
          className="ml-4 cursor-pointer"
          onClick={() => {
            router.push("/Pedido");
          }}
        ></Image>

        <aside className="flex flex-col items-center text-black justify-center font-semibold break-words max-w-[220px] space-y-2">
          <p className="w-full truncate">{pedido.titulo}</p>
          <p className="w-full truncate">R$ {pedido.preco}</p>
          <p className="w-full truncate">Quantidade: {pedido.quantidade}</p>
          <p className="w-full truncate ">Código do pedido: {pedido.codigo}</p>
          <p
            className={`w-full truncate text-green-600 text-base ${
              pedido.status === "Pedido recebido"
                ? "text-yellow-600"
                : pedido.status === "Em transporte"
                ? "text-orange-600"
                : pedido.status === "Pedido de cancelamento"
                ? "text-red-500"
                : "text-green-600"
            }`}
          >
            {pedido.status}!
          </p>
        </aside>
      </div>
      <aside className=" w-2/5 flex flex-col items-center justify-center space-y-5 ">
        <button
          type="button"
          className="bg-gray-400 py-2 px-3 rounded-md cursor-pointer text-black hover:text-white mx-5"
          onClick={() => {
            localStorage.setItem("pedido", JSON.stringify(pedido));
            router.push("/Pedidos");
          }}
        >
          Informações do pedido
        </button>
        <button
          disabled={pedido.status === "Pedido de cancelamento"}
          type="button"
          className={`bg-red-500 py-2 px-3 rounded-md cursor-pointer text-black hover:text-white mx-5 ${
            pedido.status === "Pedido de cancelamento" ||
            pedido.status === "Entregue" ||
            pedido.status === "Em transporte"
              ? "opacity-50"
              : null
          }`}
          onClick={() => {
            cancelar();
          }}
        >
          Cancelar pedido
        </button>
      </aside>
    </div>
  );
}
