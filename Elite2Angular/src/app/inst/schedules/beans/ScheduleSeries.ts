export class ScheduleSeries {
    private _totalcount: number;
    private _uiRules: string;
    private _modifyDate: Date;
    private _endDate: Date;
    private _repeatType: string;
    private _active: string;
    private _repeatOn: string;
    private _seriesId: number;
    private _serialVersionUID: number;
    private _repeatFrequency: number;
    private _excludeHoliday: string;
    private _createdBy: string;
    private _modifiedBy: Date;
    private _startTime: Date;
    private _endTime: Date;
    private _sealFlag: string;
    private _startDate: Date;
    private _createDate: Date;
    private _days: Array<string>;

    get totalcount(): number{ return this._totalcount; }
    set totalcount(ptotalcount: number){ this._totalcount = ptotalcount ;}
    get uiRules(): string{ return this._uiRules; }
    set uiRules(puiRules: string){ this._uiRules = puiRules ;}
    get modifyDate(): Date{ return this._modifyDate; }
    set modifyDate(pmodifyDate: Date){ this._modifyDate = pmodifyDate ;}
    get endDate(): Date{ return this._endDate; }
    set endDate(pendDate: Date){ this._endDate = pendDate ;}
    get repeatType(): string{ return this._repeatType; }
    set repeatType(prepeatType: string){ this._repeatType = prepeatType ;}
    get active(): string{ return this._active; }
    set active(pactive: string){ this._active = pactive ;}
    get repeatOn(): string{ return this._repeatOn; }
    set repeatOn(prepeatOn: string){ this._repeatOn = prepeatOn ;}
    get seriesId(): number{ return this._seriesId; }
    set seriesId(pseriesId: number){ this._seriesId = pseriesId ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get repeatFrequency(): number{ return this._repeatFrequency; }
    set repeatFrequency(prepeatFrequency: number){ this._repeatFrequency = prepeatFrequency ;}
    get excludeHoliday(): string{ return this._excludeHoliday; }
    set excludeHoliday(pexcludeHoliday: string){ this._excludeHoliday = pexcludeHoliday ;}
    get createdBy(): string{ return this._createdBy; }
    set createdBy(pcreatedBy: string){ this._createdBy = pcreatedBy ;}
    get modifiedBy(): Date{ return this._modifiedBy; }
    set modifiedBy(pmodifiedBy: Date){ this._modifiedBy = pmodifiedBy ;}
    get startTime(): Date{ return this._startTime; }
    set startTime(pstartTime: Date){ this._startTime = pstartTime ;}
    get endTime(): Date{ return this._endTime; }
    set endTime(pendTime: Date){ this._endTime = pendTime ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get startDate(): Date{ return this._startDate; }
    set startDate(pstartDate: Date){ this._startDate = pstartDate ;}
    get createDate(): Date{ return this._createDate; }
    set createDate(pcreateDate: Date){ this._createDate = pcreateDate ;}
    get days(): Array<string> { return this._days; }
    set days(value: Array<string>) { this._days = value; }

toJSON(): any {
    return { 
       'totalcount': this._totalcount,
       'uiRules': this._uiRules,
       'modifyDate': this._modifyDate,
       'endDate': this._endDate,
       'repeatType': this._repeatType,
       'active': this._active,
       'repeatOn': this._repeatOn,
       'seriesId': this._seriesId,
       'serialVersionUID': this._serialVersionUID,
       'repeatFrequency': this._repeatFrequency,
       'excludeHoliday': this._excludeHoliday,
       'createdBy': this._createdBy,
       'modifiedBy': this._modifiedBy,
       'startTime': this._startTime,
       'endTime': this._endTime,
       'sealFlag': this._sealFlag,
       'startDate': this._startDate,
       'createDate': this._createDate,
        };
    } 
}