import BaseError from "./BaseError";
import { MongoError } from "mongodb";

export default class DatabaseError extends BaseError {
  // message: string;
  constructor(e: MongoError) {
    super({
      statusCode: 500,
      name: "DatabaseError",
      message: e.message,
      details: [{ ...e, errmsg: undefined }]
    });
  }
}
