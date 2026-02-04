export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonBasic[];
}

export interface PokemonBasic {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: PokemonType[];
  height: number;
  weight: number;
  stats: PokemonStat[];
  abilities: PokemonAbility[];
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface TypeInfo {
  name: string;
  url: string;
}

export interface PokemonState {
  pokemons: Pokemon[];
  filteredPokemons: Pokemon[];
  favorites: Pokemon[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedTypes: string[];
  offset: number;
  hasMore: boolean;
}

export type PokemonAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: { pokemons: Pokemon[]; hasMore: boolean } }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_TYPE_FILTER'; payload: string[] }
  | { type: 'TOGGLE_TYPE_FILTER'; payload: string }
  | { type: 'CLEAR_TYPE_FILTER' }
  | { type: 'LOAD_MORE' }
  | { type: 'RESET' }
  | { type: 'ADD_FAVORITE'; payload: Pokemon }
  | { type: 'REMOVE_FAVORITE'; payload: number }
  | { type: 'LOAD_FAVORITES'; payload: Pokemon[] };
