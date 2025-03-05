	export class VProgramPhases {
		 private _phaseTypeDesc: string;
		 private _moduleFlag: string;
		 private _moduleType: string;
		 private _description: string;
		 private _commentText: string;
		 private _phaseType: string;
		 private _capacity: number;
		 private _expiryDate: Date;
		 private _moduleTypeDesc: string;
		 private _serialVersionUID: number;
		 private _noOfSessions: number;
		 private _breakAllowedFlag: string;
		 private _programPhaseId: number;
		 private _listSeq: number;
		 private _sessionLength: number;
		 private _programId: number;
		 private _activeFlag: string;
		 private _nbtSessionLength: string;
		 private _programCode: string;
	     private  _sealFlag : string;
         private  _seqOne:number;
		 private _listSeqTemp: number;
		 private _nbtDescription: string;
		
     
		 get phaseTypeDesc(): string{ return this._phaseTypeDesc; }
		 set phaseTypeDesc(pphaseTypeDesc: string){ this._phaseTypeDesc = pphaseTypeDesc ;}
		 get moduleFlag(): string{ return this._moduleFlag; }
		 set moduleFlag(pmoduleFlag: string){ this._moduleFlag = pmoduleFlag ;}
		 get moduleType(): string{ return this._moduleType; }
		 set moduleType(pmoduleType: string){ this._moduleType = pmoduleType ;}
		 get description(): string{ return this._description; }
		 set description(pdescription: string){ this._description = pdescription ;}
		 get commentText(): string{ return this._commentText; }
		 set commentText(pcommentText: string){ this._commentText = pcommentText ;}
		 get phaseType(): string{ return this._phaseType; }
		 set phaseType(pphaseType: string){ this._phaseType = pphaseType ;}
		 get capacity(): number{ return this._capacity; }
		 set capacity(pcapacity: number){ this._capacity = pcapacity ;}
		 get expiryDate(): Date{ return this._expiryDate; }
		 set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate ;}
		 get moduleTypeDesc(): string{ return this._moduleTypeDesc; }
		 set moduleTypeDesc(pmoduleTypeDesc: string){ this._moduleTypeDesc = pmoduleTypeDesc ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get noOfSessions(): number{ return this._noOfSessions; }
		 set noOfSessions(pnoOfSessions: number){ this._noOfSessions = pnoOfSessions ;}
		 get breakAllowedFlag(): string{ return this._breakAllowedFlag; }
		 set breakAllowedFlag(pbreakAllowedFlag: string){ this._breakAllowedFlag = pbreakAllowedFlag ;}
		 get programPhaseId(): number{ return this._programPhaseId; }
		 set programPhaseId(pprogramPhaseId: number){ this._programPhaseId = pprogramPhaseId ;}
		 get listSeq(): number{ return this._listSeq; }
		 set listSeq(plistSeq: number){ this._listSeq = plistSeq ;}
		 get listSeqTemp(): number{ return this._listSeqTemp; }
		 set listSeqTemp(plistSeq: number){ this._listSeqTemp = plistSeq ;}
		 get sessionLength(): number{ return this._sessionLength; }
		 set sessionLength(psessionLength: number){ this._sessionLength = psessionLength ;}
		 get programId(): number{ return this._programId; }
		 set programId(pprogramId: number){ this._programId = pprogramId ;}
		 get activeFlag(): string{ return this._activeFlag; }
		 set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}
		 get nbtSessionLength(): string{ return this._nbtSessionLength; }
		 set nbtSessionLength(pnbtSessionLength: string){ this._nbtSessionLength = pnbtSessionLength ;}
		 get programCode(): string{ return this._programCode; }
		 set programCode(pprogramCode: string){ this._programCode = pprogramCode ;}

		 get nbtDescription(): string{ return this._nbtDescription; }
		 set nbtDescription(pdescription: string){ this._nbtDescription = pdescription ;}

		 
	
	  get seqOne(): number {
		return this._seqOne;
	}
	  set seqOne(value: number) {
		this._seqOne = value;
	}
	  get sealFlag (): string {
		return this._sealFlag ;
	}
	  set sealFlag (value: string) {
		this._sealFlag  = value;
	}

 	toJSON(): any {
 		return { 
			'phaseTypeDesc': this._phaseTypeDesc,
			'moduleFlag': this._moduleFlag,
			'moduleType': this._moduleType,
			'description': this._description,
			'commentText': this._commentText,
			'phaseType': this._phaseType,
			'capacity': this._capacity,
			'expiryDate': this._expiryDate,
			'moduleTypeDesc': this._moduleTypeDesc,
			'serialVersionUID': this._serialVersionUID,
			'noOfSessions': this._noOfSessions,
			'breakAllowedFlag': this._breakAllowedFlag,
			'programPhaseId': this._programPhaseId,
			'listSeq': this._listSeq,
			'sessionLength': this._sessionLength,
			'programId': this._programId,
			'activeFlag': this._activeFlag,
			'nbtSessionLength': this._nbtSessionLength,
			'programCode': this._programCode,
			'sealFlag':this._sealFlag,
			'seqOne':this._seqOne,
		    'nbtDescription':this._nbtDescription,

 			};
 		}  
 }