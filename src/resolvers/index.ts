import { mergeResolvers } from "merge-graphql-schemas";
import authResolvers from "./auth.resolvers";
import roomResolvers from "./room.resolvers";
import userResolvers from "./user.resolvers";
import welcomeResolvers from "./welcome.resolvers";

const resolversArray = [
  authResolvers,
  roomResolvers,
  userResolvers,
  welcomeResolvers
];

const resolvers: any = mergeResolvers(resolversArray);

/* get all 'keys' from resolvers
 * used in middlewares
 */
const getKeys = obj => Object.keys(obj ? obj : {});

export const resolversKeys = {
  Mutation: getKeys(resolvers.Mutation),
  Query: getKeys(resolvers.Query),
  Subscription: getKeys(resolvers.Subscription)
};

export default resolvers;
