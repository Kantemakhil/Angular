import {BaseModel} from './BaseModel';

export class TagSearchGetOffenderIdentifiers extends BaseModel {

  private _offenderId: number;
  private _identifierType: string;
  private _identifier: string;

    get offenderId(): number { return this._offenderId; }

    set offenderId(poffenderId: number){ this._offenderId = poffenderId; }

    get identifierType(): string { return this._identifierType; }

    set identifierType(pidentifierType: string){ this._identifierType = pidentifierType; }

    get identifier(): string { return this._identifier; }

    set identifier(pidentifier: string){ this._identifier = pidentifier; }

    toJSON(): any {
        return {
              'offenderId': this._offenderId,
              'identifierType': this._identifierType,
              'identifier': this._identifier
        };
    }
}

