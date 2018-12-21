import { authLogin } from "./auth/authLogin";
import { authRefreshToken } from "./auth/authRefreshToken";

export default {
  Mutation: {
    authLogin,
    authRefreshToken
  }
};
