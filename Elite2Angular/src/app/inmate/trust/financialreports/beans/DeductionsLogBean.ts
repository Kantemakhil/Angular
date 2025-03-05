import { BaseModel } from '@commonbeans/BaseModel';
export class DeductionsLogBean extends BaseModel {
   private _fReportHeaderLabelOne: string;
   private _fEntrySeq: Date;
   private _fTotOnw: number;
   private _fCsTotDebit: string;
   private _fTxnEntryDesc: Date;
   private _fFive: string;
   private _fThree: string;
   private _fSeven: string;
   private _fPayment: string;
   private _fModifyUserId: string;
   private _fDeductionType: string;
   private _serialVersionUID: number;
   private _fFour: string;
   private _fWriteOfDeductionType: string;
   private _fPageOne: number;
   private _fInfoNumber: string;
   private _fReportHeaderLabelTwo: string;
   private _fTwo: string;
   private _fTxnEntry: Date;
   private _caseloadType: string;
   private _fBalance: string;
   private _fSix: string;
   private _caseloadId: string;
   private _fTxnId: Date;
   private _fOffenderId: string;
   private _fUserOne: string;
   private _fSysDateOne: Date;
   private _offenderId: number;
   private _offenderDeductionId: number;
   get fReportHeaderLabelOne(): string { return this._fReportHeaderLabelOne; }
   set fReportHeaderLabelOne(pfReportHeaderLabelOne: string) { this._fReportHeaderLabelOne = pfReportHeaderLabelOne; }
   get fEntrySeq(): Date { return this._fEntrySeq; }
   set fEntrySeq(pfEntrySeq: Date) { this._fEntrySeq = pfEntrySeq; }
   get fTotOnw(): number { return this._fTotOnw; }
   set fTotOnw(pfTotOnw: number) { this._fTotOnw = pfTotOnw; }
   get fCsTotDebit(): string { return this._fCsTotDebit; }
   set fCsTotDebit(pfCsTotDebit: string) { this._fCsTotDebit = pfCsTotDebit; }
   get fTxnEntryDesc(): Date { return this._fTxnEntryDesc; }
   set fTxnEntryDesc(pfTxnEntryDesc: Date) { this._fTxnEntryDesc = pfTxnEntryDesc; }
   get fFive(): string { return this._fFive; }
   set fFive(pfFive: string) { this._fFive = pfFive; }
   get fThree(): string { return this._fThree; }
   set fThree(pfThree: string) { this._fThree = pfThree; }
   get fSeven(): string { return this._fSeven; }
   set fSeven(pfSeven: string) { this._fSeven = pfSeven; }
   get fPayment(): string { return this._fPayment; }
   set fPayment(pfPayment: string) { this._fPayment = pfPayment; }
   get fModifyUserId(): string { return this._fModifyUserId; }
   set fModifyUserId(pfModifyUserId: string) { this._fModifyUserId = pfModifyUserId; }
   get fDeductionType(): string { return this._fDeductionType; }
   set fDeductionType(pfDeductionType: string) { this._fDeductionType = pfDeductionType; }
   get serialVersionUID(): number { return this._serialVersionUID; }
   set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
   get fFour(): string { return this._fFour; }
   set fFour(pfFour: string) { this._fFour = pfFour; }
   get fWriteOfDeductionType(): string { return this._fWriteOfDeductionType; }
   set fWriteOfDeductionType(pfWriteOfDeductionType: string) { this._fWriteOfDeductionType = pfWriteOfDeductionType; }
   get fPageOne(): number { return this._fPageOne; }
   set fPageOne(pfPageOne: number) { this._fPageOne = pfPageOne; }
   get fInfoNumber(): string { return this._fInfoNumber; }
   set fInfoNumber(pfInfoNumber: string) { this._fInfoNumber = pfInfoNumber; }
   get fReportHeaderLabelTwo(): string { return this._fReportHeaderLabelTwo; }
   set fReportHeaderLabelTwo(pfReportHeaderLabelTwo: string) { this._fReportHeaderLabelTwo = pfReportHeaderLabelTwo; }
   get fTwo(): string { return this._fTwo; }
   set fTwo(pfTwo: string) { this._fTwo = pfTwo; }
   get fTxnEntry(): Date { return this._fTxnEntry; }
   set fTxnEntry(pfTxnEntry: Date) { this._fTxnEntry = pfTxnEntry; }
   get caseloadType(): string { return this._caseloadType; }
   set caseloadType(pcaseloadType: string) { this._caseloadType = pcaseloadType; }
   get fBalance(): string { return this._fBalance; }
   set fBalance(pfBalance: string) { this._fBalance = pfBalance; }
   get fSix(): string { return this._fSix; }
   set fSix(pfSix: string) { this._fSix = pfSix; }
   get caseloadId(): string { return this._caseloadId; }
   set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }
   get fTxnId(): Date { return this._fTxnId; }
   set fTxnId(pfTxnId: Date) { this._fTxnId = pfTxnId; }
   get fOffenderId(): string { return this._fOffenderId; }
   set fOffenderId(pfOffenderId: string) { this._fOffenderId = pfOffenderId; }
   get fUserOne(): string { return this._fUserOne; }
   set fUserOne(pfUserOne: string) { this._fUserOne = pfUserOne; }
   get fSysDateOne(): Date { return this._fSysDateOne; }
   set fSysDateOne(pfSysDateOne: Date) { this._fSysDateOne = pfSysDateOne; }
   get offenderId(): number { return this._offenderId; }
   set offenderId(poffenderId: number) { this._offenderId = poffenderId; }
   get offenderDeductionId(): number { return this._offenderDeductionId; }
   set offenderDeductionId(poffenderDeductionId: number) { this._offenderDeductionId = poffenderDeductionId; }

   toJSON(): any {
      return {
         'fReportHeaderLabelOne': this._fReportHeaderLabelOne,
         'fEntrySeq': this._fEntrySeq,
         'fTotOnw': this._fTotOnw,
         'fCsTotDebit': this._fCsTotDebit,
         'fTxnEntryDesc': this._fTxnEntryDesc,
         'fFive': this._fFive,
         'fThree': this._fThree,
         'fSeven': this._fSeven,
         'fPayment': this._fPayment,
         'fModifyUserId': this._fModifyUserId,
         'fDeductionType': this._fDeductionType,
         'serialVersionUID': this._serialVersionUID,
         'fFour': this._fFour,
         'fWriteOfDeductionType': this._fWriteOfDeductionType,
         'fPageOne': this._fPageOne,
         'fInfoNumber': this._fInfoNumber,
         'fReportHeaderLabelTwo': this._fReportHeaderLabelTwo,
         'fTwo': this._fTwo,
         'fTxnEntry': this._fTxnEntry,
         'caseloadType': this._caseloadType,
         'fBalance': this._fBalance,
         'fSix': this._fSix,
         'caseloadId': this._caseloadId,
         'fTxnId': this._fTxnId,
         'fOffenderId': this._fOffenderId,
         'fUserOne': this._fUserOne,
        'fSysDateOne': this._fSysDateOne,
       'offenderId': this._offenderId,
       'offenderDeductionId': this._offenderDeductionId,
      };
   }
}
