import config from './index';

const domains = (config.CORS_ORIGIN ?? '').split(',').map((d) => d.trim());
const staticRules = [...domains, ...(config.env !== 'production' ? [/^http:\/\/localhost:\d{4}$/] : [])];
const isAllowed = async (origin?: string): Promise<boolean> => {
  try {
    if (!origin) return false;
    if (staticRules.some((rule) => rule === '*' || origin.match(rule) !== null)) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};

type CustomCorsOrigin = (
  requestOrigin: string | undefined,
  callback: (err: Error | null, allow?: boolean) => void,
) => Promise<void>;

const origin: CustomCorsOrigin = async (origin, callback) => {
  callback(null, await isAllowed(origin));
};

export default { credentials: true, origin };
