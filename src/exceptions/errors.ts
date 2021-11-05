export class HttpError extends Error {
  public constructor(public message: string, public status = 400, public code = 'badRequest') {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class UnauthorizedError extends HttpError {
  public status = 401;
  public code = 'Unauthorized';

  public constructor(message = 'Not authorized') {
    super(message);
  }
}

export class ServerError extends HttpError {
  public status = 500;
  public code = 'Server error';

  public constructor() {
    super('Server error');
  }
}

export class EntityNotFoundError extends HttpError {
  public status = 404;
  public code = 'notFound';

  public constructor(message: string) {
    super(message);
  }
}

export class FailedValidationError extends HttpError {
  public status = 403;
  public code = 'Forbidden';

  public constructor(message: string) {
    super(message);
  }
}
