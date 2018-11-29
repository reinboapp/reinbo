import { User } from "./../entities/User";

export default {
  Mutation: {
    authLogin: (_, { input }: { input: User }) => {
      return "result";
    }
  }
};
