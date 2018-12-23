import BaseError from "./BaseError";

export default class NotFoundError extends BaseError {
  // message: string;
  constructor(message: string = "Entities Not Found", details?: object[]) {
    super({
      statusCode: 404,
      name: "NotFoundError",
      message,
      details
    });
  }
}
