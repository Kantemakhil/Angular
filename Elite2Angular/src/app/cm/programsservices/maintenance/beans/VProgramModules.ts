
export class VProgramModules {

	private _programModuleId: number;
	private _listSeq: number;
	private _description: string;
	private _programPhaseId: number;
	private _noOfSessions: number;
	private _sessionLength: number;
	private _startFlag: string;
	private _activeFlag: string;
	private  _sealFlag : string;
  private  _seqOne:number;
	


	  get programModuleId(): number {
		return this._programModuleId;
	}
	  set programModuleId(value: number) {
		this._programModuleId = value;
	}

	  get listSeq(): number {
		return this._listSeq;
	}
	  set listSeq(value: number) {
		this._listSeq = value;
	}

	  get description(): string {
		return this._description;
	}
	  set description(value: string) {
		this._description = value;
	}

	  get programPhaseId(): number {
		return this._programPhaseId;
	}
	  set programPhaseId(value: number) {
		this._programPhaseId = value;
	}

	  get noOfSessions(): number {
		return this._noOfSessions;
	}
	  set noOfSessions(value: number) {
		this._noOfSessions = value;
	}

	  get sessionLength(): number {
		return this._sessionLength;
	}
	  set sessionLength(value: number) {
		this._sessionLength = value;
	}


	  get startFlag(): string {
		return this._startFlag;
	}
	  set startFlag(value: string) {
		this._startFlag = value;
	}

	  get activeFlag(): string {
		return this._activeFlag;
	}
	  set activeFlag(value: string) {
		this._activeFlag = value;
	}
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
			'programModuleId': this._programModuleId,
			'listSeq': this._listSeq,
			'description': this._description,
			'programPhaseId': this._programPhaseId,
			'noOfSessions': this._noOfSessions,
			'sessionLength':  this._sessionLength,
			'startFlag': this._startFlag,
			'activeFlag': this._activeFlag,
			'sealFlag':this._sealFlag,
			'seqOne':this._seqOne

		}
	}

}