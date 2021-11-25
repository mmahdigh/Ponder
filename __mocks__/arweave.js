export const init = jest.fn();

export const api = {
  post: jest.fn(),
};

export const transactions = {
  sign: jest.fn(),
  post: jest.fn(),
  getData: jest.fn(),
};

export const addTag = jest.fn();
export const createTransaction = jest.fn().mockResolvedValue({
  addTag,
});

const Arweave = jest.fn().mockImplementation(() => ({
  init: jest.fn().mockReturnValue({
    createTransaction,
    api,
    transactions,
  }),
}));

export default Arweave;
