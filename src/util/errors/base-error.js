export default class BaseError extends Error {
  constructor(message, code = 500, description = null) {
    super(message);
    this.message = message;
    this.code = code;
    this.description = description;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
