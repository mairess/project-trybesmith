import { Request, Response } from 'express';
import productsService from '../services/products.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function create(req: Request, res: Response) {
  const serviceResponse = await productsService.create(req.body);
  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);  
  }
  res.status(201).json(serviceResponse.data);
}

async function list(_req: Request, res: Response) {
  const serviceResponse = await productsService.list();
  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);  
  }
  res.status(200).json(serviceResponse.data);
}

export default {
  create,
  list,
};