import { ObjectID } from "bson";
import { IsMongoId } from "class-validator";

export class BaseEntity {
  @IsMongoId({ groups: ["query"] })
  _id?: string | ObjectID;

  createdAt?: Date;
  updatedAt?: Date;
}
