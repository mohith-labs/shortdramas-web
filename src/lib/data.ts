export interface Drama {
  id: string;
  title: string;
  poster: string;
  rating: number;
  episodes: number;
  views: number;
  genre: string[];
  synopsis: string;
  cast: string[];
  director: string;
  year: number;
  status: "ongoing" | "completed";
  freeEpisodes: number;
  coinCost: number;
}

export interface Episode {
  id: string;
  number: number;
  title: string;
  duration: string;
  isLocked: boolean;
}

export interface CoinPackage {
  id: string;
  coins: number;
  bonus: number;
  price: string;
  popular?: boolean;
}

const titles = [
  "Love in the Moonlight",
  "Dragon's Revenge",
  "Campus Crush",
  "The CEO's Secret Wife",
  "Reborn as a Villainess",
  "Eternal Love: Ashes",
  "My Contract Husband",
  "Sword of Destiny",
  "Sweet Revenge",
  "The Hidden Princess",
  "Flash Marriage: Mr. Lu",
  "Rebirth of the Queen",
  "Love After Divorce",
  "The Phantom Detective",
  "My Ex-Wife Is a Superstar",
  "Fated Mates: Wolf King",
  "Cinderella's Counterattack",
  "The Last Emperor",
  "Kiss of the Devil",
  "Love at First Lie",
  "The Billionaire's Maid",
  "Undercover Lovers",
  "Enchanted: Magic Academy",
  "My Husband is a Ghost",
  "CEO's Abandoned Daughter",
  "The Substitute Bride",
  "Revenge of the Heiress",
  "Love in Shanghai",
  "The Cold-Hearted Prince",
  "Flash Marriage Surprise",
  "Mafia Boss's Obsession",
  "The Time Traveler's Wife",
  "My Boss is My Ex",
  "Kingdom of Shadows",
  "Love Beyond Time",
];

const genres = ["Romance", "Action", "Fantasy", "Comedy", "Drama", "Thriller", "Horror"];

const synopses = [
  "After a devastating betrayal, she discovers she's not who she thought she was. Armed with a new identity and burning desire for justice, she returns to claim what's rightfully hers.",
  "When fate brings two strangers together in a flash marriage, neither expects to fall in love. But secrets from both their pasts threaten to tear them apart.",
  "In a world where magic and power collide, a young woman must navigate treacherous court politics while hiding her extraordinary abilities from those who would use her.",
  "He's the cold CEO everyone fears. She's the ordinary girl who accidentally becomes his contract wife. What happens when the lines between fake and real start to blur?",
  "Reborn into her teenage years with memories of her tragic past life, she's determined to rewrite her destiny and protect the ones she loves — while getting sweet revenge on her enemies.",
  "A campus romance that begins with a misunderstanding and evolves into something neither expected. But when family secrets come to light, their love faces the ultimate test.",
];

const castPool = [
  "Liu Yifei", "Wang Yibo", "Zhao Lusi", "Xiao Zhan", "Yang Mi",
  "Dilraba Dilmurat", "Gong Jun", "Bai Lu", "Ren Jialun", "Tan Songyun",
  "Chen Xingxu", "Ju Jingyi", "Yang Yang", "Zhao Liying", "Lin Yi",
  "Cheng Yi", "Esther Yu", "Wu Lei", "Zhou Ye", "Zhang Linghe",
];

const directors = [
  "Zhang Yi", "Chen Kaige", "Li Wei", "Wang Jing", "Liu Chen",
  "Zhao Ming", "Sun Tao", "Lin Jun", "Huang Hai", "Wu Fang",
];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateDramas(): Drama[] {
  const dramas: Drama[] = [];
  const rand = seededRandom(42);

  for (let i = 0; i < titles.length; i++) {
    const genreCount = 1 + Math.floor(rand() * 3);
    const dramaGenres: string[] = [];
    for (let g = 0; g < genreCount; g++) {
      const genre = genres[Math.floor(rand() * genres.length)];
      if (!dramaGenres.includes(genre)) dramaGenres.push(genre);
    }

    const episodeCount = 10 + Math.floor(rand() * 60);
    const freeEps = 3 + Math.floor(rand() * 5);

    const castCount = 3 + Math.floor(rand() * 3);
    const cast: string[] = [];
    for (let c = 0; c < castCount; c++) {
      const actor = castPool[Math.floor(rand() * castPool.length)];
      if (!cast.includes(actor)) cast.push(actor);
    }

    dramas.push({
      id: `drama-${i + 1}`,
      title: titles[i],
      poster: `https://picsum.photos/seed/drama${i + 1}/300/450`,
      rating: Math.round((3.5 + rand() * 1.5) * 10) / 10,
      episodes: episodeCount,
      views: Math.floor(rand() * 5000000) + 100000,
      genre: dramaGenres,
      synopsis: synopses[i % synopses.length],
      cast,
      director: directors[Math.floor(rand() * directors.length)],
      year: 2023 + Math.floor(rand() * 3),
      status: rand() > 0.3 ? "completed" : "ongoing",
      freeEpisodes: freeEps,
      coinCost: [5, 8, 10, 12, 15][Math.floor(rand() * 5)],
    });
  }

  return dramas;
}

export function generateEpisodes(drama: Drama): Episode[] {
  return Array.from({ length: drama.episodes }, (_, i) => ({
    id: `${drama.id}-ep-${i + 1}`,
    number: i + 1,
    title: `Episode ${i + 1}`,
    duration: `${1 + Math.floor(Math.random() * 3)}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
    isLocked: false,
  }));
}

export const dramas: Drama[] = generateDramas();

export const hotSearchTerms = [
  "Flash Marriage", "CEO Romance", "Revenge", "Reborn",
  "Campus Love", "Fantasy", "Contract Marriage", "Villainess",
  "Mafia", "Time Travel",
];

export const coinPackages: CoinPackage[] = [
  { id: "pkg-1", coins: 60, bonus: 0, price: "$0.99" },
  { id: "pkg-2", coins: 300, bonus: 30, price: "$4.99" },
  { id: "pkg-3", coins: 600, bonus: 100, price: "$9.99", popular: true },
  { id: "pkg-4", coins: 1200, bonus: 300, price: "$19.99" },
  { id: "pkg-5", coins: 3000, bonus: 1000, price: "$49.99" },
  { id: "pkg-6", coins: 6000, bonus: 2500, price: "$99.99" },
];

export function formatViews(views: number): string {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
  return String(views);
}
