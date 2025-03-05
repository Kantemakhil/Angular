import { BaseModel } from '@commonbeans/BaseModel';
export class OffenderBookingEvent extends BaseModel {
    private _createUserId: string;
    private _creationUser: string;
    private _modifyDatetime: Date;
    private _offenderBookId: number;
    private _modifyUserId: string;
    private _creationDate: Date;
    private _commentText: string;
    private _bookingEventCode: string;
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _fromAgyLocId: string;
    private _eventSeq: number;
    private _eventTime: Date;
    private _eventUser: string;
    private _reasonCode: string;
    private _sealFlag: string;
    private _toAgyLocId: string;
    private _eventDate: Date;
    private _agyLocId: string;
    private _caseloadId: string;
    private _checkFlag: string;
    private _createBookingFlag: string;
    private _nbtOffenderBookId: string;
    private _nbtOffenderBookId2: string;
    private _dspOffenderBookId: string;
    private _tempValue: string;
    private _intaketo: string;
    private _offenderId: number;
    private _createTrustAccountFlag: string;
    private _rootOffenderId: number;
    private _pCommStatus: string;
    private _staffId: number;
    private _pBookIdOld: number;
    private _intakefrom: string;
    private _intakeReason:string;
    private _trustFlag:string;


    get rootOffenderId(): number { return this._rootOffenderId; }

    set rootOffenderId(prootOffenderId: number) { this._rootOffenderId = prootOffenderId; }


    get offenderId(): number { return this._offenderId; }

    set offenderId(pdspDescription: number) { this._offenderId = pdspDescription; }

    get intaketo(): string { return this._intaketo; }

    set intaketo(pintaketo: string) { this._intaketo = pintaketo; }

    get createTrustAccountFlag(): string { return this._createTrustAccountFlag; }

    set createTrustAccountFlag(pcreateTrustAccountFlag: string) { this._createTrustAccountFlag = pcreateTrustAccountFlag; }

    get intakefrom(): string { return this._intakefrom; }

    set intakefrom(pintakefrom: string) { this._intakefrom = pintakefrom; }

    get tempValue(): string { return this._tempValue; }

    set tempValue(ptempValue: string) { this._tempValue = ptempValue; }

    get nbtOffenderBookId(): string { return this._nbtOffenderBookId; }

    set nbtOffenderBookId(pnbtOffenderBookId: string) { this._nbtOffenderBookId = pnbtOffenderBookId; }

    get nbtOffenderBookId2(): string { return this._nbtOffenderBookId2; }

    set nbtOffenderBookId2(pnbtOffenderBookId2: string) { this._nbtOffenderBookId2 = pnbtOffenderBookId2; }

    get dspOffenderBookId(): string { return this._dspOffenderBookId; }

    set dspOffenderBookId(pdspOffenderBookId: string) { this._dspOffenderBookId = pdspOffenderBookId; }

    get createBookingFlag(): string { return this._createBookingFlag; }

    set createBookingFlag(pcreateBookingFlag: string) { this._createBookingFlag = pcreateBookingFlag; }

    get checkFlag(): string { return this._checkFlag; }

    set checkFlag(pcheckFlag: string) { this._checkFlag = pcheckFlag; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get creationUser(): string { return this._creationUser; }

    set creationUser(pcreationUser: string) { this._creationUser = pcreationUser; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get creationDate(): Date { return this._creationDate; }

    set creationDate(pcreationDate: Date) { this._creationDate = pcreationDate; }

    get commentText(): string { return this._commentText; }

    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    get bookingEventCode(): string { return this._bookingEventCode; }

    set bookingEventCode(pbookingEventCode: string) { this._bookingEventCode = pbookingEventCode; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get fromAgyLocId(): string { return this._fromAgyLocId; }

    set fromAgyLocId(pfromAgyLocId: string) { this._fromAgyLocId = pfromAgyLocId; }

    get eventSeq(): number { return this._eventSeq; }

    set eventSeq(peventSeq: number) { this._eventSeq = peventSeq; }

    get eventTime(): Date { return this._eventTime; }

    set eventTime(peventTime: Date) { this._eventTime = peventTime; }

    get eventUser(): string { return this._eventUser; }

    set eventUser(peventUser: string) { this._eventUser = peventUser; }

    get reasonCode(): string { return this._reasonCode; }

    set reasonCode(preasonCode: string) { this._reasonCode = preasonCode; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get toAgyLocId(): string { return this._toAgyLocId; }

    set toAgyLocId(ptoAgyLocId: string) { this._toAgyLocId = ptoAgyLocId; }

    get eventDate(): Date { return this._eventDate; }

    set eventDate(peventDate: Date) { this._eventDate = peventDate; }

    get agyLocId(): string { return this._agyLocId; }

    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

    get caseloadId(): string { return this._caseloadId; }

    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }

    get pCommStatus(): string { return this._pCommStatus; }

    set pCommStatus(ppCommStatus: string) { this._pCommStatus = ppCommStatus; }

    get staffId(): number { return this._staffId; }

    set staffId(pstaffId: number) { this._staffId = pstaffId; }

    get pBookIdOld(): number { return this._pBookIdOld; }

    set pBookIdOld(ppBookIdOld: number) { this._pBookIdOld = ppBookIdOld; }
    
    get intakeReason(): string { return this._intakeReason; }

    set intakeReason(pintakeReason: string) { this._intakeReason = pintakeReason; }

    get trustFlag(): string { return this._trustFlag; }

    set trustFlag(ptrustFlag: string) { this._trustFlag = ptrustFlag; }
    

    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'creationUser': this._creationUser,
            'modifyDatetime': this._modifyDatetime,
            'offenderBookId': this._offenderBookId,
            'modifyUserId': this._modifyUserId,
            'creationDate': this._creationDate,
            'commentText': this._commentText,
            'bookingEventCode': this._bookingEventCode,
            'createDatetime': this._createDatetime,
            'serialVersionUID': this._serialVersionUID,
            'fromAgyLocId': this._fromAgyLocId,
            'eventSeq': this._eventSeq,
            'eventTime': this._eventTime,
            'eventUser': this._eventUser,
            'reasonCode': this._reasonCode,
            'sealFlag': this._sealFlag,
            'toAgyLocId': this._toAgyLocId,
            'eventDate': this._eventDate,
            'agyLocId': this.agyLocId,
            'caseloadId': this.caseloadId,
            'checkFlag': this._checkFlag,
            'createBookingFlag': this._createBookingFlag,
            'nbtOffenderBookId': this._nbtOffenderBookId,
            'nbtOffenderBookId2': this._nbtOffenderBookId2,
            'dspOffenderBookId': this._dspOffenderBookId,
            'tempValue': this._tempValue,
            'intaketo': this._intaketo,
            'offenderId': this._offenderId,
            'createTrustAccountFlag': this._createTrustAccountFlag,
            'rootOffenderId': this._rootOffenderId,
            'pCommStatus': this._pCommStatus,
            'staffId': this._staffId,
            'pBookIdOld': this._pBookIdOld,
            'intakefrom': this._intakefrom,
            'intakeReason':this._intakeReason,
            'trustFlag':this._trustFlag,
        };
    }
}
