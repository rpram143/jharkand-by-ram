# Jharkhand Tourism Website - Export Guide

## Project Structure
```
jharkhand-tourism/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── TouristSpotCard.tsx
│   │   └── HotelCard.tsx
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── TouristSpotsContext.tsx
│   ├── data/
│   │   ├── touristSpots.ts
│   │   └── hotels.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Explore.tsx
│   │   ├── Roomstay.tsx
│   │   ├── Login.tsx
│   │   └── Dashboard.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── eslint.config.js
└── vite.config.ts
```

## Setup Instructions After Export

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Key Dependencies
- React 18.3.1
- React Router DOM 7.9.2
- TypeScript 5.5.3
- Tailwind CSS 3.4.1
- Vite 5.4.2
- Lucide React 0.344.0

## Features Included
- ✅ Role-based authentication (Admin, Forest Officer, User)
- ✅ Real-time tourist spot status management
- ✅ 15+ Jharkhand tourist destinations
- ✅ Hotel booking interface with ratings
- ✅ Responsive design with Tailwind CSS
- ✅ Search and filtering functionality
- ✅ Dashboard for managing destinations
- ✅ Beautiful nature-inspired UI

## Demo Accounts
- **Tourist**: Any email with role "user"
- **Forest Officer**: Any email with role "forest_officer" 
- **Admin**: Any email with role "admin"

## Customization
- Tourist spots data: `src/data/touristSpots.ts`
- Hotels data: `src/data/hotels.ts`
- Styling: Tailwind classes throughout components
- Authentication logic: `src/context/AuthContext.tsx`