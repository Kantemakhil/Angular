import {BaseModel} from '@commonbeans/BaseModel'; 
	export class ReferenceDomains extends BaseModel {
		 private _createUserId: string;
		 private _codeLength: number;
		 private _ownerCode: string;
		 private _modifyDatetime: number;
		 private _modifyUserId: string;
		 private _description: string;
		 private _domainStatus: string;
		 private _oldCodeTable: string;
		 private _parentDomain: string;
		 private _createDatetime: number;
		 private _inserted: number;
		 private _applnCode: string;
		 private _superSetDomain: string;
		 private _domain: string;
		 private _sealFlag: string;

		 get createUserId(): string{ return  this._createUserId; }

		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId; }

		 get codeLength(): number{ return  this._codeLength; }

		 set codeLength(pcodeLength: number){ this._codeLength = pcodeLength; }

		 get ownerCode(): string{ return  this._ownerCode; }

		 set ownerCode(pownerCode: string){ this._ownerCode = pownerCode; }

		 get modifyDatetime(): number{ return  this._modifyDatetime; }

		 set modifyDatetime(pmodifyDatetime: number){ this._modifyDatetime = pmodifyDatetime; }

		 get modifyUserId(): string{ return  this._modifyUserId; }

		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId; }

		 get description(): string{ return  this._description; }

		 set description(pdescription: string){ this._description = pdescription; }

		 get domainStatus(): string{ return  this._domainStatus; }

		 set domainStatus(pdomainStatus: string){ this._domainStatus = pdomainStatus; }

		 get oldCodeTable(): string{ return  this._oldCodeTable; }

		 set oldCodeTable(poldCodeTable: string){ this._oldCodeTable = poldCodeTable; }

		 get parentDomain(): string{ return  this._parentDomain; }

		 set parentDomain(pparentDomain: string){ this._parentDomain = pparentDomain; }

		 get createDatetime(): number{ return  this._createDatetime; }

		 set createDatetime(pcreateDatetime: number){ this._createDatetime = pcreateDatetime; }

		 get inserted(): number{ return  this._inserted; }

		 set inserted(pinserted: number){ this._inserted = pinserted; }

		 get applnCode(): string{ return  this._applnCode; }

		 set applnCode(papplnCode: string){ this._applnCode = papplnCode; }

		 get superSetDomain(): string{ return  this._superSetDomain; }

		 set superSetDomain(psuperSetDomain: string){ this._superSetDomain = psuperSetDomain; }

		 get domain(): string{ return  this._domain; }

		 set domain(pdomain: string){ this._domain = pdomain; }

		 get sealFlag(): string{ return  this._sealFlag; }

		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag; }


 	toJSON(): any {
 		return { 
			'createUserId': this._createUserId,
			'codeLength': this._codeLength,
			'ownerCode': this._ownerCode,
			'modifyDatetime': this._modifyDatetime,
			'modifyUserId': this._modifyUserId,
			'description': this._description,
			'domainStatus': this._domainStatus,
			'oldCodeTable': this._oldCodeTable,
			'parentDomain': this._parentDomain,
			'createDatetime': this._createDatetime,
			'inserted': this._inserted,
			'applnCode': this._applnCode,
			'superSetDomain': this._superSetDomain,
			'domain': this._domain,
			'sealFlag': this._sealFlag,
 			};
 		}  
 }