import { Api, createApiClient } from '@marketplace-nft/framely-api-sdk';
import baseConfig from '.';

interface StringMap {
  [key: string]: string;
}

const cache = {} as StringMap;

class SessionStorage {
  // store key/value pair
  public async set(key: string, value: string): Promise<void> {
    cache[key] = value;
  }

  // get value of
  public async get(key: string): Promise<string> {
    return cache[key];
  }

  // delete key
  public async remove(key: string): Promise<void> {
    delete cache[key];
  }
}

const sessionStorage = new SessionStorage();
const config = {
  baseUrl: baseConfig.storageUrl,
  authSessionKey: 'AUTH_SESSION_KEY',
  session: sessionStorage,
};

export const client = createApiClient(config);
export const api = new Api(client);
