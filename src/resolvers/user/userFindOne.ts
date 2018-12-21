import { ObjectId } from "bson";
import { Db } from "mongodb";
import { User } from "../../entities/User";
import { UserRepository } from "../../repositories/UserRepository";

export async function userFindOne(
  _,
  { input }: { input: User },
  { mongoDb }: { mongoDb: Db }
) {
  if (input._id) {
    input._id = new ObjectId(input._id);
  }
  const userRepository = new UserRepository(mongoDb);
  return userRepository.findOne(input);
}
