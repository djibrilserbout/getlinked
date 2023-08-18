import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

import prisma from './prisma'

jest.mock('./prisma', () => ({
    __esModule: true,
    default: mockDeep(),
}));

beforeEach(() => {
    prismaMock.mockReset();
});

export const prismaMock = prisma;