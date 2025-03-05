import {BaseModel} from '@commonbeans/BaseModel';

export class OffenderIndSchWaitLists extends BaseModel {

    private _eventId: number;
    private _requestDate: Date;
    private _waitListStatus: string;
    private _statusDate: Date;
    private _transferPriority: string;
    private _approvedFlag: string;
    private _approvedStaffId: number;
    private _outcomeReasonCode: string;
    private _commentText1: string;
    private _commentText2: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _inserted: boolean;
    private _nbtLastName: string;
    private _nbtFirstName: string;
    private _nbtStatusDesc: string;
    private _nbtPriorityDesc: string;
    private _nbtReasonDesc: string;


    get eventId(): number { return this._eventId; }
    set eventId(peventId: number) { this._eventId = peventId; }
    get requestDate(): Date { return this._requestDate; }
    set requestDate(prequestDate: Date) { this._requestDate = prequestDate; }
    get waitListStatus(): string { return this._waitListStatus; }
    set waitListStatus(pwaitListStatus: string) { this._waitListStatus = pwaitListStatus; }
    get statusDate(): Date { return this._statusDate; }
    set statusDate(pstatusDate: Date) { this._statusDate = pstatusDate; }
    get transferPriority(): string { return this._transferPriority; }
    set transferPriority(ptransferPriority: string) { this._transferPriority = ptransferPriority; }
    get approvedFlag(): string { return this._approvedFlag; }
    set approvedFlag(papprovedFlag: string) { this._approvedFlag = papprovedFlag; }
    get outcomeReasonCode(): string { return this._outcomeReasonCode; }
    set outcomeReasonCode(poutcomeReasonCode: string) { this._outcomeReasonCode = poutcomeReasonCode; }
    get commentText1(): string { return this._commentText1; }
    set commentText1(pcommentText1: string) { this._commentText1 = pcommentText1; }
    get commentText2(): string { return this._commentText2; }
    set commentText2(pcommentText2: string) { this._commentText2 = pcommentText2; }
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
    get inserted(): boolean { return this._inserted; }
    set inserted(pinserted: boolean) { this._inserted = pinserted; }
    get nbtLastName(): string { return this._nbtLastName; }
    set nbtLastName(pnbtLastName: string) { this._nbtLastName = pnbtLastName; }
    get nbtFirstName(): string { return this._nbtFirstName; }
    set nbtFirstName(pnbtFirstName: string) { this._nbtFirstName = pnbtFirstName; }
    get nbtStatusDesc(): string { return this._nbtStatusDesc; }
    set nbtStatusDesc(pnbtStatusDesc: string) { this._nbtStatusDesc = pnbtStatusDesc; }
    get nbtPriorityDesc(): string { return this._nbtPriorityDesc; }
    set nbtPriorityDesc(pnbtPriorityDesc: string) { this._nbtPriorityDesc = pnbtPriorityDesc; }
    get nbtReasonDesc(): string { return this._nbtReasonDesc; }
    set nbtReasonDesc(pnbtReasonDesc: string) { this._nbtReasonDesc = pnbtReasonDesc; }
    get approvedStaffId(): number { return this._approvedStaffId; }
    set approvedStaffId(papprovedStaffId: number) { this._approvedStaffId = papprovedStaffId; }

    toJSON(): any {
        return {
            'eventId': this._eventId,
            'requestDate': this._requestDate,
            'waitListStatus': this._waitListStatus,
            'statusDate': this._statusDate,
            'transferPriority': this._transferPriority,
            'approvedFlag': this._approvedFlag,
            'approvedStaffId': this._approvedStaffId,
            'outcomeReasonCode': this._outcomeReasonCode,
            'commentText1': this._commentText1,
            'commentText2': this._commentText2,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'inserted': this._inserted,
            'nbtFirstName': this._nbtFirstName,
            'nbtLastName': this._nbtLastName,
            'nbtPriorityDesc': this._nbtPriorityDesc,
            'nbtReasonDesc': this._nbtReasonDesc,
        };
    }
    }
