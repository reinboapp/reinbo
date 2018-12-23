import { Db, ObjectID } from "mongodb";
import { Room } from "../../entities/Room";
import { RoomRepository } from "../../repositories/RoomRepository";
import CustomValidationError from "../../errors/CustomValidationError";
import { ValidationError, validate } from "class-validator";

export async function roomFindOne(
  _,
  { input }: { input: Room },
  { mongoDb }: { mongoDb: Db }
) {
  const room = new Room();

  Object.keys(input).map(key => {
    if (input[key]) {
      room[key] = input[key];
    }
  });

  const errors: ValidationError[] = await validate(room, {
    groups: ["query"],
    skipMissingProperties: true
  });

  if (errors.length > 0) {
    throw new CustomValidationError(errors);
  } else {
    if (room._id) {
      room._id = new ObjectID(room._id as string);
    }
    const roomRepository = new RoomRepository(mongoDb);
    return roomRepository.findOne(room);
  }
}
