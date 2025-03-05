import { BaseModel } from "../../../../common/beans/BaseModel";

export class MaintainTierLevels extends BaseModel {
    private _code: string;
    private _description: string;
    private _workloadValue: number;
    private _defaultIntakeTierFlag: any;
    private _caseloadId: string;
    private _reviewDays: number;
    private _listSequence: number;
    private _activeFlag: any;
    private _expiryDate: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _createDatetime: Date;
    private _editableBtn: number;
    private _sealFlag : string;
    private _versionNo: number;





    get code(): string { return this._code; }
    set code(value: string) { this._code = value; }
    get description(): string { return this._description; }
    set description(value: string) { this._description = value; }
    get workloadValue(): number { return this._workloadValue; }
    set workloadValue(value: number) { this._workloadValue = value; }
    get defaultIntakeTierFlag(): any { return this._defaultIntakeTierFlag; }
    set defaultIntakeTierFlag(value: any) { this._defaultIntakeTierFlag = value; }
    get caseloadId(): string { return this._caseloadId; }
    set caseloadId(value: string) { this._caseloadId = value; } 
    get reviewDays(): number { return this._reviewDays; }
    set reviewDays(value: number) { this._reviewDays = value; }
    get listSequence(): number { return this._listSequence; }
    set listSequence(value: number) { this._listSequence = value; }
    get activeFlag(): any { return this._activeFlag; }
    set activeFlag(value: any) { this._activeFlag = value; }
    get expiryDate(): Date { return this._expiryDate; }
    set expiryDate(value: Date) { this._expiryDate = value; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(value: Date) { this._createDatetime = value; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(_createUserId: string) { this._createUserId = _createUserId; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(value: Date) { this._modifyDatetime = value; }
    get editableBtn(): number { return this._editableBtn; }
    set editableBtn(value: number) { this._editableBtn = value; }
    get sealFlag() {return this._sealFlag;}
    set sealFlag(value) {this._sealFlag = value;}
    get versionNo(): number {return this._versionNo;}
    set versionNo(value: number) {this._versionNo = value;}
    toJSON(): any {
        return {
            'code': this._code,
            'description': this._description,
            'workloadValue': this._workloadValue,
            'defaultIntakeTierFlag': this._defaultIntakeTierFlag,
            'reviewDays': this._reviewDays,
            'sequence': this._listSequence,
            'active': this._activeFlag,
            'expiryDate': this._expiryDate,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'createDatetime': this._createDatetime,
            'editableBtn': this._editableBtn,
            'sealFlag' : this._sealFlag,
            'caseloadId':this._caseloadId,
            'versionNo':this._versionNo,
        };

    }


}