import React from 'react';

interface PokeBallProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-16 h-16',
  xl: 'w-32 h-32',
};

const centerSizes = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-6 h-6',
  xl: 'w-12 h-12',
};

const innerSizes = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-3 h-3',
  xl: 'w-6 h-6',
};

const borderSizes = {
  sm: 'h-1',
  md: 'h-1.5',
  lg: 'h-2',
  xl: 'h-3',
};

export default function PokeBall({ size = 'md', animate = false }: PokeBallProps) {
  return (
    <div className={`relative ${sizeClasses[size]} ${animate ? 'animate-bounce' : ''}`}>
      <div className="absolute inset-0 bg-white rounded-full shadow-2xl"></div>
      
      <div
        className="absolute inset-0 bg-red-500 rounded-full"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}
      ></div>
      
      <div className={`absolute top-1/2 left-0 right-0 ${borderSizes[size]} bg-gray-800 -translate-y-1/2`}></div>
      
      <div className={`absolute top-1/2 left-1/2 ${centerSizes[size]} bg-white rounded-full border-2 border-gray-800 -translate-x-1/2 -translate-y-1/2 shadow-inner`}></div>
      
      <div className={`absolute top-1/2 left-1/2 ${innerSizes[size]} bg-gray-100 rounded-full border border-gray-300 -translate-x-1/2 -translate-y-1/2`}></div>
    </div>
  );
}