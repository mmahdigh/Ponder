export const addTag = jest.fn();
export const createTransaction = jest.fn().mockResolvedValue({ addTag });

export const sign = jest.fn();
export const post = jest.fn();

const client = {
  createTransaction,
  transactions: { sign, post },
};

export default client;
