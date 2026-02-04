# PokeDex - Aplikasi Pokemon dengan Next.js

Aplikasi web responsive untuk menjelajahi dan mengkoleksi Pokemon favorit Anda menggunakan PokeAPI.

**Dibuat oleh: Ardan Restu Nugroho**

## Tech Stack

- **Next.js 14** - React framework dengan App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - State management untuk data Pokemon dan favorites
- **PokeAPI** - REST API untuk data Pokemon

## Fitur

### 1. Pokemon List Page
- Menampilkan minimal 20 Pokemon
- Search bar untuk filter Pokemon berdasarkan nama
- Multi-select filter berdasarkan tipe Pokemon (Fire, Water, Grass, dll)
- Infinite scroll untuk memuat Pokemon lebih banyak
- Drag-to-scroll pada filter tipe (desktop & mobile)
- Responsive design untuk mobile, tablet, dan desktop

### 2. Pokemon Detail Page
- Informasi lengkap Pokemon:
  - Nama dan gambar HD
  - Height & Weight
  - Tipe Pokemon dengan color coding
  - Base stats (HP, Attack, Defense, Special Attack, Special Defense, Speed)
  - Abilities (termasuk hidden abilities)
- Tombol favorite untuk menyimpan Pokemon favorit

### 3. Favorites Page
- Menampilkan semua Pokemon yang difavoritkan
- Data favorites tersimpan di localStorage (persisten)
- Bisa remove dari favorites

### 4. Responsive Navbar
- Desktop: Top navigation bar dengan logo PokeBall
- Mobile: Bottom navigation bar (seperti app Android)
- Active state pada menu yang sedang dibuka

## Struktur Folder

```
pokemon-app/
├── app/
│   ├── components/          # Komponen React yang reusable
│   │   ├── ErrorMessage.tsx    # Komponen error dengan retry button
│   │   ├── Loading.tsx         # Komponen loading spinner & skeleton
│   │   ├── Navbar.tsx          # Navigation bar (top & bottom)
│   │   ├── PokeBall.tsx        # Logo PokeBall component
│   │   ├── PokemonCard.tsx     # Card untuk menampilkan Pokemon
│   │   ├── SearchBar.tsx       # Input search dengan debounce
│   │   └── TypeFilter.tsx      # Filter multi-select berdasarkan tipe
│   │
│   ├── context/             # State management dengan Context API
│   │   ├── PokemonContext.tsx  # Context untuk Pokemon data
│   │   └── types.ts            # TypeScript types untuk context
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useFavorites.ts     # Hook untuk manage favorites
│   │   ├── useInfiniteScroll.ts # Hook untuk infinite scroll
│   │   ├── usePokemon.ts       # Hook untuk data Pokemon
│   │   └── useSearch.ts        # Hook untuk search functionality
│   │
│   ├── services/            # Service layer untuk API calls
│   │   ├── api.ts              # Base axios configuration
│   │   └── pokemonService.ts   # Pokemon API service methods
│   │
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts            # Global types untuk Pokemon
│   │
│   ├── pokemon/             # Pokemon pages
│   │   ├── page.tsx            # Pokemon list page
│   │   └── [id]/
│   │       └── page.tsx        # Pokemon detail page
│   │
│   ├── favorites/           # Favorites page
│   │   └── page.tsx
│   │
│   ├── layout.tsx           # Root layout dengan Navbar & Provider
│   ├── page.tsx             # Home page dengan animasi PokeBall
│   └── globals.css          # Global styles & Tailwind config
│
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies & scripts
```

## Penjelasan Struktur

### Components
Berisi komponen UI yang reusable seperti card, loading, error message, navbar, dll.

### Context
Menggunakan Context API untuk state management global:
- Pokemon data (list, detail, pagination)
- Loading & error states
- Search & filter states
- Favorites management

### Hooks
Custom hooks untuk memisahkan logic dari UI:
- **usePokemon**: Mengelola data Pokemon dari API
- **useFavorites**: Mengelola localStorage untuk favorites
- **useInfiniteScroll**: Implementasi infinite scroll
- **useSearch**: Debounced search functionality

### Services
Layer untuk berkomunikasi dengan API:
- **api.ts**: Base axios instance
- **pokemonService.ts**: Methods untuk fetch Pokemon data

### Types
TypeScript interfaces dan types untuk type safety

## Instalasi

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build untuk production
npm run build

# Start production server
npm start
```

## Environment Variables

Tidak ada environment variables yang diperlukan karena menggunakan public API.

## API Reference

Aplikasi ini menggunakan [PokeAPI](https://pokeapi.co/) untuk data Pokemon:
- GET /pokemon - List Pokemon dengan pagination
- GET /pokemon/{id} - Detail Pokemon
- GET /type - List semua tipe Pokemon

## Fitur State Management

### Context API
- **PokemonContext**: Mengelola state global untuk Pokemon data
- **Reducer pattern**: Untuk update state yang kompleks
- **Custom hooks**: Untuk akses state dengan mudah

### Loading & Error Handling
- Loading state dengan skeleton UI
- Error boundary dengan retry functionality
- Toast notifications untuk user feedback

### Data Persistence
- Favorites disimpan di localStorage
- Auto-sync antar tabs (storage event)

## Responsive Design

### Mobile (< 768px)
- Bottom navigation bar
- Single column grid
- Touch-optimized scrolling
- Simplified filter UI

### Tablet (768px - 1024px)
- Top navigation bar
- 2-3 column grid
- Enhanced filter with scroll

### Desktop (> 1024px)
- Top navigation bar
- 4-5 column grid
- Drag-to-scroll filter
- Hover effects

## Performance Optimization

- Image optimization dengan next/image
- Lazy loading dengan Intersection Observer
- Debounced search input
- Memoized filter functions
- Virtual scrolling untuk large lists

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Author

**Ardan Restu Nugroho**