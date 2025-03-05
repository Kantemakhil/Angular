import {BaseModel} from '@commonbeans/BaseModel';
	export class ModulePrivileges extends BaseModel {
		 private _createDatetime: Date;
		 private _createUserId: string;
		 private _modifyDatetime: Date;
		 private _roleId: number;
		 private _modifyUserId: string;
		 private _moduleName: string;
		 private _accessPrivilege: string;
		 private _sealFlag: string;
		 private _verificationFlag: string;
	     private _moduleDescription: string;
	     private _moduleType: string;
	     private _button: string;
	

		 get createDatetime(): Date{ return  this._createDatetime; }
		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime; }
		 get createUserId(): string{ return  this._createUserId; }
		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId; }
		 get modifyDatetime(): Date{ return  this._modifyDatetime; }
		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime; }
		 get roleId(): number{ return  this._roleId; }
		 set roleId(proleId: number){ this._roleId = proleId; }
		 get modifyUserId(): string{ return  this._modifyUserId; }
		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId; }
		 get moduleName(): string{ return  this._moduleName; }
		 set moduleName(pmoduleName: string){ this._moduleName = pmoduleName; }
		 get accessPrivilege(): string{ return  this._accessPrivilege; }
		 set accessPrivilege(paccessPrivilege: string){ this._accessPrivilege = paccessPrivilege; }
		 get sealFlag(): string{ return  this._sealFlag; }
		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag; }
		 get verificationFlag(): string{ return  this._verificationFlag; }
		 set verificationFlag(pverificationFlag: string){ this._verificationFlag = pverificationFlag; }
		 get moduleDescription(): string{ return  this._moduleDescription; }
         set moduleDescription(pmoduleDescription: string){ this._moduleDescription = pmoduleDescription; }
         get moduleType(): string{ return  this._moduleType; }
         set moduleType(pmoduleType: string){ this._moduleType = pmoduleType; }
         get button(): string{ return  this._button; }
         set button(pbutton: string){ this._button = pbutton; }
         
 	toJSON(): any {
 		return { 
			'createDatetime': this._createDatetime,
			'createUserId': this._createUserId,
			'modifyDatetime': this._modifyDatetime,
			'roleId': this._roleId,
			'modifyUserId': this._modifyUserId,
			'moduleName': this._moduleName,
			'accessPrivilege': this._accessPrivilege,
			'sealFlag': this._sealFlag,
			'verificationFlag': this._verificationFlag,
			'moduleDescription': this._moduleDescription,
			'moduleType': this._moduleType,
			'button': this._button,
 			};
 		}  
 }