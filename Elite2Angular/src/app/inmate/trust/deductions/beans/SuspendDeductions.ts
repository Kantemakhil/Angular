export class SuspendDeductions {
   private _createDatetime: Date;
   private _serialVersionUID: number;
   private _suspendDeductionId: number;
   private _createUserId: string;
   private _endDate: Date;
   private _modifyDatetime: Date;
   private _caseloadId: string;
   private _modifyUserId: string;
   private _sealFlag: string;
   private _startDate: Date;

   get createDatetime(): Date { return this._createDatetime; }
   set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
   get serialVersionUID(): number { return this._serialVersionUID; }
   set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
   get suspendDeductionId(): number { return this._suspendDeductionId; }
   set suspendDeductionId(psuspendDeductionId: number) { this._suspendDeductionId = psuspendDeductionId; }
   get createUserId(): string { return this._createUserId; }
   set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
   get endDate(): Date { return this._endDate; }
   set endDate(pendDate: Date) { this._endDate = pendDate; }
   get modifyDatetime(): Date { return this._modifyDatetime; }
   set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
   get caseloadId(): string { return this._caseloadId; }
   set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }
   get modifyUserId(): string { return this._modifyUserId; }
   set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
   get sealFlag(): string { return this._sealFlag; }
   set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
   get startDate(): Date { return this._startDate; }
   set startDate(pstartDate: Date) { this._startDate = pstartDate; }

   toJSON(): any {
      return {
         'createDatetime': this._createDatetime,
         'serialVersionUID': this._serialVersionUID,
         'suspendDeductionId': this._suspendDeductionId,
         'createUserId': this._createUserId,
         'endDate': this._endDate,
         'modifyDatetime': this._modifyDatetime,
         'caseloadId': this._caseloadId,
         'modifyUserId': this._modifyUserId,
         'sealFlag': this._sealFlag,
         'startDate': this._startDate,
      };
   }
}