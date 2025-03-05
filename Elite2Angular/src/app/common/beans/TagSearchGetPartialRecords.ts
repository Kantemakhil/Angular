import {BaseModel} from './BaseModel';

export class TagSearchGetPartialRecords extends BaseModel {

  private _lastName: string;
  private _hits: string;
  private _secondMiddleName: string;

    get lastName(): string { return this._lastName; }

    set lastName(plastName: string){ this._lastName = plastName; }

    get hits(): string { return this._hits; }

    set hits(phits: string){ this._hits = phits; }

    get secondMiddleName(): string { return this._secondMiddleName; }

    set secondMiddleName(psecondMiddleName: string){ this._secondMiddleName = psecondMiddleName; }

    toJSON(): any {
        return {
            'lastName': this._lastName,
            'hits': this._hits,
            'secondMiddleName': this._secondMiddleName
        };
    }
}
