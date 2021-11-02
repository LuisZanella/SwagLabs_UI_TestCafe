export class NotANumberException extends Error {
  public _originalError: unknown;
  public _errorCode: number;
  public _status: string;
  public _menssage: string;

  constructor(msg = '', originalError: Error = new Error()) {
    super(msg);
    this._originalError = originalError;
    this._errorCode = 100.1;
    this._status = 'Not a number';
    this._menssage = 'Error in the validation of a number';
  }
}

export class SortLowToHighPriceFilterException extends Error {
  public _originalError: unknown;
  public _errorCode: number;
  public _status: string;
  public _menssage: string;

  constructor(msg = '', originalError: Error = new Error()) {
    super(msg);
    this._originalError = originalError;
    this._errorCode = 700.1;
    this._status = 'Filter Fail';
    this._menssage = 'The filter Low to High Price is not working properly';
  }
}
