import fs from 'fs';
import express from 'express';
import jwt, { VerifyOptions } from 'jsonwebtoken';
import { UnauthorizedError } from '@exceptions/errors';
import config from '../config';
import { AuthedRequest, AuthInfo } from '@customtypes/auth';

const publicKey = fs.readFileSync(config.JWT_PUBLIC_KEY, 'utf8');

export async function expressAuthentication(
  request: express.Request,
  securityName: string,
  _scopes?: string[],
): Promise<boolean> {
  if (securityName !== 'jwt') return true;
  const token = request.headers['authorization'] as string;
  if (!token) throw new UnauthorizedError();

  try {
    const verifyOptions: VerifyOptions = {
      maxAge: config.JWT_EXPIRES_IN,
      algorithms: ['RS256'],
    };
    const bearer = token.replace('Bearer ', '');
    const auth = jwt.verify(bearer, publicKey, verifyOptions) as AuthInfo;
    (request as AuthedRequest).auth = auth;
    return true;
  } catch (error) {
    throw new Error(error as string);
  }
}
