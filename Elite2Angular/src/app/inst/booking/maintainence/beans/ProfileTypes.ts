import { BaseModel } from '@commonbeans/BaseModel';	
export class ProfileTypes  extends BaseModel {
         private _profileType: string;
         private _profileCategory: string;
         private _activeFlag: string;
         private _codeValueType: string;
		 private _createDatetime: Date;
		 private _createUserId: string;
         private _description: string;
         private _code: string;
         private _expiryDate: Date;
		 private _listSeq: number;
		 private _mandatoryFlag: string;
         private _modifyDatetime: Date;
		 private _modifyUserId: string;
         private _sealFlag: string;
         private _updatedAllowedFlag: string;
         private _modifiedDate: Date;
         private _serialVersionUID: number;
         
         get profileType(): string{ return  this._profileType }

         set profileType(pprofileType: string){ this._profileType = pprofileType }

         get profileCategory(): string{ return  this._profileCategory }

		 set profileCategory(pprofileCategory: string){ this._profileCategory = pprofileCategory }
         
         get activeFlag(): string{ return  this._activeFlag }

         set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag }
         
         get codeValueType(): string{ return  this._codeValueType }

         set codeValueType(pcodeValueType: string){ this._codeValueType = pcodeValueType }
         
         get createDatetime(): Date{ return  this._createDatetime }

		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime }

		 get createUserId(): string{ return  this._createUserId }

		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId }

		 get description(): string{ return  this._description }

         set description(pdescription: string){ this._description = pdescription }

         get code(): string{ return  this._code }

         set code(pcode: string){ this._code = pcode }

         get expiryDate(): Date{ return  this._expiryDate }

         set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate }
         
         get listSeq(): number{ return  this._listSeq }

         set listSeq(plistSeq: number){ this._listSeq = plistSeq }
         
         get mandatoryFlag(): string{ return  this._mandatoryFlag }

         set mandatoryFlag(pmandatoryFlag: string){ this._mandatoryFlag = pmandatoryFlag }
         
		 get modifyDatetime(): Date{ return  this._modifyDatetime }

		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime }

		 get modifyUserId(): string{ return  this._modifyUserId }

		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId }

		 get sealFlag(): string{ return  this._sealFlag }

         set sealFlag(psealFlag: string){ this._sealFlag = psealFlag }
         
         get updatedAllowedFlag(): string{ return  this._updatedAllowedFlag }

         set updatedAllowedFlag(pupdatedAllowedFlag: string){ this._updatedAllowedFlag = pupdatedAllowedFlag }
         
         get modifiedDate(): Date{ return  this._modifiedDate }

		 set modifiedDate(pmodifiedDate: Date){ this._modifiedDate = pmodifiedDate }

		 get serialVersionUID(): number{ return  this._serialVersionUID }

		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID }



 	toJSON(): any {
 		return { 
            'profileType': this._profileType,
            'profileCategory': this._profileCategory,
            'activeFlag': this.activeFlag,
            'codeValueType': this.codeValueType,
            'createDatetime': this._createDatetime,
			'createUserId': this._createUserId,
            'description': this._description,
            'code': this.code,
            'expiryDate': this.expiryDate,
            'listSeq': this._listSeq,
            'mandatoryFlag': this.mandatoryFlag,
			'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'modifiedDate': this._modifiedDate,
			'sealFlag': this._sealFlag,
            'updatedAllowedFlag': this._updatedAllowedFlag,
 			};
 		}  
 }