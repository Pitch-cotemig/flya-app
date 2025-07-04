import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { loadBagData, setLastSync } from "../store/bagSlice";
import { selectBag } from "../store/selectors";

const STORAGE_KEY = "flya-bag-data";

export const useBagPersistence = () => {
  const dispatch = useAppDispatch();
  const bagState = useAppSelector(selectBag);

  // Load data from localStorage on mount
  useEffect(() => {
    // TODO: Substituir localStorage por chamadas de API para buscar dados da mala do backend
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch(loadBagData(parsedData));
      } catch (error) {
        console.error("Error loading bag data from localStorage:", error);
      }
    }
  }, [dispatch]);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    if (bagState.items.length > 0 || bagState.tripData) {
      try {
        // TODO: Substituir localStorage por chamadas de API para salvar dados da mala no backend
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bagState));
        dispatch(setLastSync(new Date().toISOString()));
      } catch (error) {
        console.error("Error saving bag data to localStorage:", error);
      }
    }
  }, [bagState, dispatch]);

  // Clear localStorage
  const clearStoredData = () => {
    // TODO: Implementar limpeza dos dados no backend também
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    clearStoredData,
    hasStoredData: !!localStorage.getItem(STORAGE_KEY),
  };
};
