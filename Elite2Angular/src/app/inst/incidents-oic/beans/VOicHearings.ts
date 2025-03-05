import {BaseModel} from '@commonbeans/BaseModel';

export class VOicHearings extends BaseModel {

    private _commentText: string;
    private _hearingDate: Date;
    private _hearingStaffName: string;
    private _hearingTime: Date;
    private _intLocDescription: string;
    private _oicHearingId: number;
    private _oicHearingType: string;
    private _oicHearingTypeDesc: string;
    private _oicIncidentId: number;
    private _representativeText: string;

    get commentText(): string { return this._commentText; }

    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    get hearingDate(): Date { return this._hearingDate; }

    set hearingDate(phearingDate: Date) { this._hearingDate = phearingDate; }

    get hearingStaffName(): string { return this._hearingStaffName; }

    set hearingStaffName(phearingStaffName: string) { this._hearingStaffName = phearingStaffName; }

    get hearingTime(): Date { return this._hearingTime; }

    set hearingTime(phearingTime: Date) { this._hearingTime = phearingTime; }

    get intLocDescription(): string { return this._intLocDescription; }

    set intLocDescription(pintLocDescription: string) { this._intLocDescription = pintLocDescription; }

    get oicHearingId(): number { return this._oicHearingId; }

    set oicHearingId(poicHearingId: number) { this._oicHearingId = poicHearingId; }

    get oicHearingType(): string { return this._oicHearingType; }

    set oicHearingType(poicHearingType: string) { this._oicHearingType = poicHearingType; }

    get oicHearingTypeDesc(): string { return this._oicHearingTypeDesc; }

    set oicHearingTypeDesc(poicHearingTypeDesc: string) { this._oicHearingTypeDesc = poicHearingTypeDesc; }

    get oicIncidentId(): number { return this._oicIncidentId; }

    set oicIncidentId(poicIncidentId: number) { this._oicIncidentId = poicIncidentId; }

    get representativeText(): string { return this._representativeText; }

    set representativeText(prepresentativeText: string) { this._representativeText = prepresentativeText; }

    toJSON(): any {
    return {
            'commentText': this._commentText,
            'hearingDate': this._hearingDate,
            'hearingStaffName': this._hearingStaffName,
            'hearingTime': this._hearingTime,
            'intLocDescription': this._intLocDescription,
            'oicHearingId': this._oicHearingId,
            'oicHearingType': this._oicHearingType,
            'oicHearingTypeDesc': this._oicHearingTypeDesc,
            'oicIncidentId': this._oicIncidentId,
            'representativeText': this._representativeText
       };
    }
}
