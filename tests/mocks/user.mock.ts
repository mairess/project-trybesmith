import { Order } from '../../src/types/Order'

const CreatedUsersWithProductsFromService: Order[] = [
    {
      "username": "Hagar",
      "productIds": [1, 2]
    },
    {
      "username": "Eddie",
      "productIds": [3,4]
    },
    {
      "username": "Helga",
      "productIds": [5]
    }
  ]

  const CreatedUsersWithProductsModel = [
    {
      "username": "Hagar",
      "productIds": [ { id: 1}, { id: 2 }]
    },
    {
      "username": "Eddie",
      "productIds": [{ id: 3 },{ id: 4 }]
    },
    {
      "username": "Helga",
      "productIds": [{ id: 5 }]
    }
  ]

  export default {
    CreatedUsersWithProductsFromService,
    CreatedUsersWithProductsModel,
  };