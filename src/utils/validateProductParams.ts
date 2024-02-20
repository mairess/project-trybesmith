import { ProductInputtableTypes } from '../database/models/product.model';

function validateParams({
  name,
  price,
  userId,
}: ProductInputtableTypes): string | null {
  if (!name) return 'Name is required';
  if (!price) return 'Price is required';
  if (!userId) return 'userId is required';
  
  return null;
}

export default validateParams;