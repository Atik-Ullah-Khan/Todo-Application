/***
 * Title : Custom error class.
 * Author : Atik Ullah Khan.
 * Description : Custom error class that extend Error class.
 * Date : 24/11/2022.
 ***/

class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.message = message;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

module.exports = CustomError;
