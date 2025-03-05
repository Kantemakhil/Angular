export class CaseloadLimits {

    private _createDatetime: Date;
    private _createUserId: string;
    private _listSeq: number;
    private _modifyDate: Date;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _caseloadId: string;
    private _limitType: string;
    private _periodType: string;
    private _limitAmount: number;


    get limitAmount(): number { return this._limitAmount; }
    set limitAmount(plimitAmount: number) { this._limitAmount = plimitAmount; }
    get periodType(): string { return this._periodType; }
    set periodType(pperiodType: string) { this._periodType = pperiodType; }
    get limitType(): string { return this._limitType; }
    set limitType(plimitType: string) { this._limitType = plimitType; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get listSeq(): number { return this._listSeq; }
    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }
    get modifyDate(): Date { return this._modifyDate; }
    set modifyDate(pmodifyDate: Date) { this._modifyDate = pmodifyDate; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get caseloadId(): string { return this._caseloadId; }
    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }


    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'listSeq': this._listSeq,
            'modifyDate': this._modifyDate,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'caseloadId': this._caseloadId,
            'limitType': this._limitType,
            'periodType': this._periodType,
            'limitAmount': this._limitAmount

        };
    }
}
