import { Request } from 'express';
export interface LoginRequest {
  publicAddress: string;
  signature: string;
}

export interface LoginResponse {
  token: string;
}

export interface NonceRequest {
  publicAddress: string;
}

export interface NonceResponse {
  nonce: string;
}

export interface TokenPayload {
  userId: string;
  accountId: string;
  publicAddress: string;
}
export type AuthInfo = TokenPayload;

export interface AuthedRequest extends Request {
  auth: AuthInfo;
}
