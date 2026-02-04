'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Pokemon } from '../types';
import { useFavorites } from '../hooks/useFavorites';

interface PokemonCardProps {
  pokemon: Pokemon;
}

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
  normal: 'from-gray-200 to-gray-300',
  fire: 'from-orange-200 to-red-200',
  water: 'from-blue-200 to-cyan-200',
  electric: 'from-yellow-200 to-amber-200',
  grass: 'from-green-200 to-emerald-200',
  ice: 'from-cyan-200 to-blue-200',
  fighting: 'from-red-200 to-orange-200',
  poison: 'from-purple-200 to-violet-200',
  ground: 'from-amber-200 to-yellow-200',
  flying: 'from-indigo-200 to-blue-200',
  psychic: 'from-pink-200 to-rose-200',
  bug: 'from-lime-200 to-green-200',
  rock: 'from-stone-200 to-gray-200',
  ghost: 'from-violet-200 to-purple-200',
  dragon: 'from-indigo-200 to-violet-200',
  dark: 'from-gray-300 to-gray-400',
  steel: 'from-slate-200 to-gray-200',
  fairy: 'from-pink-200 to-rose-200',
};

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const mainType = pokemon.types[0]?.type.name || 'normal';
  const bgGradient = typeBackgrounds[mainType] || typeBackgrounds.normal;
  const imageUrl =
    pokemon.sprites.other['official-artwork'].front_default ||
    pokemon.sprites.front_default ||
    '/placeholder-pokemon.png';

  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(pokemon.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(pokemon);
  };

  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <div
        className={`relative bg-gradient-to-br ${bgGradient} rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer group`}
      >
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2 left-2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            isFav
              ? 'bg-red-500 text-white'
              : 'bg-white/50 text-gray-500 hover:bg-white/80 opacity-0 group-hover:opacity-100'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
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

        <span className="absolute top-3 right-3 text-gray-500/50 font-bold text-lg">
          #{String(pokemon.id).padStart(3, '0')}
        </span>

        <div className="relative pt-4 px-4 pb-0">
          <div className="relative w-full aspect-square">
            <Image
              src={imageUrl}
              alt={pokemon.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
              priority={pokemon.id <= 20}
            />
          </div>
        </div>

        <div className="p-4 pt-2 bg-white/80 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-gray-800 capitalize text-center mb-2">
            {pokemon.name}
          </h3>

          <div className="flex justify-center gap-2">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className={`${
                  typeColors[type.type.name] || typeColors.normal
                } text-white text-xs font-medium px-3 py-1 rounded-full capitalize`}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
