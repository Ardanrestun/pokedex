'use client';

import { useCallback } from 'react';
import { usePokemonContext } from '../context/PokemonContext';
import { Pokemon } from '../types';

export function useFavorites() {
  const { state, dispatch } = usePokemonContext();

  const addFavorite = useCallback(
    (pokemon: Pokemon) => {
      dispatch({ type: 'ADD_FAVORITE', payload: pokemon });
    },
    [dispatch]
  );

  const removeFavorite = useCallback(
    (pokemonId: number) => {
      dispatch({ type: 'REMOVE_FAVORITE', payload: pokemonId });
    },
    [dispatch]
  );

  const toggleFavorite = useCallback(
    (pokemon: Pokemon) => {
      if (state.favorites.some((p) => p.id === pokemon.id)) {
        removeFavorite(pokemon.id);
      } else {
        addFavorite(pokemon);
      }
    },
    [state.favorites, addFavorite, removeFavorite]
  );

  const isFavorite = useCallback(
    (pokemonId: number) => {
      return state.favorites.some((p) => p.id === pokemonId);
    },
    [state.favorites]
  );

  return {
    favorites: state.favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
}
