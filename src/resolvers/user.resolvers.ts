import { userCreate } from "./user/userCreate";
import { userFind } from "./user/userFind";
import { userFindOne } from "./user/userFindOne";
import { userUpdate } from "./user/userUpdate";

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
