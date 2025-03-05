import { BaseModel } from './../../../../common/beans/BaseModel';
// import { BaseModel } from '@commonbeans/BaseModel';
export class CourseActivityAreas extends BaseModel {
    private _crsActyId: number;
    private _areaCode: string;
    private _areaClass: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _caseLoadType: string;
    private _seqOne: number;


    get seqOne(): number { return this._seqOne; }
    set seqOne(pseqOne: number) { this._seqOne = pseqOne; }

    get crsActyId(): number { return this._crsActyId; }

    set crsActyId(crsActyId: number) { this._crsActyId = crsActyId; }

    get caseLoadType(): string { return this._caseLoadType; }

    set caseLoadType(caseLoadType: string) { this._caseLoadType = caseLoadType; }

    get areaCode(): string { return this._areaCode; }

    set areaCode(areaCode: string) { this._areaCode = areaCode; }

    get areaClass(): string { return this._areaClass; }

    set areaClass(areaClass: string) { this._areaClass = areaClass; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(createDatetime: Date) { this._createDatetime = createDatetime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(createUserId: string) { this._createUserId = createUserId; }


    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(modifyDatetime: Date) { this._modifyDatetime = modifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(modifyUserId: string) { this._modifyUserId = modifyUserId; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(sealFlag: string) { this._sealFlag = sealFlag; }

    toJSON(): any {
        return {
            'crsActyId': this._crsActyId,
            'areaCode': this._areaCode,
            'areaClass': this._areaClass,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'caseLoadType': this._caseLoadType,
            'seqOne': this._seqOne,

        }
    };

}