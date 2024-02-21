import ProductModel from '../database/models/product.model';
import UserModel from '../database/models/user.model';
import { ServiceResponse } from '../types/ServiceResponse';
import { UserWithProductsIdModel } from '../types/User';

type UserWithProductsId = {
  username: string,
  productIds: number[],
};

async function list(): Promise<ServiceResponse<UserWithProductsId[]>> {
  const users = await UserModel.findAll({
    attributes: ['username'],
    include: [
      { model: ProductModel,
        as: 'productIds', 
        attributes: ['id'],
      },
    ],
  });

  const usersWithProductIds = (users as UserWithProductsIdModel[]).map(({ dataValues: user }) => ({
    username: user.username,
    productIds: user.productIds?.map((product) => product.id),
  }));

  return { status: 'SUCCESSFUL', data: usersWithProductIds || [] };
}

export default {
  list,
};