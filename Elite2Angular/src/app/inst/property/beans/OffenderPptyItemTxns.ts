import { BaseModel } from '@commonbeans/BaseModel';
export class OffenderPptyItemTxns extends BaseModel {
    private _createUserId: string;
    private _offenderBookId: number;
    private _modifyDatetime: number;
    private _disposedToCorpId: number;
    private _modifyUserId: string;
    private _propertyContainerId: number;
    private _commentText: string;
    private _disposedToPerson: string;
    private _inserted: number;
    private _disposedToPersonId: number;
    private _sealFlag: string;
    private _propertyContainerTxnId: number;
    private _createDate: Date;
    private _toStatusCode: string;
    private _disposedToOffenderFlag: string;
    private _verifyFlag: string;
    private _color: string;
    private _make: string;
    private _verificationFlag: string;
    private _serialNo: string;
    private _createDatetime: Date;
    private _toPropertyContainerId: number;
    private _propertyItemTxnId: number;
    private _propertyItemSeq: number;
    private _eventSeq: number;
    private _fromStatusCode: string;
    private _agyLocId: string;
    private _disposedToCorpName: string;
    private _nbtDspDescription: string;
    private _verifyFlagTemp: boolean;
    private _propertyDescription: string;
    private _propertyType: string;
    private _conditionCode: string;
    private _statusCode: string;
    private _disposedToPersonIdDes: string;
    private _actionCode: string;
    private _actionReason: string;
    get actionCode(): string { return this._actionCode; }

    set actionCode( pactionCode: string ) { this._actionCode = pactionCode; }

    get actionReason(): string { return this._actionReason; }

    set actionReason( pactionReason: string ) { this._actionReason = pactionReason; }


    get disposedToPersonIdDes(): string { return this._disposedToPersonIdDes; }

    set disposedToPersonIdDes(pdisposedToPersonIdDes: string) { this._disposedToPersonIdDes = pdisposedToPersonIdDes; }

    get verifyFlagTemp(): boolean { return this._verifyFlagTemp; }

    set verifyFlagTemp( pverifyFlagTemp: boolean ) { this._verifyFlagTemp = pverifyFlagTemp; }

    get createUserId(): string { return this._createUserId; }

