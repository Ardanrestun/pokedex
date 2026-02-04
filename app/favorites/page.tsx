'use client';

import React from 'react';
import Link from 'next/link';
import PokemonCard from '../components/PokemonCard';
import { useFavorites } from '../hooks/useFavorites';

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 md:top-16 z-40 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">
            My Favorites
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({favorites.length} Pokemon)
            </span>
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        {favorites.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {favorites.map((pokemon) => (
              <PokemonCard key={`fav-${pokemon.id}`} pokemon={pokemon} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-500 text-center max-w-md mb-6">
              Start exploring Pokemon and tap the heart icon to add them to your favorites!
            </p>
            <Link
              href="/pokemon"
              className="px-6 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
            >
              Explore Pokemon
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}