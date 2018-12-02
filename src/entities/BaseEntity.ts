import { IsMongoId, IsDate } from "class-validator";

export class BaseEntity {
  @IsMongoId({ groups: ["show"] })
  _id?: string;

  @IsDate({ groups: ["show"] })
  createdAt?: Date;
  @IsDate({ groups: ["show"] })
  updatedAt?: Date;
}
