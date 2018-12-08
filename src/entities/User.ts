import { BaseEntity } from "./BaseEntity";
import { Matches, IsEmail, MinLength } from "class-validator";

export class User extends BaseEntity {
  @Matches(/^[a-zA-Z][a-zA-Z0-9_]{2,15}$/, {
    groups: ["query", "mutation"],
    message: "Username not valid"
  })
  username?: string;

  @IsEmail({}, { groups: ["query", "mutation"] })
  email?: string;

  @MinLength(8, { groups: ["mutation"] })
  password?: string;
}
