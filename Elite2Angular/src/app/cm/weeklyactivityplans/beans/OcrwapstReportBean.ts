import { BaseModel } from '@commonbeans/BaseModel';
import { WeeklyActivityPlansHty } from './WeeklyActivityPlansHty';
export class OcrwapstReportBean extends BaseModel {
    private _emDailyChargingPeriod: string;
    private _createUserId: string;
    private _address: string;
    private _week: string;
    private _offenderBookId: number;
    private _scheduledActivitiesList: Array<WeeklyActivityPlansHty>;
    private _offenderIdDisplay: string;
    private _emTagId: number;
    private _emTagData: string;
    private _emStrapSize: string;
    private _wapVersion: string;
    private _serialVersionUID: number;
    private _phone: string;
    private _caseloadDesc: string;
    private _caseloadId: string;
    private _wapStartDate: Date;
    private _report: number;
    private _offenderName: string;
    private _comment: string;
    private _wapEndDate: Date;
    private _sealFlag: string;
    private _emTagStartTime: Date;
    private _emTagEndTime: Date;
    private _pidLabel:string;
    private _emtagLabel:string;
    private _emtagStrapSizeLabel:string;
    private _commentLabel:string;
    private _titleLabel:string;
    private _reportCreatedLabel:string;
    private _createdLabel:string;
    private _offenderNameLabel:string;
    private _offenderPhoneLabel:string;
    private _offenderAddressLabel:string;
    private _weekLabel:string;
    private _wapVersionLabel:string;
    private _emDailyChargingLabel:string;
    private _scheduledActivitiesLabel:string;

