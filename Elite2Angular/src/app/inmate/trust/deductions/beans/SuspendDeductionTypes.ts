export class SuspendDeductionTypes {
   private _createDatetime: Date;
   private _suspendedFlag: string;
   private _serialVersionUID: number;
   private _createUserId: string;
   private _suspendDeductionId: number;
   private _modifyDatetime: Date;
   private _deductionType: string;
   private _modifyUserId: string;
   private _sealFlag: string;

   get createDatetime(): Date { return this._createDatetime; }
   set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
   get suspendedFlag(): string { return this._suspendedFlag; }
   set suspendedFlag(psuspendedFlag: string) { this._suspendedFlag = psuspendedFlag; }
   get serialVersionUID(): number { return this._serialVersionUID; }
   set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
   get createUserId(): string { return this._createUserId; }
   set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
   get suspendDeductionId(): number { return this._suspendDeductionId; }
   set suspendDeductionId(psuspendDeductionId: number) { this._suspendDeductionId = psuspendDeductionId; }
   get modifyDatetime(): Date { return this._modifyDatetime; }
   set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
   get deductionType(): string { return this._deductionType; }
   set deductionType(pdeductionType: string) { this._deductionType = pdeductionType; }
   get modifyUserId(): string { return this._modifyUserId; }
   set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
   get sealFlag(): string { return this._sealFlag; }
   set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

   toJSON(): any {
      return {
         'createDatetime': this._createDatetime,
         'suspendedFlag': this._suspendedFlag,
         'serialVersionUID': this._serialVersionUID,
         'createUserId': this._createUserId,
         'suspendDeductionId': this._suspendDeductionId,
         'modifyDatetime': this._modifyDatetime,
         'deductionType': this._deductionType,
         'modifyUserId': this._modifyUserId,
         'sealFlag': this._sealFlag,
      };
   }
}