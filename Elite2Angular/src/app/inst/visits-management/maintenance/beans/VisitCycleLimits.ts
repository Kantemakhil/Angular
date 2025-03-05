import { BaseModel } from "@common/beans/BaseModel";

export class VisitCycleLimits extends BaseModel {
    private _visitCycleLimitId: number;
    private _agyLocId: string;
    private _secLevel: string;
    private _cycleType: string;
    private _totHrs: number;
    private _totVisits: number;
    private _startDay: string;
    private _expiryDate: Date;
    private _activeFlag: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _tmin: number;

    private _totHrsTemp: string;
    private _iepLevel: string;
    private _iepLevelConfig: string;
	private _securityLevelConfig: string; 
    private _activeLevel: string; 
    private _visitConfigTypeValue: string;
    private _visitConfigType: string;
    private _agencyVisitConfig: string;
    private _visitCount: number;
    public get visitCount(): number {
        return this._visitCount;
    }
    public set visitCount(value: number) {
        this._visitCount = value;
    }
  
    public get agencyVisitConfig(): string {
        return this._agencyVisitConfig;
    }
    public set agencyVisitConfig(value: string) {
        this._agencyVisitConfig = value;
    }
    public get visitConfigType(): string {
        return this._visitConfigType;
    }
    public set visitConfigType(value: string) {
        this._visitConfigType = value;
    }
    public get visitConfigTypeValue(): string {
        return this._visitConfigTypeValue;
    }
    public set visitConfigTypeValue(value: string) {
        this._visitConfigTypeValue = value;
    }

    public get activeLevel(): string {
        return this._activeLevel;
    }
    public set activeLevel(value: string) {
        this._activeLevel = value;
    }
   
    

    get totHrsTemp(): string { return this._totHrsTemp; }

    set totHrsTemp(totHrsTemp: string) { this._totHrsTemp = totHrsTemp; }
    

    get tmin(): number { return this._tmin; }

    set tmin(ptmin: number) { this._tmin = ptmin; }

    get visitCycleLimitId(): number { return this._visitCycleLimitId; }

    set visitCycleLimitId(pvisitCycleLimitId: number) { this._visitCycleLimitId = pvisitCycleLimitId; }

    get agyLocId(): string { return this._agyLocId; }

    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

    get secLevel(): string { return this._secLevel; }

    set secLevel(psecLevel: string) { this._secLevel = psecLevel; }

    get cycleType(): string { return this._cycleType; }

    set cycleType(pcycleType: string) { this._cycleType = pcycleType; }

    get totHrs(): number { return this._totHrs; }

    set totHrs(ptotHrs: number) { this._totHrs = ptotHrs; }

    get totVisits(): number { return this._totVisits; }

    set totVisits(ptotVisits: number) { this._totVisits = ptotVisits; }

    get startDay(): string { return this._startDay; }

    set startDay(pstartDay: string) { this._startDay = pstartDay; }

    get expiryDate(): Date { return this._expiryDate; }

    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }


    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    public get iepLevel(): string {  return this._iepLevel;}
    public set iepLevel(value: string) {  this._iepLevel = value;}
    public get iepLevelConfig(): string {return this._iepLevelConfig;}
    public set iepLevelConfig(value: string) {this._iepLevelConfig = value; }
    public get securityLevelConfig(): string { return this._securityLevelConfig;}
    public set securityLevelConfig(value: string) { this._securityLevelConfig = value;}

    toJSON(): any {
        return {
            'tmin': this._tmin,
            'visitCycleLimitId': this._visitCycleLimitId,
            'agyLocId': this._agyLocId,
            'secLevel': this._secLevel,
            'cycleType': this._cycleType,
            'totHrs': this._totHrs,
            'totVisits': this._totVisits,
            'startDay': this._startDay,
            'activeFlag': this._activeFlag,
            'expiryDate': this._expiryDate,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'iepLevel' : this._iepLevel,
            'iepLevelConfig': this._iepLevelConfig,
            'securityLevelConfig' : this._securityLevelConfig,
            'visitConfigTypeValue':this._visitConfigTypeValue,
            'visitConfigType':this._visitConfigType,
            'visitCount':this._visitCount
        };
    }
}
