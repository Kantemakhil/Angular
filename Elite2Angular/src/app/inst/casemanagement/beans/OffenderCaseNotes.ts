export class OffenderCaseNotes {
    private _caseNoteId: number;
    private _dateCreation: Date;
    private _createUserId: string;
    private _iwpFlag: string;
    private _offenderBookId: number;
    private _modifyDatetime: Date;
    private _contactDate: Date;
    private _checkBox4: string;
    private _modifyUserId: string;
    private _checkBox3: string;
    private _checkBox5: string;
    private _objectType: string;
    private _checkBox2: string;
    private _checkBox1: string;
    private _noteSourceCode: string;
    private _sealFlag: string;
    private _objectId: number;
    private _eventId: number;
    private _timeCreation: Date;
    private _contactTime: Date;
    private _amendmentFlag: string;
    private _caseNoteType: string;
    private _createDatetime: Date;
    private _caseNoteSubType: string;
    private _staffId: number;
    private _caseNoteText: string;
    private _dButton: string;
    private _goButton: string;
    private _rButton: string;
    private _aButton: string;
    private _staffName: string;
    private _staffIdTemp: string;
    private _fromDate: Date;
    private _toDate: Date;
    private _amendNotecaseNoteText: string;
    private _moduleName: string;
    private _pObjectType: string;
    private _pModuleName: string;
    private _butIwp: string;
    private _pNbtNoteSourceCodeDesc: string;
    private _pNbtCaseNoteSubTypeDesc: string;
    private _pNbtStaffNameDesc: string;
    private _lastName: string;
    private _offenderIdDisplay: number;
    private _facility: string;

    public get facility(): string {
        return this._facility;
    }
    public set facility(value: string) {
        this._facility = value;
    }

    public get offenderIdDisplay(): number {
        return this._offenderIdDisplay;
    }
    public set offenderIdDisplay(value: number) {
        this._offenderIdDisplay = value;
    }

    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(value: string) {
        this._lastName = value;
    }
    
    private _firstName: string;
    public get firstName(): string {
        return this._firstName;
    }
    public set firstName(value: string) {
        this._firstName = value;
    }
    

    private _navEoffender:string;
    private _SCREEN:string;
    private _lvRoleCode:string;

	private _code: number;
	private _description: string;
    private _caseLoadType: string;
   
	
    private _caseNoteTextTemp: string;

    public set description(description: string) {
        this._description = description;
    }
    public get description(): string {
        return this._description;
    }
	
    public set code(code: number) {
        this._code = code;
    }
    public get code(): number {
        return this._code;
    }



    get lvRoleCode(): string { return this._lvRoleCode; }
    set lvRoleCode(lvRoleCode: string) { this._lvRoleCode = lvRoleCode; }
    get SCREEN(): string { return this._SCREEN; }
    set SCREEN(ppModuleName: string) { this._SCREEN = ppModuleName; }
    get navEoffender(): string { return this._navEoffender; }
    set navEoffender(ppModuleName: string) { this._navEoffender = ppModuleName; }
    get pModuleName(): string { return this._pModuleName; }
    set pModuleName(ppModuleName: string) { this._pModuleName = ppModuleName; }
    get pObjectType(): string { return this._pObjectType; }
    set pObjectType(ppObjectType: string) { this._pObjectType = ppObjectType; }
    get moduleName(): string { return this._moduleName; }
    set moduleName(pmoduleName: string) { this._moduleName = pmoduleName; }
    get amendNotecaseNoteText(): string { return this._amendNotecaseNoteText; }
    set amendNotecaseNoteText(pamendNotecaseNoteText: string) { this._amendNotecaseNoteText = pamendNotecaseNoteText; }
    get caseNoteId(): number { return this._caseNoteId; }
    set caseNoteId(pcaseNoteId: number) { this._caseNoteId = pcaseNoteId; }
    get dateCreation(): Date { return this._dateCreation; }
    set dateCreation(pdateCreation: Date) { this._dateCreation = pdateCreation; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get iwpFlag(): string { return this._iwpFlag; }
    set iwpFlag(piwpFlag: string) { this._iwpFlag = piwpFlag; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get contactDate(): Date { return this._contactDate; }
    set contactDate(pcontactDate: Date) { this._contactDate = pcontactDate; }
    get checkBox4(): string { return this._checkBox4; }
    set checkBox4(pcheckBox4: string) { this._checkBox4 = pcheckBox4; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get checkBox3(): string { return this._checkBox3; }
    set checkBox3(pcheckBox3: string) { this._checkBox3 = pcheckBox3; }
    get checkBox5(): string { return this._checkBox5; }
    set checkBox5(pcheckBox5: string) { this._checkBox5 = pcheckBox5; }
    get objectType(): string { return this._objectType; }
    set objectType(pobjectType: string) { this._objectType = pobjectType; }
    get checkBox2(): string { return this._checkBox2; }
    set checkBox2(pcheckBox2: string) { this._checkBox2 = pcheckBox2; }
    get checkBox1(): string { return this._checkBox1; }
    set checkBox1(pcheckBox1: string) { this._checkBox1 = pcheckBox1; }
    get noteSourceCode(): string { return this._noteSourceCode; }
    set noteSourceCode(pnoteSourceCode: string) { this._noteSourceCode = pnoteSourceCode; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get objectId(): number { return this._objectId; }
    set objectId(pobjectId: number) { this._objectId = pobjectId; }
    get eventId(): number { return this._eventId; }
    set eventId(peventId: number) { this._eventId = peventId; }
    get timeCreation(): Date { return this._timeCreation; }
    set timeCreation(ptimeCreation: Date) { this._timeCreation = ptimeCreation; }
    get contactTime(): Date { return this._contactTime; }
    set contactTime(pcontactTime: Date) { this._contactTime = pcontactTime; }
    get amendmentFlag(): string { return this._amendmentFlag; }
    set amendmentFlag(pamendmentFlag: string) { this._amendmentFlag = pamendmentFlag; }
    get caseNoteType(): string { return this._caseNoteType; }
    set caseNoteType(pcaseNoteType: string) { this._caseNoteType = pcaseNoteType; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get caseNoteSubType(): string { return this._caseNoteSubType; }
    set caseNoteSubType(pcaseNoteSubType: string) { this._caseNoteSubType = pcaseNoteSubType; }
    get staffId(): number { return this._staffId; }
    set staffId(pstaffId: number) { this._staffId = pstaffId; }
    get caseNoteText(): string { return this._caseNoteText; }
    set caseNoteText(pcaseNoteText: string) { this._caseNoteText = pcaseNoteText; }
    get dButton(): string { return this._dButton; }
    set dButton(pdButton: string) { this._goButton = pdButton; }
    get goButton(): string { return this._dButton; }
    set goButton(pgoButton: string) { this._goButton = pgoButton; }
    get rButton(): string { return this._rButton; }
    set rButton(prButton: string) { this._rButton = prButton; }
    get aButton(): string { return this._aButton; }
    set aButton(paButton: string) { this._aButton = paButton; }
    get staffName(): string { return this._staffName; }
    set staffName(pstaffName: string) { this._staffName = pstaffName; }
    get staffIdTemp(): string { return this._staffIdTemp; }
    set staffIdTemp(pstaffIdTemp: string) { this._staffIdTemp = pstaffIdTemp; }
    get fromDate(): Date { return this._fromDate; }

    set fromDate(pfromDate: Date) { this._fromDate = pfromDate; }

    get toDate(): Date { return this._toDate; }

    set toDate(ptoDate: Date) { this._toDate = ptoDate; }
    get butIwp(): string { return this._butIwp; }
    set butIwp(pbutIwp: string) { this._butIwp = pbutIwp; }
    get pNbtNoteSourceCodeDesc(): string { return this._pNbtNoteSourceCodeDesc; }
    set pNbtNoteSourceCodeDesc(ppNbtNoteSourceCodeDesc: string) { this._pNbtNoteSourceCodeDesc = ppNbtNoteSourceCodeDesc; }
    get pNbtCaseNoteSubTypeDesc(): string { return this._pNbtCaseNoteSubTypeDesc; }
    set pNbtCaseNoteSubTypeDesc(ppNbtCaseNoteSubTypeDesc: string) { this._pNbtCaseNoteSubTypeDesc = ppNbtCaseNoteSubTypeDesc; }
    get pNbtStaffNameDesc(): string { return this._pNbtStaffNameDesc; }
    set pNbtStaffNameDesc(ppNbtStaffNameDesc: string) { this._pNbtStaffNameDesc = ppNbtStaffNameDesc; }
    get caseNoteTextTemp(): string { return this._caseNoteTextTemp; }
    set caseNoteTextTemp(pcaseNoteTextTemp: string) { this._caseNoteTextTemp = pcaseNoteTextTemp; }
    get caseLoadType(): string { return this._caseLoadType;}
    set caseLoadType(value: string) {this._caseLoadType = value;}

    toJSON(): any {
        return {
            'caseNoteId': this._caseNoteId,
            'dateCreation': this._dateCreation,
            'createUserId': this._createUserId,
            'iwpFlag': this._iwpFlag,
            'offenderBookId': this._offenderBookId,
            'modifyDatetime': this._modifyDatetime,
            'contactDate': this._contactDate,
            'checkBox4': this._checkBox4,
            'modifyUserId': this._modifyUserId,
            'checkBox3': this._checkBox3,
            'checkBox5': this._checkBox5,
            'objectType': this._objectType,
            'checkBox2': this._checkBox2,
            'checkBox1': this._checkBox1,
            'noteSourceCode': this._noteSourceCode,
            'sealFlag': this._sealFlag,
            'objectId': this._objectId,
            'eventId': this._eventId,
            'timeCreation': this._timeCreation,
            'contactTime': this._contactTime,
            'amendmentFlag': this._amendmentFlag,
            'caseNoteType': this._caseNoteType,
            'createDatetime': this._createDatetime,
            'caseNoteSubType': this._caseNoteSubType,
            'staffId': this._staffId,
            'caseNoteText': this._caseNoteText,
            'dButton': this._dButton,
            'goButton': this._goButton,
            'rButton': this._rButton,
            'aButton': this._aButton,
            'staffName': this._staffName,
            'staffIdTemp': this._staffIdTemp,
            'fromDate' : this._fromDate,
            'toDate' : this._toDate,
            'amendNotecaseNoteText': this._amendNotecaseNoteText,
            'moduleName': this._moduleName,
            'pObjectType': this._pObjectType,
             'pModuleName': this._pModuleName,
            'butIwp' :this._butIwp,
            'pNbtNoteSourceCodeDesc': this._pNbtNoteSourceCodeDesc,
            'pNbtCaseNoteSubTypeDesc': this._pNbtCaseNoteSubTypeDesc,
            'pNbtStaffNameDesc': this._pNbtStaffNameDesc,
            'lvRoleCode': this._lvRoleCode,
            'description': this._description,
            'code': this._code,
            'caseNoteTextTemp': this._caseNoteTextTemp,
            'caseLoadType' : this._caseLoadType,
            'lastName':this._lastName,
            'firstName':this._firstName,
            'offenderIdDisplay':this._offenderIdDisplay,
            'facility':this._facility
        };
    }
}
