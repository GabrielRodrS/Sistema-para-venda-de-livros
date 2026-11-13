import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Pesquisa {
  id: number;
  texto: string;
  data: string;
}

export default function Pesquisa() {
  const [historico, setHistorico] = useState<Pesquisa[]>([]);
  const router = useRouter();

  useEffect(() => {
    const buscarHistorico = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/pesquisas/buscar"
        );
        setHistorico(response.data);
      } catch (error) {
        console.error("Não foi possível buscar as pesquisas!", error);
      }
    };

    buscarHistorico();
  }, []);

  return (
    <button className="w-full flex flex-col">
      {historico.map((item) => (
        <p
          onClick={() =>
            router.push(
              `/InterfaceP?pesquisa=${encodeURIComponent(item.texto)}`
            )
          }
          key={item.id}
          className="truncate w-full whitespace-nowrap cursor-pointer hover:bg-gray-200 rounded-sm px-1 py-1"
        >
          {item.texto}
        </p>
      ))}
    </button>
  );
}
