import { BaseEntity } from "./BaseEntity";
import { Matches, IsEmail, MinLength } from "class-validator";

export class Room extends BaseEntity {
  name?: string;
}
