import type { PrismaClient as ImportedPrismaClient } from '@prisma/client';
import type { Prisma as ImportedPrisma } from '@prisma/client';
import type { Decimal as ImportedDecimal } from '@prisma/client/runtime/library';

import { createRequire } from 'module';

const require = createRequire(import.meta.url ?? __filename);

const { Prisma: RequiredPrisma, PrismaClient: RequiredPrismaClient } = require('@prisma/client');

const { Decimal: RequiredDecimal } = require('@prisma/client/runtime/library');

const _PrismaClient: typeof ImportedPrismaClient = RequiredPrismaClient;
export const _Prisma: typeof ImportedPrisma = RequiredPrisma;
export class PrismaClient extends _PrismaClient {}

export type Decimal = ImportedDecimal;
export const Decimal: typeof ImportedDecimal = RequiredDecimal;

export type * from '@prisma/client';
