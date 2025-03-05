	export class VHistoricalBookings {
		 private _bookingNo: String;
		 private _outDate: Date;
		 private _offenderBookId: number;
		 private _inMovementType: String;
		 private _inDate: Date;
		 private _outMovementReasonCode: String;
		 private _rootOffenderId: number;
		 private _inMovementSeq: number;
		 private _inTime: Date;
		 private _outMovementSeq: number;
		 private _outMovementType: String;
		 private _agyLocId: String;
		 private _inMovementReasonCode: String;
		 private _outTime: Date;
		 private _locatoinDescription: String;
		 private _agyLocType: String;
		 private _admitIntakeComments: String;
		 private _releaseCloseComments: String;

		 get bookingNo(): String{ return this._bookingNo; }
		 set bookingNo(pbookingNo: String){ this._bookingNo = pbookingNo ;}
		 get outDate(): Date{ return this._outDate; }
		 set outDate(poutDate: Date){ this._outDate = poutDate ;}
		 get offenderBookId(): number{ return this._offenderBookId; }
		 set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
		 get inMovementType(): String{ return this._inMovementType; }
		 set inMovementType(pinMovementType: String){ this._inMovementType = pinMovementType ;}
		 get inDate(): Date{ return this._inDate; }
		 set inDate(pinDate: Date){ this._inDate = pinDate ;}
		 get outMovementReasonCode(): String{ return this._outMovementReasonCode; }
		 set outMovementReasonCode(poutMovementReasonCode: String){ this._outMovementReasonCode = poutMovementReasonCode ;}
		 get rootOffenderId(): number{ return this._rootOffenderId; }
		 set rootOffenderId(prootOffenderId: number){ this._rootOffenderId = prootOffenderId ;}
		 get inMovementSeq(): number{ return this._inMovementSeq; }
		 set inMovementSeq(pinMovementSeq: number){ this._inMovementSeq = pinMovementSeq ;}
		 get inTime(): Date{ return this._inTime; }
		 set inTime(pinTime: Date){ this._inTime = pinTime ;}
		 get outMovementSeq(): number{ return this._outMovementSeq; }
		 set outMovementSeq(poutMovementSeq: number){ this._outMovementSeq = poutMovementSeq ;}
		 get outMovementType(): String{ return this._outMovementType; }
		 set outMovementType(poutMovementType: String){ this._outMovementType = poutMovementType ;}
		 get agyLocId(): String{ return this._agyLocId; }
		 set agyLocId(pagyLocId: String){ this._agyLocId = pagyLocId ;}
		 get inMovementReasonCode(): String{ return this._inMovementReasonCode; }
		 set inMovementReasonCode(pinMovementReasonCode: String){ this._inMovementReasonCode = pinMovementReasonCode ;}
		 get outTime(): Date{ return this._outTime; }
		 set outTime(poutTime: Date){ this._outTime = poutTime ;}
		 get locatoinDescription(): String{ return this._locatoinDescription; }
		 set locatoinDescription(locatoinDescription: String){ this._locatoinDescription = locatoinDescription ;}
		 get agyLocType(): String{ return this._agyLocType; }
		 set agyLocType(agyLocType: String){ this._agyLocType = agyLocType ;}
		 get admitIntakeComments(): String{ return this._admitIntakeComments; }
		 set admitIntakeComments(admitIntakeComments: String){ this._admitIntakeComments = admitIntakeComments ;}
		 get releaseCloseComments(): String{ return this._releaseCloseComments; }
		 set releaseCloseComments(releaseCloseComments: String){ this._releaseCloseComments = releaseCloseComments ;}

 	toJSON(): any {
 		return { 
			'bookingNo': this._bookingNo,
			'outDate': this._outDate,
			'offenderBookId': this._offenderBookId,
			'inMovementType': this._inMovementType,
			'inDate': this._inDate,
			'outMovementReasonCode': this._outMovementReasonCode,
			'rootOffenderId': this._rootOffenderId,
			'inMovementSeq': this._inMovementSeq,
			'inTime': this._inTime,
			'outMovementSeq': this._outMovementSeq,
			'outMovementType': this._outMovementType,
			'agyLocId': this._agyLocId,
			'inMovementReasonCode': this._inMovementReasonCode,
			'outTime': this._outTime,
			'locatoinDescription': this._locatoinDescription,
			'agyLocType': this._agyLocType,
			'admitIntakeComments': this._admitIntakeComments,
			'releaseCloseComments': this._releaseCloseComments,
 			};
 		}  
 }