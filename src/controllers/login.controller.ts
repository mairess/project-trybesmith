import { Request, Response } from 'express';
import loginService from '../services/login.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function login(req: Request, res: Response) {
  const serviceResponse = await loginService.verifyLogin(req.body);
  res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
}
  
export default {
  login,
};