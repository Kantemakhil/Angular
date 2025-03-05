import { BaseModel } from '@commonbeans/BaseModel';

export class prgPayBatchesBean extends BaseModel {
    private _batchId: number;
    private _fromDate: Date;
    private _toDate: Date;
    private _batchPayAmount: number;
    private _batchGeneratedDatetime: Date;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _sealFlag: string;
    private _offenderBookId: number;
    

    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get batchId(): number { return this._batchId; }
    set batchId(pbatchId: number) { this._batchId = pbatchId; }

    get fromDate(): Date { return this._fromDate; }
    set fromDate(pfromDate: Date) { this._fromDate = pfromDate; }

    get toDate(): Date { return this._toDate; }
    set toDate(ptoDate: Date) { this._toDate = ptoDate; }

    get batchPayAmount(): number { return this._batchPayAmount; }
    set batchPayAmount(pbatchPayAmount: number) { this._batchPayAmount = pbatchPayAmount; }

    get batchGeneratedDatetime(): Date { return this._batchGeneratedDatetime; }
    set batchGeneratedDatetime(pbatchGeneratedDatetime: Date) { this._batchGeneratedDatetime = pbatchGeneratedDatetime; }

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }


    toJSON(): any {
        return {
            'batchId': this._batchId,
            'fromDate': this._fromDate,
            'toDate': this._toDate,
            'batchPayAmount': this._batchPayAmount,
            'batchGeneratedDatetime': this._batchGeneratedDatetime,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'offenderBookId': this._offenderBookId
        };
    }
}

