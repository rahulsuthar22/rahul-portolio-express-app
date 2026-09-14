import 'dotenv/config';
import postgres from '@prisma/orm-postgres/runtime';
import type { Contract } from '../prisma/contract';
import contractJson from '../prisma/contract.json' with { type: 'json' };
import env from './env';
import { Temporal } from '@js-temporal/polyfill';


Object.assign(globalThis, {Temporal})
export const db = postgres<Contract>({
  contractJson,
  url: env.databaseUrl,
});
