import { Matches, IsEmail, IsMongoId, MinLength } from "class-validator";

export class User {
  @IsMongoId({
    groups: ["show"]
  })
  _id?: string;

  @Matches(/^[a-zA-Z][a-zA-Z0-9_]{2,15}$/, {
    groups: ["show", "create"]
  })
  username?: string;

  @IsEmail(
    {},
    {
      groups: ["show", "create"]
    }
  )
  email?: string;

  @MinLength(8, {
    groups: ["create"]
  })
  password?: string;
}
