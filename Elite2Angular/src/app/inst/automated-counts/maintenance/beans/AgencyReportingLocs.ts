export class AgencyReportingLocs {
    private _createUserId: string;
    private _agySeq: number;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _locationType: string;
    private _createDatetime: Date;
    private _expiryDate: Date;
    private _serialVersionUID: number;
    private _location3Id: number;
    private _location2Id: number;
    private _inserted: number;
    private _listSeq: number;
    private _countTypeId: number;
    private _location1Id: number;
    private _sealFlag: string;
    private _activeFlag: string;
    private _location1Code: string;
    private _location2Code: string;
    private _location3Code: string;
    private _agyLocId: string;
    private _parentField1: string;
    private _parentField2: string;
    private _activeCount: number;

    get activeCount(): number { return this._activeCount; }

    set activeCount(pactiveCount: number) { this._activeCount = pactiveCount; }

    get parentField1(): string { return this._parentField1; }

    set parentField1(pparentField1: string) { this._parentField1 = pparentField1; }

    get parentField2(): string { return this._parentField2; }
    set parentField2(pparentField2: string) { this._parentField2 = pparentField2; }

    get agyLocId(): string { return this._agyLocId; }
    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }
    get location1Code(): string { return this._location1Code; }

    set location1Code(plocation1Code: string) { this._location1Code = plocation1Code; }
    get location2Code(): string { return this._location1Code; }

    set location2Code(plocation1Code: string) { this._location1Code = plocation1Code; }
    get location3Code(): string { return this._location1Code; }

    set location3Code(plocation1Code: string) { this._location1Code = plocation1Code; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get agySeq(): number { return this._agySeq; }

    set agySeq(pagySeq: number) { this._agySeq = pagySeq; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get locationType(): string { return this._locationType; }

    set locationType(plocationType: string) { this._locationType = plocationType; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get expiryDate(): Date { return this._expiryDate; }

    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get location3Id(): number { return this._location3Id; }

    set location3Id(plocation3Id: number) { this._location3Id = plocation3Id; }

    get location2Id(): number { return this._location2Id; }

    set location2Id(plocation2Id: number) { this._location2Id = plocation2Id; }

    get inserted(): number { return this._inserted; }

    set inserted(pinserted: number) { this._inserted = pinserted; }

    get listSeq(): number { return this._listSeq; }

    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }

    get countTypeId(): number { return this._countTypeId; }

    set countTypeId(pcountTypeId: number) { this._countTypeId = pcountTypeId; }

    get location1Id(): number { return this._location1Id; }

    set location1Id(plocation1Id: number) { this._location1Id = plocation1Id; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }


    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'agySeq': this._agySeq,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'locationType': this._locationType,
            'createDatetime': this._createDatetime,
            'expiryDate': this._expiryDate,
            'serialVersionUID': this._serialVersionUID,
            'location3Id': this._location3Id,
            'location2Id': this._location2Id,
            'inserted': this._inserted,
            'listSeq': this._listSeq,
            'countTypeId': this._countTypeId,
            'location1Id': this._location1Id,
            'sealFlag': this._sealFlag,
            'activeFlag': this._activeFlag,
            'location1Code': this._location1Code,
            'location2Code': this._location2Code,
            'location3Code': this._location3Code,
            'agyLocId': this._agyLocId,
            'activeCount': this._activeCount
        };
    }
}
