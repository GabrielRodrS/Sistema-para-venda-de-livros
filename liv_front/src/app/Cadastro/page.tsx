"use client";

import { useState } from "react";
import Formulario from "../../Components/Formulario";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AxiosError } from "axios";

export default function Cadastro() {
  const [msg, setMsg] = useState("");

  const [nome, setNome] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const router = useRouter();

  const titulo = "Cadastrar";

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

    if (nome === "" || tel === "" || email === "" || senha === "") {
      setMsg("Preencha todos os campos!");
      return;
    }

    if (senha.length < 8) {
      setMsg("Senha muito curta!");
      return;
    }

    const dados = { nome, telefone: tel, email, senha };

    try {
      console.log(dados);
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/usuarios`, dados, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        setMsg(
          error.response?.data?.message || "Erro ao cadastrar. Tente novamente!"
        );
      }
    }
  };

  return (
    <Formulario titulo={titulo}>
      <form onSubmit={realizarCadastro}>
        <section className="flex flex-col items-center justify-center my-8 w-full space-y-8">
          <p className="font-bold text-lg text-gray-900">
            Crie uma conta para aproveitar nossas ofertas!
          </p>
          <div className=" space-x-2 ">
            <label className="text-black font-bold ">Nome:</label>
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
          </div>
          <div className=" space-x-2 ">
            <label className="text-black font-bold ">Telefone:</label>
            <input
              className="border-3 border-black rounded-md py-2 px-3 text-gray-800 w-55"
              type="text"
              placeholder="Seu Telefone"
              value={tel}
              onChange={(e) => {
                setTel(formatarTelefone(e.target.value));
              }}
            ></input>
          </div>
          <div className=" space-x-2 ">
            <label className="text-black font-bold ">E-mail:</label>
            <input
              className="border-3 border-black rounded-md py-2 px-3 text-gray-800 w-60"
              type="text"
              placeholder="Inserir e-mail"
              maxLength={50}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
          <div className=" space-x-2 ">
            <label className="text-black font-bold ">Senha:</label>
            <input
              className="border-3 border-black rounded-md py-2 px-3 text-gray-800 w-60"
              type="password"
              placeholder="Inserir senha"
              maxLength={20}
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
              }}
            ></input>
          </div>
        </section>
        <section className="flex flex-col items-center mb-10">
          <div className="flex flex-row space-x-10">
            <button
              className="bg-red-500 py-2 px-3 rounded-md cursor-pointer hover:text-gray-700"
              type="button"
              onClick={() => {
                router.push("/");
              }}
            >
              Login
            </button>
            <button
              className="bg-green-500 py-2 px-3 rounded-md cursor-pointer hover:text-gray-700"
              type="submit"
            >
              Cadastrar
            </button>
          </div>
          {msg && <p className="font-bold text-red-700 mt-8">{msg}</p>}
        </section>
      </form>
    </Formulario>
  );
}
