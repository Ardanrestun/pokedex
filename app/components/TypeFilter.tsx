'use client';

import React, { useEffect, useState } from 'react';
import { fetchPokemonTypes } from '../services/pokemonService';
import { TypeInfo } from '../types';

interface TypeFilterProps {
  selectedTypes: string[];
  onToggleType: (type: string) => void;
  onClearFilter: () => void;
}

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  normal: { bg: 'bg-gray-400', text: 'text-white', border: 'border-gray-400' },
  fire: { bg: 'bg-orange-500', text: 'text-white', border: 'border-orange-500' },
  water: { bg: 'bg-blue-500', text: 'text-white', border: 'border-blue-500' },
  electric: { bg: 'bg-yellow-400', text: 'text-gray-800', border: 'border-yellow-400' },
  grass: { bg: 'bg-green-500', text: 'text-white', border: 'border-green-500' },
  ice: { bg: 'bg-cyan-400', text: 'text-gray-800', border: 'border-cyan-400' },
  fighting: { bg: 'bg-red-700', text: 'text-white', border: 'border-red-700' },
  poison: { bg: 'bg-purple-500', text: 'text-white', border: 'border-purple-500' },
  ground: { bg: 'bg-amber-600', text: 'text-white', border: 'border-amber-600' },
  flying: { bg: 'bg-indigo-400', text: 'text-white', border: 'border-indigo-400' },
  psychic: { bg: 'bg-pink-500', text: 'text-white', border: 'border-pink-500' },
  bug: { bg: 'bg-lime-500', text: 'text-white', border: 'border-lime-500' },
  rock: { bg: 'bg-stone-500', text: 'text-white', border: 'border-stone-500' },
  ghost: { bg: 'bg-violet-700', text: 'text-white', border: 'border-violet-700' },
  dragon: { bg: 'bg-indigo-700', text: 'text-white', border: 'border-indigo-700' },
  dark: { bg: 'bg-gray-800', text: 'text-white', border: 'border-gray-800' },
  steel: { bg: 'bg-slate-400', text: 'text-white', border: 'border-slate-400' },
  fairy: { bg: 'bg-pink-300', text: 'text-gray-800', border: 'border-pink-300' },
};



export default function TypeFilter({
  selectedTypes,
  onToggleType,
  onClearFilter,
}: TypeFilterProps) {
  const [types, setTypes] = useState<TypeInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTypes() {
      try {
        const fetchedTypes = await fetchPokemonTypes();
        setTypes(fetchedTypes);
      } catch (error) {
        console.error('Failed to fetch types:', error);
      } finally {
        setLoading(false);
      }
    }
    loadTypes();
  }, []);

  if (loading) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-9 w-20 bg-gray-200 rounded-full animate-pulse flex-shrink-0"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600">Filter by Type</span>
        {selectedTypes.length > 0 && (
          <button
            onClick={onClearFilter}
            className="text-xs text-red-500 hover:text-red-600 font-medium"
          >
            Clear ({selectedTypes.length})
          </button>
        )}
      </div>
      <div className="relative -mx-4 px-4">
        <div className="flex gap-2 overflow-x-scroll pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {types.map((type) => {
            const isSelected = selectedTypes.includes(type.name);
            const colors = typeColors[type.name] || typeColors.normal;

            return (
              <button
                key={type.name}
                onClick={() => onToggleType(type.name)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium capitalize transition-all duration-200 flex-shrink-0 border-2 whitespace-nowrap ${
                  isSelected
                    ? `${colors.bg} ${colors.text} ${colors.border}`
                    : `bg-white ${colors.border} text-gray-700 hover:bg-gray-50`
                }`}
              >
                <span>{type.name}</span>
                {isSelected && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
