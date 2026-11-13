"use client";
import Header from "../../Components/Header";
import { User } from "lucide-react";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import userData from "../Interfaces/User";
import axios from "axios";

export default function ExcluirConta() {
  const [user, setUser] = useState<userData | null>(null);
  const [suaSenha, setSuaSenha] = useState("");
  const [descricao, setDescricao] = useState("");
  const [msg, setMsg] = useState("");

  const router = useRouter();

  useEffect(() => {
    const infoUser = localStorage.getItem("user");
    if (infoUser) {
      setUser(JSON.parse(infoUser));
    }
  }, []);

  async function removerConta(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (suaSenha.trim() === "") {
      setMsg("Defina uma senha válida");
      return;
    }

    if (!user?.email) {
      setMsg("Usuário não encontrado!");
      return;
    }

    const dados = { email: user?.email, senha: suaSenha };
    try {
      await axios.delete("http://localhost:3000/usuarios/deletar", {
        data: dados,
      });
      localStorage.removeItem("user");
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Não foi possível deletar esta conta!", error);
        setMsg(error.response?.data?.message || "Erro ao excluir a conta.");
      } else {
        console.error("Erro inesperado:", error);
        setMsg("Erro inesperado ao excluir a conta.");
      }
    }
  }

  return (
    <Header>
      <form onSubmit={removerConta} className="w-full h-full">
        <main className="flex h-full w-full items-center justify-center">
          <section className=" w-2/6 h-5/6">
            <div className="h-1/5 w-full bg-gray-900 flex flex-col items-center justify-center rounded-t-md">
              <User height={40} width={40} className="text-amber-400"></User>
            </div>
            <div className="shadow-2xl rounded-b-md">
              <div className="h-3/5 w-full flex flex-col items-center py-5 space-y-5 text-black">
                <p className="font-bold text-xl text-amber-800">
                  Deseja realmente deletar a conta?
                </p>
                <div className="flex flex-row space-x-2 items-center">
                  <label>Sua senha:</label>
                  <input
                    type="password"
                    className="border-3 border-black rounded-md py-2 px-3 text-gray-800 w-50"
                    placeholder="Sua senha"
                    value={suaSenha}
                    onChange={(e) => {
                      setSuaSenha(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="flex flex-row items-start space-x-2">
                  <label className="">
                    Descrição<br></br>do motivo
                    <br></br>(Opcional)
                  </label>
                  <textarea
                    className="border-3 border-black rounded-md py-2 px-3 text-gray-800 w-50 h-20"
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e) => {
                      setDescricao(e.target.value);
                    }}
                  ></textarea>
                </div>
                {msg && <p className="font-semibold text-red-700">{msg}</p>}
              </div>
            </div>
            <div className="h-1/5 w-full flex flex-row items-center justify-center shadow-2xl rounded-b-md py-5 space-x-20 text-black bg-gray-300 ">
              <button
                type="button"
                className="bg-amber-300 py-2 px-3 rounded-md hover:text-white cursor-pointer "
                onClick={() => {
                  localStorage.removeItem("user");
                  router.push("/");
                }}
              >
                Sair da sessão
              </button>
              <button
                type="submit"
                className="bg-red-500 py-2 px-3 rounded-md hover:text-white cursor-pointer "
              >
                Excluir conta
              </button>
            </div>
          </section>
        </main>
      </form>
    </Header>
  );
}
