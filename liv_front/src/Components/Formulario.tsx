import { ReactNode } from "react";

interface FormularioProps {
  children: ReactNode;
  titulo: string;
  moderno?: boolean;
}

export default function Formulario({
  titulo,
  children,
  moderno = false,
}: FormularioProps) {
  return (
    <main className="min-h-screen w-full bg-white flex items-center justify-center p-4">
      <div
        className={
          moderno
            ? "rounded-2xl min-h-max w-full max-w-md flex flex-col overflow-hidden shadow-lg shadow-gray-300/40"
            : "border-5 border-black rounded-xl h-max w-1/3 flex flex-col"
        }
      >
        <div
          className={
            moderno
              ? "flex text-2xl font-bold w-full py-5 bg-amber-500 text-white items-center justify-center"
              : "flex text-3xl font-bold w-full py-5 bg-black items-center justify-center"
          }
        >
          {titulo}
        </div>

        {children}
      </div>
    </main>
  );
}
