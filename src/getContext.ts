import { ContextParameters } from "graphql-yoga/dist/types";
import * as Redis from "ioredis";
import * as jwt from "jsonwebtoken";
import { Db, MongoClient, ObjectID } from "mongodb";
import { User } from "./entities/User";
import { mongoClient } from ".";
import { RedisPubSub } from "graphql-redis-subscriptions";

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
  pubsub: RedisPubSub;
}

const getContext = () => {
  const context = async (req: ContextParameters): Promise<AppContext> => {
    // get from header
    let authHeader: string = "";
    let userAgent: string = "";

    // via Mutation (http post)
    if (req.request) {
      authHeader = req.request.header("Authorization");
      userAgent = req.request.header("user-agent");
    }
    // via Subscription (websocket)
    if (
      req.connection &&
      req.connection.context &&
      req.connection.context.authorization
    ) {
      authHeader = req.connection.context.authorization;
    }

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

    const mongoDb = mongoClient().db();
    const pubsub = new RedisPubSub();
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
