import { ReactNode } from "react";

interface FormularioProps {
  children: ReactNode;
  titulo: string;
}

export default function Formulario({ titulo, children }: FormularioProps) {
  return (
    <main className="h-screen w-screen bg-white flex items-center justify-center">
      <div className="border-5 border-black rounded-xl h-max w-1/3 flex flex-col">
        <div className="flex text-3xl font-bold w-full py-5  bg-black items-center justify-center">
          {titulo}
        </div>
        {children}
      </div>
    </main>
  );
}