    get emDailyChargingPeriod(): string{ return this._emDailyChargingPeriod; }
    set emDailyChargingPeriod(pemDailyChargingPeriod: string){ this._emDailyChargingPeriod = pemDailyChargingPeriod ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get address(): string{ return this._address; }
    set address(paddress: string){ this._address = paddress ;}
    get week(): string{ return this._week; }
    set week(pweek: string){ this._week = pweek ;}
    get offenderBookId(): number{ return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}

    get scheduledActivitiesList(): Array<WeeklyActivityPlansHty> { return this._scheduledActivitiesList; }
    set scheduledActivitiesList(pscheduledActivitiesList: Array<WeeklyActivityPlansHty>) { this._scheduledActivitiesList = pscheduledActivitiesList; }
    get offenderIdDisplay(): string{ return this._offenderIdDisplay; }
    set offenderIdDisplay(poffenderIdDisplay: string){ this._offenderIdDisplay = poffenderIdDisplay ;}
    get emTagId(): number{ return this._emTagId; }
    set emTagId(pemTagId: number){ this._emTagId = pemTagId ;}
    get emStrapSize(): string{ return this._emStrapSize; }
    set emStrapSize(pemStrapSize: string){ this._emStrapSize = pemStrapSize ;}
    get wapVersion(): string{ return this._wapVersion; }
    set wapVersion(pwapVersion: string){ this._wapVersion = pwapVersion ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get phone(): string{ return this._phone; }
    set phone(pphone: string){ this._phone = pphone ;}
    get caseloadDesc(): string{ return this._caseloadDesc; }
    set caseloadDesc(pcaseloadDesc: string){ this._caseloadDesc = pcaseloadDesc ;}
    get caseloadId(): string{ return this._caseloadId; }
    set caseloadId(pcaseloadId: string){ this._caseloadId = pcaseloadId ;}
    get wapStartDate(): Date{ return this._wapStartDate; }
    set wapStartDate(pwapStartDate: Date){ this._wapStartDate = pwapStartDate ;}
    get report(): number{ return this._report; }
    set report(preport: number){ this._report = preport ;}
    get offenderName(): string{ return this._offenderName; }
    set offenderName(poffenderName: string){ this._offenderName = poffenderName ;}
    get comment(): string{ return this._comment; }
    set comment(pcomment: string){ this._comment = pcomment ;}
    get wapEndDate(): Date{ return this._wapEndDate; }
    set wapEndDate(pwapEndDate: Date){ this._wapEndDate = pwapEndDate ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    public get emTagData(): string { return this._emTagData;}
    public set emTagData(value: string) { this._emTagData = value;}
    public get emTagStartTime(): Date { return this._emTagStartTime;}
    public set emTagStartTime(value: Date) { this._emTagStartTime = value;}
    public get emTagEndTime(): Date { return this._emTagEndTime;}
    public set emTagEndTime(value: Date) { this._emTagEndTime = value;}
    get pidLabel(): string{ return this._pidLabel; }
    set pidLabel(ppidLabel: string){ this._pidLabel = ppidLabel ;}
    get emtagLabel(): string{ return this._emtagLabel; }
    set emtagLabel(pemtagLabel: string){ this._emtagLabel = pemtagLabel;}
    get emtagStrapSizeLabel(): string{ return this._emtagStrapSizeLabel; }
    set emtagStrapSizeLabel(pemtagStrapSizeLabel: string){ this._emtagStrapSizeLabel = pemtagStrapSizeLabel;}
    get commentLabel(): string{ return this._commentLabel; }
    set commentLabel(pcommentLabel: string){ this._commentLabel = pcommentLabel;}
    get titleLabel(): string{ return this._titleLabel; }
    set titleLabel(ptitleLabel: string){ this._titleLabel = ptitleLabel;}
    get reportCreatedLabel(): string{ return this._reportCreatedLabel; }
    set reportCreatedLabel(preportCreatedLabel: string){ this._reportCreatedLabel = preportCreatedLabel;}
    get createdLabel(): string{ return this._createdLabel; }
    set createdLabel(pcreatedLabel: string){ this._createdLabel = pcreatedLabel;}
    get offenderNameLabel(): string{ return this._offenderNameLabel; }
    set offenderNameLabel(poffenderNameLabel: string){ this._offenderNameLabel = poffenderNameLabel;}
    get offenderPhoneLabel(): string{ return this._offenderPhoneLabel; }
    set offenderPhoneLabel(poffenderPhoneLabel: string){ this._offenderPhoneLabel = poffenderPhoneLabel;}
    get offenderAddressLabel(): string{ return this._offenderAddressLabel; }
    set offenderAddressLabel(poffenderAddressLabel: string){ this._offenderAddressLabel = poffenderAddressLabel;}
    get weekLabel(): string{ return this._weekLabel; }
    set weekLabel(pweekLabel: string){ this._weekLabel = pweekLabel;}
    get wapVersionLabel(): string{ return this._wapVersionLabel; }
    set wapVersionLabel(pwapVersionLabel: string){ this._wapVersionLabel = pwapVersionLabel;}
    get emDailyChargingLabel(): string{ return this._emDailyChargingLabel; }
    set emDailyChargingLabel(pemDailyChargingLabel: string){ this._emDailyChargingLabel = pemDailyChargingLabel;}
    get scheduledActivitiesLabel(): string{return this._scheduledActivitiesLabel; }
    set scheduledActivitiesLabel(pscheduledActivitiesLabel: string){ this._scheduledActivitiesLabel= pscheduledActivitiesLabel}
    
toJSON(): any {
    return { 
       'emDailyChargingPeriod': this._emDailyChargingPeriod,
       'createUserId': this._createUserId,
       'address': this._address,
       'week': this._week,
       'offenderBookId': this._offenderBookId,
       'scheduledActivitiesList': this._scheduledActivitiesList,
       'offenderIdDisplay': this._offenderIdDisplay,
       'emTagId': this._emTagId,
       'emTagData': this._emTagData,
       'emStrapSize': this._emStrapSize,
       'wapVersion': this._wapVersion,
       'phone': this._phone,
       'caseloadDesc': this._caseloadDesc,
       'caseloadId': this._caseloadId,
       'wapStartDate': this._wapStartDate,
       'report': this._report,
       'offenderName': this._offenderName,
       'comment': this._comment,
       'wapEndDate': this._wapEndDate,
       'sealFlag': this._sealFlag,
       'emTagStartTime': this.emTagStartTime,
       'emTagEndTime' : this._emTagEndTime,
       'pidLabel':this._pidLabel,
       'emtagLabel':this._emtagLabel,
       'emtagStrapSizeLabel':this._emtagStrapSizeLabel,
       'commentLabel':this._commentLabel,
       'titleLabel':this._titleLabel,
       'reportCreatedLabel':this._reportCreatedLabel,
       'createdLabel':this._createdLabel,
       'offenderNameLabel':this._offenderNameLabel,
       'offenderPhoneLabel':this._offenderPhoneLabel,
       'offenderAddressLabel':this._offenderAddressLabel,
       'weekLabel':this._weekLabel,
       'wapVersionLabel':this._wapVersionLabel,
       'emDailyChargingLabel':this._emDailyChargingLabel,
       'scheduledActivitiesLabel':this._scheduledActivitiesLabel,
        };
    } 
}
