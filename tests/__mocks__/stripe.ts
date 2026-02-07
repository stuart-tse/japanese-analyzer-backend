import { jest } from '@jest/globals';

export const stripeMock = {
  customers: {
    create: jest.fn(),
    retrieve: jest.fn(),
    update: jest.fn(),
  },
  subscriptions: {
    create: jest.fn(),
    retrieve: jest.fn(),
    update: jest.fn(),
    cancel: jest.fn(),
    list: jest.fn(),
  },
  paymentIntents: {
    create: jest.fn(),
    retrieve: jest.fn(),
    confirm: jest.fn(),
  },
  paymentMethods: {
    list: jest.fn(),
    attach: jest.fn(),
    detach: jest.fn(),
  },
  invoices: {
    list: jest.fn(),
    retrieve: jest.fn(),
  },
  billingPortal: {
    sessions: {
      create: jest.fn(),
    },
  },
  webhooks: {
    constructEvent: jest.fn(),
  },
};

export default stripeMock;
