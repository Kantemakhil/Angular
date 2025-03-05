import { BaseModel } from '@commonbeans/BaseModel';	
export class ProfileCategories  extends BaseModel {
		 private _profileCategoryData: string;
		 private _createDatetime: Date;
		 private _createUserId: string;
		 private _description: string;
		 private _listSeq: number;
		 private _modifyDatetime: Date;
		 private _modifyUserId: string;
		 private _recheckFlag: string;
		 private _sealFlag: string;
		 private _serialVersionUID: number;
		 private _profileCategory: string;

		 get profileCategoryData(): string{ return  this._profileCategoryData }

		 set profileCategoryData(pprofileCategoryData: string){ this._profileCategoryData = pprofileCategoryData }

		 get createUserId(): string{ return  this._createUserId }

		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId }

		 get createDatetime(): Date{ return  this._createDatetime }

		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime }

		 get description(): string{ return  this._description }

		 set description(pdescription: string){ this._description = pdescription }

		 get listSeq(): number{ return  this._listSeq }

		 set listSeq(plistSeq: number){ this._listSeq = plistSeq }

		 get modifyDatetime(): Date{ return  this._modifyDatetime }

		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime }

		 get modifyUserId(): string{ return  this._modifyUserId }

		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId }

		 get recheckFlag(): string{ return  this._recheckFlag }

		 set recheckFlag(precheckFlag: string){ this._recheckFlag = precheckFlag }

		 get sealFlag(): string{ return  this._sealFlag }

		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag }

		 get profileCategory(): string{ return  this._profileCategory }

		 set profileCategory(pprofileCategory: string){ this._profileCategory = pprofileCategory }

		 get serialVersionUID(): number{ return  this._serialVersionUID }

		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID }




 	toJSON(): any {
 		return { 
             'profileCategoryData': this._profileCategoryData,
             'createDatetime': this._createDatetime,
			'createUserId': this._createUserId,
			'description': this._description,
			'listSeq': this._listSeq,
			'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'recheckFlag': this._recheckFlag,
			'sealFlag': this._sealFlag,
			'profileCategory': this._profileCategory,
 			};
 		}  
 }