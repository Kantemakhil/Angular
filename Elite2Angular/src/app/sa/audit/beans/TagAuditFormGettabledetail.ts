	export class TagAuditFormGettabledetail {
		 private _pTableName: string;
		 private _pTimeTo: Date;
		 private _pTimeFrom: Date;
		 private _pDateFrom: Date;
		 private _pDateTo: Date;
		 private _stamp: Date;
		private _sessionId: number;
		private _osUser: string;
		private _dbUser: string;
		private _clientip: string;
		private _staffName: string;

		 get pTableName(): string{ return this._pTableName; }
		 set pTableName(ppTableName: string){ this._pTableName = ppTableName ;}
		 get pTimeTo(): Date{ return this._pTimeTo; }
		 set pTimeTo(ppTimeTo: Date){ this._pTimeTo = ppTimeTo ;}
		 get pTimeFrom(): Date{ return this._pTimeFrom; }
		 set pTimeFrom(ppTimeFrom: Date){ this._pTimeFrom = ppTimeFrom ;}
		 get pDateFrom(): Date{ return this._pDateFrom; }
		 set pDateFrom(ppDateFrom: Date){ this._pDateFrom = ppDateFrom ;}
		 get pDateTo(): Date{ return this._pDateTo; }
		 set pDateTo(ppDateTo: Date){ this._pDateTo = ppDateTo ;}
		 get staffName(): string{ return this._staffName; }
		 set staffName(pstaffName: string){ this._staffName = pstaffName ;}

		 get stamp(): Date{ return this._stamp; }
set stamp(pstamp: Date){ this._stamp = pstamp ;}
get sessionId(): number{ return this._sessionId; }
set sessionId(psessionId: number){ this._sessionId = psessionId ;}
get osUser(): string{ return this._osUser; }
set osUser(posUser: string){ this._osUser = posUser ;}
get dbUser(): string{ return this._dbUser; }
set dbUser(pdbUser: string){ this._dbUser = pdbUser ;}
get clientip(): string{ return this._clientip; }
set clientip(pclientip: string){ this._clientip = pclientip ;}

 	toJSON(): any {
 		return { 
			'pTableName': this._pTableName,
			'pTimeTo': this._pTimeTo,
			'pTimeFrom': this._pTimeFrom,
			'pDateFrom': this._pDateFrom,
			'pDateTo': this._pDateTo,
			'clientip': this._clientip,
'dbUser': this._dbUser,
'osUser': this._osUser,
'sessionId': this._sessionId,
'stamp': this._stamp,
'staffName': this._staffName,
 		}  
 }
}
