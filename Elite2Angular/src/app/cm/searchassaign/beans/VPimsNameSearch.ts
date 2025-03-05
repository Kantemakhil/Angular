import { BaseModel } from '@commonbeans/BaseModel';

export class VPimsNameSearch extends BaseModel {
    private _firstName: string;
    private _lastName: string;
    private _livingUnitId: number;
    private _serialVersionUID: number;
    private _prisonLocation: string;
    private _offenderBookId: number;
    private _offenderIdDisplay: string;
    private _middleName: string;
    private _rootOffenderId: number;
    private _offenderId: number;
    private _birthDate: Date;
    private _activeFlag: string;
    private _agyLocId: string;

    get firstName(): string { return this._firstName; }
    set firstName(pfirstName: string) { this._firstName = pfirstName; }
    get lastName(): string { return this._lastName; }
    set lastName(plastName: string) { this._lastName = plastName; }
    get livingUnitId(): number { return this._livingUnitId; }
    set livingUnitId(plivingUnitId: number) { this._livingUnitId = plivingUnitId; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
    get prisonLocation(): string { return this._prisonLocation; }
    set prisonLocation(pprisonLocation: string) { this._prisonLocation = pprisonLocation; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
    get offenderIdDisplay(): string { return this._offenderIdDisplay; }
    set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }
    get middleName(): string { return this._middleName; }
    set middleName(pmiddleName: string) { this._middleName = pmiddleName; }
    get rootOffenderId(): number { return this._rootOffenderId; }
    set rootOffenderId(prootOffenderId: number) { this._rootOffenderId = prootOffenderId; }
    get offenderId(): number { return this._offenderId; }
    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }
    get birthDate(): Date { return this._birthDate; }
    set birthDate(pbirthDate: Date) { this._birthDate = pbirthDate; }
    get activeFlag(): string { return this._activeFlag; }
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }
    get agyLocId(): string { return this._agyLocId; }
    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

    toJSON(): any {
        return {
            'firstName': this._firstName,
            'lastName': this._lastName,
            'livingUnitId': this._livingUnitId,
            'serialVersionUID': this._serialVersionUID,
            'prisonLocation': this._prisonLocation,
            'offenderBookId': this._offenderBookId,
            'offenderIdDisplay': this._offenderIdDisplay,
            'middleName': this._middleName,
            'rootOffenderId': this._rootOffenderId,
            'offenderId': this._offenderId,
            'birthDate': this._birthDate,
            'activeFlag': this._activeFlag,
            'agyLocId': this._agyLocId,
        };
    }
}
