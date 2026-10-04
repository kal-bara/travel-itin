# Chronicle — Modular Travel Itinerary & Field Guide Platform

An editorial, map-integrated travel itinerary and field guide platform designed for curated, zero-backtracking regional exploration.

The project is architected as an **extensible, multi-destination platform**: each itinerary is a modular, self-contained destination package (`destinations/[country]/[destinationId]/`) designed to be plugged into a global navigation switcher, featuring real **Google Maps Platform** cartography, clustered geographic corridors, and an archival field-logbook aesthetic.

Currently featuring the pilot edition: **Kuala Lumpur & Klang Valley (`malaysia/KL-26-01`)**.

---

## Vision & Modular Architecture

Traditional travel blogs often list disjointed recommendations that result in hours of crisscrossing urban traffic. Chronicle solves this by structuring travel into **geographic corridors with zero backtracking**, combined with technical field notes, exact coordinates, and live GPS routing.

### Scalable Destination Structure
Each destination is organized into a standardized directory tree:

```
destinations/
└── [country]/
    └── [destinationId]/       # e.g., malaysia/KL-26-01, japan/TYO-26-01
        ├── data.ts            # Curated day itineraries, venues, GPS coordinates & metadata
        └── index.tsx          # Main destination orchestrator & view modes
```

### Destination Identifier Convention
Itineraries use a standardized archival taxonomy:
`[country]/[CITY_CODE]-[YEAR]-[SEQUENCE]`
- `malaysia/KL-26-01`: Kuala Lumpur, 2026, Edition 01
- *(Upcoming)* `japan/TYO-26-01`: Tokyo Transit & Neighborhood Circuits
- *(Upcoming)* `portugal/LIS-26-01`: Lisbon Seven Hills & Coastal Loop

The top navigation header (`src/components/AmpChronicleHeader.tsx`) is designed with a destination path tag (`destinations/malaysia/KL-26-01`), ready to be connected to a destination dropdown switcher as additional cities are added.

---

## Destination Registry

Chronicle organizes each regional itinerary as an independent destination package with its own spatial clusters, coordinates, and venue data:

| Destination | Identifier | Scope | Primary Corridors & Focus | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Kuala Lumpur & Klang Valley** | `malaysia/KL-26-01` | 3 Days · 16 Stops | North Heritage & Lake Gardens · Creative Hubs & Petaling Jaya · Wet Markets & Chinatown | **Active (Pilot)** |
| **Tokyo** | `japan/TYO-26-01` | 3 Days | Yamanote East & Shitamachi · Modern Art & West Rail Loop · Bay & Daikanyama | Planned |
| **Lisbon** | `portugal/LIS-26-01` | 3 Days | Historic Alfama & Miradouros · Chiado & Belém Waterfront · Sintra Coastal Circuit | Planned |

> Specific stop details, operating hours, local tips, and GPS coordinates are maintained inside each destination's data package (e.g., [`destinations/malaysia/KL-26-01/data.ts`](./destinations/malaysia/KL-26-01/data.ts)).

---

## Core Platform Features

- **Universal Wayfinder Astrolabe Brand**:
  - A timeless navigational brand mark combining an 8-point compass star, orbital multi-stage route loop, and cartographic coordinates, decoupled from individual city landmarks.
- **Dual View Modes**:
  - **Daily Chronicle**: Sequential timeline cards with operational hours, venue insider tips, meal/transit cost estimates, coordinate tags, and embedded Google Maps for each daily zone.
  - **Master Multi-Day Map**: Panoramic cartographic view plotting all stops simultaneously with instant day filtering (`All Days`, `Day 1`, `Day 2`, `Day 3`), route polylines, and active venue drawer.
- **Interactive Google Maps (`@vis.gl/react-google-maps`)**:
  - Custom SVG numbered waypoint pins (`1`, `2`, `3`...) matching daily palette colors.
  - Directional polylines tracing optimal road connectivity.
  - Contextual InfoWindows with venue details and quick navigation links.
  - Stop quick-jump chip carousel below maps to focus directly on specific destinations.
  - Auto-fit bounds when toggling between days or clicking "Fit Route".
- **Turn-by-Turn Navigation**:
  - Preloaded Google Maps driving route URLs for every day, launching multi-stop turn-by-turn GPS directly in mobile Google Maps or browser.
- **Quick Coordinate Copy**:
  - One-click clipboard copying of latitude/longitude coordinates on every stop card for easy insertion into ride-hailing apps (Grab/Uber) or search.
