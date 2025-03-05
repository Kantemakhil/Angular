import {BaseModel} from '@commonbeans/BaseModel';

export class OffenderEscapes extends BaseModel {


    private _escapeId: number;
    private _offenderBookId: number;
    private _escapeDate: Date;
    private _escapeTime: Date;
    private _escapeCircumstanceCode: string;
    private _escapeEscortCode: string;
    private _escapeAgyLocId: string;
    private _arrestAgyCode: string;
    private _escapeCommentText: string;
    private _securityBreachCode: string;
    private _recaptureDate: Date;
    private _recpatureTime: Date;
    private _recpatureCommentText: string;
    private _readmissionDate: Date;
    private _readmissionTime: Date;
    private _readmissAgyLocId: string;
    private _readmissCommentText: string;
    private _adjustSentenceFlag: string;
    private _escapeRegistrationRef: string;
    private _inCompanyFlag: string;
    private _lastSeenDate: Date;
    private _lastSeenTime: Date;
    private _incidentNumber: string;
    private _offenderAdjustId: number;
    private _escapeMovementReason: string;
    private _recaptureMovementReason: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _bookNo: string;
    private _dspEscapeReason: string;
    private _drvSecurityBreachCode: string;
    private _drvArrestAgyCode: string;
    private _dspRecaptureReason: string;
    private _drvEscapeEscortCode: string;
    private _drvEscapeCircumstanceCode: string;
    private _record: number;
    private _totalRecords: number;
    private _offenderIdDisplay: string;
    private _nbtOffenderId: number;
    private _updatedFlag: string;
    private _returnFlag: boolean;
    private _datesModFlag: boolean;
    
    get escapeId(): number { return this._escapeId; }

