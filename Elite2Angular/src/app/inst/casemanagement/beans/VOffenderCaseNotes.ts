    export class VOffenderCaseNotes {
         private _caseNoteId: number;
         private _lastName: string;
         private _dateCreation: Date;
         private _iwpFlag: string;
         private _offenderBookId: number;
         private _contactDate: Date;
         private _offenderIdDisplay: string;
         private _checkBox4: string;
         private _checkBox3: string;
         private _contactType: string;
         private _checkBox5: string;
         private _checkBox2: string;
         private _checkBox1: string;
         private _staffName: string;
         private _noteSourceCode: string;
         private _noteSource: string;
         private _eventId: number    ;
         private _timeCreation: Date;
         private _contactTime: Date;
         private _amendmentFlag: string;
         private _caseNoteType: string;
         private _contactSubType: string;
         private _firstName: string;
         private _caseNoteSubType: string;
         private _staffId: number    ;
         private _caseNoteText: string;

         get caseNoteId(): number    { return this._caseNoteId; }
         set caseNoteId(pcaseNoteId: number    ) { this._caseNoteId = pcaseNoteId ; }
         get lastName(): string { return this._lastName; }
         set lastName(plastName: string) { this._lastName = plastName ; }
         get dateCreation(): Date { return this._dateCreation; }
         set dateCreation(pdateCreation: Date) { this._dateCreation = pdateCreation ; }
         get iwpFlag(): string { return this._iwpFlag; }
         set iwpFlag(piwpFlag: string) { this._iwpFlag = piwpFlag ; }
         get offenderBookId(): number    { return this._offenderBookId; }
         set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId ; }
         get contactDate(): Date { return this._contactDate; }
         set contactDate(pcontactDate: Date) { this._contactDate = pcontactDate ; }
         get offenderIdDisplay(): string { return this._offenderIdDisplay; }
         set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay ; }
         get checkBox4(): string { return this._checkBox4; }
         set checkBox4(pcheckBox4: string) { this._checkBox4 = pcheckBox4 ; }
         get checkBox3(): string { return this._checkBox3; }
         set checkBox3(pcheckBox3: string) { this._checkBox3 = pcheckBox3 ; }
         get contactType(): string { return this._contactType; }
         set contactType(pcontactType: string) { this._contactType = pcontactType ; }
         get checkBox5(): string { return this._checkBox5; }
         set checkBox5(pcheckBox5: string) { this._checkBox5 = pcheckBox5 ; }
         get checkBox2(): string { return this._checkBox2; }
         set checkBox2(pcheckBox2: string) { this._checkBox2 = pcheckBox2 ; }
         get checkBox1(): string { return this._checkBox1; }
         set checkBox1(pcheckBox1: string) { this._checkBox1 = pcheckBox1 ; }
         get staffName(): string { return this._staffName; }
         set staffName(pstaffName: string) { this._staffName = pstaffName ; }
         get noteSourceCode(): string { return this._noteSourceCode; }
         set noteSourceCode(pnoteSourceCode: string) { this._noteSourceCode = pnoteSourceCode ; }
         get noteSource(): string { return this._noteSource; }
         set noteSource(pnoteSource: string) { this._noteSource = pnoteSource ; }
         get eventId(): number    { return this._eventId; }
         set eventId(peventId: number    ) { this._eventId = peventId ; }
         get timeCreation(): Date { return this._timeCreation; }
         set timeCreation(ptimeCreation: Date) { this._timeCreation = ptimeCreation ; }
         get contactTime(): Date { return this._contactTime; }
         set contactTime(pcontactTime: Date) { this._contactTime = pcontactTime ; }
         get amendmentFlag(): string { return this._amendmentFlag; }
         set amendmentFlag(pamendmentFlag: string) { this._amendmentFlag = pamendmentFlag ; }
         get caseNoteType(): string { return this._caseNoteType; }
         set caseNoteType(pcaseNoteType: string) { this._caseNoteType = pcaseNoteType ; }
         get contactSubType(): string { return this._contactSubType; }
         set contactSubType(pcontactSubType: string) { this._contactSubType = pcontactSubType ; }
         get firstName(): string { return this._firstName; }
         set firstName(pfirstName: string) { this._firstName = pfirstName ; }
         get caseNoteSubType(): string { return this._caseNoteSubType; }
         set caseNoteSubType(pcaseNoteSubType: string) { this._caseNoteSubType = pcaseNoteSubType ; }
         get staffId(): number    { return this._staffId; }
         set staffId(pstaffId: number    ) { this._staffId = pstaffId ; }
         get caseNoteText(): string { return this._caseNoteText; }
         set caseNoteText(pcaseNoteText: string) { this._caseNoteText = pcaseNoteText ; }

     toJSON(): any {
         return {
            'caseNoteId': this._caseNoteId,
            'lastName': this._lastName,
            'dateCreation': this._dateCreation,
            'iwpFlag': this._iwpFlag,
            'offenderBookId': this._offenderBookId,
            'contactDate': this._contactDate,
            'offenderIdDisplay': this._offenderIdDisplay,
            'checkBox4': this._checkBox4,
            'checkBox3': this._checkBox3,
            'contactType': this._contactType,
            'checkBox5': this._checkBox5,
            'checkBox2': this._checkBox2,
            'checkBox1': this._checkBox1,
            'staffName': this._staffName,
            'noteSourceCode': this._noteSourceCode,
            'noteSource': this._noteSource,
            'eventId': this._eventId,
            'timeCreation': this._timeCreation,
            'contactTime': this._contactTime,
            'amendmentFlag': this._amendmentFlag,
            'caseNoteType': this._caseNoteType,
            'contactSubType': this._contactSubType,
            'firstName': this._firstName,
            'caseNoteSubType': this._caseNoteSubType,
            'staffId': this._staffId,
            'caseNoteText': this._caseNoteText,
             };
         }
        }
