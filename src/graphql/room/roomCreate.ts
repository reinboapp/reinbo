import { AppContext } from "./../../getContext";
import { validate, ValidationError } from "class-validator";
import { ObjectID } from "mongodb";
import { Room } from "../../entities/Room";
import CustomValidationError from "../../errors/CustomValidationError";
import { RoomRepository } from "../../repositories/RoomRepository";

export async function roomCreate(
  _,
  { input }: { input: Room },
  { mongoDb, authUser }: AppContext
) {
  const room = new Room();

  const myId = new ObjectID(authUser._id);

  room.roomname = input.roomname;
  room.name = input.name;
  room.description = input.description;

  room.isGroup = input.isGroup !== undefined ? input.isGroup : true;
  room.isSecret = input.isSecret || false;

  room.members = room.members || [myId];
  room.admins = room.admins || [myId];
  room.owner = myId;

  const errors: ValidationError[] = await validate(room, {
    groups: ["mutation"]
  });

  if (errors.length > 0) {
    throw new CustomValidationError(errors);
  } else {
    const roomRepository = new RoomRepository(mongoDb);
    return roomRepository.create(room);
  }
}
