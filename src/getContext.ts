import { ContextParameters } from "graphql-yoga/dist/types";
import { MongoClient } from "mongodb";

const getContext = (client: MongoClient) => {
  const context = async (req: ContextParameters) => {
    const authHeader: string = req.request.header("Authorization");
    let token = "";
    if (authHeader) {
      const [firstWord, secondWord] = authHeader.split(" ");
      if (firstWord === "Bearer" && secondWord) {
        token = secondWord;
      }
      console.log(token);
    }
    return {
      mongoDb: client.db()
    };
  };
  return context;
};

export default getContext;
