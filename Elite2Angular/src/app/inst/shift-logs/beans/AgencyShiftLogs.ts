import {BaseModel} from '@commonbeans/BaseModel';



export class AgencyShiftLogs extends BaseModel {
    private _internalLocationId2: number;
    private _createUserId: string;
    private _internalLocationId3: number;
    private _logDate: Date;
    private _modifyUserId: string;
    private _agyActivityCode: string;
    private _observationText: any;
    private _createDateTime: Date;
    private _logTime: Date;
    private _lockFlag: string;
    
    private _serialVersionUID: number;
    private _modifyDateTime: Date;
    private _shiftLogSeq: number;
    private _sealFlag: string;
    private _internalLocationId: number;
    private _staffId: number;
    private _dspDescription4: string;
    private _dspAgyLocId4: string;
    private _dspDescription3: string;
    private _dspAgyLocId3: string;
    private _dspLastName: string;
    private _dspDescription2: string;
    private _dspAgyLocId2: string;
    private _globalCaseLoadId: string;
    private _observationDetails: any;
    private _shiftLogSaveSeq: number;
    private _updatedRecord: string;
    private _verifyLockFlag: boolean;
    private _listSeq: number;
    private _amendedFlag: string;
    public get amendedFlag(): string {
        return this._amendedFlag;
    }
    public set amendedFlag(value: string) {
        this._amendedFlag = value;
    }
   
    private _errorFlag: string;
    public get errorFlag(): string {
        return this._errorFlag;
    }
    public set errorFlag(value: string) {
        this._errorFlag = value;
    }
   

    private _reason: string;
    private _startTime: Date;
    private _endTime: Date;

    private _durationTime: string;

    get dspDescription4(): string { return this._dspDescription4; }

    set dspDescription4(pdspDescription4: string) { this._dspDescription4 = pdspDescription4; }

    get dspAgyLocId4(): string { return this._dspAgyLocId4; }

    set dspAgyLocId4(pdspAgyLocId4: string) { this._dspAgyLocId4 = pdspAgyLocId4; }

    get dspDescription3(): string { return this._dspDescription3; }

    set dspDescription3(pdspDescription3: string) { this._dspDescription3 = pdspDescription3; }

    get dspAgyLocId3(): string { return this._dspAgyLocId3; }

    set dspAgyLocId3(pdspAgyLocId3: string) { this._dspAgyLocId3 = pdspAgyLocId3; }

    get dspDescription2(): string { return this._dspDescription2; }

    set dspDescription2(pdspDescription2: string) { this._dspDescription2 = pdspDescription2; }

    get dspAgyLocId2(): string { return this._dspAgyLocId2; }

    set dspAgyLocId2(pdspAgyLocId2: string) { this._dspAgyLocId2 = pdspAgyLocId2; }

    get dspLastName(): string { return this._dspLastName; }

    set dspLastName(pdspLastName: string) { this._dspLastName = pdspLastName; }

    get internalLocationId2(): number { return this._internalLocationId2; }

