import {BaseModel} from '@commonbeans/BaseModel';	
export class ReserveBedLocations extends BaseModel {
		 private _agyLocId: string;
		 private _commentText: string;
		 private _createDateTime: Date;
		 private _createUserId: string;
		 private _livingUnitId: number;
		 private _modifyDateTime: Date;
		 private _modifyUserId: string;
		 private _offenderId: number;
		 private _removeReason: string;
		 private _reserveBedId: number;
		 private _reserveUntilDate: Date;
		 private _sealFlag: string;
		 private _ocFlag: boolean;
		

		 get ocFlag(): boolean{ return  this._ocFlag }

		 set ocFlag(pocFlag: boolean){ this._ocFlag = pocFlag }


		 get agyLocId(): string{ return  this._agyLocId }

		 set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId }

		 get commentText(): string{ return  this._commentText }

		 set commentText(pcommentText: string){ this._commentText = pcommentText }

		 get createDateTime(): Date{ return  this._createDateTime }

		 set createDateTime(pcreateDateTime: Date){ this._createDateTime = pcreateDateTime }

		 get createUserId(): string{ return  this._createUserId }

		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId }

		 get livingUnitId(): number{ return  this._livingUnitId }

		 set livingUnitId(plivingUnitId: number){ this._livingUnitId = plivingUnitId }

		 get modifyDateTime(): Date{ return  this._modifyDateTime }

		 set modifyDateTime(pmodifyDateTime: Date){ this._modifyDateTime = pmodifyDateTime }

		 get modifyUserId(): string{ return  this._modifyUserId }

		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId }

		 get offenderId(): number{ return  this._offenderId }

		 set offenderId(poffenderId: number){ this._offenderId = poffenderId }

		 get removeReason(): string{ return  this._removeReason }

		 set removeReason(premoveReason: string){ this._removeReason = premoveReason }

		 get reserveBedId(): number{ return  this._reserveBedId }

		 set reserveBedId(preserveBedId: number){ this._reserveBedId = preserveBedId }

		 get reserveUntilDate(): Date{ return  this._reserveUntilDate }

		 set reserveUntilDate(preserveUntilDate: Date){ this._reserveUntilDate = preserveUntilDate }
		 
		 get sealFlag(): string { return this._sealFlag; }
		 
         set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }

		 
 	toJSON(): any {
 		return { 
			'agyLocId': this._agyLocId,
			'commentText': this._commentText,
			'createDateTime': this._createDateTime,
			'createUserId': this._createUserId,
			'livingUnitId': this._livingUnitId,
			'modifyDateTime': this._modifyDateTime,
			'modifyUserId': this._modifyUserId,
			'offenderId': this._offenderId,
			'removeReason': this._removeReason,
			'reserveBedId': this._reserveBedId,
			'reserveUntilDate': this._reserveUntilDate,
			'sealFlag': this._sealFlag,
			'ocFlag': this._ocFlag,
 			};
 		}  
 }