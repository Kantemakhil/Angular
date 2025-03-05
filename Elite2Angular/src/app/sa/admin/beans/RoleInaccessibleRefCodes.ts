export class RoleInaccessibleRefCodes {
    private _createDatetime: Date;
		 private _serialVersionUID: number;
		 private _createUserId: string;
		 private _code: string;
		 private _modifyDatetime: Date;
		 private _roleId: number;
		 private _domain: string;
		 private _modifyUserId: string;
		 private _moduleName: string;
		 private _sealFlag: string;

		 get createDatetime(): Date{ return this._createDatetime; }
		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get createUserId(): string{ return this._createUserId; }
		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
		 get code(): string{ return this._code; }
		 set code(pcode: string){ this._code = pcode ;}
		 get modifyDatetime(): Date{ return this._modifyDatetime; }
		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
		 get roleId(): number{ return this._roleId; }
		 set roleId(proleId: number){ this._roleId = proleId ;}
		 get domain(): string{ return this._domain; }
		 set domain(pdomain: string){ this._domain = pdomain ;}
		 get modifyUserId(): string{ return this._modifyUserId; }
		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
		 get moduleName(): string{ return this._moduleName; }
		 set moduleName(pmoduleName: string){ this._moduleName = pmoduleName ;}
		 get sealFlag(): string{ return this._sealFlag; }
		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}

 	toJSON(): any {
 		return { 
			'createDatetime': this._createDatetime,
			'serialVersionUID': this._serialVersionUID,
			'createUserId': this._createUserId,
			'code': this._code,
			'modifyDatetime': this._modifyDatetime,
			'roleId': this._roleId,
			'domain': this._domain,
			'modifyUserId': this._modifyUserId,
			'moduleName': this._moduleName,
			'sealFlag': this._sealFlag,
 			};
 		} 
}