import { BaseModel } from '@commonbeans/BaseModel';

export class CreateAdhocEmail extends BaseModel {
    private _pWorkflowType: string;
    private _pWorkId: number;
    private _pOffenderBookId: number;
    private _pEmailSubject: string;

    private _pEmailBody: string;
    private _pEmailSender: string;
    private _pEmailFrom: string;
    private _pToRecipientsList: string;
    private _pCcRecipientsList: string;
    private _pBccRecipientsList: string;

    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _sealFlag: string;
    private _emailId: number;
    private _toList: string;
    private _ccList: string;
    private _bccList: string;

    get emailId(): number { return this._emailId; }
    set emailId(emailId: number) { this._emailId = emailId; }

    get toList(): string { return this._toList; }
    set toList(toList: string) { this._toList = toList; }

    get ccList(): string { return this._ccList; }
    set ccList(ccList: string) { this._ccList = ccList; }

    get bccList(): string { return this._bccList; }
    set bccList(bccList: string) { this._bccList = bccList; }

    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(modifyDatetime: Date) { this._modifyDatetime = modifyDatetime; }

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(createDatetime: Date) { this._createDatetime = createDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(modifyUserId: string) { this._modifyUserId = modifyUserId; }

    get createUserId(): string { return this._createUserId; }
    set createUserId(createUserId: string) { this._createUserId = createUserId; }

    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(sealFlag: string) { this._sealFlag = sealFlag; }

    get pWorkflowType(): string { return this._pWorkflowType; }
    set pWorkflowType(pWorkflowType: string) { this._pWorkflowType = pWorkflowType; }

    get pWorkId(): number { return this._pWorkId; }
    set pWorkId(pWorkId: number) { this._pWorkId = pWorkId; }

    get pOffenderBookId(): number { return this._pOffenderBookId; }
    set pOffenderBookId(pOffenderBookId: number) { this._pOffenderBookId = pOffenderBookId; }

    get pEmailSubject(): string { return this._pEmailSubject; }
    set pEmailSubject(pEmailSubject: string) { this._pEmailSubject = pEmailSubject; }

    get pEmailBody(): string { return this._pEmailBody; }
    set pEmailBody(pEmailBody: string) { this._pEmailBody = pEmailBody; }

    get pEmailSender(): string { return this._pEmailSender; }
    set pEmailSender(pEmailSender: string) { this._pEmailSender = pEmailSender; }

    get pEmailFrom(): string { return this._pEmailFrom; }
    set pEmailFrom(pEmailFrom: string) { this._pEmailFrom = pEmailFrom; }

    get pToRecipientsList(): string { return this._pToRecipientsList; }
    set pToRecipientsList(pToRecipientsList: string) { this._pToRecipientsList = pToRecipientsList; }

    get pCcRecipientsList(): string { return this._pCcRecipientsList; }
    set pCcRecipientsList(pCcRecipientsList: string) { this._pCcRecipientsList = pCcRecipientsList; }

    get pBccRecipientsList(): string { return this._pBccRecipientsList; }
    set pBccRecipientsList(pBccRecipientsList: string) { this._pBccRecipientsList = pBccRecipientsList; }


    toJSON(): any {
        return {
            'pWorkflowType': this._pWorkflowType,
            'pWorkId': this._pWorkId,
            'pOffenderBookId': this._pOffenderBookId,
            'pEmailSubject': this._pEmailSubject,
            'pEmailBody': this._pEmailBody,
            'pEmailSender': this._pEmailSender,
            'pEmailFrom': this._pEmailFrom,
            'pToRecipientsList': this._pToRecipientsList,
            'pCcRecipientsList': this._pCcRecipientsList,
            'pBccRecipientsList': this._pBccRecipientsList,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'emailId': this._emailId,
            'sealFlag': this._sealFlag,
            'toList': this._toList,
            'ccList': this._ccList,
            'bccList': this._bccList,
        };
    }
}