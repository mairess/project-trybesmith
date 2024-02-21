import express from 'express';
import productsRouter from './routers/products.router';
import userRouter from './routers/user.router';
import loginRouter from './routers/login.router';

const app = express();

app.use(express.json());
app.use(loginRouter);
app.use(productsRouter);
app.use(userRouter);

export default app;
