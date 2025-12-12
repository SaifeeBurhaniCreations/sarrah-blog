import { Article, Product } from '../types';
import { MOCK_ARTICLES, MOCK_PRODUCTS } from '../constants';

// Simulating an API service
export const ContentService = {
  getArticles: async (): Promise<Article[]> => {
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_ARTICLES), 500);
    });
  },

  getFeaturedArticle: async (): Promise<Article | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_ARTICLES.find(a => a.featured)), 500);
    });
  },

  getProducts: async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_PRODUCTS), 500);
    });
  },

  // Mock Admin Action
  createArticle: async (article: Partial<Article>): Promise<Article> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newArticle = {
            ...article,
            id: Math.random().toString(36).substr(2, 9),
            date: new Date().toLocaleDateString(),
        } as Article;
        console.log("Created Article via API:", newArticle);
        resolve(newArticle);
      }, 1000);
    });
  }
};