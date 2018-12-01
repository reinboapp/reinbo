import BaseError from "./BaseError";

export default class BadRequestError extends BaseError {
  // message: string;
  constructor(message: string = "Bad Request: Invalid Data") {
    super({
      statusCode: 400,
      name: "BadRequest",
      message
    });
  }
}
