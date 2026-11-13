"use client";

import Header from "../../Components/Header";
import InformacoesLivro from "../../Components/InformacoesLivro";
import { useState, useEffect } from "react";
import axios from "axios";
import { Livro } from "../../Components/InterfacePContent";

export default function Informacoes() {
  const nav1 = "Adicionar ao carrinho";
  const navr1 = "/Carrinho";
  const [codigo, setCodigo] = useState(null);
  const [livro, setLivro] = useState<Livro | null>(null);
  const [disp, setDisp] = useState<number>(0);

  useEffect(() => {
    const cod = localStorage.getItem("codigoLivro");

    if (cod) {
      setCodigo(JSON.parse(cod));
    }
  }, []);

  useEffect(() => {
    if (livro?.disponiveis) {
      setDisp(livro?.disponiveis);
    }
  }, [livro]);

  useEffect(() => {
    if (codigo) {
      axios
        .get(`http://localhost:3000/livros/selecionado/${codigo}`)
        .then((response) => {
          console.log("Livro selecionado:", response.data);
          setLivro(response.data);
        })
        .catch((error) => {
          console.error(
            "Erro ao buscar livro selecionado!",
            error.response?.data || error.message || error
          );
        });
    }
  }, [codigo]);

  if (!livro) {
    return <div>Carregando...</div>;
  }

  return (
    <Header>
      <InformacoesLivro nav1={nav1} navr1={navr1} livro={livro} disp={disp}>
        <div className="flex flex-col border-b-2 border-black space-y-2 py-3">
          <p className="text-amber-700">Código do livro: {livro?.codigo}</p>
          <p>Quantidade disponível: {livro?.disponiveis}</p>
          <p>Quantidade de vendas: {livro?.vendas}</p>
          <p>Data de publicação: {livro?.publicacao.slice(0, 10)}</p>
          <p>{livro.genero.join(", ")}</p>
        </div>
      </InformacoesLivro>
    </Header>
  );
}
