export class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;

    // TODO: この処理の意味ついて調べる
    Object.setPrototypeOf(this, AppError.prototype);
  }
}