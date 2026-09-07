# 3 Days in Kuala Lumpur - Interactive Travel Guide (`KL-26-01`)

An interactive, map-integrated travel itinerary web application designed for a streamlined, zero-backtracking 3-day exploration of Kuala Lumpur, Petaling Jaya, and Ampang.

Built with **React 18**, **Vite**, **TypeScript**, **Tailwind CSS**, **@vis.gl/react-google-maps**, **Motion**, and **Sonner**.

---

## Itinerary Overview (16 Curated Stops)

The itinerary reorganizes a curated 3-day exploration into tight geographic corridors, saving an estimated 1.5 to 2 hours of road transit daily:

### Day 1: North & Central Heritage, Shophouses & Lake Gardens (6 Stops)
- **Palette**: Amber (`#b45309`)
- **Stops**:
  1. **Bukit Tunku Skyline Viewpoints** (06:45 – 08:00) — Sunrise skyline panoramas at Jalan Tunku Putra & Changkat Tunku.
  2. **Syed Muhammad Naquib al-Attas Library / ISTAC** (08:15 – 09:45) — Alhambra-inspired Andalusian courtyard architecture and serene garden cafe.
  3. **House of Wheat & The Row KL** (10:15 – 12:45) — Artisan bakery brunch inside cave-like interiors followed by 1940s heritage shophouses.
  4. **Bank Negara Malaysia Museum and Art Gallery** (13:15 – 15:00) — Sasana Kijang air-conditioned museum, ancient Southeast Asian currencies, and the banknote tunnel.
  5. **Perdana Botanical Gardens** (15:30 – 18:00) — Golden-hour garden canopies, bamboo groves, and views of Merdeka 118.
  6. **Restoran New Kai Seng Seafood** (18:45 – 20:45) — Feast featuring claypot coconut curry crab, salted egg prawns, and fresh Chinese greens.

### Day 2: Creative Hubs, Nyonya Kuih, Butter Cake & Sunset KLCC (6 Stops)
- **Palette**: Teal (`#0d9488`)
- **Stops**:
  1. **Grumpy Bagels** (08:30 – 10:00) — Fresh chewy bagels in a restored 120-year-old brick diesel room in Imbi.
  2. **Kedai KL (Mahsa Avenue)** (10:30 – 12:45) — Adaptive reuse artisan market, craft studios, and kokedama moss workshops.
  3. **Blue Dahlia & Kwong Wah Cendol (Seksyen 17)** (13:00 – 14:45) — Traditional handmade Nyonya kuih paired with historic 1958 shaved-ice cendol.
  4. **Hideaway Cafe (Taman Yarl)** (15:15 – 16:45) — Cozy retro hideaway along Old Klang Road known for warm freshly baked butter cakes.
  5. **KLCC Park & Heritage Ficus Trees** (17:30 – 18:45) — Towering aerial roots of ancient Ficus elastica trees framing the Petronas Twin Towers.
  6. **The Oriental Park at Mandarin Oriental KLCC** (19:00 – 20:45) — Evening drinks overlooking illuminated fountains and city skyline.

### Day 3: Morning Wet Market, Adaptive School Hub & Chinatown Heritage (4 Stops)
- **Palette**: Indigo (`#6366f1`)
- **Stops**:
  1. **Pasar Pagi Taman Muda & Kopitiam Breakfast** (07:30 – 09:30) — Bustling market experience, duck egg char kway teow at Tai Ping Lang, Thomas Cup (kopi + Milo), and warm Tai Zi Ta egg tarts.
  2. **The Campus Ampang** (10:00 – 12:15) — Repurposed international school campus, open courtyards, foot reflexology, and artisan matcha.
  3. **Ho Kow Hainam Kopitiam** (12:45 – 14:15) — Heritage Hainanese kaya butter toast, half-boiled eggs, and silky iced cham timed before 2:30 PM closing.
  4. **Kwai Chai Hong** (14:15 – 16:15) — Restored 1960s pre-war murals, red bridge, and cultural laneway in Chinatown.

---

## Features

- **Dual View Modes**:
  - **Daily Cards & Maps**: Sequential timeline with detailed venue descriptions, timing badges, tag highlights, and embedded day maps.
  - **Master 3-Day Map**: High-altitude overview showing all 16 stops with multi-day route filtering (`All`, `Day 1`, `Day 2`, `Day 3`).
- **Interactive Google Maps (`@vis.gl/react-google-maps`)**:
  - Custom vector numbered map pins (`1`, `2`, `3`...) styled with white contrast borders and route color coding.
  - Directional polylines tracing optimal road connectivity.
  - Contextual InfoWindows with venue details and quick navigation links.
  - Auto-fit bounds when toggling between days or resetting the view.
- **Turn-by-Turn Navigation**:
  - Direct links preloaded with all daily stops and driving waypoints in Google Maps for live GPS guidance.
- **Quick Coordinate Copy**:
  - One-click clipboard copying of latitude/longitude coordinates on every stop card for easy insertion into ride-hailing apps (Grab) or search.
- **Design Engineering & Motion Details**:
  - Smooth spring-animated sliding pill on the view mode switcher (`motion/react`).
  - Tactile press feedback (`scale(0.97)` on `:active`) with custom ease-out curves (`cubic-bezier(0.23, 1, 0.32, 1)`).
  - Unobtrusive, rich-colored toast feedback via **Sonner**.
- **Modular Destination Architecture**:
  - Structured naming convention: `[country]/[cityCode]-[year]-[sequence]` (e.g., `malaysia/KL-26-01`), ready to support additional multi-city itineraries.

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or bun

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be accessible at `http://localhost:3000`.

### Building for Production

```bash
npm run build
```

---

## Google Maps Configuration

The application works out of the box with the default Google Maps demo configuration. For custom production usage or to remove map watermarks:

1. Click the **API Key Banner** at the top of the interface.
2. Enter your Google Maps Platform API key (requires **Maps JavaScript API** enabled).
3. Alternatively, set `VITE_GOOGLE_MAPS_API_KEY` in your `.env` file:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

---

## Project Structure

```
├── destinations/
│   └── malaysia/
│       └── KL-26-01/
│           ├── data.ts       # 16-stop itinerary dataset, coordinates & metadata
│           └── index.tsx     # Destination component & view mode orchestration
├── src/
│   ├── components/
│   │   ├── ApiKeyBanner.tsx   # Google Maps API key modal & persistence
│   │   ├── DayGoogleMap.tsx   # Interactive map for individual day itineraries
│   │   ├── MasterMapView.tsx  # Multi-day comprehensive map view with filtering
│   │   ├── MapMarkerPin.tsx   # Numbered vector pin marker
│   │   ├── MapPolyline.tsx    # Google Maps polyline overlay
│   │   └── TimelineItem.tsx   # Stop card with time, tags, & coordinate copy
│   ├── App.tsx                # Main entry, APIProvider & Sonner Toaster
│   ├── index.css              # Tailwind CSS & design engineering press physics
│   ├── types.ts               # Shared TypeScript interfaces
│   └── main.tsx               # App root
├── metadata.json              # Platform metadata
└── package.json               # Dependencies and scripts
```

---

## License

MIT License.
