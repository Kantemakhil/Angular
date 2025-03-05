export class AgencyCounts {
    private _parentReportingLocId: number;
    private _createUserId: string;
    private _recountRsnCode: string;
    private _countInProgress: string;
    private _modifyDatetime: Date;
    private _totalOtherOut: number;
    private _modifyUserId: string;
    private _rsnCodeUserid: string;
    private _rsnCodeDatetime: Date;
    private _commentText: string;
    private _reportingLocId: number;
    private _serialVersionUID: number;
    private _totalFemaleOut: number;
    private _discrepRsnCode: string;
    private _totalFemale: number;
    private _inserted: number;
    private _conductedByUserid: string;
    private _sealFlag: string;
    private _outcome: string;
    private _totalMaleOut: number;
    private _initiatedDate: Date;
    private _totalMale: number;
    private _totalReported: number;
    private _totalActual: number;
    private _createDatetime: Date;
    private _outTotal: number;
    private _completionDate: Date;
    private _countTypeId: number;
    private _totalOther: number;
    private _fromDate: Date;
    private _toDate: Date;
    private _caseloadId: string;
    private _agyLocId: string;
    private _agylocId: string;
    private _countTypeCode: string;
    private _scheduledTime: string;
    private _discrep: number;
    private _discrepTemp: number;
    private _schTime: string;
    private _sessionId: number;
    private _reCountSessionId : number;

    get discrep(): number { return this._discrep; }

    set discrep(pdiscrep: number) { this._discrep = pdiscrep; }
    get discrepTemp(): number { return this._discrepTemp; }

    set discrepTemp(pdiscrepTemp: number) { this._discrepTemp = pdiscrepTemp; }

    get parentReportingLocId(): number { return this._parentReportingLocId; }

    set parentReportingLocId(pparentReportingLocId: number) { this._parentReportingLocId = pparentReportingLocId; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get recountRsnCode(): string { return this._recountRsnCode; }

    set recountRsnCode(precountRsnCode: string) { this._recountRsnCode = precountRsnCode; }

    get countInProgress(): string { return this._countInProgress; }

    set countInProgress(pcountInProgress: string) { this._countInProgress = pcountInProgress; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get totalOtherOut(): number { return this._totalOtherOut; }

    set totalOtherOut(ptotalOtherOut: number) { this._totalOtherOut = ptotalOtherOut; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get rsnCodeUserid(): string { return this._rsnCodeUserid; }

    set rsnCodeUserid(prsnCodeUserid: string) { this._rsnCodeUserid = prsnCodeUserid; }

    get rsnCodeDatetime(): Date { return this._rsnCodeDatetime; }

    set rsnCodeDatetime(prsnCodeDatetime: Date) { this._rsnCodeDatetime = prsnCodeDatetime; }

    get commentText(): string { return this._commentText; }

    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    get reportingLocId(): number { return this._reportingLocId; }

    set reportingLocId(preportingLocId: number) { this._reportingLocId = preportingLocId; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get totalFemaleOut(): number { return this._totalFemaleOut; }

    set totalFemaleOut(ptotalFemaleOut: number) { this._totalFemaleOut = ptotalFemaleOut; }

    get discrepRsnCode(): string { return this._discrepRsnCode; }

    set discrepRsnCode(pdiscrepRsnCode: string) { this._discrepRsnCode = pdiscrepRsnCode; }

    get totalFemale(): number { return this._totalFemale; }

    set totalFemale(ptotalFemale: number) { this._totalFemale = ptotalFemale; }

    get inserted(): number { return this._inserted; }

    set inserted(pinserted: number) { this._inserted = pinserted; }

    get conductedByUserid(): string { return this._conductedByUserid; }

    set conductedByUserid(pconductedByUserid: string) { this._conductedByUserid = pconductedByUserid; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get outcome(): string { return this._outcome; }

    set outcome(poutcome: string) { this._outcome = poutcome; }

    get totalMaleOut(): number { return this._totalMaleOut; }

    set totalMaleOut(ptotalMaleOut: number) { this._totalMaleOut = ptotalMaleOut; }

    get initiatedDate(): Date { return this._initiatedDate; }

    set initiatedDate(pinitiatedDate: Date) { this._initiatedDate = pinitiatedDate; }

    get totalMale(): number { return this._totalMale; }

    set totalMale(ptotalMale: number) { this._totalMale = ptotalMale; }

    get totalReported(): number { return this._totalReported; }

    set totalReported(ptotalReported: number) { this._totalReported = ptotalReported; }

    get totalActual(): number { return this._totalActual; }

    set totalActual(ptotalActual: number) { this._totalActual = ptotalActual; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get outTotal(): number { return this._outTotal; }

    set outTotal(poutTotal: number) { this._outTotal = poutTotal; }

    get completionDate(): Date { return this._completionDate; }

    set completionDate(pcompletionDate: Date) { this._completionDate = pcompletionDate; }

    get countTypeId(): number { return this._countTypeId; }

    set countTypeId(pcountTypeId: number) { this._countTypeId = pcountTypeId; }

    get totalOther(): number { return this._totalOther; }

    set totalOther(ptotalOther: number) { this._totalOther = ptotalOther; }
    get fromDate(): Date { return this._fromDate; }

    set fromDate(pfromDate: Date) { this._fromDate = pfromDate; }

    get toDate(): Date { return this._toDate; }

    set toDate(ptoDate: Date) { this._toDate = ptoDate; }
    get agyLocId(): string { return this._agyLocId; }

    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }
    get agylocId(): string { return this._agylocId; }

    set agylocId(pagylocId: string) { this._agylocId = pagylocId; }
    get countTypeCode(): string { return this._countTypeCode; }
    set countTypeCode(pcountTypeCode: string) { this._countTypeCode = pcountTypeCode; }
    get scheduledTime(): string { return this._scheduledTime; }
    set scheduledTime(pscheduledTime: string) { this._scheduledTime = pscheduledTime; }
    get schTime(): string { return this._schTime; }
    set schTime(pschTime: string) { this._schTime = pschTime; }

    get sessionId(): number { return this._sessionId; }
    set sessionId(psessionId: number) { this._sessionId = psessionId; }
    
    get reCountSessionId(): number { return this._reCountSessionId; }
    set reCountSessionId(psessionId: number) { this._reCountSessionId = psessionId; }
    
    get caseloadId(): string { return this._caseloadId; }
    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }
    toJSON(): any {
        return {
            'parentReportingLocId': this._parentReportingLocId,
            'createUserId': this._createUserId,
            'recountRsnCode': this._recountRsnCode,
            'countInProgress': this._countInProgress,
            'modifyDatetime': this._modifyDatetime,
            'totalOtherOut': this._totalOtherOut,
            'modifyUserId': this._modifyUserId,
            'rsnCodeUserid': this._rsnCodeUserid,
            'rsnCodeDatetime': this._rsnCodeDatetime,
            'commentText': this._commentText,
            'reportingLocId': this._reportingLocId,
            'serialVersionUID': this._serialVersionUID,
            'totalFemaleOut': this._totalFemaleOut,
            'discrepRsnCode': this._discrepRsnCode,
            'totalFemale': this._totalFemale,
            'inserted': this._inserted,
            'conductedByUserid': this._conductedByUserid,
            'sealFlag': this._sealFlag,
            'outcome': this._outcome,
            'totalMaleOut': this._totalMaleOut,
            'initiatedDate': this._initiatedDate,
            'totalMale': this._totalMale,
            'totalReported': this._totalReported,
            'totalActual': this._totalActual,
            'createDatetime': this._createDatetime,
            'outTotal': this._outTotal,
            'completionDate': this._completionDate,
            'countTypeId': this._countTypeId,
            'totalOther': this._totalOther,
            'fromDate': this._fromDate,
            'toDate': this._toDate,
            'agyLocId': this._agyLocId,
            'agylocId': this._agylocId,
            'countTypeCode': this._countTypeCode,
            'scheduledTime': this._scheduledTime,
            'discrep': this._discrep,
            'discrepTemp': this._discrepTemp,
            'schTime': this._schTime,
            'sessionId': this._sessionId,
            'reCountSessionId':this._reCountSessionId,
            'caseloadId':this._caseloadId
        };
    }
}
