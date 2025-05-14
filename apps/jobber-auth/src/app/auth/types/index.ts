import { Request } from 'express';

export interface TokenPayload {
  userId: number;
}

export interface JwtRequest extends Request {
  token: string;
}
