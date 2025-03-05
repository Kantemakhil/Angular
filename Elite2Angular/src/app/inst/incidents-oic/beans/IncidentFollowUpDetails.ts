import {BaseModel} from '@commonbeans/BaseModel';

export class IncidentFollowUpDetails extends BaseModel {
    private _agencyIncidentId: number;
    private _incidentFollowUpId: number;
    private _policy: string;
    private _compliance: string;
    private _commentText: Date;
    private _returnedOutput: number;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;


    get agencyIncidentId(): number { return this._agencyIncidentId; }

    set agencyIncidentId(pagencyIncidentId: number) { this._agencyIncidentId = pagencyIncidentId; }

    get incidentFollowUpId(): number { return this._incidentFollowUpId; }

    set incidentFollowUpId(pincidentFollowUpId: number) { this._incidentFollowUpId = pincidentFollowUpId; }

    get policy(): string { return this._policy; }

    set policy(ppolicy: string) { this._policy = ppolicy; }

    get compliance(): string { return this._compliance; }

    set compliance(pcompliance: string) { this._compliance = pcompliance; }

    get commentText(): Date { return this._commentText; }

    set commentText(pcommentText: Date) { this._commentText = pcommentText; }

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

    get returnedOutput(): number { return this._returnedOutput; }

    set returnedOutput(preturnedOutput: number) { this._returnedOutput = preturnedOutput; }

toJSON(): any {
        return {
                 'agencyIncidentId': this._agencyIncidentId,
                 'incidentFollowUpId': this._incidentFollowUpId,
                 'policy': this._policy,
                 'compliance': this._compliance,
                 'commentText': this._commentText,
                 'createDatetime': this._createDatetime,
                 'createUserId': this._createUserId,
                 'modifyDatetime': this._modifyDatetime,
                 'modifyUserId': this._modifyUserId,
                 'sealFlag': this._sealFlag,
                 'returnedOutput': this._returnedOutput

                  };
        }
 }
