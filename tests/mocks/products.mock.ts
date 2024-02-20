import { Product } from '../../src/types/Product';

const validProduct: Product = {
    'id': 2,
    'name': 'Peixeira do Agreste',
    'price': "10 peças de ouro",
    'userId': 1,
}

const createdProduct = {
    'id': 2,
    'name': 'Peixeira do Agreste',
    'price': "10 peças de ouro",
    'userId': 1,
}

const missingNameProduct: Product = {
    'id': 2,
    'name': '',
    'price': "10 peças de ouro",
    'userId': 1,
}

const createdProducts: Product[] = [
    {
      "id": 1,
      "name": "Excalibur",
      "price": "10 peças de ouro",
      "userId": 1
    },
    {
      "id": 2,
      "name": "Espada Justiceira",
      "price": "20 peças de ouro",
      "userId": 1
    },
    {
      "id": 3,
      "name": "Lira de Orfeu",
      "price": "1 peça de ouro",
      "userId": 2
    },
  ]

export default {
    validProduct,
    createdProduct,
    missingNameProduct,
    createdProducts,
  };