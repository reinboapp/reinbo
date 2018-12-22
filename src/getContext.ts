import { ContextParameters } from "graphql-yoga/dist/types";
import * as Redis from "ioredis";
import * as jwt from "jsonwebtoken";
import { Db, MongoClient, ObjectID } from "mongodb";
import { User } from "./entities/User";
import { PubSub } from "graphql-yoga";

export interface JwtUser {
  _id?: ObjectID;
  iat?: number;
  exp?: number;
  error?: jwt.VerifyErrors | false;
}
export interface AppContext {
  mongoDb: Db;
  authUser: JwtUser;
  userAgent: string;
  redis: Redis.Redis;
  redisPub: Redis.Redis;
  pubsub: PubSub;
}

const getContext = (client: MongoClient) => {
  const context = async (req: ContextParameters): Promise<AppContext> => {
    // get from header
    const authHeader: string = req.request.header("Authorization");
    const userAgent: string = req.request.header("user-agent");

    let token: string | false = false;
    let authUser: JwtUser = {};
    let authError: jwt.VerifyErrors | false = false;

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
          authError = e;
        }

        // check error
        if (authError) {
          authUser.error = authError;
        } else {
          authUser = isJwtVerified as object;
          authUser.error = false;
        }
      }
    }

    const mongoDb = client.db();
    const pubsub = new PubSub();
    const redis = new Redis();
    const redisPub = new Redis();

    return {
      mongoDb,
      authUser,
      userAgent,
      redis,
      redisPub,
      pubsub
    };
  };
  return context;
};

export default getContext;
