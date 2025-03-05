import { BaseModel } from '@commonbeans/BaseModel';

export class AgyIncInvestigations extends BaseModel {

    private _agyIncInvestigationId: number;
    private _agencyIncidentId: number;
    private _investigatorId: number;
    private _assignedDate: Date;
    private _commentText: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _partySeq: number;
    private _sealFlag: string;
    private invDisable = false;
    private _investigatorIdDes: string;

    get agyIncInvestigationId(): number { return this._agyIncInvestigationId; }

    set agyIncInvestigationId( pagyIncInvestigationId: number ) { this._agyIncInvestigationId = pagyIncInvestigationId; }

    get agencyIncidentId(): number { return this._agencyIncidentId; }

    set agencyIncidentId( pagencyIncidentId: number ) { this._agencyIncidentId = pagencyIncidentId; }

    get investigatorId(): number { return this._investigatorId; }

    set investigatorId( pinvestigatorId: number ) { this._investigatorId = pinvestigatorId; }

    get assignedDate(): Date { return this._assignedDate; }

    set assignedDate( passignedDate: Date ) { this._assignedDate = passignedDate; }

    get commentText(): string { return this._commentText; }

    set commentText( pcommentText: string ) { this._commentText = pcommentText; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime( pcreateDatetime: Date ) { this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId( pcreateUserId: string ) { this._createUserId = pcreateUserId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime( pmodifyDatetime: Date ) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId( pmodifyUserId: string ) { this._modifyUserId = pmodifyUserId; }

    get partySeq(): number { return this._partySeq; }

    set partySeq( ppartySeq: number ) { this._partySeq = ppartySeq; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }

    get isInvDisable(): boolean { return this.invDisable; }

    set isInvDisable( pinvDisable: boolean ) { this.invDisable = pinvDisable; }

    get investigatorIdDes(): string { return this._investigatorIdDes; }

    set investigatorIdDes( pinvestigatorIdDes: string ) { this._investigatorIdDes = pinvestigatorIdDes; }


    toJSON(): any {
        return {
            'agyIncInvestigationId': this._agyIncInvestigationId,
            'agencyIncidentId': this._agencyIncidentId,
            'investigatorId': this._investigatorId,
            'assignedDate': this._assignedDate,
            'commentText': this._commentText,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'partySeq': this._partySeq,
            'sealFlag': this._sealFlag,
            'investigatorIdDes': this._investigatorIdDes

        };
    }
}
