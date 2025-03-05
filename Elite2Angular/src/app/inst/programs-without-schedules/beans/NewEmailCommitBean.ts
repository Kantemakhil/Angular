import { BaseModel } from '@commonbeans/BaseModel';
import { EmailRecipients } from './EmailRecipients';
export class NewEmailCommitBean extends BaseModel {
    private _workflowType: string;
    private _workId: number;
    private _offenderBookId: number;
    private _emailBody: string;
    private _emailSubject: string;
    private _emailSender: string;
    private _returnAddress: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _emailRecipientsList: Array<EmailRecipients>;

    get emailRecipientsList(): Array<EmailRecipients> { return this._emailRecipientsList; }

	set emailRecipientsList(emailRecipientsList: Array<EmailRecipients>){ this._emailRecipientsList = emailRecipientsList; }

    get workflowType(): string { return this._workflowType; }
    set workflowType(workflowType: string) { this._workflowType = workflowType; }

    get workId(): number { return this._workId; }
    set workId(workId: number) { this._workId = workId; }

    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(offenderBookId: number) { this._offenderBookId = offenderBookId; }

    get emailBody(): string { return this._emailBody; }
    set emailBody(emailBody: string) { this._emailBody = emailBody; }

    get emailSubject(): string { return this._emailSubject; }
    set emailSubject(emailSubject: string) { this._emailSubject = emailSubject; }

    get emailSender(): string { return this._emailSender; }
    set emailSender(emailSender: string) { this._emailSender = emailSender; }

    get returnAddress(): string { return this._returnAddress; }
    set returnAddress(returnAddress: string) { this._returnAddress = returnAddress; }

    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(modifyDatetime: Date) { this._modifyDatetime = modifyDatetime; }

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(createDatetime: Date) { this._createDatetime = createDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(modifyUserId: string) { this._modifyUserId = modifyUserId; }

    get createUserId(): string { return this._createUserId; }
    set createUserId(createUserId: string) { this._createUserId = createUserId; }

    toJSON(): any {
        return {
            'workflowType': this._workflowType,
            'workId': this._workId,
            'offenderBookId': this._offenderBookId,
            'emailBody': this._emailBody,
            'emailSubject': this._emailSubject,
            'emailSender': this._emailSender,
            'returnAddress': this._returnAddress,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'emailRecipientsList': this._emailRecipientsList,
        };
    }
}
