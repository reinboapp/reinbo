// tslint:disable-next-line:no-var-requires
require("now-env");
import { MongoClient } from "mongodb";

const url = process.env.MONGO_URI_DEVELOPMENT;

MongoClient.connect(
  url,
  { useNewUrlParser: true }
).then(async client => {
  const db = client.db();

  console.log("creating index for users");

  await db.createIndex("users", "email", { unique: true });
  await db.createIndex("users", "username", { unique: true });
  await db.createIndex("users", { username: "text", email: "text" });

  console.log("finish creating index");

  await client.close();
  console.log("closed");
});
