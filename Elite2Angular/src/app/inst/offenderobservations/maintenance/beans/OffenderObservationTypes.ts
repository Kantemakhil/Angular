import { BaseModel } from "@common/beans/BaseModel";
export class OffenderObservationTypes extends BaseModel{
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
    private _returnedOutput: number;
    private _cellConditionFlag: string;
    private _activityFlag: string;
    private _demeanorFlag: string;
    private _notInCellFlag: string;
    private _officerNotesFlag: string;

    private _cellConditionList: Array<any>;
    private _notInCellList: Array<any>;

    private _activityList: Array<any>;
    private _commonDetailsCatList: Array<any>;

    private _officerNotesList: Array<any>;
    private _obsTypeVersionId: number;


    private _offObsCharacteristicsInsertList: Array<any>;
    private _offObsCharacteristicsUpdateList: Array<any>;
   

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
    get returnedOutput(): number{ return this._returnedOutput; }
    set returnedOutput(preturnedOutput: number){ this._returnedOutput = preturnedOutput ;}


    get cellConditionFlag(): string{ return this._cellConditionFlag; }
    set cellConditionFlag(pcellConditionFlag: string){ this._cellConditionFlag = pcellConditionFlag ;}
    get activityFlag(): string{ return this._activityFlag; }
    set activityFlag(pactivityFlag: string){ this._activityFlag = pactivityFlag ;}
    get demeanorFlag(): string{ return this._demeanorFlag; }
    set demeanorFlag(pdemeanorFlag: string){ this._demeanorFlag = pdemeanorFlag ;}
    get notInCellFlag(): string{ return this._notInCellFlag; }
    set notInCellFlag(pnotInCellFlag: string){ this._notInCellFlag = pnotInCellFlag ;}
    get officerNotesFlag(): string{ return this._officerNotesFlag; }
    set officerNotesFlag(pofficerNotesFlag: string){ this._officerNotesFlag = pofficerNotesFlag ;}

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

    get obsTypeVersionId(): number{ return this._obsTypeVersionId; }
    set obsTypeVersionId(pobsTypeVersionId: number){ this._obsTypeVersionId = pobsTypeVersionId ;}

    get offObsCharacteristicsInsertList(): Array<any> { return this._offObsCharacteristicsInsertList; }

    set offObsCharacteristicsInsertList(poffObsCharacteristicsInsertList: Array<any>) { this._offObsCharacteristicsInsertList = poffObsCharacteristicsInsertList; }

    get offObsCharacteristicsUpdateList(): Array<any> {
        return this._offObsCharacteristicsUpdateList;
    }
    set offObsCharacteristicsUpdateList(value: Array<any>) {
        this._offObsCharacteristicsUpdateList = value;
    }
toJSON(): any {
    return { 
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
       'returnedOutput': this._returnedOutput,
       'cellConditionFlag': this._cellConditionFlag,
       'activityFlag': this._activityFlag,
       'demeanorFlag': this._demeanorFlag,
       'notInCellFlag': this._notInCellFlag,
       'officerNotesFlag': this._officerNotesFlag,
       'cellConditionList': this._cellConditionList,
       'notInCellList': this._notInCellList,
       'activityList': this._activityList,
       'commonDetailsCatList': this._commonDetailsCatList,
       'obsTypeVersionId': this._obsTypeVersionId,
       'offObsCharacteristicsInsertList': this._offObsCharacteristicsInsertList,
       'offObsCharacteristicsUpdateList' : this._offObsCharacteristicsUpdateList
        };
    } 
}