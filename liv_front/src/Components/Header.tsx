"use client";

import Pesquisa from "./Pesquisa";
import { Search, ShoppingCart, Album, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import userData from "@/app/Interfaces/User";

interface HeaderProps {
  children: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  const router = useRouter();

  const [barra, setBarra] = useState(false);
  const [pesquisar, setPesquisar] = useState("");
  const [user, setUser] = useState<userData | null>(null);

  useEffect(() => {
    const infoUser = localStorage.getItem("user");

    if (infoUser) {
      setUser(JSON.parse(infoUser));
    }
  }, []);

  const buscarLivros = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    try {
      await axios.post(`http://localhost:3000/pesquisas/criar/${user.email}`, {
        texto: pesquisar,
      });
    } catch (error) {
      console.error(error);
    }
    router.push(`/InterfaceP?pesquisa=${pesquisar}`);
  };

  return (
    <div
      className="h-screen w-screen bg-white overflow-hidden"
      onClick={() => {
        if (barra !== false) {
          setBarra(false);
        }
      }}
    >
      <header className="h-1/11 bg-gray-900 flex flex-row justify-between items-center px-12 border-b-1 border-black">
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => {
            router.push("/InterfaceP");
          }}
        >
          <Image
            src="/LogoNewBook.png"
            height={100}
            width={140}
            alt="Logo do site"
          ></Image>
        </button>
        <button
          type="button"
          className="hover:text-amber-400 cursor-pointer "
          onClick={() => {
            router.push("/Carrinho");
          }}
        >
          <div className="flex flex-col items-center space-y-1 ">
            <ShoppingCart height={30} width={30}></ShoppingCart>
            <p>Carrinho</p>
          </div>
        </button>
        <div
          className="w-2/7 h-4/7 bg-white  text-black flex flex-row items-center px-2 rounded-xl cursor-text"
          onClick={() => {
            if (barra === false) {
              setBarra(true);
            }
          }}
        >
          <form
            className="relative flex items-center w-full"
            onSubmit={buscarLivros}
          >
            <input
              type="text"
              placeholder="Buscar livro por nome"
              className=" outline-none w-full"
              maxLength={50}
              value={pesquisar}
              onChange={(e) => {
                setPesquisar(e.target.value);
              }}
            ></input>

            <button type="submit" className="absolute left-92">
              <Search className="text-gray-800 hover:text-amber-400 cursor-pointer"></Search>
            </button>
          </form>
          {barra === true && (
            <div className="flex flex-col items-start px-2 space-y-2 py-2 absolute h-max w-[408px] right-133.5 top-14 bg-white rounded-b-md shadow-xl rounded-xl ">
              <Pesquisa></Pesquisa>
            </div>
          )}
        </div>

        <button
          type="button"
          className="hover:text-amber-400 cursor-pointer"
          onClick={() => {
            router.push("/Compras");
          }}
        >
          <div className="flex flex-col items-center space-y-1">
            <Album height={30} width={30}></Album>
            <p>Compras</p>
          </div>
        </button>
        <button
          type="button"
          className="hover:text-amber-400 cursor-pointer"
          onClick={() => {
            router.push("/Perfil");
          }}
        >
          <div className="flex flex-col items-center space-y-1">
            <User height={30} width={30}></User>
            <p>Minha conta</p>
          </div>
        </button>
      </header>
      {children}
    </div>
  );
}
