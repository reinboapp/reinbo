import { authLogin } from "./auth/authLogin";
import { authRefreshToken } from "./auth/authRefreshToken";
import { getAuthUser } from "./auth/getAuthUser";
import { authWithGoogle } from "./auth/authWithGoogle";

export default {
  Mutation: {
    // authLogin,
    authRefreshToken,
    authWithGoogle
  },
  Auth: {
    authUser: getAuthUser
  }
};
