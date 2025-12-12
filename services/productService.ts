import { Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';

export const ProductService = {
  getProducts: async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_PRODUCTS), 500);
    });
  },

  getProductById: async (id: string): Promise<Product | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_PRODUCTS.find(p => p.id === id)), 300);
    });
  }
};