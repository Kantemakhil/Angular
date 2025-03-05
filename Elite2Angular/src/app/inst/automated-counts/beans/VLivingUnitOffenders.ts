import { BaseModel } from '@commonbeans/BaseModel';

export class VLivingUnitOffenders extends BaseModel {
    private _lastName: string;
    private _offenderBookId: number;
    private _alertFlag: string;
    private _offenderIdDisplay: string;
    private _livingUnitDesc: string;
    private _agencyImlId: number;
    private _rootLivingUnitId: number;
    private _firstName: string;
    private _livingUnitId: number;
    private _serialVersionUID: number;
    private _agencyImlDesc: string;
    private _inOutStatus: string;
    private _parentLivingUnitId: number;
    private _agyLocId: string;
    private _offenderId: number;
    private _activeFlag: string;
    private _cellType: string;


    get cellType(): string { return this._cellType; }

    set cellType(pcellType: string) { this._cellType = pcellType; }

    get lastName(): string { return this._lastName; }

    set lastName(plastName: string) { this._lastName = plastName; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get alertFlag(): string { return this._alertFlag; }

    set alertFlag(palertFlag: string) { this._alertFlag = palertFlag; }

    get offenderIdDisplay(): string { return this._offenderIdDisplay; }

    set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }

    get livingUnitDesc(): string { return this._livingUnitDesc; }

    set livingUnitDesc(plivingUnitDesc: string) { this._livingUnitDesc = plivingUnitDesc; }

    get agencyImlId(): number { return this._agencyImlId; }

    set agencyImlId(pagencyImlId: number) { this._agencyImlId = pagencyImlId; }

    get rootLivingUnitId(): number { return this._rootLivingUnitId; }

    set rootLivingUnitId(prootLivingUnitId: number) { this._rootLivingUnitId = prootLivingUnitId; }

    get firstName(): string { return this._firstName; }

    set firstName(pfirstName: string) { this._firstName = pfirstName; }

    get livingUnitId(): number { return this._livingUnitId; }

    set livingUnitId(plivingUnitId: number) { this._livingUnitId = plivingUnitId; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get agencyImlDesc(): string { return this._agencyImlDesc; }

    set agencyImlDesc(pagencyImlDesc: string) { this._agencyImlDesc = pagencyImlDesc; }

    get inOutStatus(): string { return this._inOutStatus; }

    set inOutStatus(pinOutStatus: string) { this._inOutStatus = pinOutStatus; }

    get parentLivingUnitId(): number { return this._parentLivingUnitId; }

    set parentLivingUnitId(pparentLivingUnitId: number) { this._parentLivingUnitId = pparentLivingUnitId; }

    get agyLocId(): string { return this._agyLocId; }

    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

    get offenderId(): number { return this._offenderId; }

    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }


    toJSON(): any {
        return {
            'lastName': this._lastName,
            'offenderBookId': this._offenderBookId,
            'alertFlag': this._alertFlag,
            'offenderIdDisplay': this._offenderIdDisplay,
            'livingUnitDesc': this._livingUnitDesc,
            'agencyImlId': this._agencyImlId,
            'rootLivingUnitId': this._rootLivingUnitId,
            'firstName': this._firstName,
            'livingUnitId': this._livingUnitId,
            'serialVersionUID': this._serialVersionUID,
            'agencyImlDesc': this._agencyImlDesc,
            'inOutStatus': this._inOutStatus,
            'parentLivingUnitId': this._parentLivingUnitId,
            'agyLocId': this._agyLocId,
            'offenderId': this._offenderId,
            'activeFlag': this._activeFlag,
            'cellType': this._cellType
        };
    }
}