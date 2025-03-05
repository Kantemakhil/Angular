import {BaseModel} from '@commonbeans/BaseModel';

export class VOffenderOicSanctions extends BaseModel {

    private _commentText: string;
    private _compensationAmount: number;
    private _consecutiveSanctionSeq: number;
    private _effectiveDate: Date;
    private _offenderBookId: number;
    private _oicHearingId: number;
    private _oicIncidentId: number;
    private _oicSanctionCode: string;
    private _oicSanctionDesc: string;
    private _resultSeq: number;
    private _sanctionDays: number;
    private _sanctionMonths: number;
    private _sanctionSeq: number;
    private _statusDate: Date;
    private _statusDescription: string;

    get commentText(): string { return this._commentText; }

    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    get compensationAmount(): number { return this._compensationAmount; }

    set compensationAmount(pcompensationAmount: number) { this._compensationAmount = pcompensationAmount; }

    get consecutiveSanctionSeq(): number { return this._consecutiveSanctionSeq; }

    set consecutiveSanctionSeq(pconsecutiveSanctionSeq: number) { this._consecutiveSanctionSeq = pconsecutiveSanctionSeq; }

    get effectiveDate(): Date { return this._effectiveDate; }

    set effectiveDate(peffectiveDate: Date) { this._effectiveDate = peffectiveDate; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get oicHearingId(): number { return this._oicHearingId; }

    set oicHearingId(poicHearingId: number) { this._oicHearingId = poicHearingId; }

    get oicIncidentId(): number { return this._oicIncidentId; }

    set oicIncidentId(poicIncidentId: number) { this._oicIncidentId = poicIncidentId; }

    get oicSanctionCode(): string { return this._oicSanctionCode; }

    set oicSanctionCode(poicSanctionCode: string) { this._oicSanctionCode = poicSanctionCode; }

    get oicSanctionDesc(): string { return this._oicSanctionDesc; }

    set oicSanctionDesc(poicSanctionDesc: string) { this._oicSanctionDesc = poicSanctionDesc; }

    get resultSeq(): number { return this._resultSeq; }

    set resultSeq(presultSeq: number) { this._resultSeq = presultSeq; }

    get sanctionDays(): number { return this._sanctionDays; }

    set sanctionDays(psanctionDays: number) { this._sanctionDays = psanctionDays; }

    get sanctionMonths(): number { return this._sanctionMonths; }

    set sanctionMonths(psanctionMonths: number) { this._sanctionMonths = psanctionMonths; }

    get sanctionSeq(): number { return this._sanctionSeq; }

    set sanctionSeq(psanctionSeq: number) { this._sanctionSeq = psanctionSeq; }

    get statusDate(): Date { return this._statusDate; }

    set statusDate(pstatusDate: Date) { this._statusDate = pstatusDate; }

    get statusDescription(): string { return this._statusDescription; }

    set statusDescription(pstatusDescription: string) { this._statusDescription = pstatusDescription; }

                toJSON(): any {
                                return {
                                                'commentText': this._commentText,
                                                'compensationAmount': this._compensationAmount,
                                                'consecutiveSanctionSeq': this._consecutiveSanctionSeq,
                                                'effectiveDate': this._effectiveDate,
                                                'offenderBookId': this._offenderBookId,
                                                'oicHearingId': this._oicHearingId,
                                                'oicIncidentId': this._oicIncidentId,
                                                'oicSanctionCode': this._oicSanctionCode,
                                                'oicSanctionDesc': this._oicSanctionDesc,
                                                'resultSeq': this._resultSeq,
                                                'sanctionDays': this._sanctionDays,
                                                'sanctionMonths': this._sanctionMonths,
                                                'sanctionSeq': this._sanctionSeq,
                                                'statusDate': this._statusDate,
                                                'statusDescription': this._statusDescription
                                };
                }
}
