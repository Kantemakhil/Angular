export class ModuleTabColumns {
    private _moduleTabId: number;
		 private _createUserId: string;
		 private _modifyDatetime: Date;
		 private _moduleTabSeq: number;
		 private _setupModule: string;
		 private _modifyUserId: string;
		 private _createDatetime: Date;
		 private _serialVersionUID: number;
		 private _lovItemName: string;
		 private _domain: string;
		 private _sealFlag: string;
		 private _columnName: string;
		 private _refTables: string;

		 get moduleTabId(): number{ return this._moduleTabId; }
		 set moduleTabId(pmoduleTabId: number){ this._moduleTabId = pmoduleTabId ;}
		 get createUserId(): string{ return this._createUserId; }
		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
		 get modifyDatetime(): Date{ return this._modifyDatetime; }
		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
		 get moduleTabSeq(): number{ return this._moduleTabSeq; }
		 set moduleTabSeq(pmoduleTabSeq: number){ this._moduleTabSeq = pmoduleTabSeq ;}
		 get setupModule(): string{ return this._setupModule; }
		 set setupModule(psetupModule: string){ this._setupModule = psetupModule ;}
		 get modifyUserId(): string{ return this._modifyUserId; }
		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
		 get createDatetime(): Date{ return this._createDatetime; }
		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get lovItemName(): string{ return this._lovItemName; }
		 set lovItemName(plovItemName: string){ this._lovItemName = plovItemName ;}
		 get domain(): string{ return this._domain; }
		 set domain(pdomain: string){ this._domain = pdomain ;}
		 get sealFlag(): string{ return this._sealFlag; }
		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
		 get columnName(): string{ return this._columnName; }
		 set columnName(pcolumnName: string){ this._columnName = pcolumnName ;}
		 get refTables(): string{ return this._refTables; }
		 set refTables(prefTables: string){ this._refTables = prefTables ;}

 	toJSON(): any {
 		return { 
			'moduleTabId': this._moduleTabId,
			'createUserId': this._createUserId,
			'modifyDatetime': this._modifyDatetime,
			'moduleTabSeq': this._moduleTabSeq,
			'setupModule': this._setupModule,
			'modifyUserId': this._modifyUserId,
			'createDatetime': this._createDatetime,
			'serialVersionUID': this._serialVersionUID,
			'lovItemName': this._lovItemName,
			'domain': this._domain,
			'sealFlag': this._sealFlag,
			'columnName': this._columnName,
			'refTables': this._refTables,
 			};
 		} 
}