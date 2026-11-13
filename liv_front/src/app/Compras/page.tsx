"use client";
import Header from "../../Components/Header";
import {
  Calendar,
  Layers,
  DollarSign,
  Truck,
  Ticket,
  CheckCheck,
  ShoppingBag,
  X,
} from "lucide-react";
import PedidoHistorico from "../../Components/PedidoHistorico";
import { useEffect, useState } from "react";
import axios from "axios";
import userData from "../Interfaces/User";
import SelecPedido from "../Interfaces/SelecPedido";

export default function Compras() {
  const [pedidos, setPedidos] = useState<SelecPedido[]>([]);
  const [user, setUser] = useState<userData | null>(null);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    const infoUser = localStorage.getItem("user");
    if (infoUser) {
      setUser(JSON.parse(infoUser));
    }
  }, []);

  useEffect(() => {
    if (!user?.email) {
      return;
    }

    const buscarPedidos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/pedidos/buscar/${user.email}`
        );
        setPedidos(response.data);
      } catch (error) {
        console.error("Não foi possível carregar os pedidos!", error);
      }
    };

    buscarPedidos();
  }, [user]);

  useEffect(() => {
    if (!user?.email || !filtro) return;
    const buscarFiltro = async () => {
      try {
        const response = await axios.post(
          `http://localhost:3000/pedidos/buscar/filtro`,
          {
            email: user.email,
            filtro: filtro,
          }
        );
        setPedidos(response.data);
      } catch (error) {
        console.error("Erro ao buscar pedidos por este filtro!", error);
      }
    };
    buscarFiltro();
    console.log(filtro);
  }, [filtro, user]);

  return (
    <Header>
      <main className="w-full h-10/11 flex flex-row">
        <nav className="w-1/6 h-full flex flex-col bg-gray-900 py-5">
          <div className="flex flex-col w-full h-1/10 space-y-5 items-center">
            <p className=" w-full text-amber-600 font-bold text-2xl text-center">
              Filtrar histórico
            </p>
          </div>
          <div className="flex flex-col border-y-2 border-white-600 w-full h-3/10 pl-3 pt-3  text-white">
            <button
              className={`flex flex-row items-center space-x-4 cursor-pointer hover:text-amber-400 ${
                filtro === "Data recente" ? "text-amber-400" : "text-white"
              }`}
              value={filtro}
              onClick={() => {
                if (filtro === "Data recente") {
                  setFiltro("");
                } else {
                  setFiltro("Data recente");
                }
              }}
            >
              <Calendar></Calendar>
              <p className="  py-3">Data recente</p>
            </button>
            <button
              className={`flex flex-row items-center space-x-4 cursor-pointer hover:text-amber-400 ${
                filtro === "Preço de compra" ? "text-amber-400" : "text-white"
              }`}
              value={filtro}
              onClick={() => {
                if (filtro === "Preço de compra") {
                  setFiltro("");
                } else {
                  setFiltro("Preço de compra");
                }
              }}
            >
              <DollarSign></DollarSign>
              <p className="  py-3">Preço de compra</p>
            </button>
            <button
              className={`flex flex-row items-center space-x-4 cursor-pointer hover:text-amber-400 ${
                filtro === "Quantidade comprada"
                  ? "text-amber-400"
                  : "text-white"
              }`}
              value={filtro}
              onClick={() => {
                if (filtro === "Quantidade comprada") {
                  setFiltro("");
                } else {
                  setFiltro("Quantidade comprada");
                }
              }}
            >
              <Layers></Layers>
              <p className="  py-3">Quantidade comprada</p>
            </button>
          </div>
          <div className="flex flex-col border-y-2 border-white-600 w-full h-4/10 pl-3 pt-3  text-white">
            <div
              className={`flex flex-row items-center space-x-4 cursor-pointer hover:text-amber-400 ${
                filtro === "Pedido recebido" ? "text-amber-400" : "text-white"
              }`}
              onClick={() => {
                if (filtro === "Pedido recebido") {
                  setFiltro("");
                } else {
                  setFiltro("Pedido recebido");
                }
              }}
            >
              <Ticket></Ticket>
              <p className=" w-full py-3">Pedidos recebidos</p>
            </div>
            <div
              className={`flex flex-row items-center space-x-4 cursor-pointer hover:text-amber-400 ${
                filtro === "Em transporte" ? "text-amber-400" : "text-white"
              }`}
              onClick={() => {
                if (filtro === "Em transporte") {
                  setFiltro("");
                } else {
                  setFiltro("Em transporte");
                }
              }}
            >
              <Truck></Truck>
              <p className=" w-full py-3">Em transporte</p>
            </div>
            <div
              className={`flex flex-row items-center space-x-4 cursor-pointer hover:text-amber-400 ${
                filtro === "Entregue" ? "text-amber-400" : "text-white"
              }`}
              onClick={() => {
                if (filtro === "Entregue") {
                  setFiltro("");
                } else {
                  setFiltro("Entregue");
                }
              }}
            >
              <CheckCheck></CheckCheck>
              <p className=" w-full py-3">Entregue</p>
            </div>
            <div
              className={`flex flex-row items-center space-x-4 cursor-pointer hover:text-amber-400 ${
                filtro === "Pedido de cancelamento"
                  ? "text-amber-400"
                  : "text-white"
              }`}
              onClick={() => {
                if (filtro === "Pedido de cancelamento") {
                  setFiltro("");
                } else {
                  setFiltro("Pedido de cancelamento");
                }
              }}
            >
              <X></X>
              <p className=" w-full py-3">Pedido de cancelamento</p>
            </div>
          </div>
        </nav>
        <div className="flex flex-col w-full h-full">
          <header className="bg-gray-900 w-3/6 h-2/12 my-auto mx-auto shadow-2xl rounded-t-md mt-10 flex flex-row items-center justify-center space-x-2 text-amber-400">
            <ShoppingBag height={40} width={40}></ShoppingBag>
            <p className="font-bold text-2xl">Suas compras</p>
          </header>
          <section className="bg-gray-200 w-3/6 h-10/12 my-auto mx-auto overflow-y-scroll  shadow-2xl rounded-b-sm mb-10">
            {pedidos.length > 0
              ? pedidos.map((pedido) =>
                  pedido.idPedido ? (
                    <PedidoHistorico
                      key={pedido.idPedido}
                      pedido={pedido}
                    ></PedidoHistorico>
                  ) : null
                )
              : null}
          </section>
        </div>
      </main>
    </Header>
  );
}
