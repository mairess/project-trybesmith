import { NextFunction, Request, Response } from 'express';
import userService from '../services/user.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function list(_req: Request, res: Response, next: NextFunction) {
  try {
    const serviceResponse = await userService.list();
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  } catch (error) {
    next(error);
  }
}
  
export default {
  list,
};