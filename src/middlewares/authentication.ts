import express from 'express';
import { UnauthorizedError } from '@exceptions/errors';
import { AuthedRequest } from '@customtypes/auth';
import { verifyToken } from '@utils/token';
import { api } from '@config/sdk';

export async function expressAuthentication(
  request: express.Request,
  securityName: string,
  _scopes?: string[],
): Promise<boolean> {
  if (securityName !== 'jwt') return true;
  const rawToken = request.headers['authorization'] as string;
  if (!rawToken) throw new UnauthorizedError();

  try {
    const token = rawToken.replace('Bearer ', '');
    const { userId, accountId, publicAddress } = verifyToken(token);
    (request as AuthedRequest).auth = { userId, accountId, publicAddress };
    await api.auth.setAuthToken({ token });
    return true;
  } catch (error) {
    throw new Error(error as string);
  }
}
