export class AgencyLocationCounts {
    private _createUserId: string;
    private _recountRsnCode: string;
    private _rcntInProgressFlag: string;
    private _modifyDatetime: Date;
    private _actualCount: number;
    private _modifyUserId: string;
    private _reportedCount: number;
    private _rsnCodeUserid: string;
    private _rsnCodeDatetime: Date;
    private _commentText: string;
    private _reportingLocId: number;
    private _discrepRsnCode: string;
    private _conductedByUserid: string;
    private _sealFlag: string;
    private _agySeq: number;
    private _recountTotal: number;
    private _verifiedUserId: string;
    private _createDatetime: Date;
    private _rcntConductedBy: string;
    private _rcntDatetime: Date;
    private _conductedDatetime: Date;
    private _enteredByUserid: string;
    private _countTypeId: number;
    private _dateSubmitted: Date;
    private _verifiedDatetime: Date;
    private _housingLev1Code: string;
    private _housingLev2Code: string;
    private _housingLev3Code: string;
    private _livingUnitId1: number;
    private _livingUnitId2: number;
    private _livingUnitId3: number;
    private _internalLocation: string;
    private _livingUnitId: number;
    private _internalLocationId: number;
    private _agyLocId: string;
    private _discrep: number;
    private _discrepTemp: number;
    private _location: string;
    private _agencyImlId: number;


