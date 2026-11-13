"use client";

import Header from "../../Components/Header";
import InformacoesLivro from "../../Components/InformacoesLivro";
import SelecPedido from "../Interfaces/SelecPedido";
import { useState, useEffect } from "react";

export default function Informacoes() {
  const nav1 = "Voltar aos pedidos";

  const navr1 = "/Compras";

  const [pedido, setPedido] = useState<SelecPedido | null>(null);

  useEffect(() => {
    const infoPedido = localStorage.getItem("pedido");
    if (infoPedido) {
      setPedido(JSON.parse(infoPedido));
    }
  }, []);

  const formattedDate = pedido?.data
    ? new Date(pedido.data).toLocaleDateString("pt-BR")
    : "";

  return (
    <Header>
      {pedido && (
        <InformacoesLivro nav1={nav1} navr1={navr1} livro={pedido}>
          <div className="flex flex-col border-b-2 border-black space-y-2 py-3">
            <p className="text-amber-700">Código do pedido: {pedido.codigo}</p>
            <p>Preço total: R$ {pedido.preco}</p>
            <p>Quantidade: {pedido.quantidade}</p>
            <p>Data: {formattedDate}</p>
            <p>{pedido.genero.join(", ")}</p>
          </div>
        </InformacoesLivro>
      )}
    </Header>
  );
}
