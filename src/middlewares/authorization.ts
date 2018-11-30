import { AppContext } from "./../getContext";
import { resolversKeys } from "../resolvers/";

const createAuth = () => {
  return async (resolve, _, args, { authUser }: AppContext, info) => {
    if (authUser.error) {
      throw new Error(authUser.error);
    }

    if (!authUser._id) {
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
    userCreate: passAuth
  },
  Query: {
    ...withAuth("Query")
  }
  // Subscription: {}
};
