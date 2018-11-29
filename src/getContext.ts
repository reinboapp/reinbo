import { ContextParameters } from "graphql-yoga/dist/types";
import { MongoClient, Db } from "mongodb";
import * as jwt from "jsonwebtoken";
import { User } from "./entities/User";

export interface JwtUser extends User {
  iat?: number;
  exp?: number;
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

    let token: string = "";
    let authUser: JwtUser = {};
    if (authHeader) {
      const [firstWord, secondWord] = authHeader.split(" ");
      if (firstWord === "Bearer" && secondWord) {
        token = secondWord;
        const accessSecret = process.env.JWT_ACCESS_SECRET;
        let isJwtVerified = {};
        try {
          isJwtVerified = jwt.verify(token, accessSecret);
        } catch (e) {
          // tslint:disable-next-line:no-empty
        }
        authUser = isJwtVerified as object;
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
