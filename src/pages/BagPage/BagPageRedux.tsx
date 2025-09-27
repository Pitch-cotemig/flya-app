import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  addItem,
  removeItem,
  toggleItem,
  setSelectedCategory,
  setActiveCategory,
  setTripData,
} from "../../store/bagSlice";
import {
  selectFilteredItems,
  selectBagProgress,
  selectSelectedCategory,
  selectActiveCategory,
  selectTripData,
} from "../../store/selectors";
import { useBagPersistence } from "../../hooks/useBagPersistence";
import ItemSuggestions from "../../components/ItemSuggestions";
import { FlyaLoading } from "../../components/FlyaLoading";
import {
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
  BagContainer,
  BagHeader,
  BagTitle,
  BagSubtitle,
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
  FloatingElements,
  EmptyState,
  EmptyIcon,
  EmptyText,
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
  const dispatch = useAppDispatch();
  const [newItemName, setNewItemName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Redux selectors
  const filteredItems = useAppSelector(selectFilteredItems);
  const bagProgress = useAppSelector(selectBagProgress);
  const selectedCategory = useAppSelector(selectSelectedCategory);
  const activeCategory = useAppSelector(selectActiveCategory);
  const tripData = useAppSelector(selectTripData);

  // Persistence hook
  useBagPersistence();

  // Initialize trip data if not set
  useEffect(() => {
    const initializePage = async () => {
      try {
        if (!tripData) {
          // TODO: Buscar dados da viagem do backend baseado no usuário logado
          dispatch(
            setTripData({
              destination: "Paris",
              duration: 7,
            })
          );
        }

        // Simular carregamento inicial
        await new Promise((resolve) => setTimeout(resolve, 500));
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao inicializar página da mala:", error);
        setIsLoading(false);
      }
    };

    initializePage();
  }, [dispatch, tripData]);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim()) {
      // TODO: Sincronizar novo item com o backend
      dispatch(
        addItem({
          name: newItemName.trim(),
          category: activeCategory,
          checked: false,
          essential: false,
        })
      );
      setNewItemName("");
    }
  };

  const handleAddSuggestedItem = (itemName: string, category: string) => {
    // TODO: Sincronizar item sugerido com o backend
    dispatch(
      addItem({
        name: itemName,
        category: category,
        checked: false,
        essential: false,
      })
    );
  };

  const handleToggleItem = (id: string) => {
    // TODO: Sincronizar status do item (checked/unchecked) com o backend
    dispatch(toggleItem(id));
  };

  const handleDeleteItem = (id: string) => {
    // TODO: Remover item do backend
    dispatch(removeItem(id));
  };

  const handleCategoryChange = (categoryId: string) => {
    dispatch(setSelectedCategory(categoryId));
  };

  const handleActiveCategoryChange = (categoryId: string) => {
    dispatch(setActiveCategory(categoryId));
  };

  // Loading state
  if (isLoading) {
    return <FlyaLoading text="Organizando sua mala..." size="medium" />;
  }

  return (
    <>
      <BagContainer>
        <FloatingElements />

        <BagHeader>
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
              {tripData?.destination || "Não definido"}
            </TripDestination>
            <TripDuration>
              <strong>Duração:</strong> {tripData?.duration || 0} dias
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

          {tripData && !isLoading && (
            <ItemSuggestions
              destination={tripData.destination}
              duration={tripData.duration}
              onAddItem={handleAddSuggestedItem}
            />
          )}

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
            {filteredItems.length === 0 ? (
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
              filteredItems.map((item) => (
                <ItemCard key={item.id} checked={item.checked}>
                  <ItemCheckbox
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleToggleItem(item.id)}
                  />
                  <div>
                    <ItemName checked={item.checked}>{item.name}</ItemName>
                    <ItemCategory>
                      {getCategoryIcon(item.category, 14)}{" "}
                      {CATEGORIES.find((c) => c.id === item.category)?.name}
                    </ItemCategory>
                  </div>
                  <ItemActions>
                    {item.checked && <CheckCircle2 size={16} color="#00bcd4" />}
                    <DeleteButton onClick={() => handleDeleteItem(item.id)}>
                      <Trash2 size={16} />
                    </DeleteButton>
                  </ItemActions>
                </ItemCard>
              ))
            )}
          </ItemsList>
        </BagContent>
      </BagContainer>
    </>
  );
}

export default BagPage;
