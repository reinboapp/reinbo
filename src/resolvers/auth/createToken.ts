import * as jwt from "jsonwebtoken";
export interface TokenReturn {
  userId: string;
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
  const isProd = process.env.NODE_ENV === "production";
  const accessToken = await jwt.sign(accessPayload, accessSecret, {
    expiresIn: isProd ? "1h" : "10d"
  });

  const refreshPayload = {
    _id,
    userAgent
  };
  const refreshSecret = process.env.JWT_REFRESH_SECRET;
  const refreshToken = await jwt.sign(refreshPayload, refreshSecret, {
    expiresIn: isProd ? "7d" : "30d"
  });

  return {
    userId: _id,
    accessToken,
    refreshToken
  };
}
