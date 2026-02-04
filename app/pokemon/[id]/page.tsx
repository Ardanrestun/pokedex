'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { fetchPokemonById } from '../../services/pokemonService';
import { Pokemon } from '../../types';
import { useFavorites } from '../../hooks/useFavorites';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

const typeColors: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-orange-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-cyan-400',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-amber-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-stone-500',
  ghost: 'bg-violet-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-800',
  steel: 'bg-slate-400',
  fairy: 'bg-pink-300',
};

const typeBackgrounds: Record<string, string> = {
  normal: 'from-gray-300 to-gray-400',
  fire: 'from-orange-400 to-red-500',
  water: 'from-blue-400 to-cyan-500',
  electric: 'from-yellow-300 to-amber-400',
  grass: 'from-green-400 to-emerald-500',
  ice: 'from-cyan-300 to-blue-400',
  fighting: 'from-red-500 to-orange-600',
  poison: 'from-purple-400 to-violet-500',
  ground: 'from-amber-400 to-yellow-500',
  flying: 'from-indigo-300 to-blue-400',
  psychic: 'from-pink-400 to-rose-500',
  bug: 'from-lime-400 to-green-500',
  rock: 'from-stone-400 to-gray-500',
  ghost: 'from-violet-500 to-purple-600',
  dragon: 'from-indigo-500 to-violet-600',
  dark: 'from-gray-600 to-gray-800',
  steel: 'from-slate-300 to-gray-400',
  fairy: 'from-pink-300 to-rose-400',
};

const statNames: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

const statColors: Record<string, string> = {
  hp: 'bg-red-500',
  attack: 'bg-orange-500',
  defense: 'bg-yellow-500',
  'special-attack': 'bg-blue-500',
  'special-defense': 'bg-green-500',
  speed: 'bg-pink-500',
};

export default function PokemonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  const pokemonId = params.id as string;

  useEffect(() => {
    async function loadPokemon() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPokemonById(pokemonId);
        setPokemon(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load Pokemon');
      } finally {
        setLoading(false);
      }
    }

    if (pokemonId) {
      loadPokemon();
    }
  }, [pokemonId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loading size="lg" text="Loading Pokemon details..." />
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full">
          <ErrorMessage
            message={error || 'Pokemon not found'}
            onRetry={() => router.refresh()}
          />
          <button
            onClick={() => router.back()}
            className="mt-4 w-full py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const mainType = pokemon.types[0]?.type.name || 'normal';
  const bgGradient = typeBackgrounds[mainType] || typeBackgrounds.normal;
  const imageUrl =
    pokemon.sprites.other['official-artwork'].front_default ||
    pokemon.sprites.front_default;
  const isFav = isFavorite(pokemon.id);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      <div className={`bg-gradient-to-br ${bgGradient} pt-4 pb-32 px-4 relative`}>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() => toggleFavorite(pokemon)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
              isFav
                ? 'bg-red-500 text-white'
                : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill={isFav ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        <div className="text-center">
          <span className="text-white/60 font-bold text-lg">
            #{String(pokemon.id).padStart(3, '0')}
          </span>
          <h1 className="text-4xl font-bold text-white capitalize mt-1">
            {pokemon.name}
          </h1>

          <div className="flex justify-center gap-2 mt-4">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className={`${
                  typeColors[type.type.name] || typeColors.normal
                } text-white text-sm font-medium px-4 py-1.5 rounded-full capitalize`}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative -mt-24 mb-4 flex justify-center">
        <div className="relative w-48 h-48 md:w-64 md:h-64">
          <Image
            src={imageUrl}
            alt={pokemon.name}
            fill
            sizes="(max-width: 768px) 192px, 256px"
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </div>

      <div className="mx-4 bg-white rounded-3xl shadow-lg p-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-500 mb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              </svg>
              <span className="text-sm font-medium">Weight</span>
            </div>
            <p className="text-xl font-bold text-gray-800">
              {(pokemon.weight / 10).toFixed(1)} kg
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-500 mb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h10v10M7 17V7l10 10"
                />
              </svg>
              <span className="text-sm font-medium">Height</span>
            </div>
            <p className="text-xl font-bold text-gray-800">
              {(pokemon.height / 10).toFixed(1)} m
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Base Stats</h2>
          <div className="space-y-3">
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500 w-20">
                  {statNames[stat.stat.name] || stat.stat.name}
                </span>
                <span className="text-sm font-bold text-gray-800 w-10 text-right">
                  {stat.base_stat}
                </span>
                <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      statColors[stat.stat.name] || 'bg-gray-400'
                    }`}
                    style={{ width: `${Math.min((stat.base_stat / 255) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
            <span className="text-sm font-medium text-gray-500 w-20">Total</span>
            <span className="text-sm font-bold text-gray-800 w-10 text-right">
              {pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
            </span>
            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                style={{
                  width: `${Math.min(
                    (pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0) / 720) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Abilities</h2>
          <div className="flex flex-wrap gap-2">
            {pokemon.abilities.map((ability) => (
              <span
                key={ability.ability.name}
                className={`px-4 py-2 rounded-xl text-sm font-medium capitalize ${
                  ability.is_hidden
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {ability.ability.name.replace('-', ' ')}
                {ability.is_hidden && (
                  <span className="ml-1 text-xs opacity-70">(Hidden)</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
