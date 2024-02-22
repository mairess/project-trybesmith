import express, { NextFunction, Request, Response } from 'express';
import productsRouter from './routers/products.router';
import userRouter from './routers/user.router';
import loginRouter from './routers/login.router';
import mapStatusHTTP from './utils/mapStatusHTTP';

const genericErrorMessage500 = 'Unexpected error!';

const app = express();

app.use(express.json());
app.use(loginRouter);
app.use(productsRouter);
app.use(userRouter);
app.use((error: Error, _req: Request, res: Response, _next: NextFunction): void => {
  console.error(error);
  res.status(mapStatusHTTP(error.message)).json({ error: genericErrorMessage500 });
});

export default app;
