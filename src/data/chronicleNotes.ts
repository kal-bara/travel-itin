export interface ChronicleNote {
  id: string;
  date: string;
  time?: string;
  title: string;
  excerpt: string;
  category: 'tip' | 'route' | 'food' | 'culture' | 'timing';
  stopId?: string;
  dayNumber?: number;
}

export interface TimeCapsuleChapter {
  timestamp: string;
  title: string;
  stopId?: string;
}

export interface TimeCapsuleEpisode {
  id: string;
  episodeNumber: number;
  title: string;
  date: string;
  duration: string;
  narrator: string;
  description: string;
  chapters: TimeCapsuleChapter[];
  dayNumber: number;
}

export const CHRONICLE_NOTES: ChronicleNote[] = [
  {
    id: 'note-1',
    date: 'SEPTEMBER 18, 2026',
    time: '06:45 AM',
    title: 'Sunrise Ridge at Changkat Tunku',
    excerpt: 'Arrive before 7:00 AM. Cyclists gather here for golden hour mist rising through the valley against Merdeka 118.',
    category: 'culture',
    stopId: 'd1-p1',
    dayNumber: 1,
  },
  {
    id: 'note-2',
    date: 'SEPTEMBER 20, 2026',
    time: '12:45 PM',
    title: '“Ho Kow Kopitiam Closes at 2:30 PM”',
    excerpt: 'Original itinerary risked late arrival. We rescheduled lunch strictly at 12:45 PM to beat the queue for butter kaya toast before the 2:30 PM closing.',
    category: 'timing',
    stopId: 'd3-p3',
    dayNumber: 3,
  },
  {
    id: 'note-3',
    date: 'SEPTEMBER 18, 2026',
    time: '08:15 AM',
    title: 'The Alhambra Courtyard in Bukit Tunku',
    excerpt: 'ISTAC Library exhibition hall entry is RM 20, but the Andalusian tiled courtyard cafe is completely free to enter for coffee.',
    category: 'tip',
    stopId: 'd1-p2',
    dayNumber: 1,
  },
  {
    id: 'note-4',
    date: 'SEPTEMBER 19, 2026',
    time: '03:15 PM',
    title: 'Pave The Road: Zero Backtracking',
    excerpt: 'Eliminated the 30 km round-trip across Federal Highway by clustering Hideaway Cafe seamlessly into Day 2 along Old Klang Road & PJ.',
    category: 'route',
    stopId: 'd2-p4',
    dayNumber: 2,
  },
  {
    id: 'note-5',
    date: 'SEPTEMBER 18, 2026',
    time: '01:15 PM',
    title: 'The RM 1 Million Note Tunnel',
    excerpt: 'Sasana Kijang Art Gallery has completely free entry with world-class air-conditioned exhibits and a tunnel of genuine cash.',
    category: 'culture',
    stopId: 'd1-p4',
    dayNumber: 1,
  },
  {
    id: 'note-6',
    date: 'SEPTEMBER 20, 2026',
    time: '02:15 PM',
    title: 'Kwai Chai Hong Laneway Light',
    excerpt: 'Step directly from Ho Kow into Lorong Panggung. Soft afternoon light illuminates the 1960s pre-war murals before early evening lanterns ignite.',
    category: 'culture',
    stopId: 'd3-p4',
    dayNumber: 3,
  },
  {
    id: 'note-7',
    date: 'SEPTEMBER 19, 2026',
    time: '01:00 PM',
    title: 'Petaling Jaya Heritage Shophouses & Nyonya Kuih',
    excerpt: 'Seksyen 17 is a food lover’s haven: pair fresh Melaka Nyonya kuih from Blue Dahlia with Kwong Wah’s legendary gula melaka shaved-ice cendol.',
    category: 'food',
    stopId: 'd2-p3',
    dayNumber: 2,
  },
  {
    id: 'note-8',
    date: 'SEPTEMBER 18, 2026',
    time: '03:30 PM',
    title: 'Perdana Lake Gardens Afternoon Window',
    excerpt: 'Located only 5 minutes downhill from Sasana Kijang. Stroll the shaded bamboo pavilion canopy as afternoon heat breaks.',
    category: 'tip',
    stopId: 'd1-p5',
    dayNumber: 1,
  },
];

