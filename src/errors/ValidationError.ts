import BaseError from "./BaseError";

export default class ValidationError extends BaseError {
  // message: string;
  constructor(message: string = "Validation Error") {
    super({
      statusCode: 400,
      name: "ValidationError",
      message
    });
  }
}
