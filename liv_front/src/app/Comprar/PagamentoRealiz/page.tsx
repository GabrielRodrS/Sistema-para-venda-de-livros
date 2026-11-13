"use client";

import { useRouter } from "next/navigation";
import Header from "../../../Components/Header";

export default function PagamentoRealiz() {
  const router = useRouter();
  return (
    <Header>
      <div className="h-10/11 w-full flex items-center justify-center">
        <div className="h-2/6 w-2/6 bg-gray-900 shadow-2xl flex flex-col items-center justify-center space-y-5 rounded-md">
          <p className="font-bold text-xl">Pagamento realizado com sucesso!</p>
          <p className="font-bold text-xl">
            Seu pedido chegará em um instante...
          </p>
          <button
            type="button"
            className="p-2 bg-green-500 rounded-md text-black hover:text-white cursor-pointer"
            onClick={() => {
              router.push("/Compras");
            }}
          >
            Ver meus pedidos
          </button>
        </div>
      </div>
    </Header>
  );
}
