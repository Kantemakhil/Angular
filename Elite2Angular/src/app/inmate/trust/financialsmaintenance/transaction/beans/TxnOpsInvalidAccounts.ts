	export class TxnOpsInvalidAccounts {
		 private _createDatetime: Date;
		 private _serialVersionUID: number;
		 private _createUserId: string;
		 private _modifyDate: Date;
		 private _modifyDatetime: Date;
		 private _modifyUserId: string;
		 private _moduleName: string;
		 private _listSeq: number;
		 private _txnType: string;
		 private _invalidAccountCode: number;
		 private _sealFlag: string;

		 get createDatetime(): Date{ return this._createDatetime; }
		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get createUserId(): string{ return this._createUserId; }
		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
		 get modifyDate(): Date{ return this._modifyDate; }
		 set modifyDate(pmodifyDate: Date){ this._modifyDate = pmodifyDate ;}
		 get modifyDatetime(): Date{ return this._modifyDatetime; }
		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
		 get modifyUserId(): string{ return this._modifyUserId; }
		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
		 get moduleName(): string{ return this._moduleName; }
		 set moduleName(pmoduleName: string){ this._moduleName = pmoduleName ;}
		 get listSeq(): number{ return this._listSeq; }
		 set listSeq(plistSeq: number){ this._listSeq = plistSeq ;}
		 get txnType(): string{ return this._txnType; }
		 set txnType(ptxnType: string){ this._txnType = ptxnType ;}
		 get invalidAccountCode(): number{ return this._invalidAccountCode; }
		 set invalidAccountCode(pinvalidAccountCode: number){ this._invalidAccountCode = pinvalidAccountCode ;}
		 get sealFlag(): string{ return this._sealFlag; }
		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}

 	toJSON(): any {
 		return { 
			'createDatetime': this._createDatetime,
			'serialVersionUID': this._serialVersionUID,
			'createUserId': this._createUserId,
			'modifyDate': this._modifyDate,
			'modifyDatetime': this._modifyDatetime,
			'modifyUserId': this._modifyUserId,
			'moduleName': this._moduleName,
			'listSeq': this._listSeq,
			'txnType': this._txnType,
			'invalidAccountCode': this._invalidAccountCode,
			'sealFlag': this._sealFlag,
 			};
 		}  
 }