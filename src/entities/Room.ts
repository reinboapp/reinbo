import { BaseEntity } from "./BaseEntity";
import {
  Matches,
  Length,
  MaxLength,
  IsBoolean,
  IsArray
} from "class-validator";
import { ObjectID } from "bson";

export class Room extends BaseEntity {
  @Matches(/^[a-zA-Z][a-zA-Z0-9_]{2,15}$/, {
    groups: ["query", "mutation"],
    message: "Roomname not valid"
  })
  roomname?: string;

  @Length(3, 50, { groups: ["query", "mutation"] })
  name?: string;

  @MaxLength(256, { groups: ["mutation"] })
  description?: string;

  @IsBoolean({ groups: ["mutation"] })
  isSecret?: boolean;

  @IsBoolean({ groups: ["mutation"] })
  isGroup?: boolean;

  @Matches(/^[a-zA-Z][a-zA-Z0-9_]{2,15}$/, {
    each: true
  })
  tags?: [string];

  members?: ObjectID[];
  admins?: ObjectID[];
  owner?: ObjectID;
}
