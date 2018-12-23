import { Db } from "mongodb";
import { Room } from "./../entities/Room";
import { BaseRepository } from "./BaseRepository";

const collectionName = "rooms";

export class RoomRepository extends BaseRepository<Room> {
  constructor(db: Db) {
    super(db, collectionName);
  }

  getChannels() {
    return null;
  }

  getMembers() {
    return null;
  }

  getOwner() {
    return null;
  }
}
