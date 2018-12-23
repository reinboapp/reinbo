import BaseError from "../errors/BaseError";
import UnauthorizedError from "../errors/UnauthorizedError";
import { resolversKeys } from "../resolvers/";
import { AppContext } from "./../getContext";

const createAuth = () => {
  return async (resolve, _, args, { authUser }: AppContext, info) => {
    if (authUser.error) {
      throw new BaseError({
        statusCode: 401,
        name: authUser.error.name,
        message: authUser.error.message
      });
    }

    if (!authUser._id) {
      throw new UnauthorizedError();
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
    authRefreshToken: passAuth,
    userCreate: passAuth
  },
  Query: {
    ...withAuth("Query")
  },
  Subscription: {
    ...withAuth("Subscription")
  }
};
