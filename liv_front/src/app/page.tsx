"use client";
import { useState } from "react";
import Formulario from "../Components/Formulario";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";
import axios from "axios";
import { AxiosError } from "axios";

export default function Login() {
  const [msg, setMsg] = useState("");

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const titulo = "Login";

  const router = useRouter();

  const realizarLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "" || senha === "") {
      setMsg("Preencha todos os campos!");
      return;
    }

    const dados = { email: email, senha: senha };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/usuarios/login`,
        dados
      );

      const { token } = response.data;
      localStorage.setItem("token", token);

      const userResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/usuarios/auth`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(userResponse);

      const { nome, telefone, email } = userResponse.data;

      localStorage.setItem("user", JSON.stringify({ nome, telefone, email }));

      router.push("/InterfaceP");
    } catch (error) {
      if (error instanceof AxiosError) {
        setMsg(
          error.response?.data?.message ||
            "Erro ao realizar login. Tente novamente!"
        );
      }
    }
  };
  return (
    <Formulario titulo={titulo}>
      <form onSubmit={realizarLogin}>
        <section className="flex flex-col items-center justify-center my-8 space-y-8 text-center">
          <p className="font-bold text-lg text-gray-900">
            Bem vindo à NewBook!
            <span className="flex items-center gap-2">
              Temos alguns livros prontos para serem seus <BookOpen></BookOpen>
            </span>
          </p>

          <div className=" space-x-2 ">
            <label className="text-black font-semibold ">E-mail:</label>
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
            <label className="text-black font-semibold ">Senha:</label>
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
                router.push("/Cadastro");
              }}
            >
              Cadastrar
            </button>
            <button
              className="bg-green-500 py-2 px-3 rounded-md cursor-pointer hover:text-gray-700"
              type="submit"
            >
              Login
            </button>
          </div>

          {msg && <p className="font-semibold text-red-700 mt-8">{msg}</p>}
          <button
            className="bg-yellow-500 py-2 px-3 rounded-md cursor-pointer text-black hover:text-gray-700 mt-5"
            type="button"
            onClick={() => {
              router.push("/RecuperarSenha");
            }}
          >
            Recuperar senha
          </button>
        </section>
      </form>
    </Formulario>
  );
}
