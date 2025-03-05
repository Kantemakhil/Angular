import { BaseModel } from "@common/beans/BaseModel";

export class VOffBalCals extends BaseModel {

    private _cbDays: number;
    private _offenderBookId: number;
    private _pbScheduleId: number;
    private _hearingDate: Date;
    private _description: string;
    private _offenderBalCalcId: number;
    private _hearingReasonCode: string;
    private _cbYears: number;
    private _hearingReason: string;
    private _offenderId: number;
    private _cbWeeks: number;
    private _effectiveDate: Date;
    private _cbMonths: number;
    private _message: string;
    private _offBalCalcId: number;
    private _hearingType: string;
    private _lRefPrsnDescription: string;
    private _effectiveDateVal: Date;

    get offBalCalcId(): number { return this._offBalCalcId; }
    set offBalCalcId(poffBalCalcId: number) { this._offBalCalcId = poffBalCalcId; }
    get message(): string { return this._message; }
    set message(pmessage: string) { this._message = pmessage; }
    get cbDays(): number { return this._cbDays; }
    set cbDays(pcbDays: number) { this._cbDays = pcbDays; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
    get pbScheduleId(): number { return this._pbScheduleId; }
    set pbScheduleId(ppbScheduleId: number) { this._pbScheduleId = ppbScheduleId; }
    get hearingDate(): Date { return this._hearingDate; }
    set hearingDate(phearingDate: Date) { this._hearingDate = phearingDate; }
    get description(): string { return this._description; }
    set description(pdescription: string) { this._description = pdescription; }
    get offenderBalCalcId(): number { return this._offenderBalCalcId; }
    set offenderBalCalcId(poffenderBalCalcId: number) { this._offenderBalCalcId = poffenderBalCalcId; }
    get hearingReasonCode(): string { return this._hearingReasonCode; }
    set hearingReasonCode(phearingReasonCode: string) { this._hearingReasonCode = phearingReasonCode; }
    get cbYears(): number { return this._cbYears; }
    set cbYears(pcbYears: number) { this._cbYears = pcbYears; }
    get hearingReason(): string { return this._hearingReason; }
    set hearingReason(phearingReason: string) { this._hearingReason = phearingReason; }
    get offenderId(): number { return this._offenderId; }
    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }
    get cbWeeks(): number { return this._cbWeeks; }
    set cbWeeks(pcbWeeks: number) { this._cbWeeks = pcbWeeks; }
    get effectiveDate(): Date { return this._effectiveDate; }
    set effectiveDate(peffectiveDate: Date) { this._effectiveDate = peffectiveDate; }
    get cbMonths(): number { return this._cbMonths; }
    set cbMonths(pcbMonths: number) { this._cbMonths = pcbMonths; }
    get hearingType(): string { return this.hearingType; }
    set hearingType(phearingType: string) { this.hearingType = phearingType; }
    get lRefPrsnDescription(): string { return this._lRefPrsnDescription; }
    set lRefPrsnDescription(plRefPrsnDescription: string) { this._lRefPrsnDescription = plRefPrsnDescription; }
    get effectiveDateVal(): Date { return this._effectiveDateVal; }
    set effectiveDateVal(peffectiveDateVal: Date) { this._effectiveDateVal = peffectiveDateVal; }

    toJSON(): any {
        return {
            'cbDays': this._cbDays,
            'offenderBookId': this._offenderBookId,
            'pbScheduleId': this._pbScheduleId,
            'hearingDate': this._hearingDate,
            'description': this._description,
            'offenderBalCalcId': this._offenderBalCalcId,
            'hearingReasonCode': this._hearingReasonCode,
            'cbYears': this._cbYears,
            'hearingReason': this._hearingReason,
            'offenderId': this._offenderId,
            'cbWeeks': this._cbWeeks,
            'effectiveDate': this._effectiveDate,
            'cbMonths': this._cbMonths,
            'message': this._message,
            'offBalCalcId': this._offBalCalcId,
            'hearingType': this._hearingType,
            'lRefPrsnDescription': this._lRefPrsnDescription,
            'effectiveDateVal': this._effectiveDateVal,
        };
    }
}
