import { getMembers } from "./room/getMembers";
import { roomCreate } from "./room/roomCreate";
import { roomJoin } from "./room/roomJoin";
import { roomFindOne } from "./room/roomFindOne";

export default {
  Query: {
    roomFindOne
    // userFindOne
  },
  Mutation: {
    roomCreate,
    roomJoin
  },
  Room: {
    members: getMembers
  }
};
