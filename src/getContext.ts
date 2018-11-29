import { ContextParameters } from "graphql-yoga/dist/types";
import { MongoClient, Db } from "mongodb";

export interface AppContext {
  mongoDb: Db;
  authUser: object;
  userAgent: string;
}

const getContext = (client: MongoClient) => {
  const context = async (req: ContextParameters): Promise<AppContext> => {
    // get from header
    const authHeader: string = req.request.header("Authorization");
    const userAgent: string = req.request.header("user-agent");

    let token: string = "";
    if (authHeader) {
      const [firstWord, secondWord] = authHeader.split(" ");
      if (firstWord === "Bearer" && secondWord) {
        token = secondWord;
      }
      console.log(token);
    }

    const user = {};

    return {
      mongoDb: client.db(),
      authUser: user,
      userAgent
    };
  };
  return context;
};

export default getContext;
