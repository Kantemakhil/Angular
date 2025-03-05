	export class SystemEvents {
		 private _eventEndDate: Date;
		 private _createUserId: string;
		 private _modifyDate: Date;
		 private _systemEventId: number;
		 private _modifyDatetime: Date;
		 private _modifyUserId: string;
		 private _description: string;
		 private _eventType: string;
		 private _createDatetime: Date;
		 private _inserted: number;
		 private _eventSeq: number;
		 private _sealFlag: string;
		 private _eventDate: Date;

		 get eventEndDate(): Date{ return this._eventEndDate; }
		 set eventEndDate(peventEndDate: Date){ this._eventEndDate = peventEndDate ;}
		 get createUserId(): string{ return this._createUserId; }
		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
		 get modifyDate(): Date{ return this._modifyDate; }
		 set modifyDate(pmodifyDate: Date){ this._modifyDate = pmodifyDate ;}
		 get systemEventId(): number{ return this._systemEventId; }
		 set systemEventId(psystemEventId: number){ this._systemEventId = psystemEventId ;}
		 get modifyDatetime(): Date{ return this._modifyDatetime; }
		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
		 get modifyUserId(): string{ return this._modifyUserId; }
		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
		 get description(): string{ return this._description; }
		 set description(pdescription: string){ this._description = pdescription ;}
		 get eventType(): string{ return this._eventType; }
		 set eventType(peventType: string){ this._eventType = peventType ;}
		 get createDatetime(): Date{ return this._createDatetime; }
		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
		 get inserted(): number{ return this._inserted; }
		 set inserted(pinserted: number){ this._inserted = pinserted ;}
		 get eventSeq(): number{ return this._eventSeq; }
		 set eventSeq(peventSeq: number){ this._eventSeq = peventSeq ;}
		 get sealFlag(): string{ return this._sealFlag; }
		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
		 get eventDate(): Date{ return this._eventDate; }
		 set eventDate(peventDate: Date){ this._eventDate = peventDate ;}

 	toJSON(): any {
 		return { 
			'eventEndDate': this._eventEndDate,
			'createUserId': this._createUserId,
			'modifyDate': this._modifyDate,
			'systemEventId': this._systemEventId,
			'modifyDatetime': this._modifyDatetime,
			'modifyUserId': this._modifyUserId,
			'description': this._description,
			'eventType': this._eventType,
			'createDatetime': this._createDatetime,
			'inserted': this._inserted,
			'eventSeq': this._eventSeq,
			'sealFlag': this._sealFlag,
			'eventDate': this._eventDate,
 			};
 		}  
 }