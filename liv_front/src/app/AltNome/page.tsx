"use client";

import Header from "../../Components/Header";
import BlocoPerfil from "../../Components/BlocoPerfil";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import userData from "../Interfaces/User";
import axios from "axios";

export default function AltNome() {
  const [nome, setNome] = useState("");
  const [user, setUser] = useState<userData | null>(null);
  const [msg, setMsg] = useState("");

  const router = useRouter();

  useEffect(() => {
    const InfoUser = localStorage.getItem("user");
    if (InfoUser) {
      setUser(JSON.parse(InfoUser));
    }
  }, []);

  const confirmar = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (nome.trim() === "") {
      setMsg("Insira um nome!");
      console.log("Mensagem de erro definida:", msg);
      return;
    }

    if (!user) return;

    const dados = { email: user?.email, nome: nome };

    try {
      const response = await axios.patch(
        "http://localhost:3000/usuarios/nome",
        dados
      );

      const novoUser = { ...user, nome: response.data.nome || nome };

      localStorage.setItem("user", JSON.stringify(novoUser));

      router.push("/Perfil");
    } catch (error) {
      console.error("Erro ao alterar nome!", error);
    }
  };

  return (
    <Header>
      <BlocoPerfil>
        <form onSubmit={confirmar}>
          <div className="h-3/5 w-full flex flex-col pl-10 py-5 space-y-5">
            <div className="my-3">
              <label className="text-black font-bold mr-3">Novo nome:</label>
              <input
                className="border-3 border-black rounded-md py-2 px-3 text-gray-800 w-60"
                type="text"
                placeholder="Seu nome"
                maxLength={40}
                value={nome}
                onChange={(e) => {
                  setNome(e.target.value);
                }}
              ></input>
              <div className="flex items-center justify-center">
                {msg && (
                  <p className="font-semibold text-red-700 mt-3">{msg}</p>
                )}
              </div>
            </div>
          </div>

          <div className="h-2/5 w-full flex flex-row items-center justify-center shadow-2xl rounded-b-md py-5 space-x-20 text-black bg-gray-300 ">
            <button
              type="button"
              className="bg-red-500 py-2 px-3 rounded-md hover:text-white cursor-pointer"
              onClick={() => {
                router.push("/Perfil");
              }}
            >
              Voltar ao perfil
            </button>
            <button
              type="submit"
              className="bg-amber-300 py-2 px-3 rounded-md hover:text-white cursor-pointer"
            >
              Confirmar
            </button>
          </div>
        </form>
      </BlocoPerfil>
    </Header>
  );
}
