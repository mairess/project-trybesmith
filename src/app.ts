import express from 'express';
import productsRouter from './routers/products.router';
import userRouter from './routers/user.router';

const app = express();

app.use(express.json());
app.use(productsRouter);
app.use(userRouter);

export default app;
