import { Db, ObjectID } from "mongodb";
import { User } from "./../entities/User";
import { BaseRepository } from "./BaseRepository";
import { Room } from "../entities/Room";
import { RoomRepository } from "./RoomRepository";

const collectionName = "users";

export class UserRepository extends BaseRepository<User> {
  constructor(db: Db) {
    super(db, collectionName);
  }

  findByUsername(username: string): Promise<User> {
    return this.findOne({ username });
  }

  findByEmail(email: string): Promise<User> {
    return this.findOne({ email });
  }

  findByGoogleId(googleId: string): Promise<User> {
    return this.findOne({ googleId });
  }

  // getRooms(userId: ObjectID, roomRepository: RoomRepository): Promise<Room[]> {
  //   userId = new ObjectID(userId);
  //   return roomRepository.find({ members: [userId] });
  // }
}
