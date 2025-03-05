import { BaseModel } from "@common/beans/BaseModel";

export class OffenderGrievStaffs extends BaseModel {
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _grievanceId: number;
    private _sealFlag: string;
    private _staffId: number;
    private _lastName: string;
    private _firstName: string;
    private _middleName: string;
    private _code: number;
    private _rowId: number;
    private _returnValue: number;
    private _tempStaffId: string;

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get grievanceId(): number { return this._grievanceId; }
    set grievanceId(pgrievanceId: number) { this._grievanceId = pgrievanceId; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get staffId(): number { return this._staffId; }
    set staffId(pstaffId: number) { this._staffId = pstaffId; }
    get lastName(): string { return this._lastName; }
    set lastName(plastName: string) { this._lastName = plastName; }
    get firstName(): string { return this._firstName; }
    set firstName(pfirstName: string) { this._firstName = pfirstName; }
    get middleName(): string { return this._middleName; }
    set middleName(pmiddleName: string) { this._middleName = pmiddleName; }
    get code(): number { return this._code; }
    set code(pcode: number) { this._code = pcode; }
    get rowId(): number { return this._rowId; }
    set rowId(prowId: number) { this._rowId = prowId; }
    get returnValue(): number { return this._returnValue; }
    set returnValue(preturnValue: number) { this._returnValue = preturnValue; }
    get tempStaffId():string { return this._tempStaffId; }
    set tempStaffId(ptempStaffId:string) { this._tempStaffId = ptempStaffId; }


    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'grievanceId': this._grievanceId,
            'sealFlag': this._sealFlag,
            'staffId': this._staffId,
            'lastName': this._lastName,
            'firstName': this._firstName,
            'middleName': this._middleName,
            'code': this._code,
            'rowId': this._rowId,
            'returnValue': this._returnValue,
        };
    }
}
