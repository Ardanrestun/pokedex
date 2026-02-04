"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PokeBall from "./PokeBall";

const navItems = [
  {
    name: "Home",
    href: "/",
    icon: (
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
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    name: "Pokemon",
    href: "/pokemon",
    icon: (
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
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    name: "Favorites",
    href: "/favorites",
    icon: (
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
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <nav className="hidden md:flex fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-red-500 to-red-600 shadow-lg z-50">
        <div className="container mx-auto px-4 flex items-center justify-between h-full">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
              <PokeBall size="md" />
            </div>
            <span className="text-white font-bold text-xl">PokeDex</span>
          </Link>

          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex items-center justify-around h-full">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 ${
                pathname === item.href
                  ? "text-red-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1 font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}