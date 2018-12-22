import { AppContext } from "./../../getContext";
import * as argon2 from "argon2";
import { validate, ValidationError } from "class-validator";
import { Db, ObjectID } from "mongodb";
import { User } from "../../entities/User";
import CustomValidationError from "../../errors/CustomValidationError";
import { UserRepository } from "../../repositories/UserRepository";
import UnauthorizedError from "../../errors/UnauthorizedError";

export async function userUpdate(
  _,
  { id, input }: { id: ObjectID; input: User },
  { mongoDb, authUser }: AppContext
) {
  if (id !== authUser._id) {
    throw new UnauthorizedError();
  }

  const user = new User();
  Object.keys(input).map(key => {
    if (input[key]) {
      user[key] = input[key];
    }
  });

  const errors: ValidationError[] = await validate(user, {
    groups: ["mutation"],
    skipMissingProperties: true
  });

  if (errors.length > 0) {
    throw new CustomValidationError(errors);
  } else {
    const userRepository = new UserRepository(mongoDb);
    if (user.password) {
      user.password = await argon2.hash(user.password);
    }
    return userRepository.update(id, user);
  }
}
