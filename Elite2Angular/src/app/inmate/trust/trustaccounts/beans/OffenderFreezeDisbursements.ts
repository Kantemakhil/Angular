
export class OffenderFreezeDisbursements {


    private _offenderFreezeId: number;

    private _caseloadId: string;


    private _commentText: string;


    private _createDatetime: Date;


    private _createUserId: string;


    private _freezeReasonCode: string;

    private _fromDate: Date;


    private _modifyDatetime: Date;


    private _modifyUserId: string;


    private _offenderId: number;


    private _removedFlag: string;


    private _sealFlag: string;


    private _toDate: Date;

    private _nbtStatus: string;


    get nbtStatus(): string { return this._nbtStatus; }

    set nbtStatus(pnbtStatus: string) { this._nbtStatus = pnbtStatus; }

    get offenderFreezeId(): number { return this._offenderFreezeId; }

    set offenderFreezeId(poffenderFreezeId: number) { this._offenderFreezeId = poffenderFreezeId; }

    get caseloadId(): string { return this._caseloadId; }

    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }

    get commentText(): string { return this._commentText; }

    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._caseloadId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get freezeReasonCode(): string { return this._freezeReasonCode; }

    set freezeReasonCode(pfreezeReasonCode: string) { this._caseloadId = pfreezeReasonCode; }

    get fromDate(): Date { return this._fromDate; }

    set fromDate(pfromDate: Date) { this._fromDate = pfromDate; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get offenderId(): number { return this._offenderId; }

    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }

    get removedFlag(): string { return this._removedFlag; }

    set removedFlag(premovedFlag: string) { this._removedFlag = premovedFlag; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get toDate(): Date { return this._toDate; }

    set toDate(ptoDate: Date) { this._toDate = ptoDate; }


    toJSON(): any {
        return {
            'offenderFreezeId': this._offenderFreezeId,
            'caseloadId': this._caseloadId,
            'modifyDatetime': this._modifyDatetime,
            'commentText': this._commentText,
            'modifyUserId': this._modifyUserId,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'freezeReasonCode': this._freezeReasonCode,
            'fromDate': this._fromDate,
            'offenderId': this._offenderId,
            'removedFlag': this._removedFlag,
            'sealFlag': this._sealFlag,
            'toDate': this._toDate,
            'nbtStatus': this._nbtStatus
        };
    }
}
