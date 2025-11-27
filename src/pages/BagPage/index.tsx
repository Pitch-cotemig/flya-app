import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Package,
  Shirt,
  Briefcase,
  Droplets,
  FileText,
  Pill,
  Backpack,
  FileCheck,
  Plus,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import {
  TripSelection,
  FlyaLoading,
  FeedbackMessage,
  ItemSuggestions,
  ToastContainer,
} from "../../components";
import { useTripBag } from "../../hooks/useTripBag";
import { useToast } from "../../hooks/useToast";
import {
  BagContainer,
  BagHeader,
  BagTitle,
  BagSubtitle,
  BackButton,
  BagContent,
  TripInfo,
  TripDestination,
  TripDuration,
  AddItemSection,
  AddItemForm,
  AddItemInput,
  AddItemButton,
  CategoriesSection,
  CategoryTabs,
  CategoryTab,
  ItemsList,
  ItemCard,
  ItemCheckbox,
  ItemName,
  ItemCategory,
  ItemActions,
  DeleteButton,
  ProgressSection,
  ProgressBar,
  ProgressFill,
  ProgressText,
  EmptyState,
  EmptyIcon,
  EmptyText,
  SaveSection,
  SaveButton,
} from "./styles";

const CATEGORIES = [
  { id: "all", name: "Todos" },
  { id: "clothes", name: "Roupas" },
  { id: "electronics", name: "Eletrônicos" },
  { id: "toiletries", name: "Higiene" },
  { id: "documents", name: "Documentos" },
  { id: "medicine", name: "Remédios" },
  { id: "accessories", name: "Acessórios" },
  { id: "other", name: "Outros" },
];

// Função para renderizar ícones de forma consistente
const getCategoryIcon = (categoryId: string, size: number = 16) => {
  const iconProps = { size, className: "category-icon" };

  switch (categoryId) {
    case "all":
      return <Package {...iconProps} />;
    case "clothes":
      return <Shirt {...iconProps} />;
    case "electronics":
      return <Briefcase {...iconProps} />;
    case "toiletries":
      return <Droplets {...iconProps} />;
    case "documents":
      return <FileText {...iconProps} />;
    case "medicine":
      return <Pill {...iconProps} />;
    case "accessories":
      return <Backpack {...iconProps} />;
    case "other":
      return <FileCheck {...iconProps} />;
    default:
      return <Package {...iconProps} />;
  }
};

