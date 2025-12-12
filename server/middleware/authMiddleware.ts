import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    res.status(401).json({ message: 'Authentication required' });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET || 'fallback_secret';
    const user = jwt.verify(token, secret);
    (req as AuthRequest).user = user;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
    return;
  }
};

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  authenticateToken(req, res, () => {
    if ((req as AuthRequest).user?.role !== 'ADMIN') {
      res.status(403).json({ message: 'Admin privileges required' });
      return;
    }
    next();
  });
};