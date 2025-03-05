export class Allowances {

    private _allowanceType: string;
    
    private _unit: string;

    private _maxUnit: number;

    private _rate: number;

    private _sundayFlag: string;
    
    private _mondayFlag: string;
    
    private _tuesdayFlag: string;
    
    private _wednesdayFlag: string;
   
    private _thursdayFlag: string;
    
    private _fridayFlag: string;
    
    private _saturdayFlag: string;
    
    private _activeFlag: string;
    
    private _expiryDate: Date;
   
    private _versionNo: number;
    
    private _versionStartDate: Date;

    private _versionStartTime: Date;

    private _allowanceModifiedDate: Date;
    
    private _createDatetime: Date;
    
    private _createUserId: string;
   
    private _modifyDatetime: Date;
   
    private _modifyUserId: string;


    public get allowanceType(): string {
        return this._allowanceType;
    }
    public set allowanceType(value: string) {
        this._allowanceType = value;
    }

    public get unit(): string {
        return this._unit;
    }
    public set unit(value: string) {
        this._unit = value;
    }
    
    public get maxUnit(): number {
        return this._maxUnit;
    }
    public set maxUnit(value: number) {
        this._maxUnit = value;
    }
   
    public get rate(): number {
        return this._rate;
    }
    public set rate(value: number) {
        this._rate = value;
    }
    public get sundayFlag(): string {
        return this._sundayFlag;
    }
    public set sundayFlag(value: string) {
        this._sundayFlag = value;
    }
    
    public get mondayFlag(): string {
        return this._mondayFlag;
    }
    public set mondayFlag(value: string) {
        this._mondayFlag = value;
    }
    public get tuesdayFlag(): string {
        return this._tuesdayFlag;
    }
    public set tuesdayFlag(value: string) {
        this._tuesdayFlag = value;
    }
    public get wednesdayFlag(): string {
        return this._wednesdayFlag;
    }
    public set wednesdayFlag(value: string) {
        this._wednesdayFlag = value;
    }

    public get thursdayFlag(): string {
        return this._thursdayFlag;
    }
    public set thursdayFlag(value: string) {
        this._thursdayFlag = value;
    }
    public get fridayFlag(): string {
        return this._fridayFlag;
    }
    public set fridayFlag(value: string) {
        this._fridayFlag = value;
    }
    
    public get saturdayFlag(): string {
        return this._saturdayFlag;
    }
    public set saturdayFlag(value: string) {
        this._saturdayFlag = value;
    }
    public get activeFlag(): string {
        return this._activeFlag;
    }
    public set activeFlag(value: string) {
        this._activeFlag = value;
    }
    public get expiryDate(): Date {
        return this._expiryDate;
    }
    public set expiryDate(value: Date) {
        this._expiryDate = value;
    }
    public get versionNo(): number {
        return this._versionNo;
    }
    public set versionNo(value: number) {
        this._versionNo = value;
    }
    public get versionStartDate(): Date {
        return this._versionStartDate;
    }
    public set versionStartDate(value: Date) {
        this._versionStartDate = value;
    }
    public get versionStartTime(): Date {
        return this._versionStartTime;
    }
    public set versionStartTime(value: Date) {
        this._versionStartTime = value;
    }
    public get allowanceModifiedDate(): Date {
        return this._allowanceModifiedDate;
    }
    public set allowanceModifiedDate(value: Date) {
        this._allowanceModifiedDate = value;
    }
    public get createDatetime(): Date {
        return this._createDatetime;
    }
    public set createDatetime(value: Date) {
        this._createDatetime = value;
    }
    public get createUserId(): string {
        return this._createUserId;
    }
    public set createUserId(value: string) {
        this._createUserId = value;
    }
    public get modifyDatetime(): Date {
        return this._modifyDatetime;
    }
    public set modifyDatetime(value: Date) {
        this._modifyDatetime = value;
    }
    public get modifyUserId(): string {
        return this._modifyUserId;
    }
    public set modifyUserId(value: string) {
        this._modifyUserId = value;
    }

    toJSON(): any {
        return {
        'allowanceType': this._allowanceType,
        'unit': this._unit,
        'maxUnit': this._maxUnit,
        'rate': this._rate,
        'sundayFlag': this._sundayFlag,
        'mondayFlag': this._mondayFlag,
        'tuesdayFlag': this._tuesdayFlag,
        'wednesday': this._wednesdayFlag,
        'thursdayFlag': this._thursdayFlag,
        'fridayFlag': this._fridayFlag,
        'saturday': this._saturdayFlag,
        'activeFlag': this._activeFlag,
        'expiryDate': this._expiryDate,
        'versionNo': this._versionNo,
        'versionStartDate': this._versionStartDate,
        'versionStartTime': this._versionStartTime,
        'allowanceModifiedDate': this._allowanceModifiedDate,
        'createDatetime': this._createDatetime,
        'createUserId': this._createUserId,
        'modifyDatetime': this._modifyDatetime,
        'modifyUserId': this._modifyUserId,
         };
    }
    
}