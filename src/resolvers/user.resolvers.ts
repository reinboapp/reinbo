import * as argon2 from "argon2";
import { validate, ValidationError } from "class-validator";

import { User } from "./../entities/User";
import { UserRepository } from "./../repositories/UserRepository";
import { Db } from "mongodb";

export default {
  Query: {
    userFind(_, { input }: { input: User }, { mongoDb }: { mongoDb: Db }) {
      const userRepository = new UserRepository(mongoDb);
      return userRepository.find({});
    }
  },
  Mutation: {
    async userCreate(
      _,
      { input }: { input: User },
      { mongoDb }: { mongoDb: Db }
    ) {
      const user = new User();
      user.username = input.username;
      user.password = input.password;
      user.email = input.email;

      const errors: ValidationError[] = await validate(user, {
        groups: ["create"]
      });
      if (errors.length > 0) {
        throw new Error(errors.toString());
      } else {
        const userRepository = new UserRepository(mongoDb);
        return userRepository.create(user);
      }
    }
  }
};
