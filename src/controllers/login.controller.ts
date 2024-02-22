import { NextFunction, Request, Response } from 'express';
import loginService from '../services/login.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const serviceResponse = await loginService.verifyLogin(req.body);
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  } catch (error) {
    next(error);
  }
} 
  
export default {
  login,
};