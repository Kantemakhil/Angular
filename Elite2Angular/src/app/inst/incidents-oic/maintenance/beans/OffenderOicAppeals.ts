export class OffenderOicAppeals {
    private _apprealDate: Date;
    private _heardBy: number;
    private _summary: string;
    private _createUserId: string;
    private _offenderBookingId: number;
    private _modifyDatetime: Date;
    private _hearingDate: Date;
    private _modifyUserId: string;
    private _otherRepresentative: string;
    private _oicApprealId: number;
    private _hearingTime: Date;
    private _createDatetime: Date;
    private _aprrealReasonCode: string;
    private _reviewDate: Date;
    private _sealFlag: string;
    private _hearingResultCode: string;

    get apprealDate(): Date{ return this._apprealDate; }
    set apprealDate(papprealDate: Date){ this._apprealDate = papprealDate ;}
    get heardBy(): number{ return this._heardBy; }
    set heardBy(pheardBy: number){ this._heardBy = pheardBy ;}
    get summary(): string{ return this._summary; }
    set summary(psummary: string){ this._summary = psummary ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get offenderBookingId(): number{ return this._offenderBookingId; }
    set offenderBookingId(poffenderBookingId: number){ this._offenderBookingId = poffenderBookingId ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get hearingDate(): Date{ return this._hearingDate; }
    set hearingDate(phearingDate: Date){ this._hearingDate = phearingDate ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get otherRepresentative(): string{ return this._otherRepresentative; }
    set otherRepresentative(potherRepresentative: string){ this._otherRepresentative = potherRepresentative ;}
    get oicApprealId(): number{ return this._oicApprealId; }
    set oicApprealId(poicApprealId: number){ this._oicApprealId = poicApprealId ;}
    get hearingTime(): Date{ return this._hearingTime; }
    set hearingTime(phearingTime: Date){ this._hearingTime = phearingTime ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get aprrealReasonCode(): string{ return this._aprrealReasonCode; }
    set aprrealReasonCode(paprrealReasonCode: string){ this._aprrealReasonCode = paprrealReasonCode ;}
    get reviewDate(): Date{ return this._reviewDate; }
    set reviewDate(previewDate: Date){ this._reviewDate = previewDate ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get hearingResultCode(): string{ return this._hearingResultCode; }
    set hearingResultCode(phearingResultCode: string){ this._hearingResultCode = phearingResultCode ;}

toJSON(): any {
    return { 
       'apprealDate': this._apprealDate,
       'heardBy': this._heardBy,
       'summary': this._summary,
       'createUserId': this._createUserId,
       'offenderBookingId': this._offenderBookingId,
       'modifyDatetime': this._modifyDatetime,
       'hearingDate': this._hearingDate,
       'modifyUserId': this._modifyUserId,
       'otherRepresentative': this._otherRepresentative,
       'oicApprealId': this._oicApprealId,
       'hearingTime': this._hearingTime,
       'createDatetime': this._createDatetime,
       'aprrealReasonCode': this._aprrealReasonCode,
       'reviewDate': this._reviewDate,
       'sealFlag': this._sealFlag,
       'hearingResultCode': this._hearingResultCode,
        };
    } 
}