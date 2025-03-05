export class OffObsCharacteristics {
    private _returnedOutput: number;
    private _createUserId: string;
    private _characteristicsCode: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _frequency: number;
    private _expiryDate: Date;
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _observationType: string;
    private _characteristicsType: string;
    private _sealFlag: string;
    private _activeFlag: string;

    private _cellConditionList: Array<any>;
    private _notInCellList: Array<any>;

    private _activityList: Array<any>;
    private _commonDetailsCatList: Array<any>;

    private _officerNotesList: Array<any>;

    private _cellCondition: string;
    private _notInCell: string;
	private _activity: string;
    private _commonDetCat: string;
    private _officerNotes: string;
	private _checkId: number;

    private _offenderBookId: number;
    private _obsPeriodId: number;

    private _obsTypeVersionId: number;
    private _detailCode: string;
    private _detailType: string;

    private _detailDatetime: Date;
    private _reportingStaffId: number;

    get returnedOutput(): number{ return this._returnedOutput; }
    set returnedOutput(preturnedOutput: number){ this._returnedOutput = preturnedOutput ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get characteristicsCode(): string{ return this._characteristicsCode; }
    set characteristicsCode(pcharacteristicsCode: string){ this._characteristicsCode = pcharacteristicsCode ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get frequency(): number{ return this._frequency; }
    set frequency(pfrequency: number){ this._frequency = pfrequency ;}
    get expiryDate(): Date{ return this._expiryDate; }
    set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get observationType(): string{ return this._observationType; }
    set observationType(pobservationType: string){ this._observationType = pobservationType ;}
    get characteristicsType(): string{ return this._characteristicsType; }
    set characteristicsType(pcharacteristicsType: string){ this._characteristicsType = pcharacteristicsType ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get activeFlag(): string{ return this._activeFlag; }
    set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}


    get cellConditionList(): Array<any> { return this._cellConditionList; }

    set cellConditionList(pcellConditionList: Array<any>) { this._cellConditionList = pcellConditionList; }
    get notInCellList(): Array<any> { return this._notInCellList; }

    set notInCellList(pnotInCellList: Array<any>) { this._notInCellList = pnotInCellList; }

    get activityList(): Array<any> { return this._activityList; }

    set activityList(pactivityList: Array<any>) { this._activityList = pactivityList; }

    get commonDetailsCatList(): Array<any> { return this._commonDetailsCatList; }

    set commonDetailsCatList(pcommonDetailsCatList: Array<any>) { this._commonDetailsCatList = pcommonDetailsCatList; }

    get officerNotesList(): Array<any> { return this._officerNotesList; }

    set officerNotesList(pofficerNotesList: Array<any>) { this._officerNotesList = pofficerNotesList; }
    

    get cellCondition(): string{ return this._cellCondition; }
    set cellCondition(pcellCondition: string){ this._cellCondition = pcellCondition ;}

    get notInCell(): string{ return this._notInCell; }
    set notInCell(pnotInCell: string){ this._notInCell = pnotInCell ;}

    get activity(): string{ return this._activity; }
    set activity(pactivity: string){ this._activity = pactivity ;}

    get commonDetCat(): string{ return this._commonDetCat; }
    set commonDetCat(pcommonDetCat: string){ this._commonDetCat = pcommonDetCat ;}

    get officerNotes(): string{ return this._officerNotes; }
    set officerNotes(pofficerNotes: string){ this._officerNotes = pofficerNotes ;}
    get checkId(): number{ return this._checkId; }
    set checkId(pcheckId: number){ this._checkId = pcheckId ;}

    get offenderBookId(): number{ return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
    get obsPeriodId(): number{ return this._obsPeriodId; }
    set obsPeriodId(pobsPeriodId: number){ this._obsPeriodId = pobsPeriodId;}

    get obsTypeVersionId(): number{ return this._obsTypeVersionId; }
    set obsTypeVersionId(pobsTypeVersionId: number){ this._obsTypeVersionId = pobsTypeVersionId ;}

    get detailCode(): string{ return this._detailCode; }
    set detailCode(pdetailCode: string){ this._detailCode = pdetailCode ;}
    get detailType(): string{ return this._detailType; }
    set detailType(pdetailType: string){ this._detailType = pdetailType ;}

    get detailDatetime(): Date{ return this._detailDatetime; }
    set detailDatetime(pdetailDatetime: Date){ this._detailDatetime = pdetailDatetime ;}

    get reportingStaffId(): number{ return this._reportingStaffId; }
    set reportingStaffId(preportingStaffId: number){ this._reportingStaffId = preportingStaffId;}

toJSON(): any {
    return { 
       'returnedOutput': this._returnedOutput,
       'createUserId': this._createUserId,
       'characteristicsCode': this._characteristicsCode,
       'modifyDatetime': this._modifyDatetime,
       'modifyUserId': this._modifyUserId,
       'frequency': this._frequency,
       'expiryDate': this._expiryDate,
       'createDatetime': this._createDatetime,
       'serialVersionUID': this._serialVersionUID,
       'observationType': this._observationType,
       'characteristicsType': this._characteristicsType,
       'sealFlag': this._sealFlag,
       'activeFlag': this._activeFlag,
       'cellConditionList': this._cellConditionList,
       'notInCellList': this._notInCellList,
       'activityList': this._activityList,
       'commonDetailsCatList': this._commonDetailsCatList,
       'cellCondition': this._cellCondition,
       'notInCell': this._notInCell,
       'activity': this._activity,
       'commonDetCat': this._commonDetCat,
       'officerNotes': this._officerNotes,
       'offenderBookId': this._offenderBookId,
       'obsPeriodId': this._obsPeriodId,
       'checkId': this._checkId,
       'obsTypeVersionId': this._obsTypeVersionId,
       'detailCode': this._detailCode,
       'detailType': this._detailType,
       'detailDatetime': this._detailDatetime,
       'reportingStaffId': this._reportingStaffId
        };
    } 
}