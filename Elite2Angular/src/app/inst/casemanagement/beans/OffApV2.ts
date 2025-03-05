	export class OffApV2 {
		 private _programDesc: string;
		 private _caseworkTypeDesc: string;
		 private _offCaseCondId: number;
		 private _notes: string;
		 private _endDate: Date;
		 private _offActionPlanId: number;
		 private _prgCategoryDesc: string;
		 private _serialVersionUID: number;
		 private _programCategory: string;
		 private _caseworkType: string;
		 private _offCrimNeedId: number;
		 private _programId: number;
		 private _startDate: Date;

		 get programDesc(): string{ return  this._programDesc }

		 set programDesc(pprogramDesc: string){ this._programDesc = pprogramDesc }

		 get caseworkTypeDesc(): string{ return  this._caseworkTypeDesc }

		 set caseworkTypeDesc(pcaseworkTypeDesc: string){ this._caseworkTypeDesc = pcaseworkTypeDesc }

		 get offCaseCondId(): number{ return  this._offCaseCondId }

		 set offCaseCondId(poffCaseCondId: number){ this._offCaseCondId = poffCaseCondId }

		 get notes(): string{ return  this._notes }

		 set notes(pnotes: string){ this._notes = pnotes }

		 get endDate(): Date{ return  this._endDate }

		 set endDate(pendDate: Date){ this._endDate = pendDate }

		 get offActionPlanId(): number{ return  this._offActionPlanId }

		 set offActionPlanId(poffActionPlanId: number){ this._offActionPlanId = poffActionPlanId }

		 get prgCategoryDesc(): string{ return  this._prgCategoryDesc }

		 set prgCategoryDesc(pprgCategoryDesc: string){ this._prgCategoryDesc = pprgCategoryDesc }

		 get serialVersionUID(): number{ return  this._serialVersionUID }

		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID }

		 get programCategory(): string{ return  this._programCategory }

		 set programCategory(pprogramCategory: string){ this._programCategory = pprogramCategory }

		 get caseworkType(): string{ return  this._caseworkType }

		 set caseworkType(pcaseworkType: string){ this._caseworkType = pcaseworkType }

		 get offCrimNeedId(): number{ return  this._offCrimNeedId }

		 set offCrimNeedId(poffCrimNeedId: number){ this._offCrimNeedId = poffCrimNeedId }

		 get programId(): number{ return  this._programId }

		 set programId(pprogramId: number){ this._programId = pprogramId }

		 get startDate(): Date{ return  this._startDate }

		 set startDate(pstartDate: Date){ this._startDate = pstartDate }


 	toJSON(): any {
 		return { 
			'programDesc': this._programDesc,
			'caseworkTypeDesc': this._caseworkTypeDesc,
			'offCaseCondId': this._offCaseCondId,
			'notes': this._notes,
			'endDate': this._endDate,
			'offActionPlanId': this._offActionPlanId,
			'prgCategoryDesc': this._prgCategoryDesc,
			'serialVersionUID': this._serialVersionUID,
			'programCategory': this._programCategory,
			'caseworkType': this._caseworkType,
			'offCrimNeedId': this._offCrimNeedId,
			'programId': this._programId,
			'startDate': this._startDate,
 			};
 		}  
 }