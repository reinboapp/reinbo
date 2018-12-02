import {
  Db,
  Collection,
  WriteOpResult,
  DeleteWriteOpResultObject
} from "mongodb";

import DatabaseError from "../errors/DatabaseError";

export class BaseRepository<T> {
  protected readonly collection: Collection;

  constructor(db: Db, collectionName: string) {
    this.collection = db.collection(collectionName);
  }

  async find(item: T): Promise<T[]> {
    try {
      const result = await this.collection.find(item).toArray();
      return result;
    } catch (e) {
      throw new DatabaseError(e);
    }
  }
  findOne(_id: string): Promise<T> {
    return this.collection.findOne({ _id });
  }
  async create(item: T): Promise<T> {
    try {
      await this.collection.insertOne(item);
      return item;
    } catch (e) {
      throw new DatabaseError(e);
    }
  }
  update(_id: string, item: T): Promise<WriteOpResult> {
    return this.collection.update({ _id }, item);
  }
  delete(_id: string): Promise<DeleteWriteOpResultObject> {
    return this.collection.deleteOne({ _id });
  }
}
