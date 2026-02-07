import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import { beforeEach } from '@jest/globals';
import { PrismaClient } from '../../src/generated/prisma/index.js';

// Create a deep mock of PrismaClient
export const prismaMock = mockDeep<PrismaClient>();

// Reset mock before each test
beforeEach(() => {
  mockReset(prismaMock);
});

export default prismaMock;
