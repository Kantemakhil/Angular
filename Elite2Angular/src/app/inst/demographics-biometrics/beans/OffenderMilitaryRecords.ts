

export class OffenderMilitaryRecords {
    private _createUserId: string;
    private _serviceNumber: string;
    private _militarySeq: number;
    private _endDate: Date;
    private _offenderBookId: number;
    private _disciplinaryActionCode: string;
    private _militaryBranchCode: string;
    private _militaryDischargeCode: string;
    private _modifyUserId: string;
    private _description: string;
    private _unitNumber: string;
    private _dischargeLocation: string;
    private _createDateTime: Date;
    private _serialVersionUID: number;
    private _militaryRankCode: string;
    private _modifyDateTime: Date;
    private _enlistmentLocation: string;
    private _sealFlag: string;
    private _selectiveServicesFlag: string;
    private _highestRankAttained: string;
    private _startDate: Date;

    get createUserId(): string { return this._createUserId; }
    set createUserId( pcreateUserId: string ) { this._createUserId = pcreateUserId; }
    get serviceNumber(): string { return this._serviceNumber; }
    set serviceNumber( pserviceNumber: string ) { this._serviceNumber = pserviceNumber; }
    get militarySeq(): number { return this._militarySeq; }
    set militarySeq( pmilitarySeq: number ) { this._militarySeq = pmilitarySeq; }
    get endDate(): Date { return this._endDate; }
    set endDate( pendDate: Date ) { this._endDate = pendDate; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId( poffenderBookId: number ) { this._offenderBookId = poffenderBookId; }
    get disciplinaryActionCode(): string { return this._disciplinaryActionCode; }
    set disciplinaryActionCode( pdisciplinaryActionCode: string ) { this._disciplinaryActionCode = pdisciplinaryActionCode; }
    get militaryBranchCode(): string { return this._militaryBranchCode; }
    set militaryBranchCode( pmilitaryBranchCode: string ) { this._militaryBranchCode = pmilitaryBranchCode; }
    get militaryDischargeCode(): string { return this._militaryDischargeCode; }
    set militaryDischargeCode( pmilitaryDischargeCode: string ) { this._militaryDischargeCode = pmilitaryDischargeCode; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId( pmodifyUserId: string ) { this._modifyUserId = pmodifyUserId; }
    get description(): string { return this._description; }
    set description( pdescription: string ) { this._description = pdescription; }
    get unitNumber(): string { return this._unitNumber; }
    set unitNumber( punitNumber: string ) { this._unitNumber = punitNumber; }
    get dischargeLocation(): string { return this._dischargeLocation; }
    set dischargeLocation( pdischargeLocation: string ) { this._dischargeLocation = pdischargeLocation; }
    get createDateTime(): Date { return this._createDateTime; }
    set createDateTime( pcreateDateTime: Date ) { this._createDateTime = pcreateDateTime; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID( pserialVersionUID: number ) { this._serialVersionUID = pserialVersionUID; }
    get militaryRankCode(): string { return this._militaryRankCode; }
    set militaryRankCode( pmilitaryRankCode: string ) { this._militaryRankCode = pmilitaryRankCode; }
    get modifyDateTime(): Date { return this._modifyDateTime; }
    set modifyDateTime( pmodifyDateTime: Date ) { this._modifyDateTime = pmodifyDateTime; }
    get enlistmentLocation(): string { return this._enlistmentLocation; }
    set enlistmentLocation( penlistmentLocation: string ) { this._enlistmentLocation = penlistmentLocation; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }
    get selectiveServicesFlag(): string { return this._selectiveServicesFlag; }
    set selectiveServicesFlag( pselectiveServicesFlag: string ) { this._selectiveServicesFlag = pselectiveServicesFlag; }
    get highestRankAttained(): string { return this._highestRankAttained; }
    set highestRankAttained( phighestRankAttained: string ) { this._highestRankAttained = phighestRankAttained; }
    get startDate(): Date { return this._startDate; }
    set startDate( pstartDate: Date ) { this._startDate = pstartDate; }

    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'serviceNumber': this._serviceNumber,
            'militarySeq': this._militarySeq,
            'endDate': this._endDate,
            'offenderBookId': this._offenderBookId,
            'disciplinaryActionCode': this._disciplinaryActionCode,
            'militaryBranchCode': this._militaryBranchCode,
            'militaryDischargeCode': this._militaryDischargeCode,
            'modifyUserId': this._modifyUserId,
            'description': this._description,
            'unitNumber': this._unitNumber,
            'dischargeLocation': this._dischargeLocation,
            'createDateTime': this._createDateTime,
            'serialVersionUID': this._serialVersionUID,
            'militaryRankCode': this._militaryRankCode,
            'modifyDateTime': this._modifyDateTime,
            'enlistmentLocation': this._enlistmentLocation,
            'sealFlag': this._sealFlag,
            'selectiveServicesFlag': this._selectiveServicesFlag,
            'highestRankAttained': this._highestRankAttained,
            'startDate': this._startDate,
        };
    }
 }