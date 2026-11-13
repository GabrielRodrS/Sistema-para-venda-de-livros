import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { Livro } from "../Components/InterfacePContent";
import axios from "axios";
import userData from "../app/Interfaces/User";
import SelecPedido from "../app/Interfaces/SelecPedido";

interface InformacoesLivroProps {
  children: ReactNode;
  nav1: string;
  navr1: string;
  disp?: number;
  livro: Livro | SelecPedido;
}
export default function InformacoesLivro({
  children,
  nav1,
  navr1,
  livro,
  disp,
}: InformacoesLivroProps) {
  const router = useRouter();
  const [user, setUser] = useState<userData | null>(null);
  const msg = "Não disponível para venda!";

  useEffect(() => {
    const ls = localStorage.getItem("user");
    if (ls) {
      setUser(JSON.parse(ls));
    }
  }, []);

  async function adicionarCarrinho() {
    const dados = {
      codigoLivro: livro.codigo,
      emailUsuario: user?.email,
      quantidade: 1,
    };
    try {
      await axios.post("http://localhost:3000/carrinhos/novo", dados);
      router.push(navr1);
    } catch (error) {
      console.error("Não foi possível adicionar o produto ao carrinho!", error);
    }
  }

  return (
    <div className="h-10/11 w-full flex items-center justify-center">
      <main className="h-4/6 w-3/6 grid grid-cols-2 grid-rows-5  shadow-2xl rounded-sm border-gray-800 border-3">
        <section className="row-span-5 bg-radial from-gray-100 to-gray-800 flex items-center justify-center">
          <Image
            src={livro?.source || "/livro1.jpg"}
            height={200}
            width={200}
            alt="livro"
          ></Image>
        </section>

        <aside className="row-span-4 bg-gray-300 justify-start   text-black font-bold p-5">
          <div className="flex flex-col border-b-2 border-black space-y-2 pb-3">
            <p className="text-xl  truncate border-b-3">{livro?.titulo}</p>
            <p className="text-amber-700">{livro?.preco}</p>
            <p>Quantidade de páginas: {livro?.paginas}</p>
            <p className="truncate">Autor: {livro?.autor}</p>
          </div>
          {children}
        </aside>
        <div className="row-span-1 flex flex-col items-center justify-center bg-gray-300">
          <button
            disabled={!disp || disp <= 0}
            className={`p-2 rounded-md text-black bg-green-500 cursor-pointer
              ${
                !disp || disp <= 0
                  ? "opacity-50  cursor-not-allowed"
                  : "hover:text-white"
              }
            `}
            onClick={() => {
              adicionarCarrinho();
            }}
          >
            {nav1}
          </button>
          {disp !== undefined && disp <= 0 && (
            <p className="font-semibold text-red-700 mt-1">{msg}</p>
          )}
        </div>
      </main>
    </div>
  );
}
