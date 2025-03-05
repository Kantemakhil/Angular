import { BaseModel } from '@commonbeans/BaseModel'

export class OffenderHwdCharges extends BaseModel {

    private _hwdId: number;
    private _hwdChargeId: number;
    private _caseId: number;
    private _chargeCode: string;
    private _chargeComment: string;
    private _triedUntriedCode: string;
    private _chargeStatus: string;
    private _createUserId: string;
    private _createDatetime: Date;
    private _modifyUserId: string;
    private _modifyDatetime: Date;
    private _sealFlag: string;
    private _caseIdValue: string;
    


    get caseIdValue(): string { return this._caseIdValue; }

    set caseIdValue(pcaseIdValue: string) { this._caseIdValue = pcaseIdValue; }

    
    get caseId(): number { return this._caseId; }

    set caseId(pcaseId: number) { this._caseId = pcaseId; }

    get hwdId(): number { return this._hwdId; }

    set hwdId(phwdId: number) { this._hwdId = phwdId; }

    get hwdChargeId(): number { return this._hwdChargeId; }

    set hwdChargeId(phwdChargeId: number) { this._hwdChargeId = phwdChargeId; }

    get chargeCode(): string { return this._chargeCode; }

    set chargeCode(chargeCode: string) { this._chargeCode = chargeCode; }

    get chargeComment(): string { return this._chargeComment; }

    set chargeComment(chargeComment: string) { this._chargeComment = chargeComment; }

    get triedUntriedCode(): string { return this._triedUntriedCode; }

    set triedUntriedCode(ptriedUntriedCode: string) { this._triedUntriedCode = ptriedUntriedCode; }

    get chargeStatus(): string { return this._chargeStatus; }

    set chargeStatus(chargeStatus: string) { this._chargeStatus = chargeStatus; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }



    toJSON(): any {
        return {
            'hwdId': this._hwdId,
            'hwdChargeId': this._hwdChargeId,
            'chargeCode': this._chargeCode,
            'chargeComment': this._chargeComment,
            'triedUntriedCode': this._triedUntriedCode,
            'chargeStatus': this._chargeStatus,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'createUserId': this._createUserId,
            'createDatetime': this._createDatetime,
            'sealFlag': this._sealFlag,
            'caseId' : this._caseId,
            'caseIdValue' : this._caseIdValue,

        };
    }
}
