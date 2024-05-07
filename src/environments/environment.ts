// environment.prod.ts (production)
import { environment as development } from './environment.development';
import { environment as production } from './environment.prod';

const env = process.env['NODE_ENV'] || 'development';

export const environment = env === 'production' ? production : development;


