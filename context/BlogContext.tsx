import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Article } from '../types';
import { MOCK_ARTICLES } from '../constants';

interface BlogContextType {
  articles: Article[];
  addArticle: (article: Article) => void;
  getArticleById: (id: string) => Article | undefined;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);

  // Initialize with mock data on mount
  useEffect(() => {
    setArticles(MOCK_ARTICLES);
  }, []);

  const addArticle = (article: Article) => {
    setArticles(prev => [article, ...prev]);
  };

  const getArticleById = (id: string) => {
    return articles.find(a => a.id === id);
  };

  return (
    <BlogContext.Provider value={{
      articles,
      addArticle,
      getArticleById
    }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};