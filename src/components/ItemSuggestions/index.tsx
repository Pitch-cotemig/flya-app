import React from "react";
import { Lightbulb, Plus } from "lucide-react";
import {
  SuggestionsContainer,
  SuggestionsHeader,
  SuggestionsTitle,
  SuggestionsGrid,
  SuggestionCard,
  SuggestionCategory,
  SuggestionsList,
  SuggestionItem,
} from "./styles";

interface SuggestionProps {
  destination: string;
  duration: number;
  onAddItem: (item: string, category: string) => void;
}

// TODO: Implementar API para buscar sugestões personalizadas baseadas no destino e perfil do usuário
const DESTINATION_SUGGESTIONS = {
  Paris: {
    clothes: [
      "Casaco elegante",
      "Sapatos confortáveis",
      "Cachecol",
      "Guarda-chuva",
    ],
    electronics: ["Adaptador europeu", "Carregador portátil"],
    accessories: ["Câmera", "Mochila pequena", "Carteira de viagem"],
    other: ["Guia turístico", "Mapa da cidade"],
  },
  Tóquio: {
    clothes: ["Roupas leves", "Sapatos confortáveis", "Máscara facial"],
    electronics: ["Adaptador japonês", "Tradutor eletrônico"],
    accessories: ["Cartão de transporte", "Dinheiro em espécie"],
    other: ["Guia de frases", "App de tradução"],
  },
  Default: {
    clothes: ["Roupas íntimas", "Pijama", "Meias", "Sapatos extras"],
    toiletries: [
      "Escova de dentes",
      "Pasta de dente",
      "Shampoo",
      "Desodorante",
    ],
    electronics: ["Carregador", "Fones de ouvido", "Adaptador universal"],
    documents: [
      "Passaporte",
      "Identidade",
      "Cartão de embarque",
      "Seguro viagem",
    ],
    medicine: ["Remédios pessoais", "Band-aid", "Analgésico"],
    accessories: ["Óculos de sol", "Relógio", "Carteira", "Mochila"],
  },
};

export const ItemSuggestions: React.FC<SuggestionProps> = ({
  destination,
  duration,
  onAddItem,
}) => {
  // TODO: Substituir por chamada de API para buscar sugestões personalizadas do backend
  const suggestions =
    DESTINATION_SUGGESTIONS[
      destination as keyof typeof DESTINATION_SUGGESTIONS
    ] || DESTINATION_SUGGESTIONS.Default;

  return (
    <SuggestionsContainer>
      <SuggestionsHeader>
        <Lightbulb size={20} />
        <SuggestionsTitle>
          Sugestões para {destination} ({duration} dias)
        </SuggestionsTitle>
      </SuggestionsHeader>

      <SuggestionsGrid>
        {Object.entries(suggestions).map(([category, items]) => (
          <SuggestionCard key={category}>
            <SuggestionCategory>
              {category === "clothes" && "👕 Roupas"}
              {category === "toiletries" && "🧴 Higiene"}
              {category === "electronics" && "📱 Eletrônicos"}
              {category === "documents" && "📄 Documentos"}
              {category === "medicine" && "💊 Remédios"}
              {category === "accessories" && "🎒 Acessórios"}
              {category === "other" && "📋 Outros"}
            </SuggestionCategory>
            <SuggestionsList>
              {items.map((item) => (
                <SuggestionItem
                  key={item}
                  onClick={() => onAddItem(item, category)}
                >
                  <Plus size={12} />
                  {item}
                </SuggestionItem>
              ))}
            </SuggestionsList>
          </SuggestionCard>
        ))}
      </SuggestionsGrid>
    </SuggestionsContainer>
  );
};

export default ItemSuggestions;