export const TIME_CAPSULES: TimeCapsuleEpisode[] = [
  {
    id: 'tc-1',
    episodeNumber: 1,
    title: 'Heritage Valleys & Colonial Ridgelines',
    date: '18 Sept 2026',
    duration: '14:20',
    narrator: 'Local Heritage Walkers',
    description:
      'Field audio recording traversing early morning Bukit Tunku ridgelines down into the 1940s Chow Kit shophouses and Andalusian courtyards.',
    dayNumber: 1,
    chapters: [
      { timestamp: '00:00', title: 'Changkat Tunku Sunrise & Cyclist Ridge', stopId: 'd1-p1' },
      { timestamp: '03:15', title: 'ISTAC Library & Andalusian Tile Courtyard', stopId: 'd1-p2' },
      { timestamp: '06:40', title: 'House of Wheat Sourdough & The Row KL', stopId: 'd1-p3' },
      { timestamp: '09:30', title: 'Bank Negara Sasana Kijang Vaults', stopId: 'd1-p4' },
      { timestamp: '11:45', title: 'Perdana Botanical Bamboo Canopy Walk', stopId: 'd1-p5' },
      { timestamp: '13:20', title: 'New Kai Seng Claypot Coconut Curry Crab', stopId: 'd1-p6' },
    ],
  },
  {
    id: 'tc-2',
    episodeNumber: 2,
    title: 'Suburban PJ Gastronomy & Coffee Runs',
    date: '19 Sept 2026',
    duration: '13:45',
    narrator: 'PJ Food Archive',
    description:
      'Exploring Section 17, Hideaway Cafe’s legendary butter pound cakes, and the evening skyline parkside at KLCC.',
    dayNumber: 2,
    chapters: [
      { timestamp: '00:00', title: 'Grumpy Bagels 120-Year Restored Brick Room', stopId: 'd2-p1' },
      { timestamp: '02:40', title: 'Kedai KL Mahsa Avenue Artisan Bazaar', stopId: 'd2-p2' },
      { timestamp: '05:15', title: 'Blue Dahlia Nyonya Kuih & Kwong Wah Cendol', stopId: 'd2-p3' },
      { timestamp: '07:50', title: 'Hideaway Cafe Fresh Baked Butter Cakes', stopId: 'd2-p4' },
      { timestamp: '10:10', title: 'KLCC Park Giant Ficus Aerial Roots', stopId: 'd2-p5' },
      { timestamp: '12:15', title: 'The Oriental Park KLCC Fountain Skyline', stopId: 'd2-p6' },
    ],
  },
  {
    id: 'tc-3',
    episodeNumber: 3,
    title: 'Chinatown Kopitiams to the Ampang Corridor',
    date: '20 Sept 2026',
    duration: '12:30',
    narrator: 'Kuala Lumpur Soundscapes',
    description:
      'From Pasar Pagi Taman Muda morning wet market to charcoal toasted bread at Ho Kow and Kwai Chai Hong heritage laneways.',
    dayNumber: 3,
    chapters: [
      { timestamp: '00:00', title: 'Pasar Pagi Taman Muda & Duck Egg Char Kway Teow', stopId: 'd3-p1' },
      { timestamp: '03:40', title: 'The Campus Ampang Adaptive School Courtyard', stopId: 'd3-p2' },
      { timestamp: '07:15', title: 'Ho Kow Hainam Kopitiam Charcoal Kaya Toast', stopId: 'd3-p3' },
      { timestamp: '10:00', title: 'Kwai Chai Hong Laneway & Pre-War Murals', stopId: 'd3-p4' },
    ],
  },
];
