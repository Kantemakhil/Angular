	export class VBankChequeBeneficiaries {
		 private _txnEntryDesc: string;
		 private _chequeStatus: string;
		 private _chequeNumber: number;
		 private _corporateId: number;
		 private _txnEntryDate: Date;
		 private _chequeAmount: number;
		 private _serialVersionUID: number;
		 private _chequeTxnId: number;
		 private _txnEntryTime: Date;
		 private _chequePaidDate: Date;
		 private _personId: number;
		 private _createDate: Date;
		 private _txnPostUsage: string;

		 get txnEntryDesc(): string{ return  this._txnEntryDesc }

		 set txnEntryDesc(ptxnEntryDesc: string){ this._txnEntryDesc = ptxnEntryDesc }

		 get chequeStatus(): string{ return  this._chequeStatus }

		 set chequeStatus(pchequeStatus: string){ this._chequeStatus = pchequeStatus }

		 get chequeNumber(): number{ return  this._chequeNumber }

		 set chequeNumber(pchequeNumber: number){ this._chequeNumber = pchequeNumber }

		 get corporateId(): number{ return  this._corporateId }

		 set corporateId(pcorporateId: number){ this._corporateId = pcorporateId }

		 get txnEntryDate(): Date{ return  this._txnEntryDate }

		 set txnEntryDate(ptxnEntryDate: Date){ this._txnEntryDate = ptxnEntryDate }

		 get chequeAmount(): number{ return  this._chequeAmount }

		 set chequeAmount(pchequeAmount: number){ this._chequeAmount = pchequeAmount }

		 get serialVersionUID(): number{ return  this._serialVersionUID }

		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID }

		 get chequeTxnId(): number{ return  this._chequeTxnId }

		 set chequeTxnId(pchequeTxnId: number){ this._chequeTxnId = pchequeTxnId }

		 get txnEntryTime(): Date{ return  this._txnEntryTime }

		 set txnEntryTime(ptxnEntryTime: Date){ this._txnEntryTime = ptxnEntryTime }

		 get chequePaidDate(): Date{ return  this._chequePaidDate }

		 set chequePaidDate(pchequePaidDate: Date){ this._chequePaidDate = pchequePaidDate }

		 get personId(): number{ return  this._personId }

		 set personId(ppersonId: number){ this._personId = ppersonId }

		 get createDate(): Date{ return  this._createDate }

		 set createDate(pcreateDate: Date){ this._createDate = pcreateDate }

		 get txnPostUsage(): string{ return  this._txnPostUsage }

		 set txnPostUsage(ptxnPostUsage: string){ this._txnPostUsage = ptxnPostUsage }


 	toJSON(): any {
 		return { 
			'txnEntryDesc': this._txnEntryDesc,
			'chequeStatus': this._chequeStatus,
			'chequeNumber': this._chequeNumber,
			'corporateId': this._corporateId,
			'txnEntryDate': this._txnEntryDate,
			'chequeAmount': this._chequeAmount,
			'serialVersionUID': this._serialVersionUID,
			'chequeTxnId': this._chequeTxnId,
			'txnEntryTime': this._txnEntryTime,
			'chequePaidDate': this._chequePaidDate,
			'personId': this._personId,
			'createDate': this._createDate,
			'txnPostUsage': this._txnPostUsage,
 			};
 		}  
 }