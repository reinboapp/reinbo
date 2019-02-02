import { getMembers } from "./getMembers";
import { roomCreate } from "./roomCreate";
import { roomJoin } from "./roomJoin";
import { roomFindOne } from "./roomFindOne";

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
