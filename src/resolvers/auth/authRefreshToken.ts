import * as jwt from "jsonwebtoken";
import UnauthorizedError from "../../errors/UnauthorizedError";
import { AppContext } from "../../getContext";
import { createToken } from "./createToken";

// mutation
export async function authRefreshToken(
  _,
  { input }: { input: { refreshToken: string } },
  { mongoDb, userAgent }: AppContext
) {
  const { refreshToken } = input;
  const refreshSecret = process.env.JWT_REFRESH_SECRET;
  const isVerified = await jwt.verify(refreshToken, refreshSecret);
  if (!isVerified) {
    throw new UnauthorizedError();
  }
  const tokenPayload = (await jwt.decode(refreshToken)) as {
    _id: string;
    ua: string;
  };
  return createToken({ _id: tokenPayload._id, userAgent: tokenPayload.ua });
}
