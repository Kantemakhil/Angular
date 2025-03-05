import {BaseModel} from '@commonbeans/BaseModel';

export class VOicHearingResults extends BaseModel {

    private _findingDescription: string;
    private _oicChargeId: string;
    private _oicHearingId: number;
    private _oicOffenceCategory: string;
    private _oicOffenceCode: string;
    private _oicOffenceDescription: string;
    private _oicOffenceType: string;
    private _oicOfnTypeDesc: string;
    private _pleaDescription: string;
    private _resultOffenceType: string;
    private _resultOicOffenceCategory: string;
    private _resultOicOffenceCode: string;
    private _resultOicOffenceDescription: string;
    private _resultOicOfnTypeDesc: string;
    private _resultSeq: number;

    get findingDescription(): string { return this._findingDescription; }

    set findingDescription(pfindingDescription: string) { this._findingDescription = pfindingDescription; }

    get oicChargeId(): string { return this._oicChargeId; }

    set oicChargeId(poicChargeId: string) { this._oicChargeId = poicChargeId; }

    get oicHearingId(): number { return this._oicHearingId; }

    set oicHearingId(poicHearingId: number) { this._oicHearingId = poicHearingId; }

    get oicOffenceCategory(): string { return this._oicOffenceCategory; }

    set oicOffenceCategory(poicOffenceCategory: string) { this._oicOffenceCategory = poicOffenceCategory; }

    get oicOffenceCode(): string { return this._oicOffenceCode; }

    set oicOffenceCode(poicOffenceCode: string) { this._oicOffenceCode = poicOffenceCode; }

    get oicOffenceDescription(): string { return this._oicOffenceDescription; }

    set oicOffenceDescription(poicOffenceDescription: string) { this._oicOffenceDescription = poicOffenceDescription; }

    get oicOffenceType(): string { return this._oicOffenceType; }

    set oicOffenceType(poicOffenceType: string) { this._oicOffenceType = poicOffenceType; }

    get oicOfnTypeDesc(): string { return this._oicOfnTypeDesc; }

    set oicOfnTypeDesc(poicOfnTypeDesc: string) { this._oicOfnTypeDesc = poicOfnTypeDesc; }

    get pleaDescription(): string { return this._pleaDescription; }

    set pleaDescription(ppleaDescription: string) { this._pleaDescription = ppleaDescription; }

    get resultOffenceType(): string { return this._resultOffenceType; }

    set resultOffenceType(presultOffenceType: string) { this._resultOffenceType = presultOffenceType; }

    get resultOicOffenceCategory(): string { return this._resultOicOffenceCategory; }

    set resultOicOffenceCategory(presultOicOffenceCategory: string) { this._resultOicOffenceCategory = presultOicOffenceCategory; }

    get resultOicOffenceCode(): string { return this._resultOicOffenceCode; }

    set resultOicOffenceCode(presultOicOffenceCode: string) { this._resultOicOffenceCode = presultOicOffenceCode; }

    get resultOicOffenceDescription(): string { return this._resultOicOffenceDescription; }

    set resultOicOffenceDescription(presultOicOffenceDescription: string) {
       this._resultOicOffenceDescription = presultOicOffenceDescription; }

    get resultOicOfnTypeDesc(): string { return this._resultOicOfnTypeDesc; }

    set resultOicOfnTypeDesc(presultOicOfnTypeDesc: string) { this._resultOicOfnTypeDesc = presultOicOfnTypeDesc; }

    get resultSeq(): number { return this._resultSeq; }

    set resultSeq(presultSeq: number) { this._resultSeq = presultSeq; }

    toJSON(): any {
       return {
            'findingDescription': this._findingDescription,
            'oicChargeId': this._oicChargeId,
            'oicHearingId': this._oicHearingId,
            'oicOffenceCategory': this._oicOffenceCategory,
            'oicOffenceCode': this._oicOffenceCode,
            'oicOffenceDescription': this._oicOffenceDescription,
            'oicOffenceType': this._oicOffenceType,
            'oicOfnTypeDesc': this._oicOfnTypeDesc,
            'pleaDescription': this._pleaDescription,
            'resultOffenceType': this._resultOffenceType,
            'resultOicOffenceCategory': this._resultOicOffenceCategory,
            'resultOicOffenceCode': this._resultOicOffenceCode,
            'resultOicOffenceDescription': this._resultOicOffenceDescription,
            'resultOicOfnTypeDesc': this._resultOicOfnTypeDesc,
            'resultSeq': this._resultSeq
        };
     }
}
