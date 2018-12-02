import { Matches, IsEmail, MinLength } from "class-validator";

export class Auth {
  @Matches(/^[a-zA-Z][a-zA-Z0-9_]{2,15}$/, {
    groups: ["loginUsername"]
  })
  username?: string;

  @IsEmail({}, { groups: ["loginEmail"] })
  email?: string;

  @MinLength(8, { groups: ["loginUsername", "loginEmail"] })
  password?: string;
}
