import { BaseModel } from "@common/beans/BaseModel";

export class StgValidations extends BaseModel {

    private _action: string;
    private _actionDesc: string;
    private _commentText: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _designation: string;
    private _designationDesc: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _reason: string;
    private _reasonDesc: string;
    private _reviewDate: Date;
    private _sealFlag: string;
    private _validationDate: Date;
    private _stgId: number;
    private _validationSeq: number;

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get designation(): string { return this._designation; }

    set designation(pdesignation: string) { this._designation = pdesignation; }

    get designationDesc(): string { return this._designationDesc; }

    set designationDesc(pdesignationDesc: string) { this._designationDesc = pdesignationDesc; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get reason(): string { return this._reason; }

    set reason(preason: string) { this._reason = preason; }

    get reasonDesc(): string { return this._reasonDesc; }

    set reasonDesc(preasonDesc: string) { this._reasonDesc = preasonDesc; }

    get reviewDate(): Date { return this._reviewDate; }

    set reviewDate(previewDate: Date) { this._reviewDate = previewDate; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get validationDate(): Date { return this._validationDate; }

    set validationDate(pvalidationDate: Date) { this._validationDate = pvalidationDate; }

    get stgId(): number { return this._stgId; }

    set stgId(pstgId: number) { this._stgId = pstgId; }

    get validationSeq(): number { return this._validationSeq; }

    set validationSeq(pvalidationSeq: number) { this._validationSeq = pvalidationSeq; }

    get action(): string { return this._action; }

    set action(paction: string) { this._action = paction; }

    get actionDesc(): string { return this._actionDesc; }

    set actionDesc(pactionDesc: string) { this._actionDesc = pactionDesc; }


    get commentText(): string { return this._commentText; }

    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    toJSON(): any {
        return {
            'action': this._action,
            'actionDesc': this._actionDesc,
            'commentText': this._commentText,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'designation': this._designation,
            'designationDesc': this._designationDesc,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'reason': this._reason,
            'reasonDesc': this._reasonDesc,
            'reviewDate': this._reviewDate,
            'sealFlag': this._sealFlag,
            'validationDate': this._validationDate,
            'stgId': this._stgId,
            'validationSeq': this._validationSeq,
        };
    }
}
