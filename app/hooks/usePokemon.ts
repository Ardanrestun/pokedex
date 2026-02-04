'use client';

import { useCallback, useEffect } from 'react';
import { usePokemonContext } from '../context/PokemonContext';
import { fetchPokemonList } from '../services/pokemonService';

export function usePokemon() {
  const { state, dispatch } = usePokemonContext();

  const loadPokemons = useCallback(async () => {
    if (state.loading || !state.hasMore) return;

    dispatch({ type: 'FETCH_START' });

    try {
      const result = await fetchPokemonList(state.offset, 20);
      dispatch({
        type: 'FETCH_SUCCESS',
        payload: result,
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_ERROR',
        payload: error instanceof Error ? error.message : 'Failed to fetch Pokemon',
      });
    }
  }, [state.offset, state.loading, state.hasMore, dispatch]);

  const setSearchQuery = useCallback(
    (query: string) => {
      dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
    },
    [dispatch]
  );

  const toggleTypeFilter = useCallback(
    (type: string) => {
      dispatch({ type: 'TOGGLE_TYPE_FILTER', payload: type });
    },
    [dispatch]
  );

  const clearTypeFilter = useCallback(() => {
    dispatch({ type: 'CLEAR_TYPE_FILTER' });
  }, [dispatch]);

  const resetPokemons = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, [dispatch]);

  return {
    pokemons: state.filteredPokemons,
    allPokemons: state.pokemons,
    loading: state.loading,
    error: state.error,
    hasMore: state.hasMore,
    searchQuery: state.searchQuery,
    selectedTypes: state.selectedTypes,
    loadPokemons,
    setSearchQuery,
    toggleTypeFilter,
    clearTypeFilter,
    resetPokemons,
  };
}
