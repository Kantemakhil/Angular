import { BaseModel } from "@common/beans/BaseModel";

export class OffenderStgAssociations extends BaseModel {
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _offenderBookId: number;
    private _modifyUserId: string;
    private _stgSeq: number;
    private _commentText: string;
    private _createDatetime: Date;
    private _expiryDate: Date;
    private _serialVersionUID: number;
    private _expiredBy: string;
    private _reasonCode: string;
    private _sealFlag: string;
    private _effectiveDate: Date;
    private _activeFlag: string;
    private _groupCode: string;

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
    get commentText(): string { return this._commentText; }
    set commentText(pcommentText: string) { this._commentText = pcommentText; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get expiryDate(): Date { return this._expiryDate; }
    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
    get expiredBy(): string { return this._expiredBy; }
    set expiredBy(pexpiredBy: string) { this._expiredBy = pexpiredBy; }
    get reasonCode(): string { return this._reasonCode; }
    set reasonCode(preasonCode: string) { this._reasonCode = preasonCode; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get effectiveDate(): Date { return this._effectiveDate; }
    set effectiveDate(peffectiveDate: Date) { this._effectiveDate = peffectiveDate; }
    get activeFlag(): string { return this._activeFlag; }
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }
    get groupCode(): string { return this._groupCode; }
    set groupCode(pgroupCode: string) { this._groupCode = pgroupCode; }

    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'offenderBookId': this._offenderBookId,
            'modifyUserId': this._modifyUserId,
            'stgSeq': this._stgSeq,
            'commentText': this._commentText,
            'createDatetime': this._createDatetime,
            'expiryDate': this._expiryDate,
            'serialVersionUID': this._serialVersionUID,
            'expiredBy': this._expiredBy,
            'reasonCode': this._reasonCode,
            'sealFlag': this._sealFlag,
            'effectiveDate': this._effectiveDate,
            'activeFlag': this._activeFlag,
            'groupCode': this._groupCode,
        };
    }
}
