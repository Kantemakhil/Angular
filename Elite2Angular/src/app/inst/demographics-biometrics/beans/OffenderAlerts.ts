import { BaseModel } from '@commonbeans/BaseModel';

export class OffenderAlerts extends BaseModel {

    private _alertCode: string;
    private _agyLocId: string;
    private _alertDate: Date;
    private _alertStatus: string;
    private _alertType: string;
    private _authorizePersonText: string;
    private _caseloadId: string;
    private _caseloadType: string;
    private _commentText: string;
    private _createDate: Date;
    private _createDatetime: Date;
    private _createUserId: string;
    private _expiryDate: Date;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _rootOffenderId: number;
    private _sealFlag: string;
    private _verifiedFlag: string;
    private _offenderBookId: number;
    private _alertSeq: number;
    private _workingNameFlag: string;
    private alertDisable: Boolean = false;
    private alertCodeDisable: Boolean = false;
    private expireDateDisable: Boolean = false;
    private _verifiedFlagValue: boolean;
    private _alertTypeDes: string;
    private _alertCodeDes: string;
    private _activeFlag: string;
    private _alertDateDisplay: string;

    private _alertTypeDescription: string;
    private _alertCodeDescription: string;

    
    
    get isAlertDisable(): Boolean { return this.alertDisable; }
    set isAlertDisable( palertDisable: Boolean ) { this.alertDisable = palertDisable; }
    get isAlertCodeDisable(): Boolean { return this.alertCodeDisable; }
    set isAlertCodeDisable( palertCodeDisable: Boolean ) { this.alertCodeDisable = palertCodeDisable; }
    get alertCode(): string { return this._alertCode; }
    set alertCode( palertCode: string ) { this._alertCode = palertCode; }
    get agyLocId(): string { return this._agyLocId; }
    set agyLocId( pagencyLocId: string ) { this._agyLocId = pagencyLocId; }
    get alertDate(): Date { return this._alertDate; }
    set alertDate( palertDate: Date ) { this._alertDate = palertDate; }
    get alertStatus(): string { return this._alertStatus; }
    set alertStatus( palertStatus: string ) { this._alertStatus = palertStatus; }
    get alertType(): string { return this._alertType; }
    set alertType( palertType: string ) { this._alertType = palertType; }
    get authorizePersonText(): string { return this._authorizePersonText; }
    set authorizePersonText( pauthorizePersonText: string ) { this._authorizePersonText = pauthorizePersonText; }
    get caseloadId(): string { return this._caseloadId; }
    set caseloadId( pcaseloadId: string ) { this._caseloadId = pcaseloadId; }
    get caseloadType(): string { return this._caseloadType; }
    set caseloadType( pcaseloadType: string ) { this._caseloadType = pcaseloadType; }
    get commentText(): string { return this._commentText; }
    set commentText( pcommentText: string ) { this._commentText = pcommentText; }
    get createDate(): Date { return this._createDate; }
    set createDate( pcreateDate: Date ) { this._createDate = pcreateDate; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime( pcreateDatetime: Date ) { this._createDatetime = pcreateDatetime; }
    get createUserId(): string { return this._createUserId; }
    set createUserId( pcreateUserId: string ) { this._createUserId = pcreateUserId; }
    get expiryDate(): Date { return this._expiryDate; }
    set expiryDate( pexpiryDate: Date ) { this._expiryDate = pexpiryDate; }
    get isExpireDateDisable(): Boolean { return this.expireDateDisable; }
    set isExpireDateDisable( pexpireDateDisable: Boolean ) { this.expireDateDisable = pexpireDateDisable; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime( pmodifyDatetime: Date ) { this._modifyDatetime = pmodifyDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId( pmodifyUserId: string ) { this._modifyUserId = pmodifyUserId; }
    get rootOffenderId(): number { return this._rootOffenderId; }
    set rootOffenderId( prootOffenderId: number ) { this._rootOffenderId = prootOffenderId; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }
    get verifiedFlag(): string { return this._verifiedFlag; }
    set verifiedFlag( pverifiedFlag: string ) { this._verifiedFlag = pverifiedFlag; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId( poffenderBookId: number ) { this._offenderBookId = poffenderBookId; }
    get alertSeq(): number { return this._alertSeq; }
    set alertSeq( palertSeq: number ) { this._alertSeq = palertSeq; }
    get workingNameFlag(): string { return this._workingNameFlag; }
    set workingNameFlag( pworkingNameFlag: string ) { this._workingNameFlag = pworkingNameFlag; }
    get verifiedFlagValue(): boolean { return this._verifiedFlagValue; }
    set verifiedFlagValue( pverifiedFlagValue: boolean ) { this._verifiedFlagValue = pverifiedFlagValue; }
    get alertTypeDes(): string { return this._alertTypeDes; }
    set alertTypeDes( palertTypeDes: string ) { this._alertTypeDes = palertTypeDes; }
    get alertCodeDes(): string { return this._alertCodeDes; }
    set alertCodeDes( palertCodeDes: string ) { this._alertCodeDes = palertCodeDes; }
    get activeFlag(): string { return this._activeFlag; }
    set activeFlag( pactiveFlag: string ) { this._activeFlag = pactiveFlag; }
    get alertDateDisplay(): string { return this._alertDateDisplay; }
    set alertDateDisplay( palertDateDisplay: string ) { this._alertDateDisplay = palertDateDisplay; }

    get alertTypeDescription(): string { return this._alertTypeDescription; }
    set alertTypeDescription( palertTypeDescription: string ) { this._alertTypeDescription = palertTypeDescription; }
    get alertCodeDescription(): string { return this._alertCodeDescription; }
    set alertCodeDescription( palertCodeDescription: string ) { this._alertCodeDescription = palertCodeDescription; }
    toJSON(): any {
        return {
            'alertCode': this._alertCode,
            'alertDate': this._alertDate,
            'alertStatus': this._alertStatus,
            'alertType': this._alertType,
            'authorizePersonText': this._authorizePersonText,
            'caseloadId': this._caseloadId,
            'caseloadType': this._caseloadType,
            'commentText': this._commentText,
            'createDate': this._createDate,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'expiryDate': this._expiryDate,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'rootOffenderId': this._rootOffenderId,
            'sealFlag': this._sealFlag,
            'verifiedFlag': this._verifiedFlag,
            'offenderBookId': this._offenderBookId,
            'alertSeq': this._alertSeq,
            'workingNameFlag': this._workingNameFlag,
            'alertTypeDes': this._alertTypeDes,
            'alertCodeDes': this._alertCodeDes,
            'activeFlag': this._activeFlag,
            'alertTypeDescription': this._alertTypeDescription,
            'alertCodeDescription': this._alertCodeDescription
        };
    }
}
