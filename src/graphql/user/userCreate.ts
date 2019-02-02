import * as argon2 from "argon2";
import { validate, ValidationError } from "class-validator";
import { Db } from "mongodb";
import { User } from "../../entities/User";
import CustomValidationError from "../../errors/CustomValidationError";
import { UserRepository } from "../../repositories/UserRepository";

export async function userCreate(
  _,
  { input }: { input: User },
  { mongoDb }: { mongoDb: Db }
) {
  const user = new User();

  user.username = input.username;
  // user.password = input.password;
  user.email = input.email;
  user.fullname = input.fullname || "";
  user.description = input.description || "";
  user.hasAvatar = input.hasAvatar || false;
  user.isSecret = input.isSecret || false;

  const errors: ValidationError[] = await validate(user, {
    groups: ["mutation"]
  });

  if (errors.length > 0) {
    throw new CustomValidationError(errors);
  } else {
    const userRepository = new UserRepository(mongoDb);
    // user.password = await argon2.hash(user.password);
    return userRepository.create(user);
  }
}
