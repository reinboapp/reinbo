import * as jwt from "jsonwebtoken";

export interface TokenReturn {
  accessToken: string;
  refreshToken: string;
}

export async function createToken({
  _id,
  userAgent
}: {
  _id: string;
  userAgent: string;
}): Promise<TokenReturn> {
  const accessPayload = {
    _id
  };
  const accessSecret = process.env.JWT_ACCESS_SECRET;
  const accessToken = await jwt.sign(accessPayload, accessSecret, {
    expiresIn: "1h"
  });

  const refreshPayload = {
    _id,
    userAgent
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
