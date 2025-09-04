import React from "react";
import { FlyaLoading } from "../components/FlyaLoading";

// Exemplo de uso em uma página de loading
export const ExemploFlyaLoading: React.FC = () => {
  return (
    <div>
      {/* Loading padrão */}
      <FlyaLoading />

      {/* Loading com texto personalizado */}
      <FlyaLoading text="Criando seu roteiro dos sonhos..." />

      {/* Loading pequeno */}
      <FlyaLoading text="Carregando..." size="small" />

      {/* Loading grande e espetacular */}
      <FlyaLoading
        text="Preparando uma experiência inesquecível!"
        size="large"
      />
    </div>
  );
};

export default ExemploFlyaLoading;
