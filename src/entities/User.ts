import { BaseEntity } from "./BaseEntity";
import {
  Matches,
  IsEmail,
  MaxLength,
  IsBoolean,
  Length
} from "class-validator";

export class User extends BaseEntity {
  @Matches(/^[a-zA-Z][a-zA-Z0-9_]{2,15}$/, {
    groups: ["query", "mutation"],
    message: "Username not valid"
  })
  username?: string;

  @IsEmail({}, { groups: ["query", "mutation"] })
  email?: string;

  @Length(8, 256, { groups: ["mutation"] })
  password?: string;

  @MaxLength(50, { groups: ["mutation"] })
  fullname?: string;

  @MaxLength(256, { groups: ["mutation"] })
  description?: string;

  @IsBoolean({ groups: ["mutation"] })
  hasAvatar?: boolean;

  @IsBoolean({ groups: ["mutation"] })
  isSecret?: boolean;

  @Length(8, 256, { groups: ["query"] })
  googleId?: string;

  onboard?: boolean;
}
