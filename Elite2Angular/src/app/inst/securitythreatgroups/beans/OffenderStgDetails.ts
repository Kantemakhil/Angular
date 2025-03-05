import { BaseModel } from "@common/beans/BaseModel";

export class OffenderStgDetails extends BaseModel {

    private _createUserId: string;
    private _modifyDatetime: Date;
    private _offenderBookId: number;
    private _modifyUserId: string;
    private _stgSeq: number;
    private _detailSeq: number;
    private _commentText: string;
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _valDate: Date;
    private _actionCode: string;
    private _reasonCode: string;
    private _sealFlag: string;
    private _deValDate: Date;
    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get stgSeq(): number { return this._stgSeq; }

    set stgSeq(pstgSeq: number) { this._stgSeq = pstgSeq; }

    get detailSeq(): number { return this._detailSeq; }

    set detailSeq(pdetailSeq: number) { this._detailSeq = pdetailSeq; }

    get commentText(): string { return this._commentText; }

    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get valDate(): Date { return this._valDate; }

    set valDate(pvalDate: Date) { this._valDate = pvalDate; }

    get actionCode(): string { return this._actionCode; }

    set actionCode(pactionCode: string) { this._actionCode = pactionCode; }

    get reasonCode(): string { return this._reasonCode; }

    set reasonCode(preasonCode: string) { this._reasonCode = preasonCode; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get deValDate(): Date { return this._deValDate; }

    set deValDate(pdeValDate: Date) { this._deValDate = pdeValDate; }

    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'offenderBookId': this._offenderBookId,
            'modifyUserId': this._modifyUserId,
            'stgSeq': this._stgSeq,
            'detailSeq': this._detailSeq,
            'commentText': this._commentText,
            'createDatetime': this._createDatetime,
            'serialVersionUID': this._serialVersionUID,
            'valDate': this._valDate,
            'actionCode': this._actionCode,
            'reasonCode': this._reasonCode,
            'sealFlag': this._sealFlag,
            'deValDate': this._deValDate
        };
    }
}
