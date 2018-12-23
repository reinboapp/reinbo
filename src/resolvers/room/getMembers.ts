import { UserRepository } from "./../../repositories/UserRepository";
import { mongoClient } from "./../../index";
import { Db } from "mongodb";

export function getMembers(room) {
  const mongoDb = mongoClient().db();
  const userRepository = new UserRepository(mongoDb as Db);

  return userRepository.find({
    _id: { $in: room.members }
  });
}
