import { mergeResolvers } from "merge-graphql-schemas";
import welcomeResolvers from "./welcome.resolvers";

import authResolvers from "./auth.resolvers";
import userResolvers from "./user.resolvers";

const resolversArray = [authResolvers, userResolvers, welcomeResolvers];

const resolvers = mergeResolvers(resolversArray);

/* get all 'keys' from resolvers
 * used in middlewares
 */
const getKeys = obj => Object.keys(obj ? obj : {});

export const resolversKeys = {
  Mutation: getKeys(resolvers.Mutation),
  Query: getKeys(resolvers.Query)
  // Subscription: getKeys(resolvers.Subscription)
};

export default resolvers;
