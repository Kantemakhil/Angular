	export class PersonIdentifiers {
		 private _createDatetime: Date;
		 private _identifier: string;
		 private _issuedDate: Date;
		 private _serialVersionUID: number;
		 private _createUserId: string;
		 private _issuedAuthorityText: string;
		 private _idSeq: number;
		 private _modifyDatetime: Date;
		 private _modifyUserId: string;
		 private _personId: number;
		 private _identifierType: string;
		 private _sealFlag: string;

		 get createDatetime(): Date{ return  this._createDatetime }

		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime }

		 get identifier(): string{ return  this._identifier }

		 set identifier(pidentifier: string){ this._identifier = pidentifier }

		 get issuedDate(): Date{ return  this._issuedDate }

		 set issuedDate(pissuedDate: Date){ this._issuedDate = pissuedDate }

		 get serialVersionUID(): number{ return  this._serialVersionUID }

		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID }

		 get createUserId(): string{ return  this._createUserId }

		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId }

		 get issuedAuthorityText(): string{ return  this._issuedAuthorityText }

		 set issuedAuthorityText(pissuedAuthorityText: string){ this._issuedAuthorityText = pissuedAuthorityText }

		 get idSeq(): number{ return  this._idSeq }

		 set idSeq(pidSeq: number){ this._idSeq = pidSeq }

		 get modifyDatetime(): Date{ return  this._modifyDatetime }

		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime }

		 get modifyUserId(): string{ return  this._modifyUserId }

		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId }

		 get personId(): number{ return  this._personId }

		 set personId(ppersonId: number){ this._personId = ppersonId }

		 get identifierType(): string{ return  this._identifierType }

		 set identifierType(pidentifierType: string){ this._identifierType = pidentifierType }

		 get sealFlag(): string{ return  this._sealFlag }

		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag }


 	toJSON(): any {
 		return { 
			'createDatetime': this._createDatetime,
			'identifier': this._identifier,
			'issuedDate': this._issuedDate,
			'serialVersionUID': this._serialVersionUID,
			'createUserId': this._createUserId,
			'issuedAuthorityText': this._issuedAuthorityText,
			'idSeq': this._idSeq,
			'modifyDatetime': this._modifyDatetime,
			'modifyUserId': this._modifyUserId,
			'personId': this._personId,
			'identifierType': this._identifierType,
			'sealFlag': this._sealFlag,
 			};
 		}  
 }