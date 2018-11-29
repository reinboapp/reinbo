import welcomeResolvers from "./welcome.resolvers";

import authResolvers from "./auth.resolvers";
import userResolvers from "./user.resolvers";

const resolversArray = [authResolvers, userResolvers, welcomeResolvers];

export default resolversArray;
