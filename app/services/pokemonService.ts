import { Pokemon, PokemonListResponse, TypeInfo } from '../types';

const BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemonList(
  offset: number = 0,
  limit: number = 20
): Promise<{ pokemons: Pokemon[]; hasMore: boolean }> {
  try {
    const response = await fetch(
      `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: PokemonListResponse = await response.json();

    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const detailResponse = await fetch(pokemon.url);
        if (!detailResponse.ok) {
          throw new Error(`HTTP error! status: ${detailResponse.status}`);
        }
        return detailResponse.json();
      })
    );

    return {
      pokemons: pokemonDetails,
      hasMore: data.next !== null,
    };
  } catch (error) {
    throw error instanceof Error ? error : new Error('An unknown error occurred');
  }
}

export async function fetchPokemonById(id: number | string): Promise<Pokemon> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw error instanceof Error ? error : new Error('An unknown error occurred');
  }
}

export async function searchPokemon(name: string): Promise<Pokemon> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase()}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Pokemon "${name}" not found`);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw error instanceof Error ? error : new Error('An unknown error occurred');
  }
}

export async function fetchPokemonTypes(): Promise<TypeInfo[]> {
  try {
    const response = await fetch(`${BASE_URL}/type`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    const validTypes = data.results.filter(
      (type: { name: string }) => !['unknown', 'shadow'].includes(type.name)
    );

    return validTypes;
  } catch (error) {
    throw error instanceof Error ? error : new Error('An unknown error occurred');
  }
}
