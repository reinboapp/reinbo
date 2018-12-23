import { roomCreate } from "./room/roomCreate";
import { getMembers } from "./room/getMembers";
import { roomFindOne } from "./room/roomFindOne";

export default {
  Query: {
    roomFindOne
    // userFindOne
  },
  Mutation: {
    roomCreate
  },
  Room: {
    members: getMembers
  }
};
