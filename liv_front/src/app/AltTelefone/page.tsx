"use client";

import Header from "../../Components/Header";
import BlocoPerfil from "../../Components/BlocoPerfil";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import userData from "../Interfaces/User";
import axios from "axios";

export default function AltTelefone() {
  const [telefone, setTelefone] = useState("");
  const [user, setUser] = useState<userData | null>(null);
  const [msg, setMsg] = useState("");

  const formatarTelefone = (valor: string): string => {
    valor = valor.replace(/\D/g, "");

    if (valor.length > 10) {
      return valor.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (valor.length > 6) {
      return valor.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (valor.length > 2) {
      return valor.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    } else {
      return valor;
    }
  };

  const router = useRouter();

  useEffect(() => {
    const infoUser = localStorage.getItem("user");
    if (infoUser) {
      setUser(JSON.parse(infoUser));
    }
  }, []);

  const confirmar = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (telefone.trim() === "") {
      setMsg("Insira um telefone!");
      return;
    }

    if (!user) return;

    const dados = { email: user?.email, telefone: telefone };

    try {
      const response = await axios.patch(
        "http://localhost:3000/usuarios/telefone",
        dados
      );

      const novoUser = {
        ...user,
        telefone: response.data.telefone || telefone,
      };
      localStorage.setItem("user", JSON.stringify(novoUser));

      router.push("/Perfil");
    } catch (error) {
      console.error("Erro ao alterar telefone!", error);
    }
  };
  return (
    <Header>
      <BlocoPerfil>
        <form onSubmit={confirmar}>
          <div className="h-3/5 w-full flex flex-col pl-10 py-5 space-y-5">
            <div className="my-5">
              <label className="text-black font-bold mr-3">
                Novo telefone:
              </label>
              <input
                className="border-3 border-black rounded-md py-2 px-3 text-gray-800 w-55"
                type="text"
                placeholder="Seu Telefone"
                value={telefone}
                onChange={(e) => {
                  setTelefone(formatarTelefone(e.target.value));
                }}
              ></input>
            </div>
            <div className="flex items-center justify-center">
              {msg && <p className="font-semibold text-red-700 mt-3">{msg}</p>}
            </div>
          </div>
          <div className="h-1/5 w-full flex flex-row items-center justify-center shadow-2xl rounded-b-md py-5 space-x-20 text-black bg-gray-300 ">
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
