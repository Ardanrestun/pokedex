'use client';

import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export default function Loading({ size = 'md', text = 'Loading...' }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-4">
      <div className={`relative ${sizeClasses[size]}`}>
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-red-500 animate-spin"></div>
        <div className="absolute inset-[35%] rounded-full bg-gray-800 border-2 border-white"></div>
      </div>
      {text && <p className="text-gray-600 text-sm font-medium">{text}</p>}
    </div>
  );
}

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 shadow-xl">
        <Loading size="lg" text="Loading Pokemon..." />
      </div>
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-200"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
}
