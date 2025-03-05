export class OffenderOicAppealPenalties {
    private _oicAppealIdLog: number;
    private _effectDate: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _resultSeq: number;
    private _oicComment: string;
    private _oicApprealId: number;
    private _oicPenaltyType: string;
    private _resultSeqLog: number;
    private _createDatetime: Date;
    private _month: number;
    private _oicHearingId: number;
    private _oicSeqLog: number;
    private _days: number;
    private _compensation: number;
    private _sealFlag: string;
    private _oicHearingIdLog: number;
    private _seq: number;
    private _offenderAdjustId: number;
    private _status: string;
    private _oicSeqLogParentField: string;
    private _launchButton: string;
    private _offenderBookingId: number;
    private _oicResultSeqLog: number;
    private _hearingDate: string;
    private _hearingTime: string;

    get hearingTime(): string{ return this._hearingTime; }
    set hearingTime(phearingTime: string){ this._hearingTime = phearingTime ;}
    get hearingDate(): string{ return this._hearingDate; }
    set hearingDate(phearingDate: string){ this._hearingDate = phearingDate ;}
    get oicResultSeqLog(): number{ return this._oicResultSeqLog; }
    set oicResultSeqLog(poicResultSeqLog: number){ this._oicResultSeqLog = poicResultSeqLog ;}
    get oicAppealIdLog(): number{ return this._oicAppealIdLog; }
    set oicAppealIdLog(poicAppealIdLog: number){ this._oicAppealIdLog = poicAppealIdLog ;}
    get effectDate(): Date{ return this._effectDate; }
    set effectDate(peffectDate: Date){ this._effectDate = peffectDate ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get resultSeq(): number{ return this._resultSeq; }
    set resultSeq(presultSeq: number){ this._resultSeq = presultSeq ;}
    get oicComment(): string{ return this._oicComment; }
    set oicComment(poicComment: string){ this._oicComment = poicComment ;}
    get oicApprealId(): number{ return this._oicApprealId; }
    set oicApprealId(poicApprealId: number){ this._oicApprealId = poicApprealId ;}
    get oicPenaltyType(): string{ return this._oicPenaltyType; }
    set oicPenaltyType(poicPenaltyType: string){ this._oicPenaltyType = poicPenaltyType ;}
    get resultSeqLog(): number{ return this._resultSeqLog; }
    set resultSeqLog(presultSeqLog: number){ this._resultSeqLog = presultSeqLog ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get month(): number{ return this._month; }
    set month(pmonth: number){ this._month = pmonth ;}
    get oicHearingId(): number{ return this._oicHearingId; }
    set oicHearingId(poicHearingId: number){ this._oicHearingId = poicHearingId ;}
    get oicSeqLog(): number{ return this._oicSeqLog; }
    set oicSeqLog(poicSeqLog: number){ this._oicSeqLog = poicSeqLog ;}
    get days(): number{ return this._days; }
    set days(pdays: number){ this._days = pdays ;}
    get compensation(): number{ return this._compensation; }
    set compensation(pcompensation: number){ this._compensation = pcompensation ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get oicHearingIdLog(): number{ return this._oicHearingIdLog; }
    set oicHearingIdLog(poicHearingIdLog: number){ this._oicHearingIdLog = poicHearingIdLog ;}
    get seq(): number{ return this._seq; }
    set seq(pseq: number){ this._seq = pseq ;}
    get offenderAdjustId(): number{ return this._offenderAdjustId; }
    set offenderAdjustId(poffenderAdjustId: number){ this._offenderAdjustId = poffenderAdjustId ;}
    get status(): string{ return this._status; }
    set status(pstatus: string){ this._status = pstatus ;}
    get oicSeqLogParentField(): string{ return this._oicSeqLogParentField; }
    set oicSeqLogParentField(poicSeqLogParentField: string){ this._oicSeqLogParentField = poicSeqLogParentField ;}
    get launchButton(): string{ return this._launchButton; }
    set launchButton(plaunchButton: string){ this._launchButton = plaunchButton ;}
    get offenderBookingId(): number{ return this._offenderBookingId; }
    set offenderBookingId(poffenderBookingId: number){ this._offenderBookingId = poffenderBookingId ;}

toJSON(): any {
    return { 
       'oicAppealIdLog': this._oicAppealIdLog,
       'effectDate': this._effectDate,
       'createUserId': this._createUserId,
       'modifyDatetime': this._modifyDatetime,
       'modifyUserId': this._modifyUserId,
       'resultSeq': this._resultSeq,
       'oicComment': this._oicComment,
       'oicApprealId': this._oicApprealId,
       'oicPenaltyType': this._oicPenaltyType,
       'resultSeqLog': this._resultSeqLog,
       'createDatetime': this._createDatetime,
       'month': this._month,
       'oicHearingId': this._oicHearingId,
       'oicSeqLog': this._oicSeqLog,
       'days': this._days,
       'compensation': this._compensation,
       'sealFlag': this._sealFlag,
       'oicHearingIdLog': this._oicHearingIdLog,
       'seq': this._seq,
       'offenderAdjustId': this._offenderAdjustId,
       'status': this._status,
       'launchButton' : this._launchButton,
       'offenderBookingId': this._offenderBookingId,
       'oicResultSeqLog': this._oicResultSeqLog,
       'hearingDate': this._hearingDate,
       '_hearingTime': this._hearingTime
        };
    } 
}
