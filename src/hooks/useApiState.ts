import { useState } from "react";

export interface UseApiStateResult {
  loading: boolean;
  error: string | null;
  success: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSuccess: (success: string | null) => void;
  clearMessages: () => void;
}

export const useApiState = (): UseApiStateResult => {
  const [loading, setLoadingState] = useState(false);
  const [error, setErrorState] = useState<string | null>(null);
  const [success, setSuccessState] = useState<string | null>(null);

  const setLoading = (loading: boolean) => {
    setLoadingState(loading);
    if (loading) {
      // Clear messages when starting a new operation
      setErrorState(null);
      setSuccessState(null);
    }
  };

  const setError = (error: string | null) => {
    setErrorState(error);
    setSuccessState(null);
    setLoadingState(false);
  };

  const setSuccess = (success: string | null) => {
    setSuccessState(success);
    setErrorState(null);
    setLoadingState(false);
  };

  const clearMessages = () => {
    setErrorState(null);
    setSuccessState(null);
  };

  return {
    loading,
    error,
    success,
    setLoading,
    setError,
    setSuccess,
    clearMessages,
  };
};
