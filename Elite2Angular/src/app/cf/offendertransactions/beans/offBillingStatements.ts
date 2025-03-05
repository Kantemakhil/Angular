import { BaseModel } from "@common/beans/BaseModel";

	export class offBillingStatements extends BaseModel {
		 private _casePlanId: number;
		 private _statementGenerateDatetime: Date;
		 private _billingCycleEndDate: Date;
		 private _createUserId: string;
		 private _statementGenerateUser: string;
		 private _offenderBookId: number;
		 private _modifyDatetime: Date;
		 private _statementGenerateStaffId: number;
		 private _modifyUserId: string;
		 private _rootOffenderId: number;
		 private _beginingBalanceAmount: number;
		 private _billingsAmount: number;
		 private _createDatetime: Date;
		 private _billingStatementId: number;
		 private _caseloadId: string;
		 private _billingCycleStartDate: Date;
		 private _paymentsCreditsAmount: number;
		 private _endingBalanceAmount: number;
		 private _sealFlag: string;
		 private _billId: string;
		 private _billTxnNo: number;

		 get billTxnNo(): number { return this._billTxnNo; }

		 set billTxnNo(pbillTxnNo: number) { this._billTxnNo = pbillTxnNo; }

		 get billId(): string { return this._billId; }

		 set billId(pbillId: string) { this._billId = pbillId; }

		 get casePlanId(): number{ return  this._casePlanId; }

		 set casePlanId(pcasePlanId: number){ this._casePlanId = pcasePlanId; }

		 get statementGenerateDatetime(): Date{ return  this._statementGenerateDatetime; }

		 set statementGenerateDatetime(pstatementGenerateDatetime: Date){ this._statementGenerateDatetime = pstatementGenerateDatetime; }

		 get billingCycleEndDate(): Date{ return  this._billingCycleEndDate; }

		 set billingCycleEndDate(pbillingCycleEndDate: Date){ this._billingCycleEndDate = pbillingCycleEndDate; }

		 get createUserId(): string{ return  this._createUserId; }

		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId; }

		 get statementGenerateUser(): string{ return  this._statementGenerateUser; }

		 set statementGenerateUser(pstatementGenerateUser: string){ this._statementGenerateUser = pstatementGenerateUser; }

		 get offenderBookId(): number{ return  this._offenderBookId; }

		 set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId; }

		 get modifyDatetime(): Date{ return  this._modifyDatetime; }

		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime; }

		 get statementGenerateStaffId(): number{ return  this._statementGenerateStaffId; }

		 set statementGenerateStaffId(pstatementGenerateStaffId: number){ this._statementGenerateStaffId = pstatementGenerateStaffId; }

		 get modifyUserId(): string{ return  this._modifyUserId; }

		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId; }

		 get rootOffenderId(): number{ return  this._rootOffenderId; }

		 set rootOffenderId(prootOffenderId: number){ this._rootOffenderId = prootOffenderId; }

		 get beginingBalanceAmount(): number{ return  this._beginingBalanceAmount; }

		 set beginingBalanceAmount(pbeginingBalanceAmount: number){ this._beginingBalanceAmount = pbeginingBalanceAmount; }

		 get billingsAmount(): number{ return  this._billingsAmount; }

		 set billingsAmount(pbillingsAmount: number){ this._billingsAmount = pbillingsAmount; }

		 get createDatetime(): Date{ return  this._createDatetime; }

		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime; }

		 get billingStatementId(): number{ return  this._billingStatementId; }

		 set billingStatementId(pbillingStatementId: number){ this._billingStatementId = pbillingStatementId; }

		 get caseloadId(): string{ return  this._caseloadId; }

		 set caseloadId(pcaseloadId: string){ this._caseloadId = pcaseloadId; }

		 get billingCycleStartDate(): Date{ return  this._billingCycleStartDate; }

		 set billingCycleStartDate(pbillingCycleStartDate: Date){ this._billingCycleStartDate = pbillingCycleStartDate; }

		 get paymentsCreditsAmount(): number{ return  this._paymentsCreditsAmount; }

		 set paymentsCreditsAmount(ppaymentsCreditsAmount: number){ this._paymentsCreditsAmount = ppaymentsCreditsAmount; }

		 get endingBalanceAmount(): number{ return  this._endingBalanceAmount; }

		 set endingBalanceAmount(pendingBalanceAmount: number){ this._endingBalanceAmount = pendingBalanceAmount; }

		 get sealFlag(): string{ return  this._sealFlag; }

		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag; }


 	toJSON(): any {
 		return { 
			'casePlanId': this._casePlanId,
			'statementGenerateDatetime': this._statementGenerateDatetime,
			'billingCycleEndDate': this._billingCycleEndDate,
			'createUserId': this._createUserId,
			'statementGenerateUser': this._statementGenerateUser,
			'offenderBookId': this._offenderBookId,
			'modifyDatetime': this._modifyDatetime,
			'statementGenerateStaffId': this._statementGenerateStaffId,
			'modifyUserId': this._modifyUserId,
			'rootOffenderId': this._rootOffenderId,
			'beginingBalanceAmount': this._beginingBalanceAmount,
			'billingsAmount': this._billingsAmount,
			'createDatetime': this._createDatetime,
			'billingStatementId': this._billingStatementId,
			'caseloadId': this._caseloadId,
			'billingCycleStartDate': this._billingCycleStartDate,
			'paymentsCreditsAmount': this._paymentsCreditsAmount,
			'endingBalanceAmount': this._endingBalanceAmount,
			'sealFlag': this._sealFlag,
			'billId': this._billId,
			'billTxnNo': this._billTxnNo,
 			};
 		}  
 }