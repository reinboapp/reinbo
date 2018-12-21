import { userCreate } from "./user/userCreate";
import { userFind } from "./user/userFind";
import { userFindOne } from "./user/userFindOne";

export default {
  Query: {
    userFind,
    userFindOne
  },
  Mutation: {
    userCreate
  }
};
