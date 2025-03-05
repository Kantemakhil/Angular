import { BaseModel } from "@common/beans/BaseModel";
export class PersonAddressV extends BaseModel {
		 private _cityDesc: string;
		 private _streetInformation: string;
		 private _streetNumber: string;
		 private _ownerCode: string;
		 private _cityCode: string;
		 private _stateDesc: string;
		 private _ownerClass: string;
		 private _ownerId: string;
		 private _primaryFlag: string;
		 private _ownerSeq: string;
		 private _addressId: number;
		 private _streetDirection: string;
		 private _mailCareOf: string;
		 private _countryDesc: string;
		 private _serialVersionUID: number;
		 private _zipPostalCode: string;
		 private _street: string;
		 private _countryCode: string;
		 private _personId: number;
		 private _suiteNumber: string;
		 private _provStateCode: string;
		 private _mailFlag: string;

		 get cityDesc(): string{ return this._cityDesc; }
		 set cityDesc(pcityDesc: string){ this._cityDesc = pcityDesc ;}
		 get streetInformation(): string{ return this._streetInformation; }
		 set streetInformation(pstreetInformation: string){ this._streetInformation = pstreetInformation ;}
		 get streetNumber(): string{ return this._streetNumber; }
		 set streetNumber(pstreetNumber: string){ this._streetNumber = pstreetNumber ;}
		 get ownerCode(): string{ return this._ownerCode; }
		 set ownerCode(pownerCode: string){ this._ownerCode = pownerCode ;}
		 get cityCode(): string{ return this._cityCode; }
		 set cityCode(pcityCode: string){ this._cityCode = pcityCode ;}
		 get stateDesc(): string{ return this._stateDesc; }
		 set stateDesc(pstateDesc: string){ this._stateDesc = pstateDesc ;}
		 get ownerClass(): string{ return this._ownerClass; }
		 set ownerClass(pownerClass: string){ this._ownerClass = pownerClass ;}
		 get ownerId(): string{ return this._ownerId; }
		 set ownerId(pownerId: string){ this._ownerId = pownerId ;}
		 get primaryFlag(): string{ return this._primaryFlag; }
		 set primaryFlag(pprimaryFlag: string){ this._primaryFlag = pprimaryFlag ;}
		 get ownerSeq(): string{ return this._ownerSeq; }
		 set ownerSeq(pownerSeq: string){ this._ownerSeq = pownerSeq ;}
		 get addressId(): number{ return this._addressId; }
		 set addressId(paddressId: number){ this._addressId = paddressId ;}
		 get streetDirection(): string{ return this._streetDirection; }
		 set streetDirection(pstreetDirection: string){ this._streetDirection = pstreetDirection ;}
		 get mailCareOf(): string{ return this._mailCareOf; }
		 set mailCareOf(pmailCareOf: string){ this._mailCareOf = pmailCareOf ;}
		 get countryDesc(): string{ return this._countryDesc; }
		 set countryDesc(pcountryDesc: string){ this._countryDesc = pcountryDesc ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get zipPostalCode(): string{ return this._zipPostalCode; }
		 set zipPostalCode(pzipPostalCode: string){ this._zipPostalCode = pzipPostalCode ;}
		 get street(): string{ return this._street; }
		 set street(pstreet: string){ this._street = pstreet ;}
		 get countryCode(): string{ return this._countryCode; }
		 set countryCode(pcountryCode: string){ this._countryCode = pcountryCode ;}
		 get personId(): number{ return this._personId; }
		 set personId(ppersonId: number){ this._personId = ppersonId ;}
		 get suiteNumber(): string{ return this._suiteNumber; }
		 set suiteNumber(psuiteNumber: string){ this._suiteNumber = psuiteNumber ;}
		 get provStateCode(): string{ return this._provStateCode; }
		 set provStateCode(pprovStateCode: string){ this._provStateCode = pprovStateCode ;}
		 get mailFlag(): string{ return this._mailFlag; }
		 set mailFlag(pmailFlag: string){ this._mailFlag = pmailFlag ;}

 	toJSON(): any {
 		return { 
			'cityDesc': this._cityDesc,
			'streetInformation': this._streetInformation,
			'streetNumber': this._streetNumber,
			'ownerCode': this._ownerCode,
			'cityCode': this._cityCode,
			'stateDesc': this._stateDesc,
			'ownerClass': this._ownerClass,
			'ownerId': this._ownerId,
			'primaryFlag': this._primaryFlag,
			'ownerSeq': this._ownerSeq,
			'addressId': this._addressId,
			'streetDirection': this._streetDirection,
			'mailCareOf': this._mailCareOf,
			'countryDesc': this._countryDesc,
			'serialVersionUID': this._serialVersionUID,
			'zipPostalCode': this._zipPostalCode,
			'street': this._street,
			'countryCode': this._countryCode,
			'personId': this._personId,
			'suiteNumber': this._suiteNumber,
			'provStateCode': this._provStateCode,
			'mailFlag': this._mailFlag,
 			};
 		}  
 }