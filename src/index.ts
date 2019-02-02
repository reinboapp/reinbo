// tslint:disable-next-line:no-var-requires
require("now-env");
// tslint:disable-next-line:no-var-requires
require("pretty-error").start();

import { GraphQLServer } from "graphql-yoga";
import { MongoClient, ObjectId, Db } from "mongodb";
import getContext from "./getContext";
import middlewares from "./middlewares";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";

const mongoUri = process.env.MONGO_URI;

/** this */
ObjectId.prototype.valueOf = function() {
  return this.toString();
};

let mongoDbClient = null;

MongoClient.connect(
  mongoUri,
  {
    useNewUrlParser: true
  }
)
  .then(async (client: MongoClient) => {
    console.log("mongodb connected");
    mongoDbClient = client;
  })
  .catch(err => {
    console.error(err);
  });

export const mongoClient = (): MongoClient | null => mongoDbClient;

const context = getContext();

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context,
  middlewares
});

server.start(
  {
    formatError(err) {
      return {
        ...err.originalError,
        ...err
      };
    }
  },
  () => console.log("Server is running on localhost:4000")
);
