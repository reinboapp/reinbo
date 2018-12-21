// tslint:disable-next-line:no-var-requires
require("now-env");
// tslint:disable-next-line:no-var-requires
require("pretty-error").start();

import { GraphQLServer } from "graphql-yoga";
import { MongoClient, ObjectId } from "mongodb";
import getContext from "./getContext";
import middlewares from "./middlewares";
import { default as resolvers } from "./resolvers";
import { default as typeDefs } from "./typeDefs";

const mongoUri = process.env.MONGO_URI_DEVELOPMENT;

/** this */
ObjectId.prototype.valueOf = function() {
  return this.toString();
};

MongoClient.connect(
  mongoUri,
  {
    useNewUrlParser: true
  }
)
  .then(async client => {
    const context = getContext(client);

    const server = new GraphQLServer({
      typeDefs,
      resolvers,
      context,
      middlewares
    });

    await server.start({
      formatError(err) {
        return {
          ...err.originalError,
          ...err
        };
      }
    });
    console.log("Server is running on localhost:4000");
  })
  .catch(err => {
    console.error(err);
  });
