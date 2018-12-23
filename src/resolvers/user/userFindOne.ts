import { Db, ObjectID } from "mongodb";
import { User } from "../../entities/User";
import { UserRepository } from "../../repositories/UserRepository";
import { ValidationError, validate } from "class-validator";
import CustomValidationError from "../../errors/CustomValidationError";

export async function userFindOne(
  _,
  { input }: { input: User },
  { mongoDb }: { mongoDb: Db }
) {
  const user = new User();

  Object.keys(input).map(key => {
    if (input[key]) {
      user[key] = input[key];
    }
  });

  const errors: ValidationError[] = await validate(user, {
    groups: ["query"],
    skipMissingProperties: true
  });

  if (errors.length > 0) {
    throw new CustomValidationError(errors);
  } else {
    if (user._id) {
      user._id = new ObjectID(user._id as string);
    }
    const userRepository = new UserRepository(mongoDb);
    return userRepository.findOne(user);
  }
}
