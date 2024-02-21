import ProductModel, { ProductSequelizeModel } from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';
import validateParams from '../utils/validateProductParams';

async function create(product:Product): Promise<ServiceResponse<Product>> {
  let responseService: ServiceResponse<Product>;
  const error = validateParams(product);
  if (error) {
    responseService = { status: 'BAD_REQUEST', data: { message: error } };
    return responseService;
  }
  const newProduct = await ProductModel.create(product);
  responseService = { status: 'CREATED', data: newProduct.dataValues };
  return responseService;
}

async function list(): Promise<ServiceResponse<ProductSequelizeModel[]>> {
  const products = await ProductModel.findAll();
  return { status: 'SUCCESSFUL', data: products };
}

export default {
  create,
  list,
};