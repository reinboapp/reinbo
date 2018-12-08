import { IsMongoId, IsDate } from "class-validator";
import { ObjectID } from "bson";

export class BaseEntity {
  @IsMongoId({ groups: ["query"] })
  _id?: string | ObjectID;

  createdAt?: Date;
  updatedAt?: Date;
}
