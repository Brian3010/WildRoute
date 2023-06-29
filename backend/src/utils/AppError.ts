// create custom AppError inherit from built-in Error
class AppError extends Error {
  message: string;
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
