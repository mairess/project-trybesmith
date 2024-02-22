import { NextFunction, Request, Response } from 'express';
import productsService from '../services/products.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const serviceResponse = await productsService.create(req.body);
    if (serviceResponse.status !== 'SUCCESSFUL' && serviceResponse.status !== 'CREATED') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);  
    }
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  } catch (error) {
    next(error);
  }
}

async function list(_req: Request, res: Response, next: NextFunction) {
  try {
    const serviceResponse = await productsService.list();
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  } catch (error) {
    next(error);
  }
}

export default {
  create,
  list,
};