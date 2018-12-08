import { BaseEntity } from "./../entities/BaseEntity";
import { Db, Collection } from "mongodb";

import DatabaseError from "../errors/DatabaseError";

export class BaseRepository<T extends BaseEntity> {
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
  async findOne(item: T): Promise<T> {
    try {
      const result = await this.collection.findOne(item);
      return result;
    } catch (e) {
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

  async update(_id: string, item: T): Promise<T> {
    try {
      item.updatedAt = new Date();
      await this.collection.updateOne({ _id }, item);
      return item;
    } catch (e) {
      throw new DatabaseError(e);
    }
  }

  async delete(_id: string): Promise<{ deleted: true }> {
    try {
      await this.collection.deleteOne({ _id });
      return { deleted: true };
    } catch (e) {
      throw new DatabaseError(e);
    }
  }
}
