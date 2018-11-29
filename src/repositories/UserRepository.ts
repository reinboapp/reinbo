import { Db } from "mongodb";
import { User } from "./../entities/User";
import { BaseRepository } from "./BaseRepository";

const collectionName = "users";

export class UserRepository extends BaseRepository<User> {
  constructor(db: Db) {
    super(db, collectionName);
  }

  findByUsername(username: string): Promise<User> {
    return this.collection.findOne({ username });
  }
}