    set internalLocationId2(pinternalLocationId2: number) { this._internalLocationId2 = pinternalLocationId2; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get internalLocationId3(): number { return this._internalLocationId3; }

    set internalLocationId3(pinternalLocationId3: number) { this._internalLocationId3 = pinternalLocationId3; }

    get logDate(): Date { return this._logDate; }

    set logDate(plogDate: Date) { this._logDate = plogDate; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get agyActivityCode(): string { return this._agyActivityCode; }

    set agyActivityCode(pagyActivityCode: string) { this._agyActivityCode = pagyActivityCode; }

//    get observationText(): any { return this._observationText; }
//
//    set observationText(pobservationText: any) { this._observationText = pobservationText; }

    get createDateTime(): Date { return this._createDateTime; }

    set createDateTime(pcreateDateTime: Date) { this._createDateTime = pcreateDateTime; }

    get logTime(): Date { return this._logTime; }

    set logTime(plogTime: Date) { this._logTime = plogTime; }

    get lockFlag(): string { return this._lockFlag; }

    set lockFlag(plockFlag: string) { this._lockFlag = plockFlag; }

    get modifyDateTime(): Date { return this._modifyDateTime; }

    set modifyDateTime(pmodifyDateTime: Date) { this._modifyDateTime = pmodifyDateTime; }

    get shiftLogSeq(): number { return this._shiftLogSeq; }

    set shiftLogSeq(pshiftLogSeq: number) { this._shiftLogSeq = pshiftLogSeq; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get internalLocationId(): number { return this._internalLocationId; }

    set internalLocationId(pinternalLocationId: number) { this._internalLocationId = pinternalLocationId; }

    get staffId(): number { return this._staffId; }

    set staffId(pstaffId: number) { this._staffId = pstaffId; }

    get globalCaseLoadId(): string { return this._globalCaseLoadId; }

    set globalCaseLoadId(pglobalCaseLoadId: string) { this._globalCaseLoadId = pglobalCaseLoadId; }

    get observationDetails(): any { return this._observationDetails; }

    set observationDetails(pobservationDetails: any) { this._observationDetails = pobservationDetails; }

    get shiftLogSaveSeq(): number { return this._shiftLogSaveSeq; }

    set shiftLogSaveSeq(pshiftLogSaveSeq: number) { this._shiftLogSaveSeq = pshiftLogSaveSeq; }
    
    get updatedRecord(): string { return this._updatedRecord; }

    set updatedRecord(pupdatedRecord: string) { this._updatedRecord = pupdatedRecord; }

    get verifyLockFlag(): boolean { return this._verifyLockFlag; }

    set verifyLockFlag(pverifyLockFlag: boolean) { this._verifyLockFlag = pverifyLockFlag; }

    get listSeq(): number { return this._listSeq; }
    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }
 
    public get reason(): string {return this._reason; }
    public set reason(value: string) {this._reason = value; }
  
    public get startTime(): Date {return this._startTime; }
    public set startTime(value: Date) {this._startTime = value; }
   
    public get endTime(): Date {return this._endTime;}
    public set endTime(value: Date) { this._endTime = value; }

    public get durationTime(): string { return this._durationTime; }
    public set durationTime(value: string) { this._durationTime = value;}
   


    toJSON(): any {
        return {
            'internalLocationId2': this._internalLocationId2,
            'createUserId': this._createUserId,
            'internalLocationId3': this._internalLocationId3,
            'logDate': this._logDate,
            'modifyUserId': this._modifyUserId,
            'agyActivityCode': this._agyActivityCode,
//            'observationText': this._observationText,
            'createDateTime': this._createDateTime,
            'logTime': this._logTime,
            'lockFlag': this._lockFlag,
            'modifyDateTime': this._modifyDateTime,
            'shiftLogSeq': this._shiftLogSeq,
            'sealFlag': this._sealFlag,
            'internalLocationId': this._internalLocationId,
            'staffId': this._staffId,
            'dspDescription4': this._dspDescription4,
            'dspAgyLocId4': this._dspAgyLocId4,
            'dspDescription3': this._dspDescription3,
            'dspAgyLocId3': this._dspAgyLocId3,
            'dspDescription2': this._dspDescription2,
            'dspAgyLocId2': this._dspAgyLocId2,
            'dspLastName': this._dspLastName,
            'globalCaseLoadId': this._globalCaseLoadId,
            'observationDetails': this._observationDetails,
            'shiftLogSaveSeq': this._shiftLogSaveSeq,
            'updatedRecord':this._updatedRecord,
            'verifyLockFlag': this._verifyLockFlag,
            'listSeq': this._listSeq,
            'reason':this._reason,
            'startTime': this._startTime,
            'endTime': this._endTime,
            'durationTime':this._durationTime,
            'amendedFlag' : this._amendedFlag,
            'errorFlag' : this._errorFlag
          
            
       };
   }
}
