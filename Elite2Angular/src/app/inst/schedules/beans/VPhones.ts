	
export class VPhones {
		 private _phoneType: String;
		 private _ownerCode: String;
		 private _extNo: String;
		 private _phoneId: number;
		 private _phoneArea: String;
		 private _ownerClass: String;
		 private _ownerId: number;
		 private _ownerSeq: number;
		 private _phoneNo: String;

		 get phoneType(): String{ return this._phoneType; }
		 set phoneType(pphoneType: String){ this._phoneType = pphoneType ;}
		 get ownerCode(): String{ return this._ownerCode; }
		 set ownerCode(pownerCode: String){ this._ownerCode = pownerCode ;}
		 get extNo(): String{ return this._extNo; }
		 set extNo(pextNo: String){ this._extNo = pextNo ;}
		 get phoneId(): number{ return this._phoneId; }
		 set phoneId(pphoneId: number){ this._phoneId = pphoneId ;}
		 get phoneArea(): String{ return this._phoneArea; }
		 set phoneArea(pphoneArea: String){ this._phoneArea = pphoneArea ;}
		 get ownerClass(): String{ return this._ownerClass; }
		 set ownerClass(pownerClass: String){ this._ownerClass = pownerClass ;}
		 get ownerId(): number{ return this._ownerId; }
		 set ownerId(pownerId: number){ this._ownerId = pownerId ;}
		 get ownerSeq(): number{ return this._ownerSeq; }
		 set ownerSeq(pownerSeq: number){ this._ownerSeq = pownerSeq ;}
		 get phoneNo(): String{ return this._phoneNo; }
		 set phoneNo(pphoneNo: String){ this._phoneNo = pphoneNo ;}

 	toJSON(): any {
 		return { 
			'phoneType': this._phoneType,
			'ownerCode': this._ownerCode,
			'extNo': this._extNo,
			'phoneId': this._phoneId,
			'phoneArea': this._phoneArea,
			'ownerClass': this._ownerClass,
			'ownerId': this._ownerId,
			'ownerSeq': this._ownerSeq,
			'phoneNo': this._phoneNo,
 			};
 		}  
 }