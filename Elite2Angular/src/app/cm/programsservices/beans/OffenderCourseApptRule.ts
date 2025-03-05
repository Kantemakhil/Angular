import { BaseModel } from '@common/beans/BaseModel';

export class OffenderCourseApptRule extends BaseModel {
    private _tuesdayFlag: boolean;
    private _offenderCourseApptGrpId: number;
    public get offenderCourseApptGrpId(): number {
        return this._offenderCourseApptGrpId;
    }
    public set offenderCourseApptGrpId(value: number) {
        this._offenderCourseApptGrpId = value;
    }
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _wednesdayFlag: boolean;
    private _saturdayFlag: boolean;
    private _mondayFlag: boolean;
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _offenderCourseApptRuleId: number;
    private _sundayFlag: boolean;
    private _startTime: Date;
    private _endTime: Date;
    private _fridayFlag: boolean;
    private _sealFlag: string;
    private _thursdayFlag: boolean;

    get tuesdayFlag(): boolean { return this._tuesdayFlag; }
    set tuesdayFlag(ptuesdayFlag: boolean) { this._tuesdayFlag = ptuesdayFlag ; }
   // get offenderCourseApptGrp(): number { return this._offenderCourseApptGrp; }
   // set offenderCourseApptGrp(poffenderCourseApptGrp: number) { this._offenderCourseApptGrp = poffenderCourseApptGrp ; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId ; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime ; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId ; }
    get wednesdayFlag(): boolean { return this._wednesdayFlag; }
    set wednesdayFlag(pwednesdayFlag: boolean) { this._wednesdayFlag = pwednesdayFlag ; }
    get saturdayFlag(): boolean { return this._saturdayFlag; }
    set saturdayFlag(psaturdayFlag: boolean) { this._saturdayFlag = psaturdayFlag ; }
    get mondayFlag(): boolean { return this._mondayFlag; }
    set mondayFlag(pmondayFlag: boolean) { this._mondayFlag = pmondayFlag ; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime ; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID ; }
    get offenderCourseApptRuleId(): number { return this._offenderCourseApptRuleId; }
    set offenderCourseApptRuleId(poffenderCourseApptRuleId: number) { this._offenderCourseApptRuleId = poffenderCourseApptRuleId ; }
    get sundayFlag(): boolean { return this._sundayFlag; }
    set sundayFlag(psundayFlag: boolean) { this._sundayFlag = psundayFlag ; }
    get startTime(): Date { return this._startTime; }
    set startTime(pstartTime: Date) { this._startTime = pstartTime ; }
    get endTime(): Date { return this._endTime; }
    set endTime(pendTime: Date) { this._endTime = pendTime ; }
    get fridayFlag(): boolean { return this._fridayFlag; }
    set fridayFlag(pfridayFlag: boolean) { this._fridayFlag = pfridayFlag ; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag ; }
    get thursdayFlag(): boolean { return this._thursdayFlag; }
    set thursdayFlag(pthursdayFlag: boolean) { this._thursdayFlag = pthursdayFlag ; }

toJSON(): any {
    return {
       'tuesdayFlag': this._tuesdayFlag,
       'offenderCourseApptGrpId': this._offenderCourseApptGrpId,
       'createUserId': this._createUserId,
       'modifyDatetime': this._modifyDatetime,
       'modifyUserId': this._modifyUserId,
       'wednesdayFlag': this._wednesdayFlag,
       'saturdayFlag': this._saturdayFlag,
       'mondayFlag': this._mondayFlag,
       'createDatetime': this._createDatetime,
       'serialVersionUID': this._serialVersionUID,
       'offenderCourseApptRuleId': this._offenderCourseApptRuleId,
       'sundayFlag': this._sundayFlag,
       'startTime': this._startTime,
       'endTime': this._endTime,
       'fridayFlag': this._fridayFlag,
       'sealFlag': this._sealFlag,
       'thursdayFlag': this._thursdayFlag,
    };
}
}
