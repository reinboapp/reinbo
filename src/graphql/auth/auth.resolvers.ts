// import { authLogin } from "./authLogin";
import { authRefreshToken } from "./authRefreshToken";
import { getAuthUser } from "./getAuthUser";
import { authWithGoogle } from "./authWithGoogle";

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
