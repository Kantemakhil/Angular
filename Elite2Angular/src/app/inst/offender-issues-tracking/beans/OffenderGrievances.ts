import { BaseModel } from '@commonbeans/BaseModel';

export class OffenderGrievances extends BaseModel {
    private _createUserId: string;
    private _offenderBookId: number;
    private _modifyDatetime: Date;
    private _grievReasonCode: string;
    private _claimAmount: number;
    private _modifyUserId: string;
    private _commentText: string;
    private _createDatetime: Date;
    private _reportDate: Date;
    private _grievType: string;
    private _agyLocId: string;
    private _agencyIncidentId: number;
    private _partySeq: number;
    private _grievanceId: number;
    private _sealFlag: string;
    private _currStatus: string;
    private _currLevel: string;
    private _agyLocIdDesc: string;
    private _rootOffenderId: number;
    private _staffInvolvedFlag: string;
    private _grievanceIdCur: number;
    private _staffExists: number;
    private _createFlag: string;
    

    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get grievReasonCode(): string { return this._grievReasonCode; }
    set grievReasonCode(pgrievReasonCode: string) { this._grievReasonCode = pgrievReasonCode; }
    get claimAmount(): number { return this._claimAmount; }
    set claimAmount(pclaimAmount: number) { this._claimAmount = pclaimAmount; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get commentText(): string { return this._commentText; }
    set commentText(pcommentText: string) { this._commentText = pcommentText; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get reportDate(): Date { return this._reportDate; }
    set reportDate(preportDate: Date) { this._reportDate = preportDate; }
    get grievType(): string { return this._grievType; }
    set grievType(pgrievType: string) { this._grievType = pgrievType; }
    get agyLocId(): string { return this._agyLocId; }
    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }
    get agencyIncidentId(): number { return this._agencyIncidentId; }
    set agencyIncidentId(pagencyIncidentId: number) { this._agencyIncidentId = pagencyIncidentId; }
    get partySeq(): number { return this._partySeq; }
    set partySeq(ppartySeq: number) { this._partySeq = ppartySeq; }
    get grievanceId(): number { return this._grievanceId; }
    set grievanceId(pgrievanceId: number) { this._grievanceId = pgrievanceId; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get currStatus(): string { return this._currStatus; }
    set currStatus(pcurrStatus: string) { this._currStatus = pcurrStatus; }
    get currLevel(): string { return this._currLevel; }
    set currLevel(pcurrLevel: string) { this._currLevel = pcurrLevel; }
    get agyLocIdDesc(): string { return this._agyLocIdDesc; }
    set agyLocIdDesc(pagyLocIdDesc: string) { this._agyLocIdDesc = pagyLocIdDesc; }
    get rootOffenderId(): number { return this._rootOffenderId; }
    set rootOffenderId(prootOffenderId: number) { this._rootOffenderId = prootOffenderId; }
    get staffInvolvedFlag(): string { return this._staffInvolvedFlag; }
    set staffInvolvedFlag(pstaffInvolvedFlag: string) { this._staffInvolvedFlag = pstaffInvolvedFlag; }
    get grievanceIdCur(): number { return this._grievanceIdCur; }
    set grievanceIdCur(pgrievanceIdCur: number) { this._grievanceIdCur = pgrievanceIdCur; }
    get staffExists(): number { return this._staffExists; }
    set staffExists(pstaffExists: number) { this._staffExists = pstaffExists; }
    public get createFlag(): string { return this._createFlag; }
    public set createFlag(value: string) { this._createFlag = value;}

    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'offenderBookId': this._offenderBookId,
            'modifyDatetime': this._modifyDatetime,
            'grievReasonCode': this._grievReasonCode,
            'claimAmount': this._claimAmount,
            'modifyUserId': this._modifyUserId,
            'commentText': this._commentText,
            'createDatetime': this._createDatetime,
            'reportDate': this._reportDate,
            'grievType': this._grievType,
            'agyLocId': this._agyLocId,
            'agencyIncidentId': this._agencyIncidentId,
            'partySeq': this._partySeq,
            'grievanceId': this._grievanceId,
            'sealFlag': this._sealFlag,
            'currStatus': this._currStatus,
            'currLevel': this._currLevel,
            'agyLocIdDesc': this._agyLocIdDesc,
            'rootOffenderId': this._rootOffenderId,
            'staffInvolvedFlag': this._staffInvolvedFlag,
            'grievanceIdCur': this._grievanceIdCur,
            'staffExists': this._staffExists,
            'createFlag':this._createFlag
        };
    }
}
