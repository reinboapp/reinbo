import { ValidationError } from "class-validator";
import BaseError from "./BaseError";

export default class CustomValidationError extends BaseError {
  // message: string;
  constructor(errors: ValidationError[]) {
    super({
      statusCode: 400,
      name: "ValidationError",
      message: `Failed to Validate: ${errors
        .map(error => error.property)
        .join(", ")}`,
      details: errors.map(error => error.constraints)
    });

    console.log(errors);
  }
}
