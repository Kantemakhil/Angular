import { BaseModel } from "@common/beans/BaseModel";

export class OffenderCourseApptGrp extends BaseModel {
    private _offenderCourseApptGrpId: number;
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _endDate: Date;
    private _modifyDatetime: Date;
    private _noOfWeek: number;
    private _offPrgrefId: number;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _holidayFlag: string;
    private _startDate: Date;

    get offenderCourseApptGrpId(): number{ return this._offenderCourseApptGrpId; }
    set offenderCourseApptGrpId(poffenderCourseApptGrpId: number){ this._offenderCourseApptGrpId = poffenderCourseApptGrpId ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get endDate(): Date{ return this._endDate; }
    set endDate(pendDate: Date){ this._endDate = pendDate ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get noOfWeek(): number{ return this._noOfWeek; }
    set noOfWeek(pnoOfWeek: number){ this._noOfWeek = pnoOfWeek ;}
    get offPrgrefId(): number{ return this._offPrgrefId; }
    set offPrgrefId(poffPrgrefId: number){ this._offPrgrefId = poffPrgrefId ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get holidayFlag(): string{ return this._holidayFlag; }
    set holidayFlag(pholidayFlag: string){ this._holidayFlag = pholidayFlag ;}
    get startDate(): Date{ return this._startDate; }
    set startDate(pstartDate: Date){ this._startDate = pstartDate ;}

toJSON(): any {
    return {
       'offenderCourseApptGrpId': this._offenderCourseApptGrpId,
       'createDatetime': this._createDatetime,
       'serialVersionUID': this._serialVersionUID,
       'createUserId': this._createUserId,
       'endDate': this._endDate,
       'modifyDatetime': this._modifyDatetime,
       'noOfWeek': this._noOfWeek,
       'offPrgrefId': this._offPrgrefId,
       'modifyUserId': this._modifyUserId,
       'sealFlag': this._sealFlag,
       'holidayFlag': this._holidayFlag,
       'startDate': this._startDate,
    };
}
}

