"use client";

import { useEffect, useState } from "react";
import { FileSpreadsheet } from "lucide-react";
import Header from "../Components/Header";
import Livro from "../Components/Livro";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export interface Livro {
  codigo: number;
  titulo: string;
  disponiveis: number;
  autor: string;
  genero: string[];
  preco: number;
  paginas: number;
  publicacao: string;
  vendas: number;
  source: string;
}

export default function InterfacePContent() {
  const searchParams = useSearchParams();
  const pesquisaTermo = searchParams.get("pesquisa") || "";

  const [quantPag, setQuantPag] = useState(0);
  const [generoLivro, setGeneroLivro] = useState("");
  const [precoLivro, setPrecoLivro] = useState(0);
  const [livros, setLivros] = useState<Livro[]>([]);
  const [header, setHeader] = useState("");

  function zerarFiltros() {
    setGeneroLivro("");
    setPrecoLivro(0);
    setQuantPag(0);
  }

  useEffect(() => {
    let url = "";
    let params = {};

    if (pesquisaTermo) {
      url = "http://localhost:3000/livros/pesquisar";
      params = { pesquisa: pesquisaTermo };
    } else if (header) {
      url = `http://localhost:3000/livros/buscarHeader/${header}`;
    } else if (generoLivro || precoLivro > 0 || quantPag > 0) {
      url = "http://localhost:3000/livros/buscarFiltro";
      params = {
        genero: generoLivro,
        preco: precoLivro,
        paginas: quantPag,
      };
    } else {
      url = "http://localhost:3000/livros/buscar";
    }

    axios
      .get(url, { params })
      .then((response) => {
        setLivros(response.data);
      })
      .catch((error) => {
        console.error(
          error.response?.data?.message || "Erro ao buscar livros!"
        );
      });
  }, [pesquisaTermo, header, generoLivro, precoLivro, quantPag]);

  return (
    <Header>
      <div className="flex flex-row h-10/11">
        <nav className="h-full bg-white text-black w-2/13 flex flex-col justify-between items-center pt-5 border-r-2 border-black shadow-2xl">
          <div className="flex flex-col h-7/12 items-center justify-start w-full">
            <p className="text-xl font-bold text-amber-800 border-b-3 border-amber-800">
              Gêneros
            </p>
            <div className="grid grid-cols-2 grid-rows-10 w-full h-full overflow-y-auto px-2 gap-2 rounded-md text-black font-semibold mt-3">
              {[
                "Fantasia",
                "Ficção Científica",
                "Romance",
                "Terror",
                "Suspense",
                "Aventura e Ação",
                "Biografia",
                "Ciência e Tecnologia",
                "História",
                "Filosofia",
                "Poesia",
                "Infantil",
                "Graphic Novel/HQs",
                "Religioso",
              ].map((genero, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setHeader("");
                    setGeneroLivro(generoLivro !== genero ? genero : "");
                  }}
                  className={`text-center cursor-pointer hover:text-amber-600 rounded-md ${
                    genero.length > 10 ? "row-span-2" : ""
                  } ${
                    generoLivro === genero
                      ? "text-amber-600 border-3"
                      : "text-black"
                  }`}
                >
                  {genero}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col h-3/12 items-center w-full">
            <p className="text-xl font-bold text-amber-800 border-b-3 border-amber-800 mb-3">
              Preço
            </p>
            <div className="grid grid-rows-3 grid-cols-2 text-black w-full h-full font-semibold px-2">
              {[
                "R$ 20,00",
                "R$ 30,00",
                "R$ 40,00",
                "R$ 50,00",
                "R$ 100,00",
                "R$ 500,00",
              ].map((precoStr, index) => {
                const preco = parseFloat(
                  precoStr.replace("R$ ", "").replace(",", ".")
                );
                return (
                  <div
                    key={index}
                    className={`text-center cursor-pointer hover:text-amber-600 rounded-md ${
                      precoLivro === preco
                        ? "text-amber-600 border-3"
                        : "text-black"
                    }`}
                    onClick={() => {
                      setHeader("");
                      setPrecoLivro(precoLivro !== preco ? preco : 0);
                    }}
                  >
                    {precoStr}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col space-y-1 items-center justify-start h-2/12">
            <p className="text-xl font-bold text-amber-800">
              Quantidade de páginas
            </p>
            <input
              type="range"
              min="1"
              max="1000"
              className="w-2/3 accent-amber-700"
              value={quantPag}
              onChange={(e) => {
                setHeader("");
                setQuantPag(Number(e.target.value));
              }}
            />
            {quantPag !== 0 && (
              <div className="flex flex-row items-center space-x-2 mt-1">
                <FileSpreadsheet />
                <p>{quantPag}</p>
                <button
                  type="button"
                  className="py-1 px-2 rounded-md bg-red-400 cursor-pointer hover:text-white"
                  onClick={() => setQuantPag(0)}
                >
                  Remover filtro
                </button>
              </div>
            )}
          </div>
        </nav>

        <main className="h-10/11 w-11/13">
          <nav className="w-full h-1/11 bg-amber-400 flex flex-row items-center text-black justify-evenly font-semibold">
            {[
              "Mais vendidos",
              "Menores preços",
              "Maiores preços",
              "Quantidade disponível",
              "Disponíveis recentemente",
            ].map((item, index) => (
              <button
                key={index}
                className="cursor-pointer hover:text-white h-full w-full border-b-1 border-black"
                onClick={() => {
                  zerarFiltros();
                  setHeader(header !== item ? item : "");
                }}
              >
                <p>{item}</p>
              </button>
            ))}
          </nav>

          <div className="text-gray-900 w-full h-full overflow-y-auto grid grid-cols-5 gap-5 items-start justify-center px-6 pt-6">
            {livros.length > 0
              ? livros.map((livro) =>
                  livro.codigo ? (
                    <Livro key={livro.codigo} livro={livro} />
                  ) : null
                )
              : null}
          </div>
        </main>
      </div>
    </Header>
  );
}
