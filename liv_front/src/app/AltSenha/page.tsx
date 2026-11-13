"use client";

import Header from "../../Components/Header";
import BlocoPerfil from "../../Components/BlocoPerfil";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import userData from "../Interfaces/User";
import { User } from "lucide-react";
import axios from "axios";

export default function AltSenha() {
  const [senhaAtual, setSenhaAtual] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState<userData | null>(null);

  const router = useRouter();

  useEffect(() => {
    const infoUser = localStorage.getItem("user");

    if (infoUser) {
      setUser(JSON.parse(infoUser));
    }
  }, []);

  const confirmar = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (senhaAtual.trim() === "" || senhaNova.trim() === "") {
      setMsg("Preencha os campos!");
      return;
    }

    if (!User) return;

    const dados = {
      email: user?.email,
      senhaNova: senhaNova,
      senhaAtual: senhaAtual,
    };

    try {
      await axios.patch("http://localhost:3000/usuarios/senha", dados);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Erro ao alterar senha:", error.message);
        if (error.response) {
          console.error("Resposta do erro:", error.response);
        } else if (error.request) {
          console.error("Pedido não enviado:", error.request);
        }
      } else {
        console.error("Erro desconhecido", error);
      }
    }

    router.push("/Perfil");
  };

  return (
    <Header>
      <BlocoPerfil>
        <form onSubmit={confirmar}>
          <div className="h-3/5 w-full flex flex-col pl-10 py-5 space-y-5 items-end pr-24">
            <div className="my-5  ">
              <label className="text-black font-bold mr-3">Senha atual:</label>
              <input
                className="border-3 border-black rounded-md py-2 px-3 text-gray-800 w-60"
                type="text"
                placeholder="Sua senha"
                maxLength={20}
                value={senhaAtual}
                onChange={(e) => {
                  setSenhaAtual(e.target.value);
                }}
              ></input>
            </div>
            <div className="my-5 ">
              <label className="text-black font-bold mr-3">Nova senha:</label>
              <input
                className="border-3 border-black rounded-md py-2 px-3 text-gray-800 w-60"
                type="text"
                placeholder="Nova senha"
                maxLength={20}
                value={senhaNova}
                onChange={(e) => {
                  setSenhaNova(e.target.value);
                }}
              ></input>
            </div>
            <div className="flex items-center justify-center pr-18">
              {msg && <p className="font-semibold text-red-700">{msg}</p>}
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
