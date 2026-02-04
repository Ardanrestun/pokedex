'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Pokemon, PokemonState, PokemonAction } from '../types';

const initialState: PokemonState = {
  pokemons: [],
  filteredPokemons: [],
  favorites: [],
  loading: false,
  error: null,
  searchQuery: '',
  selectedTypes: [],
  offset: 0,
  hasMore: true,
};

function filterPokemons(
  pokemons: Pokemon[],
  searchQuery: string,
  selectedTypes: string[]
): Pokemon[] {
  return pokemons.filter((pokemon) => {
    const matchesSearch = searchQuery
      ? pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesType =
      selectedTypes.length === 0
        ? true
        : pokemon.types.some((t) => selectedTypes.includes(t.type.name));

    return matchesSearch && matchesType;
  });
}

function pokemonReducer(state: PokemonState, action: PokemonAction): PokemonState {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_SUCCESS':
      const existingIds = new Set(state.pokemons.map(p => p.id));
      const uniqueNewPokemons = action.payload.pokemons.filter(p => !existingIds.has(p.id));
      const newPokemons = [...state.pokemons, ...uniqueNewPokemons];
      return {
        ...state,
        loading: false,
        pokemons: newPokemons,
        filteredPokemons: filterPokemons(newPokemons, state.searchQuery, state.selectedTypes),
        offset: state.offset + uniqueNewPokemons.length,
        hasMore: action.payload.hasMore,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
        filteredPokemons: filterPokemons(state.pokemons, action.payload, state.selectedTypes),
      };
    case 'SET_TYPE_FILTER':
      return {
        ...state,
        selectedTypes: action.payload,
        filteredPokemons: filterPokemons(state.pokemons, state.searchQuery, action.payload),
      };
    case 'TOGGLE_TYPE_FILTER':
      const newSelectedTypes = state.selectedTypes.includes(action.payload)
        ? state.selectedTypes.filter((t) => t !== action.payload)
        : [...state.selectedTypes, action.payload];
      return {
        ...state,
        selectedTypes: newSelectedTypes,
        filteredPokemons: filterPokemons(state.pokemons, state.searchQuery, newSelectedTypes),
      };
    case 'CLEAR_TYPE_FILTER':
      return {
        ...state,
        selectedTypes: [],
        filteredPokemons: filterPokemons(state.pokemons, state.searchQuery, []),
      };
    case 'LOAD_MORE':
      return state;
    case 'RESET':
      return { ...initialState, favorites: state.favorites };
    case 'ADD_FAVORITE':
      if (state.favorites.some(p => p.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(p => p.id !== action.payload),
      };
    case 'LOAD_FAVORITES':
      return {
        ...state,
        favorites: action.payload,
      };
    default:
      return state;
  }
}

interface PokemonContextType {
  state: PokemonState;
  dispatch: React.Dispatch<PokemonAction>;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export function PokemonProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('pokemonFavorites');
    if (savedFavorites) {
      try {
        const favorites = JSON.parse(savedFavorites);
        dispatch({ type: 'LOAD_FAVORITES', payload: favorites });
      } catch (e) {
        console.error('Failed to load favorites:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pokemonFavorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  return (
    <PokemonContext.Provider value={{ state, dispatch }}>
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemonContext() {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error('usePokemonContext must be used within a PokemonProvider');
  }
  return context;
}
