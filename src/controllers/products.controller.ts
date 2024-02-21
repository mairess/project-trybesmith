import { Request, Response } from 'express';
import productsService from '../services/products.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function create(req: Request, res: Response) {
  const serviceResponse = await productsService.create(req.body);
  if (serviceResponse.status !== 'SUCCESSFUL' && serviceResponse.status !== 'CREATED') {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);  
  }
  res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
}

async function list(_req: Request, res: Response) {
  try {
    const serviceResponse = await productsService.list();
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
  }
}

export default {
  create,
  list,
};