    set escapeId(pescapeId: number) { this._escapeId = pescapeId; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get escapeDate(): Date { return this._escapeDate; }

    set escapeDate(pescapeDate: Date) { this._escapeDate = pescapeDate; }

    get escapeTime(): Date { return this._escapeTime; }

    set escapeTime(pescapeTime: Date) { this._escapeTime = pescapeTime; }

    get escapeCircumstanceCode(): string { return this._escapeCircumstanceCode; }

    set escapeCircumstanceCode(pescapeCircumstanceCode: string) { this._escapeCircumstanceCode = pescapeCircumstanceCode; }

    get escapeEscortCode(): string { return this._escapeEscortCode; }

    set escapeEscortCode(pescapeEscortCode: string) { this._escapeEscortCode = pescapeEscortCode; }

    get escapeAgyLocId(): string { return this._escapeAgyLocId; }

    set escapeAgyLocId(pescapeAgyLocId: string) { this._escapeAgyLocId = pescapeAgyLocId; }

    get arrestAgyCode(): string { return this._arrestAgyCode; }

    set arrestAgyCode(parrestAgyCode: string) { this._arrestAgyCode = parrestAgyCode; }

    get escapeCommentText(): string { return this._escapeCommentText; }

    set escapeCommentText(pescapeCommentText: string) { this._escapeCommentText = pescapeCommentText; }

    get securityBreachCode(): string { return this._securityBreachCode; }

    set securityBreachCode(psecurityBreachCode: string) { this._securityBreachCode = psecurityBreachCode; }

    get recpatureCommentText(): string { return this._recpatureCommentText; }

    set recpatureCommentText(precpatureCommentText: string) { this._recpatureCommentText = precpatureCommentText; }

    get readmissAgyLocId(): string { return this._readmissAgyLocId; }

    set readmissAgyLocId(preadmissAgyLocId: string) { this._readmissAgyLocId = preadmissAgyLocId; }

    get readmissCommentText(): string { return this._readmissCommentText; }

    set readmissCommentText(preadmissCommentText: string) { this._readmissCommentText = preadmissCommentText; }

    get adjustSentenceFlag(): string { return this._adjustSentenceFlag; }

    set adjustSentenceFlag(padjustSentenceFlag: string) { this._adjustSentenceFlag = padjustSentenceFlag; }

    get escapeRegistrationRef(): string { return this._escapeRegistrationRef; }

    set escapeRegistrationRef(pescapeRegistrationRef: string) { this._escapeRegistrationRef = pescapeRegistrationRef; }

    get inCompanyFlag(): string { return this._inCompanyFlag; }

    set inCompanyFlag(pinCompanyFlag: string) { this._inCompanyFlag = pinCompanyFlag; }

    get incidentNumber(): string { return this._incidentNumber; }

    set incidentNumber(pincidentNumber: string) { this._incidentNumber = pincidentNumber; }

    get escapeMovementReason(): string { return this._escapeMovementReason; }

    set escapeMovementReason(pescapeMovementReason: string) { this._escapeMovementReason = pescapeMovementReason; }

    get recaptureMovementReason(): string { return this._recaptureMovementReason; }

    set recaptureMovementReason(precaptureMovementReason: string) { this._recaptureMovementReason = precaptureMovementReason; }

    get recaptureDate(): Date { return this._recaptureDate; }

    set recaptureDate(precaptureDate: Date) { this._recaptureDate = precaptureDate; }

    get readmissionDate(): Date { return this._readmissionDate; }

    set readmissionDate(preadmissionDate: Date) { this._readmissionDate = preadmissionDate; }

    get readmissionTime(): Date { return this._readmissionTime; }

    set readmissionTime(preadmissionTime: Date) { this._readmissionTime = preadmissionTime; }

    get recpatureTime(): Date { return this._recpatureTime; }

    set recpatureTime(precpatureTime: Date) { this._recpatureTime = precpatureTime; }

    get lastSeenDate(): Date { return this._lastSeenDate; }

    set lastSeenDate(plastSeenDate: Date) { this._lastSeenDate = plastSeenDate; }

    get lastSeenTime(): Date { return this._lastSeenTime; }

    set lastSeenTime(plastSeenTime: Date) { this._lastSeenTime = plastSeenTime; }

    get offenderAdjustId(): number { return this._offenderAdjustId; }

    set offenderAdjustId(poffenderAdjustId: number) { this._offenderAdjustId = poffenderAdjustId; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    
    get bookNo(): string { return this._bookNo; }

    set bookNo(pbookNo: string) { this._bookNo = pbookNo; }
    
    get dspEscapeReason(): string { return this._dspEscapeReason; }

    set dspEscapeReason(pdspEscapeReason: string) { this._dspEscapeReason = pdspEscapeReason; }
    
    get drvSecurityBreachCode(): string { return this._drvSecurityBreachCode; }

    set drvSecurityBreachCode(pdrvSecurityBreachCode: string) { this._drvSecurityBreachCode = pdrvSecurityBreachCode; }

    get drvArrestAgyCode(): string { return this._drvArrestAgyCode; }

    set drvArrestAgyCode(pdrvArrestAgyCode: string) { this._drvArrestAgyCode = pdrvArrestAgyCode; }
    
    get dspRecaptureReason(): string { return this._dspRecaptureReason; }

    set dspRecaptureReason(pdspRecaptureReason: string) { this._dspRecaptureReason = pdspRecaptureReason; }
    
    get drvEscapeEscortCode(): string { return this._drvEscapeEscortCode; }

    set drvEscapeEscortCode(pdrvEscapeEscortCode: string) { this._drvEscapeEscortCode = pdrvEscapeEscortCode; }
    
    get drvEscapeCircumstanceCode(): string { return this._drvEscapeCircumstanceCode; }

    set drvEscapeCircumstanceCode(pdrvEscapeCircumstanceCode: string) { this._drvEscapeCircumstanceCode = pdrvEscapeCircumstanceCode; }
    
    get record(): number { return this._record; }

    set record(precord: number) { this._record = precord; }

    get totalRecords(): number { return this._totalRecords; }

    set totalRecords(ptotalRecords: number) { this._totalRecords = ptotalRecords; }
    
    get offenderIdDisplay(): string { return this._offenderIdDisplay; }

    set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }
    
    get nbtOffenderId(): number { return this._nbtOffenderId; }

    set nbtOffenderId(pnbtOffenderId: number) { this._nbtOffenderId = pnbtOffenderId; }
    
    get updatedFlag(): string { return this._updatedFlag; }

    set updatedFlag(pupdatedFlag: string) { this._updatedFlag = pupdatedFlag; }

    get returnFlag(): boolean { return this._returnFlag; }

    set returnFlag(preturnFlag: boolean) { this._returnFlag = preturnFlag; }
    
    get datesModFlag(): boolean { return this._datesModFlag; }

    set datesModFlag(pdatesModFlag: boolean) { this._datesModFlag = pdatesModFlag; }

    
    
    toJSON(): any {
        return {
            'escapeId': this._escapeId,
            'offenderBookId': this._offenderBookId,
            'escapeDate': this._escapeDate,
            'escapeTime': this._escapeTime,
            'escapeCircumstanceCode': this._escapeCircumstanceCode,
            'escapeEscortCode': this._escapeEscortCode,
            'escapeAgyLocId': this._escapeAgyLocId,
            'arrestAgyCode': this._arrestAgyCode,
            'escapeCommentText': this._escapeCommentText,
            'securityBreachCode': this._securityBreachCode,
            'recaptureDate': this._recaptureDate,
            'recpatureTime': this._recpatureTime,
            'recpatureCommentText': this._recpatureCommentText,
            'readmissionDate': this._readmissionDate,
            'readmissionTime': this._readmissionTime,
            'readmissAgyLocId': this._readmissAgyLocId,
            'readmissCommentText': this._readmissCommentText,
            'adjustSentenceFlag': this._adjustSentenceFlag,
            'escapeRegistrationRef': this._escapeRegistrationRef,
            'inCompanyFlag': this._inCompanyFlag,
            'lastSeenDate': this._lastSeenDate,
            'lastSeenTime': this._lastSeenTime,
            'incidentNumber': this._incidentNumber,
            'offenderAdjustId': this._offenderAdjustId,
            'escapeMovementReason': this._escapeMovementReason,
            'recaptureMovementReason': this._recaptureMovementReason,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'bookNo': this._bookNo,
            'dspEscapeReason': this._dspEscapeReason,
            'drvSecurityBreachCode': this._drvSecurityBreachCode,
            'drvArrestAgyCode': this._drvArrestAgyCode,
            'dspRecaptureReason': this._dspRecaptureReason,
            'drvEscapeEscortCode': this._drvEscapeEscortCode,
            'drvEscapeCircumstanceCode':this._drvEscapeCircumstanceCode,
            'record' :this._record,
            'totalRecords' :this._totalRecords,
            'offenderIdDisplay' :this._offenderIdDisplay,
            'nbtOffenderId' :this._nbtOffenderId,
            'updatedFlag' :this._updatedFlag,
            'returnFlag' :this._returnFlag,
            'datesModFlag' : this._datesModFlag
        };
    }
}
