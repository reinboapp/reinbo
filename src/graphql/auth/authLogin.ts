import * as argon2 from "argon2";
import { validate, ValidationError } from "class-validator";
import { Auth } from "../../entities/Auth";
import { User } from "../../entities/User";
import BadRequestError from "../../errors/BadRequestError";
import CustomValidationError from "../../errors/CustomValidationError";
import NotFoundError from "../../errors/NotFoundError";
import UnauthorizedError from "../../errors/UnauthorizedError";
import { AppContext } from "../../getContext";
import { UserRepository } from "../../repositories/UserRepository";
import { createToken } from "./createToken";

// mutation
export async function authLogin(
  _,
  { input }: { input: Auth },
  { mongoDb, userAgent }: AppContext
) {
  if (!input) {
    throw new BadRequestError("Invalid Input Data");
  }
  const auth = new Auth();
  auth.email = input.email;
  auth.username = input.username;

  if (!auth.email && !auth.username) {
    throw new BadRequestError("Email/Username not provided");
  }

  let user: User = {};

  // login with username
  if (!auth.email) {
    const errors: ValidationError[] = await validate(auth, {
      groups: ["loginUsername"]
    });
    if (errors.length > 0) {
      throw new CustomValidationError(errors);
    } else {
      const userRepository = new UserRepository(mongoDb);
      user = await userRepository.findByUsername(auth.username);
    }
  }

  // login with email
  if (!auth.username) {
    const errors: ValidationError[] = await validate(auth, {
      groups: ["loginEmail"]
    });
    if (errors.length > 0) {
      throw new CustomValidationError(errors);
    } else {
      const userRepository = new UserRepository(mongoDb);
      user = await userRepository.findByEmail(auth.email);
    }
  }

  if (!user) {
    throw new NotFoundError(
      `User with${auth.email ? ` email: ${auth.email}` : ""}${
        auth.username ? ` username: ${auth.username}` : ""
      } not found`
    );
  }

  // const passwordVerified = await argon2.verify(user.password, auth.password);
  // if (!passwordVerified) {
  //   throw new UnauthorizedError("Wrong password");
  // }

  return createToken({ _id: user._id as string, userAgent });
}
