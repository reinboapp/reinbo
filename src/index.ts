// tslint:disable-next-line:no-var-requires
require("now-env");
// tslint:disable-next-line:no-var-requires
require("pretty-error").start();

import { GraphQLServer } from "graphql-yoga";
import { MongoClient, ObjectId } from "mongodb";

import { default as typeDefs } from "./typeDefs";
import { default as resolvers } from "./resolvers";
import { ContextParameters } from "graphql-yoga/dist/types";
import getContext from "./getContext";

const mongoUri = process.env.MONGO_URI_DEVELOPMENT;

/** this */
ObjectId.prototype.valueOf = function() {
  return this.toString();
};

MongoClient.connect(
  mongoUri,
  { useNewUrlParser: true }
)
  .then(client => {
    const context = getContext(client);

    const server = new GraphQLServer({
      typeDefs,
      resolvers,
      context
    });

    server.start(() => console.log("Server is running on localhost:4000"));
  })
  .catch(err => {
    console.log(err);
    console.error("Not connect mongo");
  });
