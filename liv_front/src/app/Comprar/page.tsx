"use client";

import { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Comprar() {
  const [tipoPag, setTipoPag] = useState("");
  const router = useRouter();
  const [ids, setIds] = useState<number[]>([]);
  const [preco, setPreco] = useState(0);
  const [msg, setMsg] = useState("");
  const [chavePix, setChavePix] = useState("");

  useEffect(() => {
    const p = localStorage.getItem("preco");
    if (p) {
      setPreco(JSON.parse(p));
    }

    const bag = localStorage.getItem("selecionados");
    if (bag) {
      setIds(JSON.parse(bag));
    }
  }, [preco]);

  const pagamentoPix = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (chavePix.trim() === "") {
      setMsg("Digite a chave pix!");
      return;
    }

    try {
      await axios.post("http://localhost:3000/carrinhos/selecionados", { ids });
    } catch (error) {
      console.error("Problema ao buscar item referente ao carrinho!", error);
    }

    try {
      await axios.delete("http://localhost:3000/carrinhos/limpar", {
        data: { ids },
      });
    } catch (error) {
      console.error("Problema ao buscar item referente ao carrinho!", error);
    }

    router.push("/Compras");
  };

  const pagamentoCartao = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Header>
      <div className="h-10/11 w-full flex items-center justify-center">
        <main className="h-7/8 w-2/5 bg-white flex flex-col text-center text-black shadow-2xl rounded-md">
          <p className="h-1/7 w-full font-bold text-2xl bg-gray-900 pt-3 text-amber-400 rounded-t-md">
            Realizar pagamento
          </p>
          <section className="h-2s/7 w-full  flex flex-col items-center justify-center font-semibold">
            <p className="text-amber-700 mb-2 mt-5">
              Valor da compra: R$ {preco.toFixed(2)}
            </p>
            <p>Como deseja efetuar o pagamento? </p>
            <div className="flex flex-row space-x-5">
              <button
                className="cursor-pointer"
                onClick={() => {
                  setMsg("");
                  setTipoPag("pix");
                }}
              >
                <Image
                  src={"/pix-img.jpg"}
                  alt="pix"
                  height={80}
                  width={80}
                ></Image>
              </button>
              <button
                className="cursor-pointer"
                onClick={() => {
                  setMsg("");

                  setTipoPag("cartao");
                }}
              >
                <Image
                  src={"/cartao-img.jpg"}
                  alt="pix"
                  height={80}
                  width={80}
                ></Image>
              </button>
            </div>
          </section>
          {tipoPag === "cartao" ? (
            <form onSubmit={pagamentoCartao} className="h-full">
              <section className=" h-5/7 w-full bg-gray-100">
                <div className="flex flex-row items-center justify-center space-x-10 h-1/2 w-full">
                  <div className="flex flex-col items-start">
                    <label className="font-semibold">Nome do titular:</label>
                    <input
                      maxLength={50}
                      placeholder="Nome no cartão"
                      type="text"
                      className="bg-white rounded-sm p-2 border-2 border-black w-60"
                    ></input>
                  </div>
                  <div className="flex flex-col items-start">
                    <label className="font-semibold">Data de vencimento</label>
                    <input
                      type="date"
                      className="bg-white rounded-sm p-2 border-2 border-black w-35"
                    ></input>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center space-x-10 h-1/2 w-full">
                  <div className="flex flex-col items-start">
                    <label className="font-semibold">Número do cartão:</label>
                    <input
                      maxLength={16}
                      placeholder="Inserir número"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      className="bg-white rounded-sm p-2 border-2 border-black w-60"
                    ></input>
                  </div>
                  <div className="flex flex-col items-start">
                    <label className="font-semibold">Código</label>
                    <input
                      placeholder="CCV"
                      maxLength={3}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      className="bg-white rounded-sm p-2 border-2 border-black w-35"
                    ></input>
                  </div>
                </div>
              </section>
              <section className="h-2/7 w-full bg-gray-300 flex flex-col items-center justify-center rounded-b-md">
                <div className="flex items-center justify-around space-x-30">
                  <button
                    className="cursor-pointer p-2 rounded-md bg-red bg-red-500 text-white hover:text-amber-400 "
                    onClick={() => {
                      router.push("/Carrinho");
                    }}
                  >
                    Voltar ao carrinho
                  </button>
                  <button
                    type="submit"
                    className="cursor-pointer p-2 rounded-md bg-red bg-green-500 text-white hover:text-amber-400 "
                  >
                    Confirmar
                  </button>
                </div>
                {msg && (
                  <p className="font-semibold text-red-700 mt-3">{msg}</p>
                )}
              </section>
            </form>
          ) : (
            <form onSubmit={pagamentoPix} className="h-full">
              <section className="h-5/7 w-full bg-gray-100 flex items-center justify-center">
                <div className="flex flex-col items-start">
                  <label className="font-semibold">Chave pix:</label>
                  <input
                    maxLength={30}
                    placeholder="Inserir chave pix"
                    type="text"
                    value={chavePix}
                    onChange={(e) => {
                      setChavePix(e.target.value);
                    }}
                    className="bg-white rounded-sm p-2 border-2 border-black w-60"
                  ></input>
                </div>
              </section>
              <section className="h-2/7 w-full bg-gray-300 flex flex-col items-center justify-center rounded-b-md">
                <div className="flex items-center justify-around space-x-30">
                  <button
                    className="cursor-pointer p-2 rounded-md bg-red bg-red-500 text-white hover:text-amber-400 "
                    onClick={() => {
                      router.push("/Carrinho");
                    }}
                  >
                    Voltar ao carrinho
                  </button>

                  <button
                    type="submit"
                    className="cursor-pointer p-2 rounded-md bg-red bg-green-500 text-white hover:text-amber-400 "
                  >
                    Confirmar
                  </button>
                </div>
                {msg && (
                  <p className="font-semibold text-red-700 mt-3">{msg}</p>
                )}
              </section>
            </form>
          )}
        </main>
      </div>
    </Header>
  );
}
