	export class VSummaryCasePlans {
		 private _casePlanId: number;
		 private _programDesc: string;
		 private _serialVersionUID: number;
		 private _caseworkTypeDesc: string;
		 private _notes: string;
		 private _issue: string;
		 private _endDate: Date;
		 private _offenderBookId: number;
		 private _caseworkType: string;
		 private _type: string;
		 private _startDate: Date;

		 get casePlanId(): number{ return  this._casePlanId }

		 set casePlanId(pcasePlanId: number){ this._casePlanId = pcasePlanId }

		 get programDesc(): string{ return  this._programDesc }

		 set programDesc(pprogramDesc: string){ this._programDesc = pprogramDesc }

		 get serialVersionUID(): number{ return  this._serialVersionUID }

		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID }

		 get caseworkTypeDesc(): string{ return  this._caseworkTypeDesc }

		 set caseworkTypeDesc(pcaseworkTypeDesc: string){ this._caseworkTypeDesc = pcaseworkTypeDesc }

		 get notes(): string{ return  this._notes }

		 set notes(pnotes: string){ this._notes = pnotes }

		 get issue(): string{ return  this._issue }

		 set issue(pissue: string){ this._issue = pissue }

		 get endDate(): Date{ return  this._endDate }

		 set endDate(pendDate: Date){ this._endDate = pendDate }

		 get offenderBookId(): number{ return  this._offenderBookId }

		 set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId }

		 get caseworkType(): string{ return  this._caseworkType }

		 set caseworkType(pcaseworkType: string){ this._caseworkType = pcaseworkType }

		 get type(): string{ return  this._type }

		 set type(ptype: string){ this._type = ptype }

		 get startDate(): Date{ return  this._startDate }

		 set startDate(pstartDate: Date){ this._startDate = pstartDate }


 	toJSON(): any {
 		return { 
			'casePlanId': this._casePlanId,
			'programDesc': this._programDesc,
			'serialVersionUID': this._serialVersionUID,
			'caseworkTypeDesc': this._caseworkTypeDesc,
			'notes': this._notes,
			'issue': this._issue,
			'endDate': this._endDate,
			'offenderBookId': this._offenderBookId,
			'caseworkType': this._caseworkType,
			'type': this._type,
			'startDate': this._startDate,
 			};
 		}  
 }