import jwt, { VerifyOptions } from 'jsonwebtoken';
import { TokenPayload } from '@customtypes/auth';
import config from './../config';

export const verifyToken = (token: string): TokenPayload => {
  const verifyOptions: VerifyOptions = {
    maxAge: config.JWT_EXPIRES_IN,
    algorithms: ['RS256'],
  };
  const payload = jwt.verify(token, config.JWT_PUBLIC_KEY, verifyOptions) as TokenPayload;
  return payload;
};
