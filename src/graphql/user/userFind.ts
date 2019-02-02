import { UserRepository } from "../../repositories/UserRepository";
import { User } from "../../entities/User";
import { Db } from "mongodb";

export function userFind(
  _,
  { input }: { input: User },
  { mongoDb }: { mongoDb: Db }
) {
  const userRepository = new UserRepository(mongoDb);
  return userRepository.find(input);
}
