import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { loadBagData, setLastSync } from "../store/bagSlice";
import { selectBag } from "../store/selectors";

const STORAGE_KEY = "flya-bag-data";

export const useBagPersistence = () => {
  const dispatch = useAppDispatch();
  const bagState = useAppSelector(selectBag);
  const isInitialized = useRef(false);

  // Load data from localStorage on mount (only once)
  useEffect(() => {
    if (!isInitialized.current) {
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
      isInitialized.current = true;
    }
  }, [dispatch]);

  // Save data to localStorage whenever state changes (debounced)
  useEffect(() => {
    if (
      isInitialized.current &&
      (bagState.items.length > 0 || bagState.tripData)
    ) {
      const timeoutId = setTimeout(() => {
        try {
          // TODO: Substituir localStorage por chamadas de API para salvar dados da mala no backend
          localStorage.setItem(STORAGE_KEY, JSON.stringify(bagState));
          dispatch(setLastSync(new Date().toISOString()));
        } catch (error) {
          console.error("Error saving bag data to localStorage:", error);
        }
      }, 300); // Debounce de 300ms

      return () => clearTimeout(timeoutId);
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
