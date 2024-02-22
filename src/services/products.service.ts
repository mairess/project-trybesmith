import ProductModel, { ProductSequelizeModel } from '../database/models/product.model';
import UserModel from '../database/models/user.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

async function create(product: Product): Promise<ServiceResponse<Product>> {
  let responseService: ServiceResponse<Product>;
  const user = await UserModel.findByPk(product.userId);
  if (!user) {
    responseService = { status: 'UNPROCESSABLE_CONTENT', data: { message: '"userId" not found' } };
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

export default { create, list };