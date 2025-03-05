export class BaseModel {

  private _errorMessage: string;

  get errorMessage(): string { return this._errorMessage; }

  set errorMessage(perrorMessage: string) { this._errorMessage = perrorMessage; }

  toJSON(): any {
    return {
    'errorMessage': this._errorMessage
    };
  }
}
