import { useState, useEffect } from "react";
import {
  bagsService,
  TripForBag,
  TripBag,
  BagItem,
} from "../services/bagsService";

export interface ToastCallbacks {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
}

interface UseTripBagReturn {
  // Estado de seleção de viagem
  trips: TripForBag[];
  selectedTrip: TripForBag | null;

  // Estado da mala
  bagData: TripBag | null;
  bagItems: BagItem[];

  // Estados de loading
  tripsLoading: boolean;
  bagLoading: boolean;
  saving: boolean;

  // Estados de feedback
  error: string | null;
  success: string | null;

  // Ações de viagem
  loadTrips: () => Promise<void>;
  selectTrip: (trip: TripForBag) => Promise<void>;
  clearSelection: () => void;

  // Ações de mala
  addItem: (item: Omit<BagItem, "id">) => Promise<void>;
  updateItem: (itemId: string, updates: Partial<BagItem>) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  toggleItem: (itemId: string) => Promise<void>;
  syncBag: () => Promise<void>;
  saveBag: (toastCallbacks?: ToastCallbacks) => Promise<void>;
  hasPendingChanges: () => boolean;

  // Filtros e utilitários
  filteredItems: (category?: string) => BagItem[];
  bagProgress: {
    total: number;
    checked: number;
    progress: number;
  };
}

