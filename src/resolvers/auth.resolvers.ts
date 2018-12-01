import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

import { ValidationError, validate } from "class-validator";

import { UserRepository } from "../repositories/UserRepository";
import { AppContext } from "./../getContext";
import { Auth } from "./../entities/Auth";
import { User } from "../entities/User";
// import BaseError from "../errors/BaseError";
import BadRequestError from "../errors/BadRequestError";
import NotFoundError from "../errors/NotFoundError";
import UnauthorizedError from "../errors/UnauthorizedError";
import CustomValidationError from "../errors/CustomValidationError";

export default {
  Mutation: {
    async authLogin(
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
      auth.password = input.password;

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

      const passwordVerified = await argon2.verify(
        user.password,
        auth.password
      );
      if (!passwordVerified) {
        throw new UnauthorizedError("Wrong password");
      }

      const accessPayload = {
        ...user,
        password: undefined
      };
      const accessSecret = process.env.JWT_ACCESS_SECRET;
      const accessToken = await jwt.sign(accessPayload, accessSecret, {
        expiresIn: "1h"
      });

      const refreshPayload = {
        _id: user._id,
        ua: userAgent
      };
      const refreshSecret = process.env.JWT_REFRESH_SECRET;
      const refreshToken = await jwt.sign(refreshPayload, refreshSecret, {
        expiresIn: "7d"
      });

      return {
        accessToken,
        refreshToken
      };
    }
  }
};
