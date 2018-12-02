import { ValidationError } from "class-validator";
import BaseError from "./BaseError";

/** because name ValidationError exists in `class-validator` */
export default class CustomValidationError extends BaseError {
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
