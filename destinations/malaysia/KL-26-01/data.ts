import { Destination, DestinationMeta, DayItinerary } from '@/src/types';

export const KL_26_01_META: DestinationMeta = {
  id: 'malaysia/kuala-lumpur-3d',
  code: 'KUL-3D',
  cityCode: 'KL',
  cityName: 'Kuala Lumpur',
  country: 'malaysia',
  countryName: 'Malaysia',
  region: 'Southeast Asia',
  flagEmoji: '🇲🇾',
  routeSummary: 'Bukit Tunku • Petaling Jaya • Chinatown & Ampang',
  title: '3 Days in Kuala Lumpur',
  badge: 'Smarter Flow • Zero Backtracking',
  subtitle: 'North & Central Heritage, West Belt / PJ, Ampang & Chinatown',
  description:
    'All 16 curated stops preserved, reorganized into tight geographic clusters with interactive Google Maps to save 1.5–2 hours of road traffic daily.',
  totalDays: 3,
  totalStops: 16,
};

export const KUL_3D_META = KL_26_01_META;

export const KL_26_01_DAYS: DayItinerary[] = [
  {
    id: 'day-1',
    dayNumber: 1,
    date: 'Friday, 18 Sept 2026',
    title: 'North & Central Heritage, Shophouses & Lake Gardens',
    subtitle: 'Bukit Tunku & Chow Kit Core',
    badge: 'Bukit Tunku & Chow Kit',
    color: '#b45309', // amber-700
    polylineColor: '#b45309',
    center: { lat: 3.153, lng: 101.692 },
    zoom: 13,
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&origin=Lookout%20Point%20Changkat%20Tunku%2C%20Kuala%20Lumpur&destination=Restoran%20New%20Kai%20Seng%20Seafood%2C%20Kuala%20Lumpur&waypoints=Syed%20Muhammad%20Naquib%20al-Attas%20Library%2C%20Kuala%20Lumpur|The%20Row%20KL%2C%20Jalan%20Doraisamy%2C%20Kuala%20Lumpur|Bank%20Negara%20Malaysia%20Museum%20and%20Art%20Gallery%2C%20Kuala%20Lumpur|Perdana%20Botanical%20Gardens%2C%20Kuala%20Lumpur&travelmode=driving',
    places: [
      {
        id: 'd1-p1',
        number: 1,
        globalNumber: 1,
        name: 'Bukit Tunku Skyline Viewpoints',
        time: '06:45 – 08:00',
        description:
          'Catch early morning sunrise over the city skyline where local cyclists and runners gather at Jalan Tunku Putra and Lookout Point @ Changkat Tunku.',
        area: 'Bukit Tunku',
        coordinates: { lat: 3.1672, lng: 101.6841 },
        photo: {
          url: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
          caption: "Misty dawn light breaking over the tropical hills of Bukit Tunku with the KL skyline",
          category: 'Nature & Skyline',
          photoTip: 'Arrive at Jalan Tunku Putra by 06:45 AM for mist pockets rising between rainforest foliage.',
          credit: 'Unsplash / Travel Chronicle',
        },
        tags: [
          { text: 'Jalan Tunku Putra', type: 'default' },
          { text: 'Sunrise Spot', type: 'highlight' },
        ],
      },
      {
        id: 'd1-p2',
        number: 2,
        globalNumber: 2,
        name: 'Syed Muhammad Naquib al-Attas Library (ISTAC)',
        time: '08:15 – 09:45',
        description:
          'Only 6 minutes away within Bukit Tunku. Admire the Alhambra-inspired Andalusian courtyards and rare Islamic manuscripts. Enjoy an unhurried morning coffee in the tranquil garden courtyard cafe.',
        area: 'Bukit Tunku',
        coordinates: { lat: 3.1610, lng: 101.6775 },
        photo: {
          url: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
          caption: 'Alhambra-inspired Andalusian keyhole arches and tranquil geometric courtyard fountain',
          category: 'Architecture',
          photoTip: 'Frame through the shaded colonnade to highlight the symmetry of the central marble fountain.',
          credit: 'Unsplash / Architecture Archive',
        },
        tags: [
          { text: 'Bukit Tunku', type: 'default' },
          { text: 'Hall Entry: RM 20 (Cafe Free)', type: 'cost' },
          { text: 'Andalusian Courtyard', type: 'default' },
        ],
      },
      {
        id: 'd1-p3',
        number: 3,
        globalNumber: 3,
        name: 'House of Wheat & The Row KL (Chow Kit)',
        time: '10:15 – 12:45',
        description:
          "Short descent into Chow Kit. Sit down for artisan sourdough and pastries inside House of Wheat's cave-like aesthetic, then browse the 22 heritage 1940s pre-war shophouses with modern batik shops and design stores.",
        area: 'Chow Kit',
        coordinates: { lat: 3.1594, lng: 101.6987 },
        photo: {
          url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
          caption: 'Restored 1940s colonial pre-war shophouse facade and artisan bakery cafe',
          category: 'Heritage & Cafe',
          photoTip: 'Step back to the far side of Jalan Doraisamy to capture the continuous facade colonnade.',
          credit: 'Unsplash / Editorial Heritage',
        },
        tags: [
          { text: 'Chow Kit', type: 'default' },
          { text: 'Brunch & Pastries', type: 'default' },
          { text: 'Heritage Row', type: 'default' },
        ],
      },
      {
        id: 'd1-p4',
        number: 4,
        globalNumber: 4,
        name: 'Bank Negara Malaysia Museum and Art Gallery',
        time: '13:15 – 15:00',
        description:
          'Head down the road to Sasana Kijang for an air-conditioned afternoon walk through ancient Southeast Asian currencies and the RM 1 million real-banknote tunnel.',
        area: 'Sasana Kijang',
        coordinates: { lat: 3.1542, lng: 101.6917 },
        photo: {
          url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
          caption: 'The iconic logarithmic nautilus spiral staircase ascending through Sasana Kijang',
          category: 'Architecture',
          photoTip: 'Ground floor center looking straight up gives an optical vortex effect with natural skylight.',
          credit: 'Unsplash / Modern Architecture',
        },
        tags: [
          { text: 'Sasana Kijang', type: 'default' },
          { text: 'Free Entry', type: 'highlight' },
          { text: 'Air-Conditioned', type: 'default' },
        ],
      },
      {
        id: 'd1-p5',
        number: 5,
        globalNumber: 5,
        name: 'Perdana Botanical Gardens',
        time: '15:30 – 18:00',
        description:
          'Optimized routing: Located just 5–8 minutes from Bank Negara Museum. Stroll through the lush canopies, lake paths, and bamboo garden as the afternoon heat cools down, with great views of Merdeka 118.',
        area: 'Lake Gardens',
        coordinates: { lat: 3.1436, lng: 101.6888 },
        photo: {
          url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
          caption: 'Sunken bamboo playhouse and lotus lake framed against Merdeka 118',
          category: 'Nature & Skyline',
          photoTip: 'Catch late afternoon golden hour (17:00–17:45) when light strikes the lotus pads.',
          credit: 'Unsplash / Botanical Collection',
        },
        tags: [
          { text: 'Shifted from Vlog', type: 'opt' },
          { text: 'Merdeka 118 View', type: 'default' },
          { text: 'Golden Hour', type: 'default' },
        ],
      },
      {
        id: 'd1-p6',
        number: 6,
        globalNumber: 6,
        name: 'Restoran New Kai Seng Seafood',
        time: '18:45 – 20:45',
        description:
          'A direct, stress-free 12-minute drive south to dinner. Feast on the signature claypot coconut curry crab with crusty bread, salted egg prawns, and fresh greens.',
        area: 'Pudu / Kenanga',
        coordinates: { lat: 3.1317, lng: 101.7103 },
        photo: {
          url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
          caption: 'Signature claypot coconut curry crab served bubbling hot with crusty bread',
          category: 'Culinary',
          photoTip: 'Get close in macro as the waiter cracks open the bubbling coconut curry claypot.',
          credit: 'Unsplash / Culinary Journal',
        },
        tags: [
          { text: 'Claypot Coconut Crab', type: 'highlight' },
          { text: 'Local Feast', type: 'default' },
        ],
      },
    ],
  },
  {
    id: 'day-2',
    dayNumber: 2,
    date: 'Saturday, 19 Sept 2026',
    title: 'Creative Hubs, Nyonya Kuih, Butter Cake & Sunset KLCC',
    subtitle: 'West Belt & PJ to City Center',
    badge: 'West Belt & PJ to City Center',
    color: '#0d9488', // teal-600
    polylineColor: '#0d9488',
    center: { lat: 3.118, lng: 101.675 },
    zoom: 12,
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&origin=Grumpy%20Bagels%2C%20Jalan%20Imbi%2C%20Kuala%20Lumpur&destination=The%20Oriental%20Park%2C%20Mandarin%20Oriental%20KLCC&waypoints=KEDAI%20KL%2C%20MAHSA%20Avenue%2C%20Petaling%20Jaya|Blue%20Dahlia%20Cafe%2C%20Seksyen%2017%2C%20Petaling%20Jaya|Hideaway%20Cafe%20Taman%20Yarl%2C%20Kuala%20Lumpur|KLCC%20Park%2C%20Kuala%20Lumpur&travelmode=driving',
    places: [
      {
        id: 'd2-p1',
        number: 1,
        globalNumber: 7,
        name: 'Grumpy Bagels',
        time: '08:30 – 10:00',
        description:
          'Fuel up early inside this 120-year-old restored brick diesel room before the morning crowd peaks. Enjoy their signature chewy bagels and Shroom Bagel sandwich.',
        area: 'Imbi',
        coordinates: { lat: 3.1450, lng: 101.7165 },
        photo: {
          url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
          caption: '120-year-old restored red brick diesel powerhouse turned artisan sourdough bakery',
          category: 'Heritage & Cafe',
          photoTip: 'Morning sunlight beams through the arched steel-frame windows onto the bagel counter.',
          credit: 'Unsplash / Heritage Cafe',
        },
        tags: [
          { text: 'Imbi', type: 'default' },
          { text: 'Shroom Bagel', type: 'highlight' },
        ],
      },
      {
        id: 'd2-p2',
        number: 2,
        globalNumber: 8,
        name: 'Kedai KL (Mahsa Avenue)',
        time: '10:30 – 12:45',
        description:
          'Take the expressway west to this university dorm-turned-artisan bazaar. Check out independent maker pop-ups, stationery studios, or take part in a Japanese kokedama moss-ball workshop.',
        area: 'PJ / Bangsar Border',
        coordinates: { lat: 3.1189, lng: 101.6540 },
        photo: {
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
          caption: 'Artisan maker bazaar, hanging kokedama greenery, and independent craft studios',
          category: 'Culture',
          photoTip: 'Photograph from the 2nd-floor railing overlooking the bustling maker workshops below.',
          credit: 'Unsplash / Maker Spaces',
        },
        tags: [
          { text: 'PJ / Bangsar Border', type: 'default' },
          { text: 'Maker Workshops', type: 'default' },
        ],
      },
      {
        id: 'd2-p3',
        number: 3,
        globalNumber: 9,
        name: 'Blue Dahlia & Kwong Wah Cendol (Seksyen 17)',
        time: '13:00 – 14:45',
        description:
          "Just 6 minutes drive from Kedai KL. Pick up colorful, handcrafted Melaka-recipe Nyonya kuih and pandan cake, followed immediately by Kwong Wah's rich shaved-ice cendol (serving since 1958).",
        area: 'Seksyen 17, PJ',
        coordinates: { lat: 3.1278, lng: 101.6353 },
        photo: {
          url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=80',
          caption: 'Handmade rainbow Nyonya kuih and 1958-recipe shaved-ice cendol with smoky Gula Melaka',
          category: 'Culinary',
          photoTip: 'A flat-lay perspective reveals the vibrant pastel geometry of kuih talam and pulut inti.',
          credit: 'Unsplash / Nyonya Flavors',
        },
        tags: [
          { text: 'Seksyen 17, PJ', type: 'default' },
          { text: 'Fresh Nyonya Kuih', type: 'highlight' },
          { text: 'Kwong Wah Cendol', type: 'highlight' },
        ],
      },
      {
        id: 'd2-p4',
        number: 4,
        globalNumber: 10,
        name: 'Hideaway Cafe (Taman Yarl)',
        time: '15:15 – 16:45',
        description:
          'Optimized routing: Taman Yarl is situated right along the Old Klang Road corridor, only ~12 minutes south of PJ. Relax in its cozy lamps and taste their famous freshly baked butter cakes.',
        area: 'Taman Yarl, Old Klang Road',
        coordinates: { lat: 3.0742, lng: 101.6669 },
        photo: {
          url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
          caption: 'Cozy mid-century timber interior and freshly sliced golden butter cakes',
          category: 'Heritage & Cafe',
          photoTip: 'Warm tungsten lamps create soft bokeh around the antique display cabinets.',
          credit: 'Unsplash / Cozy Bakes',
        },
        tags: [
          { text: 'Shifted from Day 1', type: 'opt' },
          { text: 'Soft Butter Cakes', type: 'highlight' },
          { text: 'Zero Backtracking', type: 'default' },
        ],
      },
      {
        id: 'd2-p5',
        number: 5,
        globalNumber: 11,
        name: 'KLCC Park & Ficus Elastica Heritage Trees',
        time: '17:30 – 18:45',
        description:
          'Head into KLCC before dusk. Marvel at the sprawling aerial roots of the giant Ficus trees that stood here before the Petronas Twin Towers rose above them.',
        area: 'KLCC',
        coordinates: { lat: 3.1558, lng: 101.7145 },
        photo: {
          url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
          caption: 'Massive century-old Ficus aerial banyan roots framing the Petronas Twin Towers',
          category: 'Architecture & Nature',
          photoTip: 'Use an ultra-wide focal length from the foot of the ancient Ficus looking up at the spires.',
          credit: 'Unsplash / Twin Towers Landmark',
        },
        tags: [
          { text: 'KLCC', type: 'default' },
          { text: 'Heritage Trees', type: 'default' },
          { text: 'Twin Towers View', type: 'default' },
        ],
      },
      {
        id: 'd2-p6',
        number: 6,
        globalNumber: 12,
        name: 'Evening Drinks at The Oriental Park KLCC',
        time: '19:00 – 20:45',
        description:
          'Conclude Day 2 relaxing parkside with refreshing mocktails, cocktails, or light tapas with the illuminated towers and park fountain reflections.',
        area: 'Mandarin Oriental KLCC',
        coordinates: { lat: 3.1565, lng: 101.7130 },
        photo: {
          url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
          caption: 'Parkside terrace drinks with illuminated Lake Symphony fountain reflections',
          category: 'Atmosphere',
          photoTip: "Dusk 'blue hour' (19:20) captures both the violet sky and the glowing amber lanterns.",
          credit: 'Unsplash / Skyline Evenings',
        },
        tags: [
          { text: 'Mandarin Oriental', type: 'default' },
          { text: 'Skyline Vibe', type: 'default' },
        ],
      },
    ],
  },
  {
    id: 'day-3',
    dayNumber: 3,
    date: 'Sunday, 20 Sept 2026',
    title: 'Morning Wet Market, Adaptive School Hub & Chinatown Heritage',
    subtitle: 'Ampang East to Chinatown',
    badge: 'Ampang East to Chinatown',
    color: '#6366f1', // indigo-500
    polylineColor: '#6366f1',
    center: { lat: 3.142, lng: 101.728 },
    zoom: 13,
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&origin=Pasar%20Pagi%20Taman%20Muda%2C%20Ampang%2C%20Selangor&destination=Kwai%20Chai%20Hong%2C%20Lorong%20Panggung%2C%20Kuala%20Lumpur&waypoints=The%20Campus%20Ampang%2C%20Jalan%20Kerja%20Ayer%20Lama|Ho%20Kow%20Hainam%20Kopitiam%2C%20Jalan%20Balai%20Polis%2C%20Kuala%20Lumpur&travelmode=driving',
    places: [
      {
        id: 'd3-p1',
        number: 1,
        globalNumber: 13,
        name: 'Pasar Pagi Taman Muda & Kopitiam Breakfast',
        time: '07:30 – 09:30',
        description:
          "Experience local morning hustle and fresh fruits (like jambu). Sit down at Tai Ping Lang for duck egg char kway teow and a rich 'Thomas Cup' (Kopi + Milo). Buy hot Tai Zi Ta egg tarts and traditional sponge cake to takeaway.",
        area: 'Taman Muda, Ampang',
        coordinates: { lat: 3.1185, lng: 101.7618 },
        photo: {
          url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
          caption: 'Vibrant morning market energy, wok-tossed duck egg char kway teow, and flaky egg tarts',
          category: 'Culinary',
          photoTip: 'Fast shutter speed captures the fiery wok-hei flare as noodles are tossed at Tai Ping Lang.',
          credit: 'Unsplash / Morning Market',
        },
        tags: [
          { text: 'Taman Muda', type: 'default' },
          { text: 'Duck Egg CKT', type: 'highlight' },
          { text: 'Tai Zi Ta Egg Tarts', type: 'highlight' },
        ],
      },
      {
        id: 'd3-p2',
        number: 2,
        globalNumber: 14,
        name: 'The Campus Ampang',
        time: '10:00 – 12:15',
        description:
          'Drive up the Ampang corridor to the former ISKL international school. Unwind with a 30-min foot massage (~RM 50), enjoy your market sponge cake in the campus courtyard, and grab a craft matcha drink.',
        area: 'Ampang',
        coordinates: { lat: 3.1582, lng: 101.7485 },
        photo: {
          url: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80',
          caption: 'Adaptive-reuse former international school courtyard lawns and artisanal matcha bar',
          category: 'Culture',
          photoTip: 'The tree-shaded courtyard grass offers peaceful dappled sunlight for outdoor portraits.',
          credit: 'Unsplash / Campus Green',
        },
        tags: [
          { text: 'Ampang', type: 'default' },
          { text: 'Specialty Matcha', type: 'default' },
          { text: 'Foot Massage: ~RM 50', type: 'cost' },
        ],
      },
      {
        id: 'd3-p3',
        number: 3,
        globalNumber: 15,
        name: 'Ho Kow Hainam Kopitiam (Chinatown)',
        time: '12:45 – 14:15',
        description:
          'Timing fix: Arrive during open service (closes ~2:30 PM). Savor signature toasted Hainan bread with kaya and cold butter cubes, half-boiled eggs, and silky iced cham under heritage wooden rafters.',
        area: 'Chinatown',
        coordinates: { lat: 3.1418, lng: 101.6974 },
        photo: {
          url: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=80',
          caption: 'Historic 1956 kopitiam serving charcoal-toasted kaya butter bread and cold cham',
          category: 'Culinary & Heritage',
          photoTip: 'Shoot the iconic dipping ritual of warm crusty toast into runny peppered eggs.',
          credit: 'Unsplash / Kopitiam Tradition',
        },
        tags: [
          { text: 'Shifted to Lunch', type: 'opt' },
          { text: 'Kaya Butter Toast', type: 'highlight' },
          { text: 'Avoids Closure', type: 'default' },
        ],
      },
      {
        id: 'd3-p4',
        number: 4,
        globalNumber: 16,
        name: 'Kwai Chai Hong (Chinatown Laneway)',
        time: '14:15 – 16:15',
        description:
          'Step directly out of Ho Kow into Lorong Panggung. Photograph the restored heritage murals depicting 1960s KL life, red wooden bridges, and nearby artisanal cafes.',
        area: 'Lorong Panggung',
        coordinates: { lat: 3.1419, lng: 101.6978 },
        photo: {
          url: 'https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=1200&q=80',
          caption: 'Iconic red wooden bridge, overhead lanterns, and interactive 1960s pre-war murals',
          category: 'Heritage & Culture',
          photoTip: 'Step onto the red bridge to frame the archway with lanterns hanging above the brick alley.',
          credit: 'Unsplash / Chinatown Laneway',
        },
        tags: [
          { text: 'Lorong Panggung', type: 'default' },
          { text: '1960s Murals', type: 'default' },
          { text: 'Walkable from Ho Kow', type: 'default' },
        ],
      },
    ],
  },
];

export const KL_26_01_DESTINATION: Destination = {
  meta: KL_26_01_META,
  days: KL_26_01_DAYS,
};

export const KUL_3D_DAYS = KL_26_01_DAYS;
export const KUL_3D_DESTINATION = KL_26_01_DESTINATION;
