import { BaseEntity } from "./BaseEntity";
import { Matches, IsEmail, MinLength } from "class-validator";

export class Room extends BaseEntity {
  @Matches(/^[a-zA-Z][a-zA-Z0-9_]{2,15}$/, {
    groups: ["query", "mutation"],
    message: "Roomname not valid"
  })
  roomname?: string;
}