    get agencyImlId(): number { return this._agencyImlId; }
    set agencyImlId(pagencyImlId: number) { this._agencyImlId = pagencyImlId; }
    get discrep(): number { return this._discrep; }
    set discrep(pdiscrep: number) { this._discrep = pdiscrep; }
    get discrepTemp(): number { return this._discrepTemp; }
    set discrepTemp(pdiscrepTemp: number) { this._discrepTemp = pdiscrepTemp; }
    get location(): string { return this._location; }
    set location(plocation: string) { this._location = plocation; }
    get agyLocId(): string { return this._agyLocId; }
    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }
    get livingUnitId1(): number { return this._livingUnitId1; }
    set livingUnitId1(plivingUnitId1: number) { this._livingUnitId1 = plivingUnitId1; }
    get livingUnitId2(): number { return this._livingUnitId2; }
    set livingUnitId2(plivingUnitId2: number) { this._livingUnitId2 = plivingUnitId2; }
    get livingUnitId3(): number { return this._livingUnitId3; }
    set livingUnitId3(plivingUnitId3: number) { this._livingUnitId3 = plivingUnitId3; }
    get internalLocationId(): number { return this._internalLocationId; }
    set internalLocationId(pinternalLocationId: number) { this._internalLocationId = pinternalLocationId; }
    get livingUnitId(): number { return this._livingUnitId; }
    set livingUnitId(plivingUnitId: number) { this._livingUnitId = plivingUnitId; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get recountRsnCode(): string { return this._recountRsnCode; }
    set recountRsnCode(precountRsnCode: string) { this._recountRsnCode = precountRsnCode; }
    get rcntInProgressFlag(): string { return this._rcntInProgressFlag; }
    set rcntInProgressFlag(prcntInProgressFlag: string) { this._rcntInProgressFlag = prcntInProgressFlag; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get actualCount(): number { return this._actualCount; }
    set actualCount(pactualCount: number) { this._actualCount = pactualCount; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get reportedCount(): number { return this._reportedCount; }
    set reportedCount(preportedCount: number) { this._reportedCount = preportedCount; }
    get rsnCodeUserid(): string { return this._rsnCodeUserid; }
    set rsnCodeUserid(prsnCodeUserid: string) { this._rsnCodeUserid = prsnCodeUserid; }
    get rsnCodeDatetime(): Date { return this._rsnCodeDatetime; }
    set rsnCodeDatetime(prsnCodeDatetime: Date) { this._rsnCodeDatetime = prsnCodeDatetime; }
    get commentText(): string { return this._commentText; }
    set commentText(pcommentText: string) { this._commentText = pcommentText; }
    get reportingLocId(): number { return this._reportingLocId; }
    set reportingLocId(preportingLocId: number) { this._reportingLocId = preportingLocId; }
    get discrepRsnCode(): string { return this._discrepRsnCode; }
    set discrepRsnCode(pdiscrepRsnCode: string) { this._discrepRsnCode = pdiscrepRsnCode; }
    get conductedByUserid(): string { return this._conductedByUserid; }
    set conductedByUserid(pconductedByUserid: string) { this._conductedByUserid = pconductedByUserid; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get agySeq(): number { return this._agySeq; }
    set agySeq(pagySeq: number) { this._agySeq = pagySeq; }
    get recountTotal(): number { return this._recountTotal; }
    set recountTotal(precountTotal: number) { this._recountTotal = precountTotal; }
    get verifiedUserId(): string { return this._verifiedUserId; }
    set verifiedUserId(pverifiedUserId: string) { this._verifiedUserId = pverifiedUserId; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get rcntConductedBy(): string { return this._rcntConductedBy; }
    set rcntConductedBy(prcntConductedBy: string) { this._rcntConductedBy = prcntConductedBy; }
    get rcntDatetime(): Date { return this._rcntDatetime; }
    set rcntDatetime(prcntDatetime: Date) { this._rcntDatetime = prcntDatetime; }
    get conductedDatetime(): Date { return this._conductedDatetime; }
    set conductedDatetime(pconductedDatetime: Date) { this._conductedDatetime = pconductedDatetime; }
    get enteredByUserid(): string { return this._enteredByUserid; }
    set enteredByUserid(penteredByUserid: string) { this._enteredByUserid = penteredByUserid; }
    get countTypeId(): number { return this._countTypeId; }
    set countTypeId(pcountTypeId: number) { this._countTypeId = pcountTypeId; }
    get dateSubmitted(): Date { return this._dateSubmitted; }
    set dateSubmitted(pdateSubmitted: Date) { this._dateSubmitted = pdateSubmitted; }
    get verifiedDatetime(): Date { return this._verifiedDatetime; }
    set verifiedDatetime(pverifiedDatetime: Date) { this._verifiedDatetime = pverifiedDatetime; }
    get housingLev1Code(): string { return this._housingLev1Code; }
    set housingLev1Code(phousingLev1Code: string) { this._housingLev1Code = phousingLev1Code; }
    get housingLev2Code(): string { return this._housingLev2Code; }
    set housingLev2Code(phousingLev2Code: string) { this._housingLev2Code = phousingLev2Code; }
    get housingLev3Code(): string { return this._housingLev3Code; }
    set housingLev3Code(phousingLev3Code: string) { this._housingLev3Code = phousingLev3Code; }
    get internalLocation(): string { return this._internalLocation; }
    set internalLocation(pinternalLocation: string) { this._internalLocation = pinternalLocation; }
    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'recountRsnCode': this._recountRsnCode,
            'rcntInProgressFlag': this._rcntInProgressFlag,
            'modifyDatetime': this._modifyDatetime,
            'actualCount': this._actualCount,
            'modifyUserId': this._modifyUserId,
            'reportedCount': this._reportedCount,
            'rsnCodeUserid': this._rsnCodeUserid,
            'rsnCodeDatetime': this._rsnCodeDatetime,
            'commentText': this._commentText,
            'reportingLocId': this._reportingLocId,
            'discrepRsnCode': this._discrepRsnCode,
            'conductedByUserid': this._conductedByUserid,
            'sealFlag': this._sealFlag,
            'agySeq': this._agySeq,
            'recountTotal': this._recountTotal,
            'verifiedUserId': this._verifiedUserId,
            'createDatetime': this._createDatetime,
            'rcntConductedBy': this._rcntConductedBy,
            'rcntDatetime': this._rcntDatetime,
            'conductedDatetime': this._conductedDatetime,
            'enteredByUserid': this._enteredByUserid,
            'countTypeId': this._countTypeId,
            'dateSubmitted': this._dateSubmitted,
            'verifiedDatetime': this._verifiedDatetime,
            'livingUnitId1': this._livingUnitId1,
            'livingUnitId2': this._livingUnitId2,
            'livingUnitId3': this._livingUnitId3,
            'housingLev1Code': this._housingLev1Code,
            'housingLev2Code': this._housingLev2Code,
            'housingLev3Code': this._housingLev3Code,
            'internalLocation': this._internalLocation,
            'livingUnitId': this._livingUnitId,
            'internalLocationId': this._internalLocationId,
            'discrep': this._discrep,
            'discrepTemp': this._discrepTemp,
            'location': this._location,
            'agyLocId': this._agyLocId,
            'agencyImlId': this._agencyImlId
        };
    }
}
