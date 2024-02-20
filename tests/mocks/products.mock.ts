import { Product } from '../../src/types/Product';

const validProduct: Product = {
    'id': 2,
    'name': 'Peixeira do Agreste',
    'price': 50,
    'userId': 1,
}

const createdProduct = {
    'id': 2,
    'name': 'Peixeira do Agreste',
    'price': 50,
    'userId': 1,
}

const missingNameProduct: Product = {
    'id': 2,
    'name': '',
    'price': 50,
    'userId': 1,
}

export default {
    validProduct,
    createdProduct,
    missingNameProduct,
  };