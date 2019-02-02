import { mergeResolvers } from "merge-graphql-schemas";

import authResolvers from "./auth/auth.resolvers";
import roomResolvers from "./room/room.resolvers";
import userResolvers from "./user/user.resolvers";
import welcomeResolvers from "./welcome/welcome.resolvers";

const resolversArray = [
  authResolvers,
  roomResolvers,
  userResolvers,
  welcomeResolvers
];

const resolversMerged: any = mergeResolvers(resolversArray);

/* get all 'keys' from resolvers
 * used in middlewares
 */
const getKeys = obj => Object.keys(obj ? obj : {});

export const resolversKeys = {
  Mutation: getKeys(resolversMerged.Mutation),
  Query: getKeys(resolversMerged.Query),
  Subscription: getKeys(resolversMerged.Subscription)
};

export default resolversMerged;
