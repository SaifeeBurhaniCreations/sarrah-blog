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
    content: '<p><strong>It was a Tuesday afternoon in Paris</strong> when the concept first took shape. The air was crisp, the light hitting the Seine in that specific way that artists have tried to capture for centuries. Fashion, at its core, is not just about clothing—it is about capturing a moment, a feeling, an atmosphere.</p><p>In recent collections, we have seen a dramatic shift away from the minimalist utilitarianism that defined the post-pandemic era. Designers are once again embracing <strong>opulence, texture, and structural complexity</strong>.</p><blockquote>"True luxury is silence in a noisy world."</blockquote><p>As we look towards the next season, expect to see a further blurring of the lines between art and attire. The runway is no longer just a display of merchandise; it is a gallery of kinetic sculpture.</p>',
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
    content: '<p>Content placeholder...</p>',
    author: 'Marcus Chen',
    date: 'Oct 10, 2023',
    imageUrl: 'https://picsum.photos/seed/fashion2/800/600',
    category: Category.FASHION,
  },
  {
    id: '3',
    title: 'Midnight Serenade: Evening Gowns for the Bold',
    excerpt: 'Dark velvets, shimmering sequins, and the art of standing out in the dim light of the gala.',
    content: '<p>Content placeholder...</p>',
    author: 'Sophie Laurent',
    date: 'Oct 08, 2023',
    imageUrl: 'https://picsum.photos/seed/fashion3/800/800',
    category: Category.RUNWAY,
  },
  {
    id: '4',
    title: 'Sustainable Luxury: A Contradiction?',
    excerpt: 'Can high-end fashion truly be green? We interview top designers leading the eco-conscious charge.',
    content: '<p>Content placeholder...</p>',
    author: 'Liam O’Connor',
    date: 'Oct 05, 2023',
    imageUrl: 'https://picsum.photos/seed/nature1/800/600',
    category: Category.LIFESTYLE,
  },
  {
    id: '5',
    title: 'Golden Hour Glow: Skincare Routines',
    excerpt: 'Achieve that perfect sunset radiance with these five essential serums curated by our editors.',
    content: '<p>Content placeholder...</p>',
    author: 'Zara Xiolin',
    date: 'Oct 01, 2023',
    imageUrl: 'https://picsum.photos/seed/skin1/800/800',
    category: Category.BEAUTY,
  },
  {
    id: '6',
    title: 'Avant-Garde Silhouettes',
    excerpt: 'Breaking the mold with oversized structures and daring cuts.',
    content: '<p>Content placeholder...</p>',
    author: 'Andre Leon',
    date: 'Sep 28, 2023',
    imageUrl: 'https://picsum.photos/seed/avant/800/800',
    category: Category.FASHION,
  },
  {
    id: '7',
    title: 'The Chemistry of Scent',
    excerpt: 'How molecular perfumery is changing the way we experience fragrance.',
    content: '<p>Content placeholder...</p>',
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
    brand: 'Burhani',
    price: 32,
    currency: '$',
    imageUrl: 'https://picsum.photos/seed/makeup1/400/400',
    category: 'Makeup',
    description: "A volume-boosting mascara that delivers instant drama and definition. The velvet-black formula is enriched with conditioning peptides to strengthen lashes over time."
  },
  {
    id: 'p2',
    name: 'Ethereal Silk Scarf',
    brand: 'Burhani Essentials',
    price: 120,
    currency: '$',
    imageUrl: 'https://picsum.photos/seed/scarf1/400/400',
    category: 'Accessories',
    description: "Hand-rolled edges and 100% mulberry silk make this scarf a timeless addition to any wardrobe. Featuring a custom print inspired by Art Deco architecture."
  },
  {
    id: 'p3',
    name: 'Obsidian Night Cream',
    brand: 'Noire',
    price: 85,
    currency: '$',
    imageUrl: 'https://picsum.photos/seed/cream1/400/400',
    category: 'Skincare',
    description: "A rich, restorative night cream infused with black obsidian extract to detoxify and rejuvenate tired skin while you sleep."
  },
  {
    id: 'p4',
    name: 'Gold Leaf Serum',
    brand: 'Aurum',
    price: 150,
    currency: '$',
    imageUrl: 'https://picsum.photos/seed/serum/400/400',
    category: 'Skincare',
    description: "Suspended 24k gold flakes in a hyaluronic acid base provide instant illumination and deep hydration. A true luxury for your daily ritual."
  },
  {
    id: 'p5',
    name: 'Diamond Dust Powder',
    brand: 'Crystal',
    price: 65,
    currency: '$',
    imageUrl: 'https://picsum.photos/seed/powder/400/400',
    category: 'Makeup',
    description: "Finely milled finishing powder that blurs imperfections and sets makeup with a soft-focus, diamond-like glow. Universal shade for all skin tones."
  },
  {
    id: 'p6',
    name: 'Rose Oud Eau de Parfum',
    brand: 'Scent Lab',
    price: 180,
    currency: '$',
    imageUrl: 'https://picsum.photos/seed/perfume1/400/400',
    category: 'Fragrance',
    description: "A deep, sensual blend of damask rose, rich oud wood, and spiced amber. A scent that lingers like a memory."
  },
  {
    id: 'p7',
    name: 'Structured Leather Tote',
    brand: 'Vogue',
    price: 450,
    currency: '$',
    imageUrl: 'https://picsum.photos/seed/bag1/400/400',
    category: 'Accessories',
    description: "Minimalist design meets maximum utility. Crafted from Italian calf leather with gold-tone hardware."
  }
];