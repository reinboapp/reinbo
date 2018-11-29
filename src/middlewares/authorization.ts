import { resolversKeys } from "../resolvers/";

const createAuth = () => {
  return async (resolve, _, args, { authUser }, info) => {
    if (!authUser.id) {
      throw new Error(`Not authorized!`);
    }
    return resolve();
  };
};

const withAuth = (key: string): object => {
  const keys = {};
  resolversKeys[key].forEach(item => {
    keys[item] = createAuth();
  });
  return keys;
};

const passAuth = resolve => resolve();

export default {
  Mutation: {
    ...withAuth("Mutation"),
    authLogin: passAuth,
    userRegister: passAuth
  },
  Query: {},
  Subscription: {}
};
