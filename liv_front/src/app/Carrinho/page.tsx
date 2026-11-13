"use client";

import { ShoppingCart } from "lucide-react";
import Header from "../../Components/Header";
import { useRouter } from "next/navigation";
import Pedido from "../../Components/Pedido";
import { useState, useEffect } from "react";
import userData from "../Interfaces/User";
import axios from "axios";

export interface Item {
  idCarrinho: number;
  nome: string;
  preco: number;
  quantidade: number;
  usuario: object;
  source: string;
  livro: object;
}

export default function Carrinho() {
  const [user, setUser] = useState<userData | null>(null);
  const [itens, setItens] = useState<Item[]>([]);
  const [paraComprar, setParaComprar] = useState<number[]>([]);

  const router = useRouter();

  function removerDuplicadosDoLocalStorage() {
    // Recupera os dados do localStorage (exemplo com um array de números)
    const dados = JSON.parse(localStorage.getItem("selecionados") || "[]");

    // Remove duplicados utilizando o Set
    const dadosSemDuplicados = Array.from(new Set(dados));

    // Armazena os dados sem duplicados de volta no localStorage
    localStorage.setItem("selecionados", JSON.stringify(dadosSemDuplicados));
  }

  useEffect(() => {
    const infoUser = localStorage.getItem("user");
    if (infoUser) {
      setUser(JSON.parse(infoUser));
    }
    localStorage.setItem("preco", "0");
  }, []);

  useEffect(() => {
    if (!user?.email) {
      return;
    }

    const buscarItens = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/carrinhos/buscar/${user.email}`
        );
        setItens(response.data);
      } catch (error) {
        console.error("Erro ao buscar itens do carrinho!", error);
      }
    };

    buscarItens();
  }, [user]);

  return (
    <Header>
      <main className="h-10/11 w-full flex items-center justify-center">
        <div className="w-3/10 h-9/10 flex flex-col items-center rounded-sm border-2 ">
          <div className=" h-1/7 w-full flex flex-row space-x-3 items-center justify-center text-2xl font-bold bg-gray-900 rounded-t-sm  text-amber-400">
            <ShoppingCart width={35} height={35}></ShoppingCart>
            <p>Seu carrinho</p>
          </div>

          <section className="h-5/7 w-full grid grid-cols-1 rounded-b-sm bg-white shadow-2xl overflow-y-auto">
            {itens.length > 0
              ? itens.map((item) =>
                  item.idCarrinho ? (
                    <Pedido
                      key={item.idCarrinho}
                      item={item}
                      paraComprar={paraComprar}
                      setParaComprar={setParaComprar}
                    ></Pedido>
                  ) : null
                )
              : null}
          </section>
          <div className="h-1/7 w-full bg-gray-300 rounded-b-sm flex flex-row items-center justify-center space-x-20">
            <button
              type="button"
              className="bg-gray-500 py-2 px-3 rounded-md cursor-pointer hover:text-amber-400"
              onClick={() => {
                router.push("/InterfaceP");
              }}
            >
              Voltar ao catálogo
            </button>
            <button
              type="button"
              className="bg-green-500 py-2 px-3 rounded-md cursor-pointer hover:text-amber-400"
              onClick={() => {
                localStorage.setItem(
                  "selecionados",
                  JSON.stringify(paraComprar)
                );
                console.log(paraComprar);
                removerDuplicadosDoLocalStorage();

                if (localStorage.getItem("selecionados") !== "[]") {
                  router.push("/Comprar");
                }
              }}
            >
              Fazer pedido
            </button>
          </div>
        </div>
      </main>
    </Header>
  );
}
