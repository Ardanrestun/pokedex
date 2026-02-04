'use client';

import Link from 'next/link';
import PokeBall from './components/PokeBall';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-red-600 to-orange-500 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="relative mx-auto mb-6 w-32 h-32">
            <PokeBall size="xl" animate={true} />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
          PokeDex
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8">
          Explore the world of Pokemon
        </p>

        <Link
          href="/pokemon"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-600 font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <span>Start Exploring</span>
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
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
