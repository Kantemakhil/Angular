	
import { BaseModel } from '@commonbeans/BaseModel';

export class VisitorRestrictions extends BaseModel  {
		 private _createUserId: string;
		 private _modifyDatetime: Date;
		 private _commentTxt: string;
		 private _modifyUserId: string;
		 private _enteredStaffId: number;
		 private _visitRestrictionType: string;
		 private _expiryDate: Date;
		 private _createDatetime: Date;
		 private _visitorRestrictionId: number;
		 private _personId: number;
		 private _offenderId: number;
		 private _sealFlag: string;
		 private _effectiveDate: Date;
         private _description: string;

		 get createUserId(): string{ return this._createUserId; }
		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
		 get modifyDatetime(): Date{ return this._modifyDatetime; }
		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
		 get commentTxt(): string{ return this._commentTxt; }
		 set commentTxt(pcommentTxt: string){ this._commentTxt = pcommentTxt ;}
		 get modifyUserId(): string{ return this._modifyUserId; }
		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
		 get enteredStaffId(): number{ return this._enteredStaffId; }
		 set enteredStaffId(penteredStaffId: number){ this._enteredStaffId = penteredStaffId ;}
		 get visitRestrictionType(): string{ return this._visitRestrictionType; }
		 set visitRestrictionType(pvisitRestrictionType: string){ this._visitRestrictionType = pvisitRestrictionType ;}
		 get expiryDate(): Date{ return this._expiryDate; }
		 set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate ;}
		 get createDatetime(): Date{ return this._createDatetime; }
		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
		 get visitorRestrictionId(): number{ return this._visitorRestrictionId; }
		 set visitorRestrictionId(pvisitorRestrictionId: number){ this._visitorRestrictionId = pvisitorRestrictionId ;}
		 get personId(): number{ return this._personId; }
		 set personId(ppersonId: number){ this._personId = ppersonId ;}
		 get offenderId(): number{ return this._offenderId; }
		 set offenderId(poffenderId: number){ this._offenderId = poffenderId ;}
		 get sealFlag(): string{ return this._sealFlag; }
		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
		 get effectiveDate(): Date{ return this._effectiveDate; }
		 set effectiveDate(peffectiveDate: Date){ this._effectiveDate = peffectiveDate ;}
		 get description(): string{ return this._description; }
         set description(pdescription: string){ this._description = pdescription ;}

 	toJSON(): any {
 		return { 
			'createUserId': this._createUserId,
			'modifyDatetime': this._modifyDatetime,
			'commentTxt': this._commentTxt,
			'modifyUserId': this._modifyUserId,
			'enteredStaffId': this._enteredStaffId,
			'visitRestrictionType': this._visitRestrictionType,
			'expiryDate': this._expiryDate,
			'createDatetime': this._createDatetime,
			'visitorRestrictionId': this._visitorRestrictionId,
			'personId': this._personId,
			'offenderId': this._offenderId,
			'sealFlag': this._sealFlag,
			'effectiveDate': this._effectiveDate,
			'description': this._description,
 			};
 		}  
 }