- **Bilingual Light & Dark Mode**:
  - Archival paper tones in light mode (`#fafaf8` shell, `#ffffff` surface, `#edf2ea` headers, `#e0e5dd` dividers) and deep slate in dark mode (`#0b0f0c` shell, `#121815` surface, `#223027` borders).
- **Design Engineering & Motion**:
  - Fluid spring-animated sliding pill on the view mode switcher (`motion/react`).
  - Tactile press feedback (`scale(0.97)` on `:active`) with custom ease-out curves (`cubic-bezier(0.23, 1, 0.32, 1)`).
  - Unobtrusive, rich-colored toast feedback via **Sonner**.

---

## Adding a New Destination

To add a new city or travel guide to Chronicle:

1. **Create the Destination Directory**:
   ```bash
   mkdir -p destinations/[country]/[destinationId]
   ```

2. **Define Itinerary Data (`data.ts`)**:
   Implement the typed dataset following the `DestinationInfo` and `DayItinerary[]` interfaces in `src/types.ts`:
   ```typescript
   import { DestinationInfo } from '../../../src/types';

   export const destinationInfo: DestinationInfo = {
     id: 'TYO-26-01',
     city: 'Tokyo',
     country: 'Japan',
     countryCode: 'JP',
     title: '3 Days in Tokyo: Transit Circuits & Neighborhood Shitamachi',
     // ...
     days: [
       {
         id: 'day-1',
         dayNumber: 1,
         title: 'Yanaka, Ueno & Asakusa Heritage',
         badge: 'Yamanote North-East',
         color: '#b45309',
         places: [ /* Place[] with coordinates, time, notes */ ]
       },
       // Day 2, Day 3...
     ]
   };
   ```

3. **Wire Destination Component (`index.tsx`)**:
   Import destination data into a dedicated component, reusing `DayGoogleMap`, `TimelineItem`, and `MasterMapView`.

4. **Register in Header Switcher**:
   When the destination dropdown is wired up, register the destination key in the global destinations registry.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Mapping Engine** | [@vis.gl/react-google-maps](https://visgl.github.io/react-google-maps/) |
| **Typography** | Newsreader (editorial serif), JetBrains Mono (technical mono), Plus Jakarta Sans (body UI) |
| **Animations** | [Motion](https://motion.dev/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or bun

### Installation

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

The app will be accessible at `http://localhost:3000`.

### Building for Production

```bash
npm run build
```

---

## Google Maps Configuration

The application works out of the box with the default Google Maps demo configuration. To use your own Google Cloud key:

1. Click the **API Key Banner** at the top of the interface.
2. Enter your Google Maps Platform API key (requires **Maps JavaScript API** enabled).
3. Alternatively, define `VITE_GOOGLE_MAPS_API_KEY` in your `.env` file:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

---

## Project Structure

```
├── destinations/
│   └── malaysia/
│       └── KL-26-01/
│           ├── data.ts               # 16-stop itinerary dataset, coordinates & metadata
│           └── index.tsx             # Destination orchestrator & view switcher
├── public/
│   ├── favicon.svg                   # Universal Circuit Astrolabe brand icon (cache-busted ?v=2)
│   └── icon.svg                      # App vector icon
├── src/
│   ├── components/
│   │   ├── AmpChronicleHeader.tsx    # Header with universal wayfinder icon & destination path
│   │   ├── ApiKeyBanner.tsx          # Google Maps API key modal & persistence
│   │   ├── DayGoogleMap.tsx          # Interactive map for individual day itineraries
│   │   ├── FeaturedChronicleBanner.tsx # Curated summary banner & corridor list
│   │   ├── MasterMapView.tsx         # Multi-day comprehensive map view with filtering
│   │   ├── MapMarkerPin.tsx          # Numbered vector pin marker
│   │   ├── MapPolyline.tsx           # Google Maps polyline overlay
│   │   └── TimelineItem.tsx          # Stop card with time, tags, & coordinate copy
│   ├── App.tsx                       # Main entry, APIProvider & Sonner Toaster
│   ├── index.css                     # Tailwind CSS & typography variables
│   ├── types.ts                      # Shared TypeScript interfaces (Destination, Day, Place)
│   └── main.tsx                      # App bootstrap
├── index.html                        # HTML entry point with favicon & Google fonts
├── metadata.json                     # Application metadata
└── package.json                      # Dependencies and build scripts
```

---

## License

MIT License.
