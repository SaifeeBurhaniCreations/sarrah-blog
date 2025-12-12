export enum Category {
  BEAUTY = 'Beauty',
  FASHION = 'Fashion',
  LIFESTYLE = 'Lifestyle',
  RUNWAY = 'Runway'
}

export type ProductCategory = 'Skincare' | 'Makeup' | 'Accessories' | 'Fragrance' | 'Ready-to-Wear';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Simplified for this demo
  author: string;
  date: string;
  imageUrl: string;
  category: Category;
  featured?: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  imageUrl: string;
  brand: string;
  category: ProductCategory;
  description?: string;
}

export interface NavItem {
  label: string;
  path: string;
}