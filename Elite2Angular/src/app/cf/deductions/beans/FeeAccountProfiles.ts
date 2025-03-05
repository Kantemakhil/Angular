export class FeeAccountProfiles {
	private _amount: number;
	private _code: string;
	private _offenderFeeId: number;
	private _offenderFeeIdTemp: number;
	private _statusEffectiveDate: Date;
	private _expiryDate: Date;
	private _dayOfMonth: number;
	private _feeCode: string;
	private _location: string;
	private _odp: number;
	private _frequency: string;
	private _startDate: Date;
	private _effectiveDate: Date;
	private _feeActStatus: string;
	private _modifyDatetime: Date;
	private _modifyUserId: string;
	private _createDatetime: Date;
	private _createUserId: string;
	private _offenderBookId: number;
	private _longestSupvExpDate: Date;
	private _infoNumber: string;
	private _serviceDate: Date;
	private _comments: string;
	private _supervisionPeriod: string;
	private _caseloadId: string;
	private _backBill: string;
	private _supvPeriodDate: Date;
	private _nbtCode: string;
    private _nbtFrequency: string;
	private _foAlAllOffenderFlag: string;
	private _frequencyCode:string;
	private _frequencyType:string;
	private _commentText:string;
	private _nonBillableStatus:string;
	private _insertUpdateString: string;
	private _recordDatetime: Date;
	private _caseloadUpdateAllowFlag: string;
	private _feeActStatusDesc: string;
	private _userId: string;
	private _modeOfTrans: string;
	private _amountString: string;
	private _isTriggerEnable: string;
	private _isInsertEnable: string;
	private _currentBalance: string;
	get isTriggerEnable(): string { return this._isTriggerEnable; }
	set isTriggerEnable(value: string) {	this._isTriggerEnable = value; }
	private _rootOffenderId: number;
	
	
	get amountString(): string { return this._amountString; }
    set amountString(pamountString: string) { this._amountString = pamountString; }

	get frequencyCode(): string { return this._frequencyCode; }
    set frequencyCode(pfrequencyCode: string) { this._frequencyCode = pfrequencyCode; }
	get frequencyType(): string { return this._frequencyType; }
    set frequencyType(pfrequencyType: string) { this._frequencyType = pfrequencyType; }

    get nbtCode(): string { return this._nbtCode; }
    set nbtCode(pnbtCode: string) { this._nbtCode = pnbtCode; }

    get nbtFrequency(): string { return this._nbtFrequency; }
    set nbtFrequency(pnbtFrequency: string) { this._nbtFrequency = pnbtFrequency; }

	get createDatetime(): Date {return this._createDatetime;}
	set createDatetime(pcreateDatetime: Date) {this._createDatetime = pcreateDatetime;}
	get createUserId(): string {return this._createUserId;}
	set createUserId(pcreateUserId: string) {this._createUserId = pcreateUserId;}
	get modifyDatetime(): Date {	return this._modifyDatetime;}
	set modifyDatetime(pmodifyDatetime: Date) {this._modifyDatetime = pmodifyDatetime;}
	get modifyUserId(): string {return this._modifyUserId;}
	set modifyUserId(pmodifyUserId: string) {this._modifyUserId = pmodifyUserId;}
	get amount(): number { return this._amount; }
	set amount(pamount: number) { this._amount = pamount ; }
	get code(): string { return this._code; }
	set code(pcode: string) { this._code = pcode ; }
	get offenderFeeId(): number { return this._offenderFeeId; }
	set offenderFeeId(poffenderFeeId: number) { this._offenderFeeId = poffenderFeeId ; }
	get statusEffectiveDate(): Date { return this._statusEffectiveDate; }
	set statusEffectiveDate(pstatusEffectiveDate: Date) { this._statusEffectiveDate = pstatusEffectiveDate ; }
	get expiryDate(): Date { return this._expiryDate; }
	set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate ; }
	get dayOfMonth(): number { return this._dayOfMonth; }
	set dayOfMonth(pdayOfMonth: number) { this._dayOfMonth = pdayOfMonth ; }
	get feeCode(): string { return this._feeCode; }
	set feeCode(pfeeCode: string) { this._feeCode = pfeeCode ; }
	get location(): string { return this._location; }
	set location(plocation: string) { this._location = plocation ; }
	get odp(): number { return this._odp; }
	set odp(podp: number) { this._odp = podp ; }
	get startDate(): Date { return this._startDate; }
	set startDate(pstartDate: Date) { this._startDate = pstartDate ; }
	get effectiveDate(): Date { return this._effectiveDate; }
	set effectiveDate(peffectiveDate: Date) { this._effectiveDate = peffectiveDate ; }
	get feeActStatus(): string { return this._feeActStatus; }
	set feeActStatus(pfeeActStatus: string) { this._feeActStatus = pfeeActStatus ; }
	public get frequency(): string {return this._frequency; }
	public set frequency(value: string) {this._frequency = value; }
	get offenderBookId(): number { return this._offenderBookId; }

	set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

	get longestSupvExpDate(): Date { return this._longestSupvExpDate; }
	set longestSupvExpDate(plongestSupvExpDate: Date) { this._longestSupvExpDate = plongestSupvExpDate ; }

	get infoNumber(): string { return this._infoNumber; }
	set infoNumber(pinfoNumber: string) { this._infoNumber = pinfoNumber ; }


	get serviceDate(): Date {return this._serviceDate;}
	set serviceDate(pserviceDate: Date) {this._serviceDate = pserviceDate;}
	get comments(): string {return this._comments; }
	set comments(pcomments: string) {this._comments = pcomments;}
	get supervisionPeriod(): string { return this._supervisionPeriod; }
	set supervisionPeriod(psupervisionPeriod: string) { this._supervisionPeriod = psupervisionPeriod ; }
	get caseloadId(): string {return this._caseloadId; }
	set caseloadId(pcaseloadId: string) {this._caseloadId = pcaseloadId;}
	get backBill(): string {return this._backBill; }
	set backBill(pbackBill: string) {this._backBill = pbackBill;}
	get supvPeriodDate(): Date {return this._supvPeriodDate;}
	set supvPeriodDate(psupvPeriodDate: Date) {this._supvPeriodDate = psupvPeriodDate;}

	get foAlAllOffenderFlag(): string { return this._foAlAllOffenderFlag; }
    set foAlAllOffenderFlag(pfoAlAllOffenderFlag: string) { this._foAlAllOffenderFlag = pfoAlAllOffenderFlag; }


	get commentText(): string { return this._commentText; }
    set commentText(pcommentText: string) { this._commentText = pcommentText; }


	get nonBillableStatus(): string { return this._nonBillableStatus; }
    set nonBillableStatus(pnonBillableStatus: string) { this._nonBillableStatus = pnonBillableStatus; }

	get insertUpdateString(): string { return this._insertUpdateString; }
    set insertUpdateString(pinsertUpdateString: string) { this._insertUpdateString = pinsertUpdateString; }

	get recordDatetime(): Date {return this._recordDatetime;}
	set recordDatetime(precordDatetime: Date) {this._recordDatetime = precordDatetime;}

	get offenderFeeIdTemp(): number { return this._offenderFeeIdTemp; }
	set offenderFeeIdTemp(poffenderFeeIdTemp: number) { this._offenderFeeIdTemp = poffenderFeeIdTemp ; }


	get caseloadUpdateAllowFlag(): string { return this._caseloadUpdateAllowFlag; }
    set caseloadUpdateAllowFlag(pcaseloadUpdateAllowFlag: string) { this._caseloadUpdateAllowFlag = pcaseloadUpdateAllowFlag; }

	get feeActStatusDesc(): string { return this._feeActStatusDesc; }
    set feeActStatusDesc(pfeeActStatusDesc: string) { this._feeActStatusDesc = pfeeActStatusDesc; }

	get userId(): string { return this._userId; }
	set userId(puserId: string) { this._userId = puserId ; }

	get modeOfTrans(): string { return this._modeOfTrans; }
    set modeOfTrans(pmodeOfTrans: string) { this._modeOfTrans = pmodeOfTrans; }

	get isInsertEnable(): string { return this._isInsertEnable; }
	set isInsertEnable(value: string) {	this._isInsertEnable = value; }

	get currentBalance(): string { return this._currentBalance; }
	set currentBalance(pcurrentBalance: string) { this._currentBalance = pcurrentBalance ; }

	get rootOffenderId(): number { return this._rootOffenderId; }

    set rootOffenderId( prootOffenderId: number ) { this._rootOffenderId = prootOffenderId; }

		 toJSON(): any {
			 return {
				'amount': this._amount,
				'code': this._code,
				'offenderFeeId': this._offenderFeeId,
				'statusEffectiveDate': this._statusEffectiveDate,
				'expiryDate': this._expiryDate,
				'dayOfMonth': this._dayOfMonth,
				'feeCode': this._feeCode,
				'location': this._location,
				'odp': this._odp,
				'startDate': this._startDate,
				'effectiveDate': this._effectiveDate,
				'feeActStatus': this._feeActStatus,
				'frequency': this._frequency,
				'createDatetime': this._createDatetime,
				'createUserId': this._createUserId,
				'modifyDatetime': this._modifyDatetime,
				'modifyUserId': this._modifyUserId,
				'offenderBookId': this._offenderBookId,
				'longestSupvExpDate': this._longestSupvExpDate,
				'infoNumber': this._infoNumber,
				'serviceDate': this._serviceDate,
				'comments': this._comments,
				'supervisionPeriod': this._supervisionPeriod,
				'backBill': this._backBill,
				'caseloadId': this._caseloadId,
				'supvPeriodDate': this._supvPeriodDate,
				'nbtCode': this._nbtCode,
            	'nbtFrequency': this._nbtFrequency,
				'foAlAllOffenderFlag': this.foAlAllOffenderFlag,
				'frequencyType':this._frequencyType,
				'frequencyCode':this._frequencyCode,
				'commentText': this._commentText,
				'nonBillableStatus':this._nonBillableStatus,
				'insertUpdateString': this._insertUpdateString,
				'recordDatetime': this._recordDatetime,
				'offenderFeeIdTemp': this._offenderFeeIdTemp,
				'feeActStatusDesc': this._feeActStatusDesc,
				'userId':this._userId,
				'modeOfTrans': this._modeOfTrans,
				'amountString': this._amountString,
				'isTriggerEnable': this._isTriggerEnable,
				'isInsertEnable': this._isInsertEnable,
				'currentBalance': this._currentBalance,
				'rootOffenderId': this._rootOffenderId,
				 };
			 }  
	}
