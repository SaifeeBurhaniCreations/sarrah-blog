import express from 'express';
import { 
  getArticles, 
  getArticleById, 
  createArticle, 
  updateArticle, 
  deleteArticle 
} from '../controllers/articleController';
import { requireAdmin } from '../middleware/authMiddleware';

const router = express.Router();

// Public Routes
router.get('/', getArticles);
router.get('/:id', getArticleById);

// Protected Routes (Admin only)
router.post('/', requireAdmin, createArticle);
router.put('/:id', requireAdmin, updateArticle);
router.delete('/:id', requireAdmin, deleteArticle);

export default router;
