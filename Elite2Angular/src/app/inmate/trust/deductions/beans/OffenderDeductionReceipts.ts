export class OffenderDeductionReceipts {
      private _receiptPercentage: number;
      private _offenderDeductionId: number;
      private _flatRate: number;
      private _serialVersionUID: number;
      private _createUserId: string;
      private _modifyDateTime: Date;
      private _modifyUserId: string;
      private _listSeq: number;
      private _sealFlag: string;
      private _receiptTxnType: string;
      private _createDateTime: Date;
      private _offenderId: number;
      private _caseloadType: string;
      private _caseloadId: string;
      private _deductionType: string;
      private _commitBean: OffenderDeductionReceipts;

      get commitBean(): OffenderDeductionReceipts {
            return this._commitBean;
          }
    
          set commitBean(pcommitBean: OffenderDeductionReceipts) {
            this._commitBean = pcommitBean;
          }

      get deductionType(): string { return this._deductionType; }
      set deductionType(pdeductionType: string) { this._deductionType = pdeductionType; }
      get caseloadId(): string { return this._caseloadId; }
      set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }
      get caseloadType(): string { return this._caseloadType; }
      set caseloadType(pcaseloadType: string) { this._caseloadType = pcaseloadType; }
      get receiptPercentage(): number { return this._receiptPercentage; }
      set receiptPercentage(preceiptPercentage: number) { this._receiptPercentage = preceiptPercentage; }
      get offenderDeductionId(): number { return this._offenderDeductionId; }
      set offenderDeductionId(poffenderDeductionId: number) { this._offenderDeductionId = poffenderDeductionId; }
      get flatRate(): number { return this._flatRate; }
      set flatRate(pflatRate: number) { this._flatRate = pflatRate; }
      get serialVersionUID(): number { return this._serialVersionUID; }
      set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
      get createUserId(): string { return this._createUserId; }
      set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
      get modifyDateTime(): Date { return this._modifyDateTime; }
      set modifyDateTime(pmodifyDateTime: Date) { this._modifyDateTime = pmodifyDateTime; }
      get modifyUserId(): string { return this._modifyUserId; }
      set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
      get listSeq(): number { return this._listSeq; }
      set listSeq(plistSeq: number) { this._listSeq = plistSeq; }
      get sealFlag(): string { return this._sealFlag; }
      set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
      get receiptTxnType(): string { return this._receiptTxnType; }
      set receiptTxnType(preceiptTxnType: string) { this._receiptTxnType = preceiptTxnType; }
      get createDateTime(): Date { return this._createDateTime; }
      set createDateTime(pcreateDateTime: Date) { this._createDateTime = pcreateDateTime; }
      get offenderId(): number { return this._offenderId; }
      set offenderId(poffenderId: number) { this._offenderId = poffenderId; }

      toJSON(): any {
            return {
                  'receiptPercentage': this._receiptPercentage,
                  'offenderDeductionId': this._offenderDeductionId,
                  'flatRate': this._flatRate,
                  'serialVersionUID': this._serialVersionUID,
                  'createUserId': this._createUserId,
                  'modifyDateTime': this._modifyDateTime,
                  'modifyUserId': this._modifyUserId,
                  'listSeq': this._listSeq,
                  'sealFlag': this._sealFlag,
                  'receiptTxnType': this._receiptTxnType,
                  'createDateTime': this._createDateTime,
                  'offenderId': this._offenderId,
                  'caseloadType': this._caseloadType,
                  'caseloadId': this._caseloadId,
                  'deductionType': this._deductionType,
                  'commitBean': this._commitBean
            };
      }
}