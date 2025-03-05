export class TempOidcount {
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _locationDescription: string;
    private _actualCount: number;
    private _totalOtherOut: number;
    private _modifyUserId: string;
    private _locationType: string;
    private _reportedCount: number;
    private _reportingLocId: number;
    private _discrepancyCount: number;
    private _serialVersionUID: number;
    private _totalFemaleOut: number;
    private _totalFemale: number;
    private _inserted: number;
    private _sealFlag: string;
    private _totalMaleOut: number;
    private _lowestLocationId: number;
    private _scheduledTime: string;
    private _agySeq: number;
    private _totalMale: number;
    private _sessionId: number;
    private _createDatetime: Date;
    private _outTotal: number;
    private _agyLocId: string;
    private _listSeq: number;
    private _enteredByUserid: string;
    private _countTypeId: number;
    private _countTypeCode: string;
    private _dateSubmitted: Date;
    private _totalOther: number;
    private _countTemp: number;
    private _actualCountTemp: number;
    private _reportedCountTemp: number;
    private _userId: string;

    get countTemp(): number { return this._countTemp; }

    set countTemp(pcountTemp: number) { this._countTemp = pcountTemp; }

    get actualCountTemp(): number { return this._actualCountTemp; }

    set actualCountTemp(pactualCountTemp: number) { this._actualCountTemp = pactualCountTemp; }

    get reportedCountTemp(): number { return this._reportedCountTemp; }

        set reportedCountTemp(preportedCountTemp: number) { this._reportedCountTemp = preportedCountTemp; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get locationDescription(): string { return this._locationDescription; }

    set locationDescription(plocationDescription: string) { this._locationDescription = plocationDescription; }

    get actualCount(): number { return this._actualCount; }

    set actualCount(pactualCount: number) { this._actualCount = pactualCount; }

    get totalOtherOut(): number { return this._totalOtherOut; }

    set totalOtherOut(ptotalOtherOut: number) { this._totalOtherOut = ptotalOtherOut; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get locationType(): string { return this._locationType; }

    set locationType(plocationType: string) { this._locationType = plocationType; }

    get reportedCount(): number { return this._reportedCount; }

    set reportedCount(preportedCount: number) { this._reportedCount = preportedCount; }

    get reportingLocId(): number { return this._reportingLocId; }

    set reportingLocId(preportingLocId: number) { this._reportingLocId = preportingLocId; }

    get discrepancyCount(): number { return this._discrepancyCount; }

    set discrepancyCount(pdiscrepancyCount: number) { this._discrepancyCount = pdiscrepancyCount; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get totalFemaleOut(): number { return this._totalFemaleOut; }

    set totalFemaleOut(ptotalFemaleOut: number) { this._totalFemaleOut = ptotalFemaleOut; }

    get totalFemale(): number { return this._totalFemale; }

    set totalFemale(ptotalFemale: number) { this._totalFemale = ptotalFemale; }

    get inserted(): number { return this._inserted; }

    set inserted(pinserted: number) { this._inserted = pinserted; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get totalMaleOut(): number { return this._totalMaleOut; }

    set totalMaleOut(ptotalMaleOut: number) { this._totalMaleOut = ptotalMaleOut; }

    get lowestLocationId(): number { return this._lowestLocationId; }

    set lowestLocationId(plowestLocationId: number) { this._lowestLocationId = plowestLocationId; }

    get scheduledTime(): string { return this._scheduledTime; }

    set scheduledTime(pscheduledTime: string) { this._scheduledTime = pscheduledTime; }

    get agySeq(): number { return this._agySeq; }

    set agySeq(pagySeq: number) { this._agySeq = pagySeq; }

    get totalMale(): number { return this._totalMale; }

    set totalMale(ptotalMale: number) { this._totalMale = ptotalMale; }

    get sessionId(): number { return this._sessionId; }

    set sessionId(psessionId: number) { this._sessionId = psessionId; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get outTotal(): number { return this._outTotal; }

    set outTotal(poutTotal: number) { this._outTotal = poutTotal; }

    get agyLocId(): string { return this._agyLocId; }

    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

    get listSeq(): number { return this._listSeq; }

    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }

    get enteredByUserid(): string { return this._enteredByUserid; }

    set enteredByUserid(penteredByUserid: string) { this._enteredByUserid = penteredByUserid; }

    get countTypeId(): number { return this._countTypeId; }

    set countTypeId(pcountTypeId: number) { this._countTypeId = pcountTypeId; }

    get countTypeCode(): string { return this._countTypeCode; }

    set countTypeCode(pcountTypeCode: string) { this._countTypeCode = pcountTypeCode; }

    get dateSubmitted(): Date { return this._dateSubmitted; }

    set dateSubmitted(pdateSubmitted: Date) { this._dateSubmitted = pdateSubmitted; }

    get totalOther(): number { return this._totalOther; }

    set totalOther(ptotalOther: number) { this._totalOther = ptotalOther; }

    get userId(): string { return this._userId; }

    set userId(puserId: string) { this._userId = puserId; }


    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'locationDescription': this._locationDescription,
            'actualCount': this._actualCount,
            'totalOtherOut': this._totalOtherOut,
            'modifyUserId': this._modifyUserId,
            'locationType': this._locationType,
            'reportedCount': this._reportedCount,
            'reportingLocId': this._reportingLocId,
            'discrepancyCount': this._discrepancyCount,
            'serialVersionUID': this._serialVersionUID,
            'totalFemaleOut': this._totalFemaleOut,
            'totalFemale': this._totalFemale,
            'inserted': this._inserted,
            'sealFlag': this._sealFlag,
            'totalMaleOut': this._totalMaleOut,
            'lowestLocationId': this._lowestLocationId,
            'scheduledTime': this._scheduledTime,
            'agySeq': this._agySeq,
            'totalMale': this._totalMale,
            'sessionId': this._sessionId,
            'createDatetime': this._createDatetime,
            'outTotal': this._outTotal,
            'agyLocId': this._agyLocId,
            'listSeq': this._listSeq,
            'enteredByUserid': this._enteredByUserid,
            'countTypeId': this._countTypeId,
            'countTypeCode': this._countTypeCode,
            'dateSubmitted': this._dateSubmitted,
            'totalOther': this._totalOther,
            'userId': this._userId,
        };
    }
}
