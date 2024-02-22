import { NextFunction, Request, Response } from 'express';
import { Product } from '../types/Product';
import validateProduct from '../services/validations/validateProduct';
import { ServiceResponse } from '../types/ServiceResponse';
import mapStatusHTTP from '../utils/mapStatusHTTP';

function productInputsValidate(req: Request, res: Response, next: NextFunction) {
  let responseService: ServiceResponse<Product>;
  const product: Product = req.body;
  const error = validateProduct(product);
  if (error) {
    responseService = { 
      status: error.data.message.includes('required') ? 'BAD_REQUEST' : 'UNPROCESSABLE_CONTENT', 
      data: { message: error.data.message } };
    return res.status(mapStatusHTTP(responseService.status)).json(responseService.data);
  }
  next();
}

export default productInputsValidate;