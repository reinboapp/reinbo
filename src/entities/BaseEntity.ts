import { ObjectID } from "bson";
import { IsMongoId } from "class-validator";

export class BaseEntity {
  @IsMongoId({ groups: ["query"] })
  _id?: object | ObjectID | string; // object is for, query like {$in : []} or {$all : []}

  createdAt?: Date;
  updatedAt?: Date;
}
