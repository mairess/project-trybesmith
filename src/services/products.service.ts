import ProductModel from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';
import validateParams from '../utils/validateProductParams';

async function create(product:Product): Promise<ServiceResponse<Product>> {
  let responseService: ServiceResponse<Product>;
  const error = validateParams(product);
  if (error) {
    responseService = { status: 'INVALID_DATA', data: { message: error } };
    return responseService;
  }
  const newProduct = await ProductModel.create(product);
  responseService = { status: 'SUCCESSFUL', data: newProduct.dataValues };
  return responseService;
}

export default {
  create,
};