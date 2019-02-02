import { AppContext } from "./../../getContext";
import { ObjectID } from "bson";

export function roomJoin(_, { id }: { id: ObjectID }, { mongoDb }: AppContext) {
  return null;
}
