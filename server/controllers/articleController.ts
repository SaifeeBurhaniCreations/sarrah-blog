import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/authMiddleware';

export const getArticles = async (req: Request, res: Response) => {
  try {
    const { category, featured } = req.query;
    
    const where: any = {};
    if (category) where.category = String(category);
    if (featured === 'true') where.featured = true;

    const articles = await prisma.article.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { author: { select: { name: true } } }
    });
    
    // Transform data to match frontend expectations (flatten author name)
    const formattedArticles = articles.map(a => ({
        ...a,
        author: a.author.name
    }));

    res.json(formattedArticles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching articles', error });
  }
};

export const getArticleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const article = await prisma.article.findUnique({
      where: { id },
      include: { author: { select: { name: true } } }
    });

    if (!article) {
      res.status(404).json({ message: 'Article not found' });
      return;
    }

    res.json({ ...article, author: article.author.name });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching article', error });
  }
};

export const createArticle = async (req: Request, res: Response) => {
  try {
    // req.user is populated by authenticateToken middleware
    const userId = (req as AuthRequest).user.id;
    const { title, excerpt, content, imageUrl, category, featured } = req.body;

    const article = await prisma.article.create({
      data: {
        title,
        excerpt,
        content,
        imageUrl,
        category,
        featured: featured || false,
        authorId: userId,
      },
    });

    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error creating article', error });
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const article = await prisma.article.update({
      where: { id },
      data,
    });

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error updating article', error });
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.article.delete({ where: { id } });
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting article', error });
  }
};