import { BaseModel } from '@commonbeans/BaseModel';



export class IwpTemplateObjects extends BaseModel{
		 private _createDatetime: Date;
		 private _expiryDate: Date;	
		 private _serialVersionUID: number;
		 private _createUserId: string;
		 private _objectCode: string;
		 private _iwpTemplateObjectId: number;
		 private _modifyDatetime: Date;
		 private _modifyUserId: string;
		 private _listSeq: number;
		 private _sealFlag: string;
		 private _activeFlag: string;
		 private _objectType: string;
		 private _templateId: number;
		 private _templateName: string;

		 get createDatetime(): Date{ return  this._createDatetime }

		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime }

		 get expiryDate(): Date{ return  this._expiryDate }

		 set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate }

		 get serialVersionUID(): number{ return  this._serialVersionUID }

		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID }

		 get createUserId(): string{ return  this._createUserId }

		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId }

		 get objectCode(): string{ return  this._objectCode }

		 set objectCode(pobjectCode: string){ this._objectCode = pobjectCode }

		 get iwpTemplateObjectId(): number{ return  this._iwpTemplateObjectId }

		 set iwpTemplateObjectId(piwpTemplateObjectId: number){ this._iwpTemplateObjectId = piwpTemplateObjectId }

		 get modifyDatetime(): Date{ return  this._modifyDatetime }

		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime }

		 get modifyUserId(): string{ return  this._modifyUserId }

		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId }

		 get listSeq(): number{ return  this._listSeq }

		 set listSeq(plistSeq: number){ this._listSeq = plistSeq }

		 get sealFlag(): string{ return  this._sealFlag }

		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag }

		 get activeFlag(): string{ return  this._activeFlag }

		 set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag }

		 get objectType(): string{ return  this._objectType }

		 set objectType(pobjectType: string){ this._objectType = pobjectType }

		 get templateId(): number{ return  this._templateId }

		 set templateId(ptemplateId: number){ this._templateId = ptemplateId }

		 get templateName(): string{ return  this._templateName }

		 set templateName(ptemplateName: string){ this._templateName = ptemplateName }


 	toJSON(): any {
 		return { 
			'createDatetime': this._createDatetime,
			'expiryDate': this._expiryDate,
			'serialVersionUID': this._serialVersionUID,
			'createUserId': this._createUserId,
			'objectCode': this._objectCode,
			'iwpTemplateObjectId': this._iwpTemplateObjectId,
			'modifyDatetime': this._modifyDatetime,
			'modifyUserId': this._modifyUserId,
			'listSeq': this._listSeq,
			'sealFlag': this._sealFlag,
			'activeFlag': this._activeFlag,
			'objectType': this._objectType,
			'templateId': this._templateId,
			'templateName': this._templateName,
 			};
 		}  
 }