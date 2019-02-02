import { userCreate } from "./userCreate";
import { userFind } from "./userFind";
import { userFindOne } from "./userFindOne";
import { userUpdate } from "./userUpdate";

export default {
  Query: {
    userFind,
    userFindOne
  },
  Mutation: {
    // userCreate,
    userUpdate
  }
};
