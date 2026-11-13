"use client";

import { User } from "lucide-react";
import { ReactNode } from "react";

interface BlocoPerfilProps {
  children: ReactNode;
}

export default function BlocoPerfil({ children }: BlocoPerfilProps) {
  return (
    <main className="flex h-10/11 w-full items-center justify-center">
      <section className="w-2/6 h-5/6">
        <div className="h-1/5 w-full bg-gray-300 flex flex-col items-center justify-center rounded-t-md">
          <User height={40} width={40} className="text-black" />
        </div>
        <div className="shadow-2xl rounded-b-md">{children}</div>
      </section>
    </main>
  );
}
