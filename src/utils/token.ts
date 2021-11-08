import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';
import { TokenPayload } from '@customtypes/auth';
import config from './../config';

export const createToken = (payload: TokenPayload): string => {
  const signOptions: SignOptions = {
    expiresIn: config.JWT_EXPIRES_IN,
    algorithm: 'RS256',
  };
  const token = jwt.sign(payload, config.JWT_PRIVATE_KEY, signOptions);
  return token;
};

export const verifyToken = (token: string): TokenPayload => {
  const verifyOptions: VerifyOptions = {
    maxAge: config.JWT_EXPIRES_IN,
    algorithms: ['RS256'],
  };
  const payload = jwt.verify(token, config.JWT_PUBLIC_KEY, verifyOptions) as TokenPayload;
  return payload;
};
