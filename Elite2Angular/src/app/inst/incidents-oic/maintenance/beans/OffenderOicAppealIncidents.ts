export class OffenderOicAppealIncidents {
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _oicHearingId: number;
    private _modifyUserId: string;
    private _resultSeq: number;
    private _oicApprealId: number;
    private _sealFlag: string;
    private _launchButton: string;
    private _chargedOffenceCode: string;
    private _offenceDescription: string;
    private _offenderBookingId: number;
    private _oicIncidentId: number;
    private _agencyIncidentId: number;
    private _chargeSeq: number;
    private _oicOffenceId: number;
    private _hearingDate: Date;

    get hearingDate(): Date{ return this._hearingDate; }
    set hearingDate(phearingDate: Date){ this._hearingDate = phearingDate ;}
    get offenceDescription(): string{ return this._offenceDescription; }
    set offenceDescription(poffenceDescription: string){ this._offenceDescription = poffenceDescription ;}
    get chargedOffenceCode(): string{ return this._chargedOffenceCode; }
    set chargedOffenceCode(phargedOffenceCode: string){ this._chargedOffenceCode = phargedOffenceCode ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get oicHearingId(): number{ return this._oicHearingId; }
    set oicHearingId(poicHearingId: number){ this._oicHearingId = poicHearingId ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get resultSeq(): number{ return this._resultSeq; }
    set resultSeq(presultSeq: number){ this._resultSeq = presultSeq ;}
    get oicApprealId(): number{ return this._oicApprealId; }
    set oicApprealId(poicApprealId: number){ this._oicApprealId = poicApprealId ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get launchButton(): string{ return this._launchButton; }
    set launchButton(plaunchButton: string){ this._launchButton = plaunchButton ;}
    get offenderBookingId(): number{ return this._offenderBookingId; }
    set offenderBookingId(poffenderBookingId: number){ this._offenderBookingId = poffenderBookingId ;}
    get oicIncidentId(): number { return this._oicIncidentId; }
    set oicIncidentId( poicIncidentId: number ) { this._oicIncidentId = poicIncidentId; }
    get agencyIncidentId(): number { return this._agencyIncidentId; }
    set agencyIncidentId( pagencyIncidentId: number ) { this._agencyIncidentId = pagencyIncidentId; }
    get chargeSeq(): number { return this._chargeSeq; }
    set chargeSeq( pchargeSeq: number ) { this._chargeSeq = pchargeSeq; }
    get oicOffenceId(): number { return this._oicOffenceId; }
    set oicOffenceId( poicOffenceId: number ) { this._oicOffenceId = poicOffenceId; }

toJSON(): any {
    return { 
       'createDatetime': this._createDatetime,
       'createUserId': this._createUserId,
       'modifyDatetime': this._modifyDatetime,
       'oicHearingId': this._oicHearingId,
       'modifyUserId': this._modifyUserId,
       'resultSeq': this._resultSeq,
       'oicApprealId': this._oicApprealId,
       'sealFlag': this._sealFlag,
       'launchButton' : this._launchButton,
       'chargedOffenceCode' : this._chargedOffenceCode,
       'offenderBookingId': this._offenderBookingId,
       'oicIncidentId': this._oicIncidentId,
       'agencyIncidentId': this._agencyIncidentId,
       'chargeSeq': this._chargeSeq,
       'oicOffenceId': this._oicOffenceId,
       'hearingDate': this._hearingDate,
        };
    } 
}