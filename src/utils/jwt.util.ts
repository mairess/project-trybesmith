import jwt from 'jsonwebtoken';
import { Payload } from '../types/Payload';

const secret = process.env.JWT_SECRET || 'au_sh/_JHKJ%J&Hja*9(sk/w23!@!687@a#$%¨&';

const sign = (payload: Payload): string => jwt.sign(payload, secret);
const verify = (token: string): Payload => jwt.verify(token, secret) as Payload;

export default {
  sign,
  verify,
};