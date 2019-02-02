import * as jwt from "jsonwebtoken";
import UnauthorizedError from "../../errors/UnauthorizedError";
import { AppContext } from "../../getContext";
import { createToken } from "./createToken";
import { OAuth2Client } from "google-auth-library";
import { UserRepository } from "../../repositories/UserRepository";

// mutation
export async function authWithGoogle(
  _,
  { input }: { input: { googleToken: string } },
  { mongoDb, userAgent }: AppContext
) {
  const { googleToken } = input;
  const client = new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  });
  try {
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const googleId = payload.sub;
    const userRepository = new UserRepository(mongoDb);

    try {
      const foundUser = await userRepository.findByGoogleId(googleId);
      /** if user found, return token */
      return createToken({ _id: foundUser._id as string, userAgent });
    } catch (e) {
      /** if user not found, create user */
      if (e.statusCode === 404) {
        const createdUser = await userRepository.create({
          googleId,
          email: payload.email,
          fullname: payload.name
        });
        return createToken({ _id: createdUser._id as string, userAgent });
      }

      throw e;
    }
  } catch (e) {
    return new UnauthorizedError(e.message.substring(0, 20));
  }
}
