import { BaseModel } from "@common/beans/BaseModel";

export class OffenderObservationTypes extends BaseModel {



    private _observationType: string;
	private _frequency: number;
	private _notificationFlag: string;
	private _notificationTiming: number;
	private _linkAssessFlag: string;
	private _linkSegDiFlag: string;
	private _linkIncidentFlag: string;
	private _linkOicFlag: string;
	private _listSeq: number;
	private _activeFlag: string;
	private _expiryDate: Date;
    private _createDatetime: Date;
    private _createUserId: string;
	private _placementType: string;
	private _modifyDatetime: Date;
	private _modifyUserId: string;
    private _sealFlag: string;




    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get notificationFlag(): string { return this._notificationFlag; }

    set notificationFlag(pnotificationFlag: string) { this._notificationFlag = pnotificationFlag; }

    get observationType(): string { return this._observationType; }

    set observationType(pobservationType: string) { this._observationType = pobservationType; }

    get frequency(): number { return this._frequency; }

    set frequency(pfrequency: number) { this._frequency = pfrequency; }

    get linkOicFlag(): string { return this._linkOicFlag; }

    set linkOicFlag(plinkOicFlag: string) { this._linkOicFlag = plinkOicFlag; }

    get linkIncidentFlag(): string { return this._linkIncidentFlag; }

    set linkIncidentFlag(plinkIncidentFlag: string) { this._linkIncidentFlag = plinkIncidentFlag; }

    get linkSegDiFlag(): string { return this._linkSegDiFlag; }

    set linkSegDiFlag(plinkSegDiFlag: string) { this._linkSegDiFlag = plinkSegDiFlag; }

    get linkAssessFlag(): string { return this._linkAssessFlag; }

    set linkAssessFlag(plinkAssessFlag: string) { this._linkAssessFlag = plinkAssessFlag; }

    get notificationTiming(): number { return this._notificationTiming; }

    set notificationTiming(pnotificationTiming: number) { this._notificationTiming = pnotificationTiming; }

    get placementType(): string { return this._placementType; }

    set placementType(pplacementType: string) { this._placementType = pplacementType; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get expiryDate(): Date { return this._expiryDate; }

    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

    get listSeq(): number { return this._listSeq; }

    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    toJSON(): any {
        return {
             'placementType': this._placementType,
             'createDatetime': this._createDatetime,
             'modifyDatetime': this._modifyDatetime,
             'modifyUserId': this._modifyUserId,
             'expiryDate': this._expiryDate,
             'activeFlag': this._activeFlag,
             'listSeq': this._listSeq,
             'sealFlag': this._sealFlag,
            'notificationTiming': this._notificationTiming,
            'notificationFlag' : this._notificationFlag,
            'observationType': this._observationType,
            'frequency' : this._frequency,
            'linkOicFlag' : this._linkOicFlag,
           'linkIncidentFlag': this._linkIncidentFlag,
           'linkSegDiFlag' : this._linkSegDiFlag,
            'linkAssessFlag': this._linkAssessFlag,
            'createUserId': this._createUserId,

            };
        }
}
