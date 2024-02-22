import { NextFunction, Request, Response } from 'express';
import { Product } from '../types/Product';

function validateUserId(req: Request, res: Response, next: NextFunction) {
  const product: Product = req.body;
  if (!product.userId) return res.status(400).json({ message: '"userId" is required' });
  next();
}

export default validateUserId;