	export class ProgramAssessments {
		 private _createDatetime: Date;
		 private _expiryDate: Date;
		 private _serialVersionUID: number;
		 private _createUserId: string;
		 private _modifyDatetime: Date;
		 private _modifyUserId: string;
		 private _sealFlag: string;
		 private _assessmentId: number;
		 private _programId: number;
		 private _activeFlag: string;
		 private _assessmentCode: string;

		 get createDatetime(): Date{ return  this._createDatetime; }

		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime; }

		 get expiryDate(): Date{ return  this._expiryDate; }

		 set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate; }

		 get serialVersionUID(): number{ return  this._serialVersionUID; }

		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID; }

		 get createUserId(): string{ return  this._createUserId; }

		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId; }

		 get modifyDatetime(): Date{ return  this._modifyDatetime; }

		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime; }

		 get modifyUserId(): string{ return  this._modifyUserId; }

		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId; }

		 get sealFlag(): string{ return  this._sealFlag; }

		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag; }

		 get assessmentId(): number{ return  this._assessmentId; }

		 set assessmentId(passessmentId: number){ this._assessmentId = passessmentId; }

		 get programId(): number{ return  this._programId; }

		 set programId(pprogramId: number){ this._programId = pprogramId; }

		 get activeFlag(): string{ return  this._activeFlag; }

		 set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag; }

		 get assessmentCode(): string{ return  this._assessmentCode; }

		 set assessmentCode(passessmentCode: string){ this._assessmentCode = passessmentCode; }


 	toJSON(): any {
 		return { 
			'createDatetime': this._createDatetime,
			'expiryDate': this._expiryDate,
			'serialVersionUID': this._serialVersionUID,
			'createUserId': this._createUserId,
			'modifyDatetime': this._modifyDatetime,
			'modifyUserId': this._modifyUserId,
			'sealFlag': this._sealFlag,
			'assessmentId': this._assessmentId,
			'programId': this._programId,
			'activeFlag': this._activeFlag,
			'assessmentCode' : this._assessmentCode,
 			};
 		}  
 }