export function useTripBag(): UseTripBagReturn {
  // Estados principais
  const [trips, setTrips] = useState<TripForBag[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<TripForBag | null>(null);
  const [bagData, setBagData] = useState<TripBag | null>(null);
  const [bagItems, setBagItems] = useState<BagItem[]>([]);

  // Estados de loading
  const [tripsLoading, setTripsLoading] = useState(false);
  const [bagLoading, setBagLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Estados de feedback
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Função para limpar mensagens depois de um tempo
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  // Carregar lista de viagens
  const loadTrips = async () => {
    setTripsLoading(true);
    setError(null);

    try {
      const response = await bagsService.getUserTripsForBag();

      if (response.success && response.data) {
        setTrips(response.data);
      } else {
        setError(response.message || "Erro ao carregar viagens");
      }
    } catch (err) {
      setError("Erro de conexão ao carregar viagens");
      console.error("Erro ao carregar viagens:", err);
    } finally {
      setTripsLoading(false);
    }
  };

  // Selecionar uma viagem e carregar sua mala
  const selectTrip = async (trip: TripForBag) => {
    setBagLoading(true);
    setError(null);
    setSelectedTrip(trip);

    try {
      let bagResponse;

      if (trip.hasBag) {
        // Carregar mala existente
        bagResponse = await bagsService.getTripBag(trip.id);
      } else {
        // Criar nova mala
        bagResponse = await bagsService.createTripBag(trip.id);

        // Atualizar o status da viagem
        setTrips((prevTrips) =>
          prevTrips.map((t) => (t.id === trip.id ? { ...t, hasBag: true } : t))
        );
      }

      if (bagResponse.success && bagResponse.data) {
        setBagData(bagResponse.data);
        setBagItems(bagResponse.data.items);
        setSuccess(trip.hasBag ? "Mala carregada!" : "Nova mala criada!");
      } else {
        setError(bagResponse.message || "Erro ao carregar mala");
      }
    } catch (err) {
      setError("Erro de conexão ao carregar mala");
      console.error("Erro ao carregar mala:", err);
    } finally {
      setBagLoading(false);
    }
  };

  // Limpar seleção
  const clearSelection = () => {
    setSelectedTrip(null);
    setBagData(null);
    setBagItems([]);
    setError(null);
    setSuccess(null);
  };

  // Adicionar item à mala
  const addItem = async (item: Omit<BagItem, "id">) => {
    if (!selectedTrip) return;

    try {
      const response = await bagsService.addItemToBag(selectedTrip.id, item);

      if (response.success && response.data) {
        setBagItems((prevItems) => [...prevItems, response.data!]);
        setSuccess("Item adicionado!");
      } else {
        setError(response.message || "Erro ao adicionar item");
      }
    } catch (err) {
      setError("Erro de conexão ao adicionar item");
      console.error("Erro ao adicionar item:", err);
    }
  };

  // Atualizar item da mala
  const updateItem = async (itemId: string, updates: Partial<BagItem>) => {
    if (!selectedTrip) return;

    try {
      const response = await bagsService.updateBagItem(
        selectedTrip.id,
        itemId,
        updates
      );

      if (response.success && response.data) {
        setBagItems((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId ? { ...item, ...updates } : item
          )
        );
        setSuccess("Item atualizado!");
      } else {
        setError(response.message || "Erro ao atualizar item");
      }
    } catch (err) {
      setError("Erro de conexão ao atualizar item");
      console.error("Erro ao atualizar item:", err);
    }
  };

  // Remover item da mala
  const removeItem = async (itemId: string) => {
    if (!selectedTrip) return;

    try {
      const response = await bagsService.removeItemFromBag(
        selectedTrip.id,
        itemId
      );

      if (response.success) {
        setBagItems((prevItems) =>
          prevItems.filter((item) => item.id !== itemId)
        );
        setSuccess("Item removido!");
      } else {
        setError(response.message || "Erro ao remover item");
      }
    } catch (err) {
      setError("Erro de conexão ao remover item");
      console.error("Erro ao remover item:", err);
    }
  };

  // Marcar/desmarcar item
  const toggleItem = async (itemId: string) => {
    if (!selectedTrip) return;

    try {
      const response = await bagsService.toggleBagItem(selectedTrip.id, itemId);

      if (response.success && response.data) {
        setBagItems((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId
              ? { ...item, packed: response.data!.packed }
              : item
          )
        );
      } else {
        setError(response.message || "Erro ao atualizar item");
      }
    } catch (err) {
      setError("Erro de conexão ao atualizar item");
      console.error("Erro ao atualizar item:", err);
    }
  };

  // Sincronizar mala completa
  const syncBag = async () => {
    if (!selectedTrip) return;

    try {
      const response = await bagsService.syncTripBag(selectedTrip.id, bagItems);

      if (response.success && response.data) {
        setBagData(response.data);
        setBagItems(response.data.items);
        setSuccess("Mala sincronizada!");
      } else {
        setError(response.message || "Erro ao sincronizar mala");
      }
    } catch (err) {
      setError("Erro de conexão ao sincronizar");
      console.error("Erro ao sincronizar:", err);
    }
  };

  const saveBag = async (toastCallbacks?: ToastCallbacks) => {
    if (!selectedTrip || saving) return;

    setSaving(true);
    setError(null);

    // Mostrar toast de info se disponível
    if (toastCallbacks) {
      toastCallbacks.showInfo("Salvando alterações...");
    }

    try {
      const response = await bagsService.saveTripBag(selectedTrip.id);

      if (response.success && response.data) {
        setBagData(response.data);

        // Mostrar toast de sucesso
        if (toastCallbacks) {
          toastCallbacks.showSuccess("Mala salva com sucesso!");
        } else {
          setSuccess("Mala salva com sucesso!");
          setTimeout(() => setSuccess(null), 3000);
        }
      } else {
        const errorMessage = response.message || "Erro ao salvar mala";
        if (toastCallbacks) {
          toastCallbacks.showError(errorMessage);
        } else {
          setError(errorMessage);
        }
      }
    } catch (err) {
      const errorMessage = "Erro de conexão ao salvar mala";
      if (toastCallbacks) {
        toastCallbacks.showError(errorMessage);
      } else {
        setError(errorMessage);
      }
      console.error("Erro ao salvar mala:", err);
    } finally {
      setSaving(false);
    }
  };

  // Verificar se há alterações pendentes
  const hasPendingChanges = () => {
    if (!selectedTrip) return false;
    return bagsService.hasPendingChanges(selectedTrip.id);
  };

  // Filtrar itens por categoria
  const filteredItems = (category?: string) => {
    if (!category || category === "all") {
      return bagItems;
    }
    return bagItems.filter((item) => item.category === category);
  };

  // Calcular progresso da mala
  const bagProgress = {
    total: bagItems.length,
    checked: bagItems.filter((item) => item.packed).length,
    progress:
      bagItems.length > 0
        ? (bagItems.filter((item) => item.packed).length / bagItems.length) *
          100
        : 0,
  };

  return {
    // Estado de seleção de viagem
    trips,
    selectedTrip,

    // Estado da mala
    bagData,
    bagItems,

    // Estados de loading
    tripsLoading,
    bagLoading,
    saving,

    // Estados de feedback
    error,
    success,

    // Ações de viagem
    loadTrips,
    selectTrip,
    clearSelection,

    // Ações de mala
    addItem,
    updateItem,
    removeItem,
    toggleItem,
    syncBag,
    saveBag,
    hasPendingChanges,

    // Filtros e utilitários
    filteredItems,
    bagProgress,
  };
}