    set createUserId( pcreateUserId: string ) { this._createUserId = pcreateUserId; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId( poffenderBookId: number ) { this._offenderBookId = poffenderBookId; }

    get modifyDatetime(): number { return this._modifyDatetime; }

    set modifyDatetime( pmodifyDatetime: number ) { this._modifyDatetime = pmodifyDatetime; }

    get disposedToCorpId(): number { return this._disposedToCorpId; }

    set disposedToCorpId( pdisposedToCorpId: number ) { this._disposedToCorpId = pdisposedToCorpId; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId( pmodifyUserId: string ) { this._modifyUserId = pmodifyUserId; }

    get propertyContainerId(): number { return this._propertyContainerId; }

    set propertyContainerId( ppropertyContainerId: number ) { this._propertyContainerId = ppropertyContainerId; }

    get commentText(): string { return this._commentText; }

    set commentText( pcommentText: string ) { this._commentText = pcommentText; }

    get disposedToPerson(): string { return this._disposedToPerson; }

    set disposedToPerson( pdisposedToPerson: string ) { this._disposedToPerson = pdisposedToPerson; }

    get inserted(): number { return this._inserted; }

    set inserted( pinserted: number ) { this._inserted = pinserted; }

    get disposedToPersonId(): number { return this._disposedToPersonId; }

    set disposedToPersonId( pdisposedToPersonId: number ) { this._disposedToPersonId = pdisposedToPersonId; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }

    get propertyContainerTxnId(): number { return this._propertyContainerTxnId; }

    set propertyContainerTxnId( ppropertyContainerTxnId: number ) { this._propertyContainerTxnId = ppropertyContainerTxnId; }

    get createDate(): Date { return this._createDate; }

    set createDate( pcreateDate: Date ) { this._createDate = pcreateDate; }

    get toStatusCode(): string { return this._toStatusCode; }

    set toStatusCode( ptoStatusCode: string ) { this._toStatusCode = ptoStatusCode; }

    get disposedToOffenderFlag(): string { return this._disposedToOffenderFlag; }

    set disposedToOffenderFlag( pdisposedToOffenderFlag: string ) { this._disposedToOffenderFlag = pdisposedToOffenderFlag; }

    get verifyFlag(): string { return this._verifyFlag; }

    set verifyFlag( pverifyFlag: string ) { this._verifyFlag = pverifyFlag; }

    get color(): string { return this._color; }

    set color( pcolor: string ) { this._color = pcolor; }

    get make(): string { return this._make; }

    set make( pmake: string ) { this._make = pmake; }

    get verificationFlag(): string { return this._verificationFlag; }

    set verificationFlag( pverificationFlag: string ) { this._verificationFlag = pverificationFlag; }

    get serialNo(): string { return this._serialNo; }

    set serialNo( pserialNo: string ) { this._serialNo = pserialNo; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime( pcreateDatetime: Date ) { this._createDatetime = pcreateDatetime; }

    get toPropertyContainerId(): number { return this._toPropertyContainerId; }

    set toPropertyContainerId( ptoPropertyContainerId: number ) { this._toPropertyContainerId = ptoPropertyContainerId; }

    get propertyItemTxnId(): number { return this._propertyItemTxnId; }

    set propertyItemTxnId( ppropertyItemTxnId: number ) { this._propertyItemTxnId = ppropertyItemTxnId; }

    get propertyItemSeq(): number { return this._propertyItemSeq; }

    set propertyItemSeq( ppropertyItemSeq: number ) { this._propertyItemSeq = ppropertyItemSeq; }

    get eventSeq(): number { return this._eventSeq; }

    set eventSeq( peventSeq: number ) { this._eventSeq = peventSeq; }

    get fromStatusCode(): string { return this._fromStatusCode; }

    set fromStatusCode( pfromStatusCode: string ) { this._fromStatusCode = pfromStatusCode; }

    get agyLocId(): string { return this._agyLocId; }

    set agyLocId( pagyLocId: string ) { this._agyLocId = pagyLocId; }

    get disposedToCorpName(): string { return this._disposedToCorpName; }

    set disposedToCorpName( p_disposedToCorpName: string ) { this._disposedToCorpName = p_disposedToCorpName; }

    set nbtDspDescription( pnbtDspDescription: string ) { this._nbtDspDescription = pnbtDspDescription; }
    get nbtDspDescription(): string { return this._nbtDspDescription; }
    
    get propertyDescription(): string { return this._propertyDescription; }

    set propertyDescription( ppropertyDescription: string ) { this._propertyDescription = ppropertyDescription; }
    
    get propertyType(): string { return this._propertyType; }

    set propertyType( ppropertyType: string ) { this._propertyType = ppropertyType; }
    
    get conditionCode(): string { return this._conditionCode; }

    set conditionCode( pconditionCode: string ) { this._conditionCode = pconditionCode; }
    
    get statusCode(): string { return this._statusCode; }

    set statusCode( pstatusCode: string ) { this._statusCode = pstatusCode; }


    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'offenderBookId': this._offenderBookId,
            'modifyDatetime': this._modifyDatetime,
            'disposedToCorpId': this._disposedToCorpId,
            'disposedToCorpName': this._disposedToCorpName,
            'modifyUserId': this._modifyUserId,
            'propertyContainerId': this._propertyContainerId,
            'commentText': this._commentText,
            'disposedToPerson': this._disposedToPerson,
            'inserted': this._inserted,
            'disposedToPersonId': this._disposedToPersonId,
            'sealFlag': this._sealFlag,
            'propertyContainerTxnId': this._propertyContainerTxnId,
            'createDate': this._createDate,
            'toStatusCode': this._toStatusCode,
            'disposedToOffenderFlag': this._disposedToOffenderFlag,
            'verifyFlag': this._verifyFlag,
            'color': this._color,
            'make': this._make,
            'verificationFlag': this._verificationFlag,
            'serialNo': this._serialNo,
            'createDatetime': this._createDatetime,
            'toPropertyContainerId': this._toPropertyContainerId,
            'propertyItemTxnId': this._propertyItemTxnId,
            'propertyItemSeq': this._propertyItemSeq,
            'eventSeq': this._eventSeq,
            'fromStatusCode': this._fromStatusCode,
            'agyLocId': this._agyLocId,
            'nbtDspDescription': this._nbtDspDescription,
            'propertyDescription': this._propertyDescription,
            'propertyType': this._propertyType,
            'conditionCode': this._conditionCode,
            'statusCode': this._statusCode,
            'disposedToPersonIdDes': this._disposedToPersonIdDes,
            'actionCode':this._actionCode,
            'actionReason':this._actionReason
        };
    }
 }
 