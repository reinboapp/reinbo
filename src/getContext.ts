import { ContextParameters } from "graphql-yoga/dist/types";
import { MongoClient, Db } from "mongodb";
import * as jwt from "jsonwebtoken";
import { User } from "./entities/User";

export interface JwtUser extends User {
  iat?: number;
  exp?: number;
  error?: string | false;
}
export interface AppContext {
  mongoDb: Db;
  authUser: JwtUser;
  userAgent: string;
}

const getContext = (client: MongoClient) => {
  const context = async (req: ContextParameters): Promise<AppContext> => {
    // get from header
    const authHeader: string = req.request.header("Authorization");
    const userAgent: string = req.request.header("user-agent");

    let token: string | false = false;
    let authUser: JwtUser = {};
    let errorName: string | false = false;

    if (authHeader) {
      const [firstWord, secondWord] = authHeader.split(" ");
      if (firstWord === "Bearer" && secondWord) {
        token = secondWord;
        // verify token
        const accessSecret = process.env.JWT_ACCESS_SECRET;
        let isJwtVerified = {};
        try {
          isJwtVerified = jwt.verify(token, accessSecret);
        } catch (e) {
          errorName = e.name;
        }

        // check error
        if (errorName) {
          authUser.error = errorName;
        } else {
          authUser = isJwtVerified as object;
          authUser.error = false;
        }
      }
    }

    return {
      mongoDb: client.db(),
      authUser,
      userAgent
    };
  };
  return context;
};

export default getContext;