export function BagPage() {
  const [newItemName, setNewItemName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeCategory, setActiveCategory] = useState("clothes");

  // Hook para gerenciar toasts
  const { toasts, removeToast, showSuccess, showError, showInfo } = useToast();

  // Hook personalizado para gerenciar mala por viagem
  const {
    trips,
    selectedTrip,
    tripsLoading,
    bagLoading,
    saving,
    error,
    success,
    loadTrips,
    selectTrip,
    clearSelection,
    addItem,
    removeItem,
    toggleItem,
    saveBag,
    hasPendingChanges,
    filteredItems,
    bagProgress,
  } = useTripBag();

  // Carregar viagens ao montar o componente
  useEffect(() => {
    loadTrips();
  }, []);

  // Handlers para gerenciamento de itens
  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim()) {
      await addItem({
        name: newItemName.trim(),
        category: activeCategory,
        quantity: 1,
        packed: false,
      });
      setNewItemName("");
    }
  };

  const handleAddSuggestedItem = async (itemName: string, category: string) => {
    await addItem({
      name: itemName,
      category: category,
      quantity: 1,
      packed: false,
    });
  };

  const handleToggleItem = async (id: string) => {
    await toggleItem(id);
  };

  const handleDeleteItem = async (id: string) => {
    await removeItem(id);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleActiveCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleBackToSelection = () => {
    clearSelection();
  };

  const handleSaveBag = async () => {
    await saveBag({ showSuccess, showError, showInfo });
  };

  // Se não há viagem selecionada, mostra a tela de seleção
  if (!selectedTrip) {
    return (
      <TripSelection
        trips={trips}
        onSelectTrip={selectTrip}
        loading={tripsLoading}
      />
    );
  }

  // Loading da mala
  if (bagLoading) {
    return <FlyaLoading text="Carregando sua mala..." size="medium" />;
  }

  // Filtrar itens pela categoria selecionada
  const displayItems = filteredItems(selectedCategory);

  return (
    <BagContainer>
      {/* Mensagens de feedback */}
      {error && (
        <FeedbackMessage type="error" message={error} onClose={() => {}} />
      )}
      {success && (
        <FeedbackMessage type="success" message={success} onClose={() => {}} />
      )}

      <BagHeader>
        <BackButton onClick={handleBackToSelection}>
          <ArrowLeft size={20} />
          Voltar às Viagens
        </BackButton>

        <BagTitle>
          <Package size={32} />
          Minha Mala
        </BagTitle>
        <BagSubtitle>
          Organize sua bagagem e não esqueça nada importante
        </BagSubtitle>
      </BagHeader>

      <BagContent>
        <TripInfo>
          <TripDestination>
            <strong>Destino:</strong>{" "}
            {selectedTrip.destination || "Não especificado"}
          </TripDestination>
          <TripDuration>
            <strong>Duração:</strong> {selectedTrip.duration} dias
          </TripDuration>
        </TripInfo>

        <ProgressSection>
          <ProgressText>
            Progresso: {bagProgress.checked} de {bagProgress.total} itens
          </ProgressText>
          <ProgressBar>
            <ProgressFill progress={bagProgress.progress} />
          </ProgressBar>
        </ProgressSection>

        {/* Sugestões de itens baseadas no destino */}
        <ItemSuggestions
          destination={selectedTrip.destination || "Geral"}
          duration={selectedTrip.duration}
          onAddItem={handleAddSuggestedItem}
        />

        <AddItemSection>
          <AddItemForm onSubmit={handleAddItem}>
            <AddItemInput
              type="text"
              placeholder="Digite o nome do item..."
              value={newItemName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewItemName(e.target.value)
              }
            />
            <AddItemButton type="submit">
              <Plus size={20} />
              Adicionar
            </AddItemButton>
          </AddItemForm>
        </AddItemSection>

        <CategoriesSection>
          <h3>Adicionar em:</h3>
          <CategoryTabs>
            {CATEGORIES.slice(1).map((category) => (
              <CategoryTab
                key={category.id}
                active={activeCategory === category.id}
                onClick={() => handleActiveCategoryChange(category.id)}
                variant="add"
              >
                {getCategoryIcon(category.id)}
                {category.name}
              </CategoryTab>
            ))}
          </CategoryTabs>
        </CategoriesSection>

        <CategoriesSection>
          <h3>Filtrar Por:</h3>
          <CategoryTabs>
            {CATEGORIES.map((category) => (
              <CategoryTab
                key={category.id}
                active={selectedCategory === category.id}
                onClick={() => handleCategoryChange(category.id)}
              >
                {getCategoryIcon(category.id)}
                {category.name}
              </CategoryTab>
            ))}
          </CategoryTabs>
        </CategoriesSection>

        <ItemsList>
          {displayItems.length === 0 ? (
            <EmptyState>
              <EmptyIcon>
                <Package size={48} />
              </EmptyIcon>
              <EmptyText>
                {selectedCategory === "all"
                  ? "Nenhum item adicionado ainda"
                  : `Nenhum item na categoria ${
                      CATEGORIES.find((c) => c.id === selectedCategory)?.name
                    }`}
              </EmptyText>
            </EmptyState>
          ) : (
            displayItems.map((item) => (
              <ItemCard key={item.id} checked={item.packed}>
                <ItemCheckbox
                  type="checkbox"
                  checked={item.packed}
                  onChange={() => handleToggleItem(item.id!)}
                />
                <div>
                  <ItemName checked={item.packed}>{item.name}</ItemName>
                  <ItemCategory>
                    {getCategoryIcon(item.category, 14)}{" "}
                    {CATEGORIES.find((c) => c.id === item.category)?.name}
                  </ItemCategory>
                </div>
                <ItemActions>
                  {item.packed && <CheckCircle2 size={16} color="#00bcd4" />}
                  <DeleteButton onClick={() => handleDeleteItem(item.id!)}>
                    <Trash2 size={16} />
                  </DeleteButton>
                </ItemActions>
              </ItemCard>
            ))
          )}
        </ItemsList>

        <SaveSection>
          <SaveButton
            onClick={handleSaveBag}
            disabled={saving || !hasPendingChanges()}
            saving={saving}
          >
            {saving ? "Salvando..." : "Salvar Mala"}
          </SaveButton>
        </SaveSection>
      </BagContent>

      {/* Toast Container para feedback profissional */}
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </BagContainer>
  );
}

export default BagPage;
