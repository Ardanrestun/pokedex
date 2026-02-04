'use client';

import { useState, useCallback } from 'react';

interface UseLoadingState {
  isLoading: boolean;
  error: string | null;
}

export function useLoading() {
  const [state, setState] = useState<UseLoadingState>({
    isLoading: false,
    error: null,
  });

  const startLoading = useCallback(() => {
    setState({ isLoading: true, error: null });
  }, []);

  const stopLoading = useCallback(() => {
    setState((prev) => ({ ...prev, isLoading: false }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState({ isLoading: false, error });
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  const executeWithLoading = useCallback(
    async <T>(asyncFn: () => Promise<T>): Promise<T | null> => {
      try {
        startLoading();
        const result = await asyncFn();
        stopLoading();
        return result;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        return null;
      }
    },
    [startLoading, stopLoading, setError]
  );

  return {
    ...state,
    startLoading,
    stopLoading,
    setError,
    clearError,
    executeWithLoading,
  };
}
