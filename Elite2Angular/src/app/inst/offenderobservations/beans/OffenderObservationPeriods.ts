export class OffenderObservationPeriods {
    private _returnedOutput: number;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _linkAssessFlag: string;
    private _modifyUserId: string;
    private _notificationTiming: number;
    private _frequency: number;
    private _notificationFlag: string;
    private _expiryDate: Date;
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _observationType: string;
    private _linkOicFlag: string;
    private _linkSegDiFlag: string;
    private _linkIncidentFlag: string;
    private _listSeq: number;
    private _sealFlag: string;
    private _activeFlag: string;
    private _offenderBookId: number;
    private _obsPeriodId: number;
    private _startDatetime: Date;
    private _endReasonCode: string;
    private _endDatetime: Date;
    private _statusCode: string;
    private _startTime: Date;
    private _endTime: Date;
    private _scheduleDate: Date;
    private _obsTypeVersionId: number;
    private _obsPeriodSeq: number;
    private _obsTypeVersionIdTemp: string;
    private _checkRecordCount: number;
    get returnedOutput(): number{ return this._returnedOutput; }
    set returnedOutput(preturnedOutput: number){ this._returnedOutput = preturnedOutput ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get linkAssessFlag(): string{ return this._linkAssessFlag; }
    set linkAssessFlag(plinkAssessFlag: string){ this._linkAssessFlag = plinkAssessFlag ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get notificationTiming(): number{ return this._notificationTiming; }
    set notificationTiming(pnotificationTiming: number){ this._notificationTiming = pnotificationTiming ;}
    get frequency(): number{ return this._frequency; }
    set frequency(pfrequency: number){ this._frequency = pfrequency ;}
    get notificationFlag(): string{ return this._notificationFlag; }
    set notificationFlag(pnotificationFlag: string){ this._notificationFlag = pnotificationFlag ;}
    get expiryDate(): Date{ return this._expiryDate; }
    set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get observationType(): string{ return this._observationType; }
    set observationType(pobservationType: string){ this._observationType = pobservationType ;}
    get linkOicFlag(): string{ return this._linkOicFlag; }
    set linkOicFlag(plinkOicFlag: string){ this._linkOicFlag = plinkOicFlag ;}
    get linkSegDiFlag(): string{ return this._linkSegDiFlag; }
    set linkSegDiFlag(plinkSegDiFlag: string){ this._linkSegDiFlag = plinkSegDiFlag ;}
    get linkIncidentFlag(): string{ return this._linkIncidentFlag; }
    set linkIncidentFlag(plinkIncidentFlag: string){ this._linkIncidentFlag = plinkIncidentFlag ;}
    get listSeq(): number{ return this._listSeq; }
    set listSeq(plistSeq: number){ this._listSeq = plistSeq ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get activeFlag(): string{ return this._activeFlag; }
    set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}
    get offenderBookId(): number{ return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
    get obsPeriodId(): number{ return this._obsPeriodId; }
    set obsPeriodId(pobsPeriodId: number){ this._obsPeriodId = pobsPeriodId;}
    get startDatetime(): Date{ return this._startDatetime; }
    set startDatetime(pstartDatetime: Date){ this._startDatetime = pstartDatetime ;}
    get endReasonCode(): string{ return this._endReasonCode; }
    set endReasonCode(pendReasonCode: string){ this._endReasonCode = pendReasonCode ;}
    get endDatetime(): Date{ return this._endDatetime; }
    set endDatetime(pendDatetime: Date){ this._endDatetime = pendDatetime ;}
    get statusCode(): string{ return this._statusCode; }
    set statusCode(pstatusCode: string){ this._statusCode = pstatusCode ;}
    get startTime(): Date{ return this._startTime; }
    set startTime(pstartTime: Date){ this._startTime = pstartTime ;}
    get endTime(): Date{ return this._endTime; }
    set endTime(pendTime: Date){ this._endTime = pendTime ;}

    get scheduleDate(): Date{ return this._scheduleDate; }
    set scheduleDate(pscheduleDate: Date){ this._scheduleDate = pscheduleDate ;}
   
    get obsTypeVersionId(): number{ return this._obsTypeVersionId; }
    set obsTypeVersionId(pobsTypeVersionId: number){ this._obsTypeVersionId = pobsTypeVersionId ;}

    get obsPeriodSeq(): number{ return this._obsPeriodSeq; }
    set obsPeriodSeq(pobsPeriodSeq: number){ this._obsPeriodSeq = pobsPeriodSeq ;}
    get obsTypeVersionIdTemp(): string{ return this._obsTypeVersionIdTemp; }
    set obsTypeVersionIdTemp(pobsTypeVersionIdTemp: string){ this._obsTypeVersionIdTemp = pobsTypeVersionIdTemp ;}
    get checkRecordCount(): number{ return this._checkRecordCount; }
    set checkRecordCount(pcheckRecordCount: number){ this._checkRecordCount = pcheckRecordCount ;}
toJSON(): any {
    return { 
       'returnedOutput': this._returnedOutput,
       'createUserId': this._createUserId,
       'modifyDatetime': this._modifyDatetime,
       'linkAssessFlag': this._linkAssessFlag,
       'modifyUserId': this._modifyUserId,
       'notificationTiming': this._notificationTiming,
       'frequency': this._frequency,
       'notificationFlag': this._notificationFlag,
       'expiryDate': this._expiryDate,
       'createDatetime': this._createDatetime,
       'serialVersionUID': this._serialVersionUID,
       'observationType': this._observationType,
       'linkOicFlag': this._linkOicFlag,
       'linkSegDiFlag': this._linkSegDiFlag,
       'linkIncidentFlag': this._linkIncidentFlag,
       'listSeq': this._listSeq,
       'sealFlag': this._sealFlag,
       'activeFlag': this._activeFlag,
       'offenderBookId': this._offenderBookId,
       'obsPeriodId': this._obsPeriodId,
       'startDatetime': this._startDatetime,
       'endReasonCode': this._endReasonCode,
       'statusCode': this._statusCode,
       'startTime': this._startTime,
       'endTime': this._endTime,
       'scheduleDate': this._scheduleDate,
       'obsTypeVersionId': this._obsTypeVersionId,
       'endDatetime': this._endDatetime,
       'obsPeriodSeq': this._obsPeriodSeq,
       'obsTypeVersionIdTemp': this._obsTypeVersionIdTemp,
       'checkRecordCount': this._checkRecordCount
        };
    } 
}