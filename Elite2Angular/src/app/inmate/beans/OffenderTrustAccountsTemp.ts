export class OffenderTrustAccountsTemp {
   private _accountClosedFlag: string;
   private _lastName: string;
   private _createUserId: string;
   private _modifyDate: Date;
   private _offenderBookId: number;
   private _currentBalance: number;
   private _offenderIdDisplay: string;
   private _modifyUserId: string;
   private _movementDate: Date;
   private _holdBalance: number;
   private _sessionId: number;
   private _createDateTime: Date;
   private _firstName: string;
   private _serialVersionUID: number;
   private _modifyDateTime: Date;
   private _caseloadId: string;
   private _agyLocId: string;
   private _listSeq: number;
   private _offenderId: number;
   private _sealFlag: string;
   private _notifyDate: Date;
   private _totalAmount: number;
   private _cbntAccountClosedFlag: string;
   private _cgnbtModifyUserId: string;
   private _caseloadType: string;
   private _sessionIdTemp: number;
   private _lastNameTemp: string;
   private _createDateTimeTemp: Date;
   private _modifyDateTimeTemp: Date;
   private _sealFlagTemp: string;
   private _cgnbtAccountClosedFlag: string;

   get accountClosedFlag(): string { return this._accountClosedFlag; }

   set accountClosedFlag(paccountClosedFlag: string) { this._accountClosedFlag = paccountClosedFlag; }

   get lastName(): string { return this._lastName; }

   set lastName(plastName: string) { this._lastName = plastName; }

   get createUserId(): string { return this._createUserId; }

   set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

   get modifyDate(): Date { return this._modifyDate; }

   set modifyDate(pmodifyDate: Date) { this._modifyDate = pmodifyDate; }

   get offenderBookId(): number { return this._offenderBookId; }

   set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

   get currentBalance(): number { return this._currentBalance; }

   set currentBalance(pcurrentBalance: number) { this._currentBalance = pcurrentBalance; }

   get offenderIdDisplay(): string { return this._offenderIdDisplay; }

   set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }

   get modifyUserId(): string { return this._modifyUserId; }

   set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

   get movementDate(): Date { return this._movementDate; }

   set movementDate(pmovementDate: Date) { this._movementDate = pmovementDate; }

   get holdBalance(): number { return this._holdBalance; }

   set holdBalance(pholdBalance: number) { this._holdBalance = pholdBalance; }

   get sessionId(): number { return this._sessionId; }

   set sessionId(psessionId: number) { this._sessionId = psessionId; }

   get createDateTime(): Date { return this._createDateTime; }

   set createDateTime(pcreateDateTime: Date) { this._createDateTime = pcreateDateTime; }

   get firstName(): string { return this._firstName; }

   set firstName(pfirstName: string) { this._firstName = pfirstName; }

   get serialVersionUID(): number { return this._serialVersionUID; }

   set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

   get modifyDateTime(): Date { return this._modifyDateTime; }

   set modifyDateTime(pmodifyDateTime: Date) { this._modifyDateTime = pmodifyDateTime; }

   get caseloadId(): string { return this._caseloadId; }

   set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }

   get agyLocId(): string { return this._agyLocId; }

   set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

   get listSeq(): number { return this._listSeq; }

   set listSeq(plistSeq: number) { this._listSeq = plistSeq; }

   get offenderId(): number { return this._offenderId; }

   set offenderId(poffenderId: number) { this._offenderId = poffenderId; }

   get sealFlag(): string { return this._sealFlag; }

   set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

   get notifyDate(): Date { return this._notifyDate; }

   set notifyDate(pnotifyDate: Date) { this._notifyDate = pnotifyDate; }

   get totalAmount(): number { return this._totalAmount; }

   set totalAmount(ptotalAmount: number) { this._totalAmount = ptotalAmount; }

   get cbntAccountClosedFlag(): string { return this._cbntAccountClosedFlag; }

   set cbntAccountClosedFlag(pcbntAccountClosedFlag: string) { this._cbntAccountClosedFlag = pcbntAccountClosedFlag; }

   get cgnbtModifyUserId(): string { return this._cgnbtModifyUserId; }

   set cgnbtModifyUserId(pcgnbtModifyUserId: string) { this._cgnbtModifyUserId = pcgnbtModifyUserId; }

   get caseloadType(): string { return this._caseloadType; }

   set caseloadType(pcaseloadType: string) { this._caseloadType = pcaseloadType; }

   get sessionIdTemp(): number { return this._sessionIdTemp; }

   set sessionIdTemp(psessionIdTemp: number) { this._sessionIdTemp = psessionIdTemp; }

   get lastNameTemp(): string { return this._lastNameTemp; }

   set lastNameTemp(plastNameTemp: string) { this._lastNameTemp = plastNameTemp; }

   get createDateTimeTemp(): Date { return this._createDateTimeTemp; }

   set createDateTimeTemp(pcreateDateTimeTemp: Date) { this._createDateTimeTemp = pcreateDateTimeTemp; }

   get modifyDateTimeTemp(): Date { return this._modifyDateTimeTemp; }

   set modifyDateTimeTemp(pmodifyDateTimeTemp: Date) { this._modifyDateTimeTemp = pmodifyDateTimeTemp; }

   get sealFlagTemp(): string { return this._sealFlagTemp; }

   set sealFlagTemp(psealFlagTemp: string) { this._sealFlagTemp = psealFlagTemp; }

   get cgnbtAccountClosedFlag(): string { return this._cgnbtAccountClosedFlag; }

   set cgnbtAccountClosedFlag(pcgnbtAccountClosedFlag: string) { this._cgnbtAccountClosedFlag = pcgnbtAccountClosedFlag; }


   toJSON(): any {
      return {
         'accountClosedFlag': this._accountClosedFlag,
         'lastName': this._lastName,
         'createUserId': this._createUserId,
         'modifyDate': this._modifyDate,
         'offenderBookId': this._offenderBookId,
         'currentBalance': this._currentBalance,
         'offenderIdDisplay': this._offenderIdDisplay,
         'modifyUserId': this._modifyUserId,
         'movementDate': this._movementDate,
         'holdBalance': this._holdBalance,
         'sessionId': this._sessionId,
         'createDateTime': this._createDateTime,
         'firstName': this._firstName,
         'serialVersionUID': this._serialVersionUID,
         'modifyDateTime': this._modifyDateTime,
         'caseloadId': this._caseloadId,
         'agyLocId': this._agyLocId,
         'listSeq': this._listSeq,
         'offenderId': this._offenderId,
         'sealFlag': this._sealFlag,
         'notifyDate': this._notifyDate,
         'totalAmount': this._totalAmount,
         'cbntAccountClosedFlag': this._cbntAccountClosedFlag,
         'cgnbtModifyUserId': this._cgnbtModifyUserId,
         'caseloadType': this._caseloadType,
         'sessionIdTemp': this._sessionIdTemp,
         'lastNameTemp': this._lastNameTemp,
         'createDateTimeTemp': this._createDateTimeTemp,
         'modifyDateTimeTemp': this._modifyDateTimeTemp,
         'sealFlagTemp': this._sealFlagTemp,
         'cgnbtAccountClosedFlag': this._cgnbtAccountClosedFlag,
      };
   }
}
