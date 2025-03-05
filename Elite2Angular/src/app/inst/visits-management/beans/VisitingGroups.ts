export class VisitingGroups {
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _groupId: number;
    private _modifyUserId: string;
    private _commentText: string;
    private _noVisitors: number;
    private _createDatetime: Date;
    private _groupName: string;
    private _escortedById: number;
    private _groupPurpose: string;
    private _agyLocId: string;
    private _visitDate: Date;
    private _startTime: Date;
    private _endTime: Date;
    private _approvedById: number;
    private _sealFlag: string;
    private _staffIdTemp: string;
    private _approvedbyIdTemp: string;
    private _escortedByIdTemp: string;
    private _groupPurposeTemp: string;

    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get groupId(): number { return this._groupId; }
    set groupId(pgroupId: number) { this._groupId = pgroupId; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get commentText(): string { return this._commentText; }
    set commentText(pcommentText: string) { this._commentText = pcommentText; }
    get noVisitors(): number { return this._noVisitors; }
    set noVisitors(pnoVisitors: number) { this._noVisitors = pnoVisitors; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get groupName(): string { return this._groupName; }
    set groupName(pgroupName: string) { this._groupName = pgroupName; }
    get escortedById(): number { return this._escortedById; }
    set escortedById(pescortedById: number) { this._escortedById = pescortedById; }
    get groupPurpose(): string { return this._groupPurpose; }
    set groupPurpose(pgroupPurpose: string) { this._groupPurpose = pgroupPurpose; }
    get agyLocId(): string { return this._agyLocId; }
    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }
    get visitDate(): Date { return this._visitDate; }
    set visitDate(pvisitDate: Date) { this._visitDate = pvisitDate; }
    get startTime(): Date { return this._startTime; }
    set startTime(pstartTime: Date) { this._startTime = pstartTime; }
    get endTime(): Date { return this._endTime; }
    set endTime(pendTime: Date) { this._endTime = pendTime; }
    get approvedById(): number { return this._approvedById; }
    set approvedById(papprovedById: number) { this._approvedById = papprovedById; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get staffIdTemp(): string { return this._sealFlag; }
    set staffIdTemp(psealFlag: string) { this._sealFlag = psealFlag; }
    get approvedbyIdTemp(): string { return this._approvedbyIdTemp; }
    set approvedbyIdTemp(papprovedbyIdTemp: string) { this._approvedbyIdTemp = papprovedbyIdTemp; }
    get escortedByIdTemp(): string { return this._escortedByIdTemp; }
    set escortedByIdTemp(pescortedByIdTemp: string) { this._escortedByIdTemp = pescortedByIdTemp; }
    get groupPurposeTemp(): string { return this._groupPurposeTemp; }
    set groupPurposeTemp(pgroupPurposeTemp: string) { this._groupPurposeTemp = pgroupPurposeTemp; }


    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'groupId': this._groupId,
            'modifyUserId': this._modifyUserId,
            'commentText': this._commentText,
            'noVisitors': this._noVisitors,
            'createDatetime': this._createDatetime,
            'groupName': this._groupName,
            'escortedById': this._escortedById,
            'groupPurpose': this._groupPurpose,
            'agyLocId': this._agyLocId,
            'visitDate': this._visitDate,
            'startTime': this._startTime,
            'endTime': this._endTime,
            'approvedById': this._approvedById,
            'sealFlag': this._sealFlag,
            'staffIdTemp' : this._staffIdTemp,
            'approvedbyIdTemp': this._approvedbyIdTemp,
            'escortedByIdTemp': this._escortedByIdTemp,
            'groupPurposeTemp': this._groupPurposeTemp
        };
    }
}
