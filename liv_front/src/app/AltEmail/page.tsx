"use client";

import Header from "../../Components/Header";
import BlocoPerfil from "../../Components/BlocoPerfil";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import userData from "../Interfaces/User";

export default function AltEmail() {
  const [senha, setSenha] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [user, setUser] = useState<userData | null>(null);
  const [msg, setMsg] = useState("");

  const router = useRouter();

  useEffect(() => {
    const InfoUser = localStorage.getItem("user");
    if (InfoUser) {
      setUser(JSON.parse(InfoUser));
    }
  }, []);

  const confirmar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (senha.trim() === "" || novoEmail.trim() === "") {
      setMsg("Preencha todos os campos!");
      return;
    }

    if (!user) return;

    const dados = { novoEmail: novoEmail, email: user.email, senha: senha };

    try {
      const response = await axios.patch(
        "http://localhost:3000/usuarios/email",
        dados
      );

      const novoUser = { ...user, email: response.data.email || novoEmail };
      localStorage.setItem("user", JSON.stringify(novoUser));

      router.push("/Perfil");
    } catch (error) {
      console.log("Erro ao alterar Email!", error);
      setMsg("Erro ao alterar o email! Tente novamente.");
    }
  };

  return (
    <Header>
      <BlocoPerfil>
        <form onSubmit={confirmar}>
          <div className="h-3/5 w-full flex flex-col pl-10 py-5 space-y-5 pr-24 justify-center items-center">
            <div>
              <label className="text-black font-bold mr-3">Sua senha:</label>
              <input
                className="border-3 border-black rounded-md py-2 px-3 text-gray-800 w-60"
                type="password"
                placeholder="Senha"
                maxLength={20}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <div>
              <label className="text-black font-bold mr-3">Novo email:</label>
              <input
                className="border-3 border-black rounded-md py-2 px-3 text-gray-800 w-60"
                type="email"
                placeholder="Seu email"
                maxLength={50}
                value={novoEmail}
                onChange={(e) => setNovoEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-center mb-5">
            {msg && <p className="font-semibold text-red-700 mt-3">{msg}</p>}
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
