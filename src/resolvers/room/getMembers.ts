import { UserRepository } from "./../../repositories/UserRepository";
import { mongoClient } from "./../../index";
// import { ObjectID } from "bson";
import { Db, ObjectID } from "mongodb";

export function getMembers(room) {
  const mongoDb = mongoClient().db();
  const userRepository = new UserRepository(mongoDb as Db);

  return userRepository.find({
    _id: { $in: room.members }
  });
}
