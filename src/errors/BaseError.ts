export interface BaseErrorConstructor {
  name?: string;
  statusCode?: number;
  message?: string;
  details?: any[];
}

export default class BaseError extends Error {
  statusCode: number;
  details: any[];

  constructor({
    statusCode = 500,
    name = "UnknownError",
    message = "An unknown error occurred.",
    details = []
  }: BaseErrorConstructor) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.details = details;
    this.message = message;
  }
}
