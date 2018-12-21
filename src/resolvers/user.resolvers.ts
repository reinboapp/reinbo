import * as argon2 from "argon2";
import { validate, ValidationError } from "class-validator";
import { Db, ObjectId } from "mongodb";
import CustomValidationError from "../errors/CustomValidationError";
import { User } from "./../entities/User";
import { UserRepository } from "./../repositories/UserRepository";

export default {
  Query: {
    userFind(_, { input }: { input: User }, { mongoDb }: { mongoDb: Db }) {
      const userRepository = new UserRepository(mongoDb);
      return userRepository.find(input);
    },
    async userFindOne(
      _,
      { input }: { input: User },
      { mongoDb }: { mongoDb: Db }
    ) {
      if (input._id) {
        input._id = new ObjectId(input._id);
      }
      const userRepository = new UserRepository(mongoDb);
      return userRepository.findOne(input);
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
        groups: ["mutation"]
      });

      if (errors.length > 0) {
        throw new CustomValidationError(errors);
      } else {
        const userRepository = new UserRepository(mongoDb);
        user.password = await argon2.hash(user.password);
        return userRepository.create(user);
      }
    }
  }
};
