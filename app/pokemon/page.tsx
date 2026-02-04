'use client';

import React, { useEffect } from 'react';
import { usePokemon } from '../hooks/usePokemon';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import TypeFilter from '../components/TypeFilter';
import Loading, { LoadingCard } from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function PokemonListPage() {
  const {
    pokemons,
    allPokemons,
    loading,
    error,
    hasMore,
    searchQuery,
    selectedTypes,
    loadPokemons,
    setSearchQuery,
    toggleTypeFilter,
    clearTypeFilter,
    resetPokemons,
  } = usePokemon();

  const { loadMoreRef } = useInfiniteScroll({
    onLoadMore: loadPokemons,
    hasMore: hasMore && !searchQuery && selectedTypes.length === 0,
    loading,
  });

  useEffect(() => {
    if (allPokemons.length === 0 && !loading && !error) {
      loadPokemons();
    }
  }, [allPokemons.length, loading, error, loadPokemons]);

  const handleRetry = () => {
    resetPokemons();
    loadPokemons();
  };

  const isFiltering = searchQuery || selectedTypes.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 md:top-16 z-40 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Pokemon List
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({pokemons.length} {isFiltering ? 'filtered' : 'loaded'})
              </span>
            </h1>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by name..."
            />
          </div>
          
          <TypeFilter
            selectedTypes={selectedTypes}
            onToggleType={toggleTypeFilter}
            onClearFilter={clearTypeFilter}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        {error && !loading && pokemons.length === 0 && (
          <div className="max-w-md mx-auto mt-8">
            <ErrorMessage message={error} onRetry={handleRetry} />
          </div>
        )}

        {pokemons.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}

            {loading &&
              Array.from({ length: 4 }).map((_, index) => (
                <LoadingCard key={`skeleton-${index}`} />
              ))}
          </div>
        )}

        {!loading && pokemons.length === 0 && isFiltering && !error && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No Pokemon found
            </h3>
            <p className="text-gray-500 mb-4">
              {searchQuery && selectedTypes.length > 0
                ? `No Pokemon matching "${searchQuery}" with selected types`
                : searchQuery
                ? `No Pokemon matching "${searchQuery}"`
                : 'No Pokemon with selected types found'}
            </p>
            {selectedTypes.length > 0 && (
              <button
                onClick={clearTypeFilter}
                className="text-red-500 hover:text-red-600 font-medium"
              >
                Clear type filter
              </button>
            )}
          </div>
        )}

        {loading && pokemons.length === 0 && (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loading size="lg" text="Loading Pokemon..." />
          </div>
        )}

        {!isFiltering && hasMore && (
          <div ref={loadMoreRef} className="flex justify-center py-8">
            {loading && <Loading size="md" text="Loading more..." />}
          </div>
        )}

        {isFiltering && hasMore && !loading && (
          <div className="flex justify-center py-8">
            <button
              onClick={loadPokemons}
              className="px-6 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
            >
              Load more Pokemon to search from
            </button>
          </div>
        )}

        {!hasMore && pokemons.length > 0 && !isFiltering && (
          <div className="text-center py-8 text-gray-500">
            You&apos;ve seen all {pokemons.length} Pokemon!
          </div>
        )}
      </div>
    </div>
  );
}