import { Request, Response } from 'express';
import userService from '../services/user.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function list(_req: Request, res: Response) {
  try {
    const serviceResponse = await userService.list();
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
  }
}
  
export default {
  list,
};