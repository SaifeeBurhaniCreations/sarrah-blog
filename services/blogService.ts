import { Article } from '../types';
import { MOCK_ARTICLES } from '../constants';

export const BlogService = {
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

  createArticle: async (articleData: Partial<Article>): Promise<Article> => {
    // Simulate API call to create article
    return new Promise((resolve) => {
      setTimeout(() => {
        const newArticle = {
            ...articleData,
            id: Math.random().toString(36).substr(2, 9),
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            author: articleData.author || "Admin Editor",
        } as Article;
        
        // In a real app, we would push to DB. Here we update mock in memory for session
        MOCK_ARTICLES.unshift(newArticle);
        
        console.log("BlogService: Created Article", newArticle);
        resolve(newArticle);
      }, 1000);
    });
  }
};