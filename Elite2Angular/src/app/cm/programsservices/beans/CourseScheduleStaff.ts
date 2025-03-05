	export class CourseScheduleStaff {
		 private _createDatetime: number;
		 private _serialVersionUID: number;
		 private _createUserId: string;
		 private _staffRole: string;
		 private _modifyDatetime: number;
		 private _modifyUserId: string; 
		 private _sealFlag: string;
		 private _courseScheduleStaffId: number;
		 private _staffId: number;
		 private _crsSchId: number;

		 get createDatetime(): number{ return this._createDatetime; }
		 set createDatetime(pcreateDatetime: number){ this._createDatetime = pcreateDatetime ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get createUserId(): string{ return this._createUserId; }
		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
		 get staffRole(): string{ return this._staffRole; }
		 set staffRole(pstaffRole: string){ this._staffRole = pstaffRole ;}
		 get modifyDatetime(): number{ return this._modifyDatetime; }
		 set modifyDatetime(pmodifyDatetime: number){ this._modifyDatetime = pmodifyDatetime ;}
		 get modifyUserId(): string{ return this._modifyUserId; }
		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
		 get sealFlag(): string{ return this._sealFlag; }
		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
		 get courseScheduleStaffId(): number{ return this._courseScheduleStaffId; }
		 set courseScheduleStaffId(pcourseScheduleStaffId: number){ this._courseScheduleStaffId = pcourseScheduleStaffId ;}
		 get staffId(): number{ return this._staffId; }
		 set staffId(pstaffId: number){ this._staffId = pstaffId ;}

		 get crsSchId(): number { return this._crsSchId; }

    set crsSchId(pcrsSchId: number) { this._crsSchId = pcrsSchId; }

 	toJSON(): any {
 		return { 
			'createDatetime': this._createDatetime,
			'serialVersionUID': this._serialVersionUID,
			'createUserId': this._createUserId,
			'staffRole': this._staffRole,
			'modifyDatetime': this._modifyDatetime,
			'modifyUserId': this._modifyUserId,
			'sealFlag': this._sealFlag,
			'courseScheduleStaffId': this._courseScheduleStaffId,
			'staffId': this._staffId,
			'crsSchId': this._crsSchId,
 			};
 		}  
 }