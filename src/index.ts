// tslint:disable-next-line:no-var-requires
require("now-env");

import { GraphQLServer } from "graphql-yoga";
import { MongoClient, ObjectId } from "mongodb";

import { default as typeDefs } from "./typeDefs";
import { default as resolvers } from "./resolvers";

const url = process.env.MONGO_URI_DEVELOPMENT;

/** this */
ObjectId.prototype.valueOf = function() {
  return this.toString();
};

MongoClient.connect(
  url,
  { useNewUrlParser: true }
)
  .then(client => {
    const context = {
      mongoDb: client.db()
    };

    const server = new GraphQLServer({
      typeDefs,
      resolvers,
      context
    });

    server.start(() => console.log("Server is running on localhost:4000"));
  })
  .catch(() => {
    console.error("Not connect mongo");
  });
