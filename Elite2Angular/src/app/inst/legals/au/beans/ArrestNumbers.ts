	export class ArrestNumbers {
		 private _serialVersionUID: number;
		 private _createUserId: string;
		 private _modifyDatetime: Date;
		 private _arrestId: number;
		 private _arrestNumberType: string;
		 private _modifyUserId: string;
		 private _arrestNumberId: number;
		 private _arrestNumber: number;
		 private _commentText: string;
		 private _createDate: Date;

		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get createUserId(): string{ return this._createUserId; }
		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
		 get modifyDatetime(): Date{ return this._modifyDatetime; }
		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
		 get arrestId(): number{ return this._arrestId; }
		 set arrestId(parrestId: number){ this._arrestId = parrestId ;}
		 get arrestNumberType(): string{ return this._arrestNumberType; }
		 set arrestNumberType(parrestNumberType: string){ this._arrestNumberType = parrestNumberType ;}
		 get modifyUserId(): string{ return this._modifyUserId; }
		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
		 get arrestNumberId(): number{ return this._arrestNumberId; }
		 set arrestNumberId(parrestNumberId: number){ this._arrestNumberId = parrestNumberId ;}
		 get arrestNumber(): number{ return this._arrestNumber; }
		 set arrestNumber(parrestNumber: number){ this._arrestNumber = parrestNumber ;}
		 get commentText(): string{ return this._commentText; }
		 set commentText(pcommentText: string){ this._commentText = pcommentText ;}
		 get createDate(): Date{ return this._createDate; }
		 set createDate(pcreateDate: Date){ this._createDate = pcreateDate ;}

 	toJSON(): any {
 		return { 
			'serialVersionUID': this._serialVersionUID,
			'createUserId': this._createUserId,
			'modifyDatetime': this._modifyDatetime,
			'arrestId': this._arrestId,
			'arrestNumberType': this._arrestNumberType,
			'modifyUserId': this._modifyUserId,
			'arrestNumberId': this._arrestNumberId,
			'arrestNumber': this._arrestNumber,
			'commentText': this._commentText,
			'createDate': this._createDate,
 			};
 		} 
 }