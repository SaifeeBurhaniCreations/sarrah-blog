import { Article, Category, Product } from './types';

export const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Fashion', path: '/fashion' },
  { label: 'Beauty', path: '/beauty' },
  { label: 'Editorials', path: '/editorials' },
  { label: 'Admin', path: '/admin' },
];

export const BRANDS = [
  "CHANEL", "DIOR", "YVES SAINT LAURENT", "PRADA", "GUCCI", "HERMÈS", "LOUIS VUITTON", "VERSACE", "VALENTINO", "GIVENCHY"
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'The Renaissance of Rouge: A Modern Retrospective',
    excerpt: 'Exploring how historical blush techniques are making a bold comeback on the Parisian runways this season.',
    content: 'Full content placeholder...',
    author: 'Elena Vasser',
    date: 'Oct 12, 2023',
    imageUrl: 'https://picsum.photos/seed/fashion1/800/1000',
    category: Category.BEAUTY,
    featured: true,
  },
  {
    id: '2',
    title: 'Silk & Stone: The Architecture of Fabric',
    excerpt: 'When structural integrity meets delicate textiles. A look into the new wave of architectural fashion design.',
    content: 'Full content placeholder...',
    author: 'Marcus Chen',
    date: 'Oct 10, 2023',
    imageUrl: 'https://picsum.photos/seed/fashion2/800/600',
    category: Category.FASHION,
  },
  {
    id: '3',
    title: 'Midnight Serenade: Evening Gowns for the Bold',
    excerpt: 'Dark velvets, shimmering sequins, and the art of standing out in the dim light of the gala.',
    content: 'Full content placeholder...',
    author: 'Sophie Laurent',
    date: 'Oct 08, 2023',
    imageUrl: 'https://picsum.photos/seed/fashion3/800/800',
    category: Category.RUNWAY,
  },
  {
    id: '4',
    title: 'Sustainable Luxury: A Contradiction?',
    excerpt: 'Can high-end fashion truly be green? We interview top designers leading the eco-conscious charge.',
    content: 'Full content placeholder...',
    author: 'Liam O’Connor',
    date: 'Oct 05, 2023',
    imageUrl: 'https://picsum.photos/seed/nature1/800/600',
    category: Category.LIFESTYLE,
  },
  {
    id: '5',
    title: 'Golden Hour Glow: Skincare Routines',
    excerpt: 'Achieve that perfect sunset radiance with these five essential serums curated by our editors.',
    content: 'Full content placeholder...',
    author: 'Zara Xiolin',
    date: 'Oct 01, 2023',
    imageUrl: 'https://picsum.photos/seed/skin1/800/800',
    category: Category.BEAUTY,
  },
  {
    id: '6',
    title: 'Avant-Garde Silhouettes',
    excerpt: 'Breaking the mold with oversized structures and daring cuts.',
    content: '...',
    author: 'Andre Leon',
    date: 'Sep 28, 2023',
    imageUrl: 'https://picsum.photos/seed/avant/800/800',
    category: Category.FASHION,
  },
  {
    id: '7',
    title: 'The Chemistry of Scent',
    excerpt: 'How molecular perfumery is changing the way we experience fragrance.',
    content: '...',
    author: 'Dr. S. K.',
    date: 'Sep 25, 2023',
    imageUrl: 'https://picsum.photos/seed/scent/800/800',
    category: Category.BEAUTY,
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Velvet Noir Mascara',
    brand: 'Lumière',
    price: 32,
    currency: '$',
    imageUrl: 'https://picsum.photos/seed/makeup1/400/400',
    description: "A volume-boosting mascara that delivers instant drama and definition. The velvet-black formula is enriched with conditioning peptides to strengthen lashes over time."
  },
  {
    id: 'p2',
    name: 'Ethereal Silk Scarf',
    brand: 'Vogue Essentials',
    price: 120,
    currency: '$',
    imageUrl: 'https://picsum.photos/seed/scarf1/400/400',
    description: "Hand-rolled edges and 100% mulberry silk make this scarf a timeless addition to any wardrobe. Featuring a custom print inspired by Art Deco architecture."
  },
  {
    id: 'p3',
    name: 'Obsidian Night Cream',
    brand: 'Noire',
    price: 85,
    currency: '$',
    imageUrl: 'https://picsum.photos/seed/cream1/400/400',
    description: "A rich, restorative night cream infused with black obsidian extract to detoxify and rejuvenate tired skin while you sleep."
  },
  {
    id: 'p4',
    name: 'Gold Leaf Serum',
    brand: 'Aurum',
    price: 150,
    currency: '$',
    imageUrl: 'https://picsum.photos/seed/serum/400/400',
    description: "Suspended 24k gold flakes in a hyaluronic acid base provide instant illumination and deep hydration. A true luxury for your daily ritual."
  },
  {
    id: 'p5',
    name: 'Diamond Dust Powder',
    brand: 'Crystal',
    price: 65,
    currency: '$',
    imageUrl: 'https://picsum.photos/seed/powder/400/400',
    description: "Finely milled finishing powder that blurs imperfections and sets makeup with a soft-focus, diamond-like glow. Universal shade for all skin tones."
  },
];