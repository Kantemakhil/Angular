export class OffenderReleaseNotis {
    private _offenderBookId: number;
    private _notiSeq: number;
    private _notiAgencyPartyCode: string;
    private _recordStatus: string;
    private _notiCorpId: number;
    private _notiPersonId: number;
    private _notifyMethod: string;
    private _commentText: string;
    private _notifyDate: Date;
    private _expirationDate: Date;
    private _expirationReason: string;
    private _modifyUserId: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _sealFlag: string;
    private _registeredByStaffId: number;
    private _completedByStaffId: number;
    private _registeredBy: string;
    private _completedBy: string;
    private _completionDate: Date;
    private _completeCommentText: string;
    private _nbtStatus: string;

    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId ; }
    get notiSeq(): number { return this._notiSeq; }
    set notiSeq(pnotiSeq: number) { this._notiSeq = pnotiSeq ; }
    get notiAgencyPartyCode(): string { return this._notiAgencyPartyCode; }
    set notiAgencyPartyCode(pnotiAgencyPartyCode: string) { this._notiAgencyPartyCode = pnotiAgencyPartyCode ; }
    get recordStatus(): string { return this._recordStatus; }
    set recordStatus(precordStatus: string) { this._recordStatus = precordStatus ; }
    get notiCorpId(): number { return this._notiCorpId; }
    set notiCorpId(pnotiCorpId: number) { this._notiCorpId = pnotiCorpId ; }
    get notiPersonId(): number { return this._notiPersonId; }
    set notiPersonId(pnotiPersonId: number) { this._notiPersonId = pnotiPersonId ; }
    get notifyMethod(): string { return this._notifyMethod; }
    set notifyMethod(pnotifyMethod: string) { this._notifyMethod = pnotifyMethod ; }
    get commentText(): string { return this._commentText; }
    set commentText(pcommentText: string) { this._commentText = pcommentText ; }
    get notifyDate(): Date { return this._notifyDate; }
    set notifyDate(pnotifyDate: Date) { this._notifyDate = pnotifyDate ; }
    get expirationDate(): Date { return this._expirationDate; }
    set expirationDate(pexpirationDate: Date) { this._expirationDate = pexpirationDate ; }
    get expirationReason(): string { return this._expirationReason; }
    set expirationReason(pexpirationReason: string) { this._expirationReason = pexpirationReason ; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId ; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime ; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId ; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime ; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag ; }
    get registeredByStaffId(): number { return this._registeredByStaffId; }
    set registeredByStaffId(pregisteredByStaffId: number) { this._registeredByStaffId = pregisteredByStaffId ; }
    get completedByStaffId(): number { return this._completedByStaffId; }
    set completedByStaffId(pcompletedByStaffId: number) { this._completedByStaffId = pcompletedByStaffId ; }
    get completionDate(): Date { return this._completionDate; }
    set completionDate(pcompletionDate: Date) { this._completionDate = pcompletionDate ; }
    get completeCommentText(): string { return this._completeCommentText; }
    set completeCommentText(pcompleteCommentText: string) { this._completeCommentText = pcompleteCommentText ; }
    get registeredBy(): string { return this._registeredBy; }
    set registeredBy(pregisteredBy: string) { this._registeredBy = pregisteredBy ; }
    get completedBy(): string { return this._completedBy; }
    set completedBy(pcompletedBy: string) { this._completedBy = pcompletedBy ; }
    get nbtStatus(): string { return this._nbtStatus; }
    set nbtStatus(pnbtStatus: string) { this._nbtStatus = pnbtStatus ; }

    toJSON(): any {
        return {
            'offenderBookId': this._offenderBookId,
            'notiSeq': this._notiSeq,
            'notiAgencyPartyCode': this._notiAgencyPartyCode,
            'recordStatus': this._recordStatus,
            'notiCorpId': this._notiCorpId,
            'notiPersonId': this._notiPersonId,
            'notifyMethod': this._notifyMethod,
            'commentText': this._commentText,
            'notifyDate': this._notifyDate,
            'expirationDate': this._expirationDate,
            'expirationReason': this._expirationReason,
            'modifyUserId': this._modifyUserId,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'sealFlag': this._sealFlag,
            'registeredByStaffId': this._registeredByStaffId,
            'completedByStaffId': this._completedByStaffId,
            'registeredBy': this._registeredBy,
            'completedBy': this._completedBy,
            'completionDate': this._completionDate,
            'completeCommentText': this._completeCommentText,
            'nbtStatus': this._nbtStatus,
        };
    }

}
