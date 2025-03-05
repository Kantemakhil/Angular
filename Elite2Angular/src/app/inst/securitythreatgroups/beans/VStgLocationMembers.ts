
import { BaseModel } from '@commonbeans/BaseModel';

export class  VStgLocationMembers extends BaseModel {

    private _agyLocId: string;
    private _offenderBookId: number;
    private _stgId: number;
    private _livingUnitId: number;
    private _description: String;
    private _listseq: number;
    private _offenderId: number;
    private _offenderIdDisplay: String;
    private _firstName: String;
    private _lastName: String;
    private _status: String;

    get agyLocId(): string { return this._agyLocId; }

    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }


    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }


    get stgId(): number { return this._stgId; }

    set stgId(_stgId: number) { this._stgId = _stgId; }


    get livingUnitId(): number { return this._livingUnitId; }

    set livingUnitId(plivingUnitId: number) { this._livingUnitId = plivingUnitId; }


    get description(): String { return this._description; }

    set description(_description: String) { this._description = _description; }


    get listseq(): number { return this._listseq; }

    set listseq(plistseq: number) { this._listseq = plistseq; }


    get offenderId(): number { return this._offenderId; }

    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }


    get offenderIdDisplay(): String { return this._offenderIdDisplay; }

    set offenderIdDisplay(poffenderIdDisplay: String) { this._offenderIdDisplay = poffenderIdDisplay; }


    get firstName(): String { return this._firstName; }

    set firstName(_firstName: String) { this._firstName = _firstName; }


    get lastName(): String { return this._lastName; }

    set lastName(_lastName: String) { this._lastName = _lastName; }

    get status(): String { return this._status; }

    set status(_status: String) { this._status = _status; }


    toJSON(): any {
        return {
            'agyLocId': this._agyLocId,
            'offenderBookId': this._offenderBookId,
            'stgId': this._stgId,
            'livingUnitId': this._livingUnitId,
            'description': this._description,
            'listseq': this._listseq,
            'offenderId': this._offenderId,
            'offenderIdDisplay': this._offenderIdDisplay,
            'firstName': this._firstName,
            'lastName': this._lastName,
            'status': this._status,
};
    }
}

