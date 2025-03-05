	export class VAcpProgress {
		 private _profileCommentText: string;
		 private _serialVersionUID: number;
		 private _programClass: string;
		 private _programDescription: string;
		 private _programListSeq: number;
		 private _offPrgrefId: number;
		 private _profileCompletionDate: Date;
		 private _offenderPrgObligationId: number;
		 private _profileNeededFlag: string;
		 private _programId: number;

		 get profileCommentText(): string{ return  this._profileCommentText; }

		 set profileCommentText(pprofileCommentText: string){ this._profileCommentText = pprofileCommentText; }

		 get serialVersionUID(): number{ return  this._serialVersionUID; }

		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID; }

		 get programClass(): string{ return  this._programClass; }

		 set programClass(pprogramClass: string){ this._programClass = pprogramClass; }

		 get programDescription(): string{ return  this._programDescription; }

		 set programDescription(pprogramDescription: string){ this._programDescription = pprogramDescription; }

		 get programListSeq(): number{ return  this._programListSeq; }

		 set programListSeq(pprogramListSeq: number){ this._programListSeq = pprogramListSeq; }

		 get offPrgrefId(): number{ return  this._offPrgrefId; }

		 set offPrgrefId(poffPrgrefId: number){ this._offPrgrefId = poffPrgrefId; }

		 get profileCompletionDate(): Date{ return  this._profileCompletionDate; }

		 set profileCompletionDate(pprofileCompletionDate: Date){ this._profileCompletionDate = pprofileCompletionDate; }

		 get offenderPrgObligationId(): number{ return  this._offenderPrgObligationId; }

		 set offenderPrgObligationId(poffenderPrgObligationId: number){ this._offenderPrgObligationId = poffenderPrgObligationId; }

		 get profileNeededFlag(): string{ return  this._profileNeededFlag; }

		 set profileNeededFlag(pprofileNeededFlag: string){ this._profileNeededFlag = pprofileNeededFlag; }

		 get programId(): number{ return  this._programId; }

		 set programId(pprogramId: number){ this._programId = pprogramId; }


 	toJSON(): any {
 		return { 
			'profileCommentText': this._profileCommentText,
			'serialVersionUID': this._serialVersionUID,
			'programClass': this._programClass,
			'programDescription': this._programDescription,
			'programListSeq': this._programListSeq,
			'offPrgrefId': this._offPrgrefId,
			'profileCompletionDate': this._profileCompletionDate,
			'offenderPrgObligationId': this._offenderPrgObligationId,
			'profileNeededFlag': this._profileNeededFlag,
			'programId': this._programId,
 			};
 		}  
 }