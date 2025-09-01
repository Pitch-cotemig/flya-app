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
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ItemSuggestions from "../../components/ItemSuggestions";
import { BagItem } from "../../store/types";
import { User } from "../../services/authService";
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
import { Plus, Trash2, Package, CheckCircle2 } from "lucide-react";

const CATEGORIES = [
  { id: "all", name: "Todos", icon: "📦" },
  { id: "clothes", name: "Roupas", icon: "👕" },
  { id: "electronics", name: "Eletrônicos", icon: "📱" },
  { id: "toiletries", name: "Higiene", icon: "🧴" },
  { id: "documents", name: "Documentos", icon: "📄" },
  { id: "medicine", name: "Remédios", icon: "💊" },
  { id: "accessories", name: "Acessórios", icon: "🎒" },
  { id: "other", name: "Outros", icon: "📋" },
];

export function BagPage({ user }: { user: User | null }) {
  const dispatch = useAppDispatch();
  const [newItemName, setNewItemName] = useState("");

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
    if (!tripData) {
      // TODO: Buscar dados da viagem do backend baseado no usuário logado
      dispatch(
        setTripData({
          destination: "Paris",
          duration: 7,
        })
      );
    }
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

  return (
    <>
      <Header user={user} />
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

          {tripData && (
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
                  <span>{category.icon}</span>
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
                  <span>{category.icon}</span>
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
                      {CATEGORIES.find((c) => c.id === item.category)?.icon}{" "}
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
      <Footer />
    </>
  );
}

export default BagPage;
