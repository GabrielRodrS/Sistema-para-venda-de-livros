"use client";

import { useState } from "react";
import Formulario from "../Components/Formulario";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Mail,
  LockKeyhole,
  UserPlus,
  ArrowRight,
} from "lucide-react";
import axios, { AxiosError } from "axios";

export default function Login() {
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const realizarLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMsg("");

    if (email.trim() === "" || senha === "") {
      setMsg("Preencha todos os campos!");
      return;
    }

    const dados = { email, senha };

    try {
      const response = await axios.post(`${API_URL}/usuarios/login`, dados);

      const { token } = response.data;
      localStorage.setItem("token", token);

      const userResponse = await axios.get(`${API_URL}/usuarios/auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { nome, telefone, email: emailUsuario } = userResponse.data;

      localStorage.setItem(
        "user",
        JSON.stringify({
          nome,
          telefone,
          email: emailUsuario,
        }),
      );

      router.push("/InterfaceP");
    } catch (error) {
      if (error instanceof AxiosError) {
        setMsg(
          error.response?.data?.message ||
            "Erro ao realizar login. Tente novamente!",
        );
      } else {
        setMsg("Erro inesperado. Tente novamente!");
      }
    }
  };

  return (
    <Formulario titulo="Login" moderno>
      <form
        onSubmit={realizarLogin}
        className="w-full max-w-md mx-auto px-5 sm:px-8"
      >
        {/* Apresentação */}
        <div className="flex flex-col items-center text-center mt-5 mb-9">
          <div className="bg-amber-100 p-4 rounded-2xl mb-4">
            <BookOpen size={38} className="text-amber-700" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            Bem-vindo à NewBook!
          </h2>
        </div>

        {/* Campos */}
        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              E-mail
            </label>

            <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 bg-white transition-all focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-100">
              <Mail size={19} className="text-gray-400 shrink-0" />

              <input
                className="w-full py-3 px-3 outline-none text-gray-800 bg-transparent placeholder:text-gray-400"
                type="email"
                placeholder="Digite seu e-mail"
                maxLength={50}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Senha
            </label>

            <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 bg-white transition-all focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-100">
              <LockKeyhole size={19} className="text-gray-400 shrink-0" />

              <input
                className="w-full py-3 px-3 outline-none text-gray-800 bg-transparent placeholder:text-gray-400"
                type="password"
                placeholder="Digite sua senha"
                maxLength={20}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Mensagem de erro */}
        {msg && (
          <div className="mt-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm text-center font-medium">
            {msg}
          </div>
        )}

        {/* Botões */}
        <div className="flex flex-col gap-3 mt-8 mb-8">
          <button
            className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
            type="submit"
          >
            Entrar
            <ArrowRight size={19} />
          </button>

          <button
            className="w-full flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-amber-400 hover:bg-amber-50 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-200 cursor-pointer"
            type="button"
            onClick={() => router.push("/Cadastro")}
          >
            <UserPlus size={19} />
            Criar minha conta
          </button>
        </div>
      </form>
    </Formulario>
  );
}
