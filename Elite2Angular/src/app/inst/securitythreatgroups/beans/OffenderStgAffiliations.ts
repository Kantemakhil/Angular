import { BaseModel } from "@common/beans/BaseModel";

export class OffenderStgAffiliations extends BaseModel{
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _offenderBookId: number;
    private _appealDate: Date;
    private _modifyUserId: string;
    private _stgSeq: number;
    private _stgId: number;
    private _commentText: string;
    private _createDatetime: Date;
    private _expiryDate: Date;
    private _serialVersionUID: number;
    private _expiredBy: string;
    private _expiryReasonCode: string;
    private _notifiedBy: string;
    private _reasonCode: string;
    private _sealFlag: string;
    private _effectiveDate: Date;
    private _notifiedDate: Date;
    private _activeFlag: string;
    private _description: string;
    private _notifiedByTemp: string;

    get description(): string { return this._description; }

    set description(pdescription: string) { this._description = pdescription; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get appealDate(): Date { return this._appealDate; }

    set appealDate(pappealDate: Date) { this._appealDate = pappealDate; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get stgSeq(): number { return this._stgSeq; }

    set stgSeq(pstgSeq: number) { this._stgSeq = pstgSeq; }

    get stgId(): number { return this._stgId; }

    set stgId(pstgId: number) { this._stgId = pstgId; }

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

    get expiryReasonCode(): string { return this._expiryReasonCode; }

    set expiryReasonCode(pexpiryReasonCode: string) { this._expiryReasonCode = pexpiryReasonCode; }

    get notifiedBy(): string { return this._notifiedBy; }

    set notifiedBy(pnotifiedBy: string) { this._notifiedBy = pnotifiedBy; }

    get reasonCode(): string { return this._reasonCode; }

    set reasonCode(preasonCode: string) { this._reasonCode = preasonCode; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get effectiveDate(): Date { return this._effectiveDate; }

    set effectiveDate(peffectiveDate: Date) { this._effectiveDate = peffectiveDate; }

    get notifiedDate(): Date { return this._notifiedDate; }

    set notifiedDate(pnotifiedDate: Date) { this._notifiedDate = pnotifiedDate; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

    get notifiedByTemp(): string { return this._notifiedByTemp; }

    set notifiedByTemp(pnotifiedBy: string) { this._notifiedByTemp = pnotifiedBy; }


    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'offenderBookId': this._offenderBookId,
            'appealDate': this._appealDate,
            'modifyUserId': this._modifyUserId,
            'stgSeq': this._stgSeq,
            'stgId': this._stgId,
            'commentText': this._commentText,
            'createDatetime': this._createDatetime,
            'expiryDate': this._expiryDate,
            'serialVersionUID': this._serialVersionUID,
            'expiredBy': this._expiredBy,
            'expiryReasonCode': this._expiryReasonCode,
            'notifiedBy': this._notifiedBy,
            'reasonCode': this._reasonCode,
            'sealFlag': this._sealFlag,
            'effectiveDate': this._effectiveDate,
            'notifiedDate': this._notifiedDate,
            'activeFlag': this._activeFlag,
            'description': this._description,
            'notifiedByTemp': this.notifiedByTemp
        };
    }
}
