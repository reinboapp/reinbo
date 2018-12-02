import { BaseEntity } from "./BaseEntity";
import { Matches, IsEmail, MinLength } from "class-validator";

export class User extends BaseEntity {
  @Matches(/^[a-zA-Z][a-zA-Z0-9_]{2,15}$/, {
    groups: ["show", "create"],
    message: "Username not valid"
  })
  username?: string;

  @IsEmail({}, { groups: ["show", "create"] })
  email?: string;

  @MinLength(8, { groups: ["create"] })
  password?: string;
}
