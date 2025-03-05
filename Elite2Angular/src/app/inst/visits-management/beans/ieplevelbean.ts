import { BaseModel } from "@common/beans/BaseModel";

export class IEPLevelBean extends BaseModel {

    private _code: string;
    private _description: string;
    private _iepLevelCode: string;
    private _iepLeveldescription: string;
    private _sequence: number;
    private _reviewDays: number;
    private _intakeIpe: string;
    private _canteenLimit: number;
    private _activeFlag: string;
    private _expiryDate: Date;
    private _createDatetime: Date;
    private _modifyDatetime: Date;
    private _createUserId: string;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _offenderBookId: number;
    private _dateAsigned: Date;
    private _approvedStaff: string;
    private _reviewComment: string;
    private _nextReviewDate: Date;
    private _staffId: number;
    private _agencyLocation: string;
    private _livingUnit: string;
    private _agyLocId: string;
    private _staffMailId: string;
    private _offenderId: number;
    private _offenderName: string;
    private _offenderIdDisplay: string;
    private _currentDate: Date;
    private _canDispaly: boolean;
    public get canDispaly(): boolean {
        return this._canDispaly;
    }
    public set canDispaly(value: boolean) {
        this._canDispaly = value;
    }

    public get currentDate(): Date {
        return this._currentDate;
    }
    
    public set currentDate(value: Date) {
        this._currentDate = value;
    }

    public get offenderIdDisplay(): string {
        return this._offenderIdDisplay;
    }
    
    public set offenderIdDisplay(value: string) {
        this._offenderIdDisplay = value;
    }

    public get offenderId(): number {
        return this._offenderId;
    }
    
    public set offenderId(value: number) {
        this._offenderId = value;
    }

    public get offenderName(): string {
        return this._offenderName;
    }
    public set offenderName(value: string) {
        this._offenderName = value;
    }

    public get staffMailId(): string {
        return this._staffMailId;
    }
    public set staffMailId(value: string) {
        this._staffMailId = value;
    }

    public get agyLocId(): string {
        return this._agyLocId;
    }
    public set agyLocId(value: string) {
        this._agyLocId = value;
    }
    public get livingUnit(): string {
        return this._livingUnit;
    }
    public set livingUnit(value: string) {
        this._livingUnit = value;
    }
    public get agencyLocation(): string {
        return this._agencyLocation;
    }
    public set agencyLocation(value: string) {
        this._agencyLocation = value;
    }
    
    public get code(): string {
        return this._code;
    }
    public set code(value: string) {
        this._code = value;
    }
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
    public get iepLevelCode(): string {
        return this._iepLevelCode;
    }
    public set iepLevelCode(value: string) {
        this._iepLevelCode = value;
    }
    public get iepLeveldescription(): string {
        return this._iepLeveldescription;
    }
    public set iepLeveldescription(value: string) {
        this._iepLeveldescription = value;
    }
    public get sequence(): number {
        return this._sequence;
    }
    public set sequence(value: number) {
        this._sequence = value;
    }
    public get reviewDays(): number {
        return this._reviewDays;
    }
    public set reviewDays(value: number) {
        this._reviewDays = value;
    }
    public get intakeIpe(): string {
        return this._intakeIpe;
    }
    public set intakeIpe(value: string) {
        this._intakeIpe = value;
    }
    public get canteenLimit(): number {
        return this._canteenLimit;
    }
    public set canteenLimit(value: number) {
        this._canteenLimit = value;
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
    public get createDatetime(): Date {
        return this._createDatetime;
    }
    public set createDatetime(value: Date) {
        this._createDatetime = value;
    }
    public get modifyDatetime(): Date {
        return this._modifyDatetime;
    }
    public set modifyDatetime(value: Date) {
        this._modifyDatetime = value;
    }
    public get createUserId(): string {
        return this._createUserId;
    }
    public set createUserId(value: string) {
        this._createUserId = value;
    }
    public get modifyUserId(): string {
        return this._modifyUserId;
    }
    public set modifyUserId(value: string) {
        this._modifyUserId = value;
    }
    public get sealFlag(): string {
        return this._sealFlag;
    }
    public set sealFlag(value: string) {
        this._sealFlag = value;
    }
    public get offenderBookId(): number {
        return this._offenderBookId;
    }
    public set offenderBookId(value: number) {
        this._offenderBookId = value;
    }
    public get dateAsigned(): Date {
        return this._dateAsigned;
    }
    public set dateAsigned(value: Date) {
        this._dateAsigned = value;
    }
    public get approvedStaff(): string {
        return this._approvedStaff;
    }
    public set approvedStaff(value: string) {
        this._approvedStaff = value;
    }
    public get reviewComment(): string {
        return this._reviewComment;
    }
    public set reviewComment(value: string) {
        this._reviewComment = value;
    }
    public get nextReviewDate(): Date {
        return this._nextReviewDate;
    }
    public set nextReviewDate(value: Date) {
        this._nextReviewDate = value;
    }
    public get staffId(): number {
        return this._staffId;
    }
    public set staffId(value: number) {
        this._staffId = value;
    }
    toJSON(): any {
        return {
            'code': this._code,
            'description': this._description,
            'iepLevelCode': this._iepLevelCode,
            'iepLeveldescription': this._iepLeveldescription,
            'sequence': this._sequence,
            'reviewDays': this._reviewDays,
            'intakeIpe': this._intakeIpe,
            'canteenLimit': this._canteenLimit,
            'activeFlag': this._activeFlag,
            'expiryDate': this._expiryDate,
            'createDatetime': this._createDatetime,
            'modifyDatetime': this._modifyDatetime,
            'createUserId': this._createUserId,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'offenderBookId':this._offenderBookId,
            'dateAsigned':this._dateAsigned,
            'approvedStaff':this._approvedStaff,
            'reviewComment':this._reviewComment,
            'nextReviewDate':this._nextReviewDate,
            'staffId':this._staffId,
            'agencyLocation':this._agencyLocation,
            'livingUnit':this._livingUnit,
            'agyLocId':this._agyLocId,
            'staffMailId': this._staffMailId,
            'offenderId': this._offenderId,
            'offenderName': this._offenderName, 
            'offenderIdDisplay': this._offenderIdDisplay,
            'currentDate': this._currentDate,
            'canDispaly':this._canDispaly
        }
    }


}

