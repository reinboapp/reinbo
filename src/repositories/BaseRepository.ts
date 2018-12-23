import { Collection, Db, ObjectID } from "mongodb";
import DatabaseError from "../errors/DatabaseError";
import { BaseEntity } from "./../entities/BaseEntity";
import NotFoundError from "../errors/NotFoundError";
import BaseError from "../errors/BaseError";

export class BaseRepository<T extends BaseEntity> {
  protected readonly collection: Collection;
  protected collectionName: string;

  constructor(db: Db, collectionName: string) {
    this.collectionName = collectionName;
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
  async findOne(item: T): Promise<T> {
    try {
      const result = await this.collection.findOne(item);
      if (!result) {
        throw new NotFoundError(undefined, [{ entity: this.collectionName }]);
      }
      return result;
    } catch (e) {
      if (e.statusCode) {
        throw e;
      }
      throw new DatabaseError(e);
    }
  }

  async create(item: T): Promise<T> {
    try {
      item.createdAt = new Date();
      item.updatedAt = new Date();
      await this.collection.insertOne(item);
      return item;
    } catch (e) {
      throw new DatabaseError(e);
    }
  }

  async update(_id: ObjectID, item: T): Promise<T> {
    try {
      item.updatedAt = new Date();
      const result = await this.collection.findOneAndUpdate(
        { _id },
        { $set: item },
        { returnOriginal: false }
      );
      return result.value;
    } catch (e) {
      throw new DatabaseError(e);
    }
  }

  async delete(_id: ObjectID): Promise<true> {
    try {
      _id = new ObjectID(_id);
      await this.collection.deleteOne({ _id });
      return true;
    } catch (e) {
      throw new DatabaseError(e);
    }
  }
}
