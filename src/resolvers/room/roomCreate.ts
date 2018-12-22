import { validate, ValidationError } from "class-validator";
import { Db } from "mongodb";
import { Room } from "../../entities/Room";
import CustomValidationError from "../../errors/CustomValidationError";

export async function roomCreate(
  _,
  { input }: { input: Room },
  { mongoDb }: { mongoDb: Db }
) {
  const room = new Room();

  const errors: ValidationError[] = await validate(room, {
    groups: ["mutation"]
  });

  if (errors.length > 0) {
    throw new CustomValidationError(errors);
  } else {
    return null;
  }
}
