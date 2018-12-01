import BaseError from "./BaseError";

export default class UnauthorizedError extends BaseError {
  // message: string;
  constructor(message: string = "Not Authorized!") {
    super({
      statusCode: 401,
      name: "UnauthorizedError",
      message
    });
  }
}
