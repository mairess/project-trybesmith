import express, { NextFunction, Request, Response } from 'express';
import swaggerUi, { JsonObject } from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import productsRouter from './routers/products.router';
import userRouter from './routers/user.router';
import loginRouter from './routers/login.router';
import mapStatusHTTP from './utils/mapStatusHTTP';

const genericErrorMessage500 = 'Unexpected error!';
const raw = fs.readFileSync('swagger.yaml', 'utf-8');
const swaggerDocument = yaml.load(raw) as JsonObject;

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(loginRouter);
app.use(productsRouter);
app.use(userRouter);
app.use((error: Error, _req: Request, res: Response, _next: NextFunction): void => {
  console.error(error);
  res.status(mapStatusHTTP(error.message)).json({ error: genericErrorMessage500 });
});

export default app;
