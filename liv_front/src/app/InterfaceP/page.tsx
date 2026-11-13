"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const InterfacePContent = dynamic(
  () => import("../../Components/InterfacePContent"),
  {
    ssr: false,
  }
);

export default function InterfacePPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <InterfacePContent />
    </Suspense>
  );
}
