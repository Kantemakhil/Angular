import {BaseModel} from '@commonbeans/BaseModel';

export class OffenderOicSanctions extends BaseModel {

    private _offenderBookId: number;
    private _sanctionSeq: number;
    private _oicSanctionCode: string;
    private _compensationAmount: number;
    private _sanctionMonths: number;
    private _sanctionDays: number;
    private _commentText: string;
    private _effectiveDate: Date;
    private _appealingDate: Date;
    private _consecutiveOffenderBookId: number;
    private _consecutiveSanctionSeq: number;
    private _oicHearingId: number;
    private _status: string;
    private _offenderAdjustId: number;
    private _resultSeq: number;
    private _createDatetime: Date;
    private _createUserID: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _statusDate: Date;
    private _oicIncidentId: number;
    private _lidsSanctionNumber: number;
    private _sealFlag: string;
    private _compensation: string;
    
    get compensation(): string { return this._compensation; }

    set compensation(pcompensation: string) { this._compensation = pcompensation; }

    get appealingDate(): Date { return this._appealingDate; }

    set appealingDate(pappealingDate: Date) { this._appealingDate = pappealingDate; }

    get consecutiveOffenderBookId(): number { return this._consecutiveOffenderBookId; }

    set consecutiveOffenderBookId(pconsecutiveOffenderBookId: number) { this._consecutiveOffenderBookId = pconsecutiveOffenderBookId; }

    get consecutiveSanctionSeq(): number { return this._consecutiveSanctionSeq; }

    set consecutiveSanctionSeq(pconsecutiveSanctionSeq: number) { this._consecutiveSanctionSeq = pconsecutiveSanctionSeq; }


    get statusDate(): Date { return this._statusDate; }

    set statusDate(pstatusDate: Date) { this._statusDate = pstatusDate; }

    get sanctionMonths(): number { return this._sanctionMonths; }

    set sanctionMonths(psanctionMonths: number) { this._sanctionMonths = psanctionMonths; }

    get createUserID(): string { return this._createUserID; }

    set createUserID(pcreateUserID: string) { this._createUserID = pcreateUserID; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get compensationAmount(): number { return this._compensationAmount; }

    set compensationAmount(pcompensationAmount: number) { this._compensationAmount = pcompensationAmount; }

    get sanctionDays(): number { return this._sanctionDays; }

    set sanctionDays(psanctionDays: number) { this._sanctionDays = psanctionDays; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get resultSeq(): number { return this._resultSeq; }

    set resultSeq(presultSeq: number) { this._resultSeq = presultSeq; }

    get commentText(): string { return this._commentText; }

    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get lidsSanctionNumber(): number { return this._lidsSanctionNumber; }

    set lidsSanctionNumber(plidsSanctionNumber: number) { this._lidsSanctionNumber = plidsSanctionNumber; }

    get sanctionSeq(): number { return this._sanctionSeq; }

    set sanctionSeq(psanctionSeq: number) { this._sanctionSeq = psanctionSeq; }

    get oicHearingId(): number { return this._oicHearingId; }

    set oicHearingId(poicHearingId: number) { this._oicHearingId = poicHearingId; }

    get oicIncidentId(): number { return this._oicIncidentId; }

    set oicIncidentId(poicIncidentId: number) { this._oicIncidentId = poicIncidentId; }

    get oicSanctionCode(): string { return this._oicSanctionCode; }

    set oicSanctionCode(poicSanctionCode: string) { this._oicSanctionCode = poicSanctionCode; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get effectiveDate(): Date { return this._effectiveDate; }

    set effectiveDate(peffectiveDate: Date) { this._effectiveDate = peffectiveDate; }

    get offenderAdjustId(): number { return this._offenderAdjustId; }

    set offenderAdjustId(poffenderAdjustId: number) { this._offenderAdjustId = poffenderAdjustId; }

    get status(): string { return this._status; }

    set status(pstatus: string) { this._status = pstatus; }


    toJSON(): any {
        return {
            'appealingDate': this._appealingDate,
            'statusDate': this._statusDate,
            'sanctionMonths': this._sanctionMonths,
            'createUserID': this._createUserID,
            'modifyDatetime': this._modifyDatetime,
            'offenderBookId': this._offenderBookId,
            'compensationAmount': this._compensationAmount,
            'sanctionDays': this._sanctionDays,
            'modifyUserId': this._modifyUserId,
            'resultSeq': this._resultSeq,
            'commentText': this._commentText,
            'createDatetime': this._createDatetime,
            'lidsSanctionNumber': this._lidsSanctionNumber,
            'sanctionSeq': this._sanctionSeq,
            'oicHearingId': this._oicHearingId,
            'oicIncidentId': this._oicIncidentId,
            'oicSanctionCode': this._oicSanctionCode,
            'sealFlag': this._sealFlag,
            'effectiveDate': this._effectiveDate,
            'offenderAdjustId': this._offenderAdjustId,
            'status': this._status,
            'consecutiveOffenderBookId': this._consecutiveOffenderBookId,
            'consecutiveSanctionSeq': this._consecutiveSanctionSeq,
            'compensation':this._compensation,
        };
    }
}
