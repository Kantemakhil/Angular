    export class OffenderAdjustmentTxns {
         private _adjustmentDate: Date;
         private _createUserId: string;
         private _modifyDatetime: Date;
         private _modifyUserId: string;
         private _adjustmentReasonCode: string;
         private _createDatetime: Date;
         private _serialVersionUID: number;
         private _txnEntrySeq: number;
         private _adjustmentUserId: string;
         private _adjustmentText: string;
         private _offenderId: number;
         private _sealFlag: string;
         private _adjustmentAmount: number;
         private _txnPostingType: string;
         private _txnId: number;
         private _offenderDeductionId: number;
         private _lvWriteOffAmount: number;
         private _caseloadType: string;
         private _offenderBookId: number;
         private _deductionType: string;
         private _caseloadId: string;
         private _txnType: string;

         get caseloadType(): string { return  this._caseloadType; }

         set caseloadType(pcaseloadType: string) { this._caseloadType = pcaseloadType; }

         get offenderBookId(): number { return  this._offenderBookId; }

         set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

         get deductionType(): string { return  this._deductionType; }

         set deductionType(pdeductionType: string) { this._deductionType = pdeductionType; }

         get caseloadId(): string { return  this._caseloadId; }

         set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }

         get txnType(): string { return  this._txnType; }

         set txnType(ptxnType: string) { this._txnType = ptxnType; }

         get lvWriteOffAmount(): number { return  this._lvWriteOffAmount; }

         set lvWriteOffAmount(plvWriteOffAmount: number) { this._lvWriteOffAmount = plvWriteOffAmount; }

         get adjustmentDate(): Date { return  this._adjustmentDate; }

         set adjustmentDate(padjustmentDate: Date) { this._adjustmentDate = padjustmentDate; }

         get createUserId(): string { return  this._createUserId; }

         set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

         get modifyDatetime(): Date { return  this._modifyDatetime; }

         set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

         get modifyUserId(): string { return  this._modifyUserId; }

         set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

         get adjustmentReasonCode(): string { return  this._adjustmentReasonCode; }

         set adjustmentReasonCode(padjustmentReasonCode: string) { this._adjustmentReasonCode = padjustmentReasonCode; }

         get createDatetime(): Date { return  this._createDatetime; }

         set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

         get serialVersionUID(): number { return  this._serialVersionUID; }

         set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

         get txnEntrySeq(): number { return  this._txnEntrySeq; }

         set txnEntrySeq(ptxnEntrySeq: number) { this._txnEntrySeq = ptxnEntrySeq; }

         get adjustmentUserId(): string { return  this._adjustmentUserId; }

         set adjustmentUserId(padjustmentUserId: string) { this._adjustmentUserId = padjustmentUserId; }

         get adjustmentText(): string { return  this._adjustmentText; }

         set adjustmentText(padjustmentText: string) { this._adjustmentText = padjustmentText; }

         get offenderId(): number { return  this._offenderId; }

         set offenderId(poffenderId: number) { this._offenderId = poffenderId; }

         get sealFlag(): string { return  this._sealFlag; }

         set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

         get adjustmentAmount(): number { return  this._adjustmentAmount; }

         set adjustmentAmount(padjustmentAmount: number) { this._adjustmentAmount = padjustmentAmount; }

         get txnPostingType(): string { return  this._txnPostingType; }

         set txnPostingType(ptxnPostingType: string) { this._txnPostingType = ptxnPostingType; }

         get txnId(): number { return  this._txnId; }

        set txnId(ptxnId: number) { this._txnId = ptxnId; }

        get offenderDeductionId(): number { return this._offenderDeductionId; }

        set offenderDeductionId(poffenderDeductionId: number) { this._offenderDeductionId = poffenderDeductionId; }


     toJSON(): any {
         return {
            'adjustmentDate': this._adjustmentDate,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'adjustmentReasonCode': this._adjustmentReasonCode,
            'createDatetime': this._createDatetime,
            'serialVersionUID': this._serialVersionUID,
            'txnEntrySeq': this._txnEntrySeq,
            'adjustmentUserId': this._adjustmentUserId,
            'adjustmentText': this._adjustmentText,
            'offenderId': this._offenderId,
            'sealFlag': this._sealFlag,
            'adjustmentAmount': this._adjustmentAmount,
            'txnPostingType': this._txnPostingType,
            'txnId': this._txnId,
            'offenderDeductionId': this._offenderDeductionId,
            'lvWriteOffAmount': this._lvWriteOffAmount,
            'caseloadType': this._caseloadType,
            'offenderBookId': this._offenderBookId,
            'deductionType': this._deductionType,
            'caseloadId': this._caseloadId,
            'txnType': this._txnType
             };
         }
 }
