export class OffenderCaseStatuses {
    private _createDatetime: number;
    private _offenderCaseStatusId: number;
    private _offenderCas: number;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _statusUpdateReason: string;
    private _modifyDatetime: number;
    private _statusUpdateDate: Date;
    private _modifyUserId: string;
    private _statusUpdateComment: string;
    private _sealFlag: string;
    private _statusUpdateStaffId: number;
    private _caseId: number;
    private _staffName: string;
    private _calledFrom: string;
    private _offenderBookId: number;
    private _sentenceSeq: number;
    private _offenderSentCondId: number;
    private _previousStatus: string;
    private _previousStatusDesc: string;
    private _historyUpdateDateTime: string;
    private _startTime: Date;
    get startTime(): Date { return this._startTime; }
    set startTime(pstartTime: Date) {
        this._startTime = pstartTime;
    }
    get historyUpdateDateTime(): string{ return this._historyUpdateDateTime; }
    set historyUpdateDateTime(phistoryUpdateDateTime: string){ this._historyUpdateDateTime = phistoryUpdateDateTime ;}

    get previousStatus(): string{ return this._previousStatus; }
    set previousStatus(ppreviousStatus: string){ this._previousStatus = ppreviousStatus ;}
    get previousStatusDesc(): string{ return this._previousStatusDesc; }
    set previousStatusDesc(ppreviousStatusDesc: string){ this._previousStatusDesc = ppreviousStatusDesc ;}

    get createDatetime(): number{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: number){ this._createDatetime = pcreateDatetime ;}
    get offenderCaseStatusId(): number{ return this._offenderCaseStatusId; }
    set offenderCaseStatusId(poffenderCaseStatusId: number){ this._offenderCaseStatusId = poffenderCaseStatusId ;}
    get offenderCas(): number{ return this._offenderCas; }
    set offenderCas(poffenderCas: number){ this._offenderCas = poffenderCas ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get statusUpdateReason(): string{ return this._statusUpdateReason; }
    set statusUpdateReason(pstatusUpdateReason: string){ this._statusUpdateReason = pstatusUpdateReason ;}
    get modifyDatetime(): number{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: number){ this._modifyDatetime = pmodifyDatetime ;}
    get statusUpdateDate(): Date{ return this._statusUpdateDate; }
    set statusUpdateDate(pstatusUpdateDate: Date){ this._statusUpdateDate = pstatusUpdateDate ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get statusUpdateComment(): string{ return this._statusUpdateComment; }
    set statusUpdateComment(pstatusUpdateComment: string){ this._statusUpdateComment = pstatusUpdateComment ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get statusUpdateStaffId(): number{ return this._statusUpdateStaffId; }
    set statusUpdateStaffId(pstatusUpdateStaffId: number){ this._statusUpdateStaffId = pstatusUpdateStaffId ;}

    get caseId(): number { return this._caseId; }

    set caseId( pcaseId: number ) { this._caseId = pcaseId; }

    get staffName(): string{ return this._staffName; }
    set staffName(pstaffName: string){ this._staffName = pstaffName ;}
    get calledFrom(): string { return this._calledFrom; }
    set calledFrom(pcalledFrom: string) { this._calledFrom = pcalledFrom; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(seq: number) { this._offenderBookId = seq; }
    get sentenceSeq(): number { return this._sentenceSeq; }
    set sentenceSeq(seq: number) { this._sentenceSeq = seq; }
    get offenderSentCondId(): number { return this._offenderSentCondId; }

    set offenderSentCondId(offenderSentCondId: number) { this._offenderSentCondId = offenderSentCondId; }

toJSON(): any {
    return { 
       'createDatetime': this._createDatetime,
       'offenderCaseStatusId': this._offenderCaseStatusId,
       'offenderCas': this._offenderCas,
       'serialVersionUID': this._serialVersionUID,
       'createUserId': this._createUserId,
       'statusUpdateReason': this._statusUpdateReason,
       'modifyDatetime': this._modifyDatetime,
       'statusUpdateDate': this._statusUpdateDate,
       'modifyUserId': this._modifyUserId,
       'statusUpdateComment': this._statusUpdateComment,
       'sealFlag': this._sealFlag,
       'statusUpdateStaffId': this._statusUpdateStaffId,
       'caseId': this._caseId,
       'staffName': this._staffName,
       'calledFrom': this._calledFrom,
       'offenderBookId': this._offenderBookId,
       'sentenceSeq': this._sentenceSeq,
       'offenderSentCondId': this._offenderSentCondId,
       'previousStatus': this._previousStatus,
       'previousStatusDesc': this._previousStatusDesc,
       'historyUpdateDateTime': this._historyUpdateDateTime,
       'startTime': this._startTime,
        };
    }
}
