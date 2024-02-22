import { Router } from 'express';
import productsController from '../controllers/products.controller';
import validateUserId from '../middlewares/userIdValidate';
import productInputsValidate from '../middlewares/productInputsValidate';

const productsRouter = Router();

productsRouter.post('/products', validateUserId, productInputsValidate, productsController.create);
productsRouter.get('/products', productsController.list);

export default productsRouter;