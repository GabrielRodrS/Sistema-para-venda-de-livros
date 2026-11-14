"use client";

import { useState } from "react";
import Formulario from "../../Components/Formulario";
import { useRouter } from "next/navigation";
import { User, Phone, Mail, LockKeyhole, LogIn, UserPlus } from "lucide-react";
import axios, { AxiosError } from "axios";

export default function Cadastro() {
  const [msg, setMsg] = useState("");

  const [nome, setNome] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

  const realizarCadastro = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMsg("");

    if (
      nome.trim() === "" ||
      tel.trim() === "" ||
      email.trim() === "" ||
      senha === ""
    ) {
      setMsg("Preencha todos os campos!");
      return;
    }

    if (senha.length < 8) {
      setMsg("Senha muito curta! Utilize pelo menos 8 caracteres.");
      return;
    }

    const dados = { nome, telefone: tel, email, senha };

    try {
      await axios.post(`${API_URL}/usuarios`, dados, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        setMsg(
          error.response?.data?.message ||
            "Erro ao cadastrar. Tente novamente!",
        );
      } else {
        setMsg("Erro inesperado. Tente novamente!");
      }
    }
  };

  return (
    <Formulario titulo="Cadastro" moderno>
      <form
        onSubmit={realizarCadastro}
        className="w-full max-w-md mx-auto px-5 sm:px-8"
      >
        {/* Apresentação */}
        <div className="flex flex-col items-center text-center mt-5 mb-8">
          <p className="text-gray-900 font-bold mt-2 leading-relaxed">
            Cadastre-se para descobrir novos livros.
          </p>
        </div>

        {/* Campos */}
        <div className="flex flex-col gap-4">
          {/* Nome */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nome
            </label>

            <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 bg-white transition-all focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-100">
              <User size={19} className="text-gray-400 shrink-0" />

              <input
                className="w-full py-3 px-3 outline-none text-gray-800 bg-transparent placeholder:text-gray-400"
                type="text"
                placeholder="Seu nome completo"
                maxLength={40}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
          </div>

          {/* Telefone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Telefone
            </label>

            <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 bg-white transition-all focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-100">
              <Phone size={19} className="text-gray-400 shrink-0" />

              <input
                className="w-full py-3 px-3 outline-none text-gray-800 bg-transparent placeholder:text-gray-400"
                type="tel"
                placeholder="(00) 00000-0000"
                maxLength={15}
                value={tel}
                onChange={(e) => setTel(formatarTelefone(e.target.value))}
              />
            </div>
          </div>

          {/* E-mail */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              E-mail
            </label>

            <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 bg-white transition-all focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-100">
              <Mail size={19} className="text-gray-400 shrink-0" />

              <input
                className="w-full py-3 px-3 outline-none text-gray-800 bg-transparent placeholder:text-gray-400"
                type="email"
                placeholder="Seu melhor e-mail"
                maxLength={50}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Senha
            </label>

            <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 bg-white transition-all focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-100">
              <LockKeyhole size={19} className="text-gray-400 shrink-0" />

              <input
                className="w-full py-3 px-3 outline-none text-gray-800 bg-transparent placeholder:text-gray-400"
                type="password"
                placeholder="Mínimo de 8 caracteres"
                maxLength={20}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <p className="text-xs text-gray-400 mt-2">
              A senha deve possuir pelo menos 8 caracteres.
            </p>
          </div>
        </div>

        {/* Mensagem */}
        {msg && (
          <div className="mt-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm text-center font-medium">
            {msg}
          </div>
        )}

        {/* Botões */}
        <div className="flex flex-col gap-3 mt-7 mb-8">
          <button
            className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
            type="submit"
          >
            <UserPlus size={19} />
            Criar minha conta
          </button>

          <button
            className="w-full flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-amber-400 hover:bg-amber-50 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-200 cursor-pointer"
            type="button"
            onClick={() => router.push("/")}
          >
            <LogIn size={19} />
            Já tenho uma conta
          </button>
        </div>
      </form>
    </Formulario>
  );
}
