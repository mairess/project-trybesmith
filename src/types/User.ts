import { Model, Optional } from 'sequelize';

export type User = {
  id: number;
  username: string;
  vocation: string;
  level: number;
  password: string;
};

type UserInputtableTypes = Optional<User, 'id'>;

type UserWithProductsId = User & {
  productIds: { id: number }[];
};

export type UserWithProductsIdModel = Model<UserWithProductsId, UserInputtableTypes>;