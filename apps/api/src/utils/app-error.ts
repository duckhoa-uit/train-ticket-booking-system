export default class AppError extends Error {
  status: string;
  isOperational: boolean;
  constructor(public statusCode: number = 500, public message: string) {
    super(message);
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// class SomeError extends Error {
//   private _status: number;
//   private _message: string;
//   constructor(status: number, message: string) {
//     super(message);
//     this._status = status;
//     this._message = message;
//   }
//   public get status(): number {
//     return this._status;
//   }
//   public set status(value: number) {
//     this._status = value;
//   }
//   public get message(): string {
//     return this._message;
//   }
//   public set message(value: string) {
//     this._message = value;
//   }
// }
