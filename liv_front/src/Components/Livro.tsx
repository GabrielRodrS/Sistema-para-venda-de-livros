import Image from "next/image";
import type { Livro } from "../Components/InterfacePContent";
import { useRouter } from "next/navigation";
interface LivroProps {
  livro: Livro;
}

export default function Livro({ livro }: LivroProps) {
  const router = useRouter();
  return (
    <button
      className="cursor-pointer"
      onClick={() => {
        localStorage.setItem("codigoLivro", JSON.stringify(livro.codigo));
        router.push("/Informacoes");
      }}
    >
      <div className="h-100">
        <div className="flex flex-col items-center space-y-5">
          <Image
            src={livro.source}
            alt="Livro"
            width={170}
            height={170}
          ></Image>
          <div className="flex flex-col justify-evenly font-semibold">
            <p className="font-semibold text-blue-900">{livro.titulo}</p>
            <p>R$ {livro.preco}</p>
            <p>{livro.paginas} páginas</p>
          </div>
        </div>
      </div>
    </button>
  );
}
