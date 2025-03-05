import { AgencyCounts } from '@automatedbeans/AgencyCounts';

export class AgencyCountTypes {
    private _createUserId: string;
    private _scheduledTime: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _createDatetime: Date;
    private _expiryDate: Date;
    private _serialVersionUID: number;
    private _inserted: number;
    private _agyLocId: string;
    private _countTypeId: number;
    private _sealFlag: string;
    private _countTypeCode: string;
    private _activeFlag: string;
    private _sessionId: number;
    private _caseLoadId: string;
    private _reportingLocId: number;
    private _checkInitiate: string;
    private _totalActual: number;
    private _totalReported: number;
    private _outTotal: number;
    private _totalMale: number;
    private _totalFemale: number;
    private _totalOther: number;
    private _totalMaleOut: number;
    private _totalFemaleOut: number;
    private _totalOtherOut: number;
    private _copyFlag: boolean;
    private _scheduledDateTime: Date;
    private _agencyCounts: AgencyCounts = new AgencyCounts();

    get agencyCounts(): AgencyCounts { return this._agencyCounts; }

    set agencyCounts(agencyCounts: AgencyCounts) { this._agencyCounts = agencyCounts; }

    get scheduledDateTime(): Date { return this._scheduledDateTime; }

    set scheduledDateTime(pscheduledDateTime: Date) { this._scheduledDateTime = pscheduledDateTime; }

    get copyFlag(): boolean { return this._copyFlag; }

    set copyFlag(pcopyFlag: boolean) { this._copyFlag = pcopyFlag; }

    get totalActual(): number { return this._totalActual; }

    set totalActual(ptotalActual: number) { this._totalActual = ptotalActual; }

    get totalReported(): number { return this._totalReported; }

    set totalReported(ptotalReported: number) { this._totalReported = ptotalReported; }

    get outTotal(): number { return this._outTotal; }

    set outTotal(poutTotal: number) { this._outTotal = poutTotal; }

    get totalMale(): number { return this._totalMale; }

    set totalMale(ptotalMale: number) { this._totalMale = ptotalMale; }

    get totalFemale(): number { return this._totalFemale; }

    set totalFemale(ptotalFemale: number) { this._totalFemale = ptotalFemale; }

    get totalOther(): number { return this._totalOther; }

    set totalOther(ptotalOther: number) { this._totalOther = ptotalOther; }

    get totalMaleOut(): number { return this._totalMaleOut; }

    set totalMaleOut(ptotalMaleOut: number) { this._totalMaleOut = ptotalMaleOut; }

    get totalFemaleOut(): number { return this._totalFemaleOut; }

    set totalFemaleOut(ptotalFemaleOut: number) { this._totalFemaleOut = ptotalFemaleOut; }

    get totalOtherOut(): number { return this._totalOtherOut; }

    set totalOtherOut(ptotalOtherOut: number) { this._totalOtherOut = ptotalOtherOut; }


    get checkInitiate(): string { return this._checkInitiate; }

    set checkInitiate(pcheckInitiate: string) { this._checkInitiate = pcheckInitiate; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get scheduledTime(): string { return this._scheduledTime; }

    set scheduledTime(pscheduledTime: string) { this._scheduledTime = pscheduledTime; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get expiryDate(): Date { return this._expiryDate; }

    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get inserted(): number { return this._inserted; }

    set inserted(pinserted: number) { this._inserted = pinserted; }

    get agyLocId(): string { return this._agyLocId; }

    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

    get countTypeId(): number { return this._countTypeId; }

    set countTypeId(pcountTypeId: number) { this._countTypeId = pcountTypeId; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get countTypeCode(): string { return this._countTypeCode; }

    set countTypeCode(pcountTypeCode: string) { this._countTypeCode = pcountTypeCode; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

    get sessionId(): number { return this._sessionId; }

    set sessionId(psessionId: number) { this._sessionId = psessionId; }

    get caseLoadId(): string { return this._caseLoadId; }

    set caseLoadId(pcaseLoadId: string) { this._caseLoadId = pcaseLoadId; }

    get reportingLocId(): number { return this._reportingLocId; }

    set reportingLocId(preportingLocId: number) { this._reportingLocId = preportingLocId; }


    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'scheduledTime': this._scheduledTime,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'createDatetime': this._createDatetime,
            'expiryDate': this._expiryDate,
            'serialVersionUID': this._serialVersionUID,
            'inserted': this._inserted,
            'agyLocId': this._agyLocId,
            'countTypeId': this._countTypeId,
            'sealFlag': this._sealFlag,
            'countTypeCode': this._countTypeCode,
            'activeFlag': this._activeFlag,
            'sessionId': this._sessionId,
            'caseLoadId': this._caseLoadId,
            'reportingLocId': this._reportingLocId,
            'checkInitiate': this._checkInitiate,
            'totalActual': this._totalActual,
            'totalReported': this._totalReported,
            'outTotal': this._outTotal,
            'totalMale': this._totalMale,
            'totalFemale': this._totalFemale,
            'totalOther': this._totalOther,
            'totalMaleOut': this._totalMaleOut,
            'totalFemaleOut': this._totalFemaleOut,
            'totalOtherOut': this._totalOtherOut,
            'copyFlag': this._copyFlag,
            'scheduledDateTime': this._scheduledDateTime,
            'agencyCounts': this._agencyCounts,
        };
    }
}
