import { ContextParameters } from "graphql-yoga/dist/types";
import { MongoClient, Db } from "mongodb";

export interface AppContext {
  mongoDb: Db;
  user: object;
}

const getContext = (client: MongoClient) => {
  const context = async (req: ContextParameters): Promise<AppContext> => {
    // Authorization -> return user
    const authHeader: string = req.request.header("Authorization");
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
      user
    };
  };
  return context;
};

export default getContext;
