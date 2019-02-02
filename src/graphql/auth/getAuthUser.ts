import { UserRepository } from "./../../repositories/UserRepository";
import { mongoClient } from "./../../index";
import { Db, ObjectId } from "mongodb";
import { TokenReturn } from "./createToken";

export function getAuthUser(auth: TokenReturn) {
  const mongoDb = mongoClient().db();
  const userRepository = new UserRepository(mongoDb as Db);

  const _id = new ObjectId(auth.userId);
  return userRepository.findOne({ _id });
}
