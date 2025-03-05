import { BaseModel } from "../../../../common/beans/BaseModel";

export class MaintainTierDefaultEvents extends BaseModel {
    private _tierLevelcode: string;
    private _scheduleType: string;
    private _scheduleSubType: string;
    private  _createUserId: string;
    private _modifyDatetime: Date;
    private  _modifyUserId: string;
    private _createDatetime: Date;
    private _uiRules: string;
    private _caseLoadId: string;
    private _tierId: number;
    private _sealFlag: string;
    private _startDate: Date;
    private _startTime: Date;
    private _endTime: Date;
    private _emailFlag: any;
    private _smsFlag: any;
    private _emailSchHoursBefore: number;
    private _smsSchHoursBefore: number;
    private _location: any;
    private _commentText: string;
    private _isSeriesFalg: any;
    private _excludeFlag: any;
    private _staffName: string;
    private _offenderBookId: number;
	private _emailAddressCount: number;
	private _phoneNumberCount: number;
    private _validSmsFlag: any;
    private _validEmailFlag: any;
    private _eventId: number;
    private _offenderTierLevelId: number;
    private _versionNo: number;
    private _tierEventSchVersionId: number;


    
    
   
    get tierLevelcode(): string {return this._tierLevelcode;}
    set tierLevelcode(value: string) {this._tierLevelcode = value;}
    get scheduleType(): string { return this._scheduleType;}
    set scheduleType(value: string) {this._scheduleType = value;}
    get scheduleSubType(): string {return this._scheduleSubType; }
    set scheduleSubType(value: string) {this._scheduleSubType = value;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(_createUserId: string){ this._createUserId = _createUserId ;}
    get modifyDatetime(): Date {return this._modifyDatetime;}
    set modifyDatetime(value: Date) {this._modifyDatetime = value;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get createDatetime(): Date {return this._createDatetime; }
    set createDatetime(value: Date) {this._createDatetime = value;}
    get uiRules(): string {return this._uiRules; }
    set uiRules(value: string) {this._uiRules = value;}
    get caseLoadId(): string {return this._caseLoadId;}
    set caseLoadId(value: string) {this._caseLoadId = value;}
    get tierId(): number {return this._tierId;}
    set tierId(value: number) {this._tierId = value;}
    get sealFlag(): string {return this._sealFlag;}
    set sealFlag(value: string) {this._sealFlag = value;}
    get startDate(): Date {return this._startDate;}
    set startDate(value: Date) {this._startDate = value;}
    get startTime(): Date {return this._startTime;}
    set startTime(value: Date) {this._startTime = value;}
    get endTime(): Date { return this._endTime;}
    set endTime(value: Date) {this._endTime = value;}
    get emailFlag(): any {return this._emailFlag;}
    set emailFlag(value: any) {this._emailFlag = value;}
    get smsFlag(): any {return this._smsFlag;}
    set smsFlag(value: any) {this._smsFlag = value; }
    get emailSchHoursBefore(): number {return this._emailSchHoursBefore;}
    set emailSchHoursBefore(value: number) {this._emailSchHoursBefore = value;}
    get smsSchHoursBefore(): number {return this._smsSchHoursBefore; }
    set smsSchHoursBefore(value: number) {this._smsSchHoursBefore = value;}
    get location(): any {return this._location;}
    set location(value: any) {this._location = value;}
    get commentText(): string {return this._commentText;}
    set commentText(value: string) {this._commentText = value;}
    get isSeriesFalg(): any {return this._isSeriesFalg;}
    set isSeriesFalg(value: any) {this._isSeriesFalg = value;}
    get excludeFlag(): any {return this._excludeFlag;}
    set excludeFlag(value: any) {this._excludeFlag = value;}
    get staffName(): string {return this._staffName;}
    set staffName(value: string) {this._staffName = value;}
    get offenderBookId(): number {return this._offenderBookId;}
    set offenderBookId(value: number) {this._offenderBookId = value;}
    get emailAddressCount(): number {return this._emailAddressCount;}
    set emailAddressCount(value: number) {this._emailAddressCount = value;}
    get phoneNumberCount(): number {return this._phoneNumberCount;}
    set phoneNumberCount(value: number) { this._phoneNumberCount = value;}
    get validEmailFlag(): any {return this._validEmailFlag;}
    set validEmailFlag(value: any) {this._validEmailFlag = value; }
    get validSmsFlag(): any {return this._validSmsFlag;}
    set validSmsFlag(value: any) {this._validSmsFlag = value;}
    get eventId(): number {return this._eventId; }
    set eventId(value: number) {this._eventId = value;}
    get offenderTierLevelId(): number {return this._offenderTierLevelId;}
    set offenderTierLevelId(value: number) {this._offenderTierLevelId = value;}
    get versionNo(): number {return this._versionNo;}
    set versionNo(value: number) {this._versionNo = value;} 
    get tierEventSchVersionId(): number {return this._tierEventSchVersionId;}
    set tierEventSchVersionId(value: number) {this._tierEventSchVersionId = value;}
    toJSON(): any {
        return {
            'tierLevelcode': this._tierLevelcode,
            'scheduleType' : this._scheduleType,
            'scheduleSubType' : this._scheduleSubType,
            'createUserId':this._createUserId,
            'modifyDatetime':this._modifyDatetime,
            'modifyUserId':this._modifyUserId,
            'createDatetime':this._createDatetime,
            'uiRules':this._uiRules,
            'caseLoadId':this._caseLoadId,
            'tierId' : this._tierId,
            'sealFlag' : this._sealFlag,
            'startDate':this._startDate,
            'startTime':this._startTime,
            'emailFlag':this._emailFlag,
            'smsFlag':this._smsFlag,
            'emailSchHoursBefore':this._emailSchHoursBefore,
            'smsSchHoursBefore':this._smsSchHoursBefore,
            'location':this._location,
            'commentText':this._commentText,
            'isSeriesFalg':this._isSeriesFalg,
            'excludeFlag':this._excludeFlag,
            'staffName' : this._staffName,
            'offenderBookId' : this._offenderBookId,
            'validSmsFlag' : this._validSmsFlag,
            'validEmailFlag' : this._validEmailFlag,
            'eventId' : this._eventId,
            'endTime':this._endTime,
            'offenderTierLevelId':this._offenderTierLevelId,
            'versionNo':this._versionNo,
            'tierEventSchVersionId': this._tierEventSchVersionId
        };

    }


}