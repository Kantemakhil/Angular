import { BaseModel } from '@commonbeans/BaseModel'

export class OffensesOutcome extends BaseModel {

    private _offenderBookId: number;
    private _offenderId: number;
    private _offenderChargeId: number;
    private _apply: string;
    private _offense: string;
    private _offenseType: string;
    private _plea: string;
    private _offenseDate: Date;
    private _range: Date;
    private _result: string;
    private _flag: string;
    private _statuteCode: string;
    private _offenceCode: string;
    private _resultButton: string;
    private _sentenceSeq: number;
    private _button: string;
    private _offenseDescription: string;
    private _outOffenceLaunchButton: string;
    private _eventId: number;
    private _caseId: number;
    private _disposition: string;
    private _mostseriousflag: string;
    private _createDateTime: Date;
    private _modifyDateTime: Date;
    private _createUserId: string;
    private _modifyUserId: string;
    private _outcomeLaunchButton: string;
    private _chargeStatus: string;
    private _resultcode1: string;
    private _resultcode1indicator: string;
    private _propertyValue: string;
    private _dummyOffenderChargeId: number;
    private _commitFlag = "";
    private _dummyOffenseId: number;
    private _sentenceCalcType: string;
    private _sentenceType: string;
    private _category: string;
    private _resultcode1desc: string;
    private _checksum: string;
    private _applyflag: string;
    private _applyFlagTemp: boolean;
    private _chargeInfoNumber: string;
    private _complicityTypeDesc: string;
    private _lpcComplicityTypeCode: string;
    private _offenceRangeDate: Date;
    private _vclFlag: string;
    private _resultcode2desc: string;
    private _resultcode2: string;
    private _resultcode2indicator: string;
    private _cjitoffencecode1: string;
    private _cjitoffencecode2: string;
    private _cjitoffencecode3: string;
    private _noofoffences: number;
    private _totalpropertyvalue: string;
    private _offenseDateDisplay: string;
    private _dummyEventId = 0;
    private _vclFlagDbVal: string;
    private _applyFlagDbVal: string;
    private _countNumber: number;
    private _expectedReleaseDate: string;
	private _paroleEligibilityDate: string;
	private _remissionEligibilityDate: string;
	private _latestReleaseDate: string;
	private _custodyStatus: string;
	private _confirmedReleaseDate: string;


    get offenderId(): number { return this._offenderId; }

    set offenderId(offenderId: number) { this._offenderId = offenderId; }

    get totalpropertyvalue(): string { return this._totalpropertyvalue; }

    set totalpropertyvalue(totalpropertyvalue: string) { this._totalpropertyvalue = totalpropertyvalue; }

    get noofoffences(): number { return this._noofoffences; }

    set noofoffences(noofoffences: number) { this._noofoffences = noofoffences; }

    get cjitoffencecode1(): string { return this._cjitoffencecode1; }

    set cjitoffencecode1(cjitoffencecode1: string) { this._cjitoffencecode1 = cjitoffencecode1; }

    get cjitoffencecode2(): string { return this._cjitoffencecode2; }

    set cjitoffencecode2(cjitoffencecode2: string) { this._cjitoffencecode2 = cjitoffencecode2; }

    get cjitoffencecode3(): string { return this._cjitoffencecode3; }

    set cjitoffencecode3(cjitoffencecode3: string) { this._cjitoffencecode3 = cjitoffencecode3; }

    get chargeInfoNumber(): string { return this._chargeInfoNumber; }

    set chargeInfoNumber(chargeInfoNumber: string) { this._chargeInfoNumber = chargeInfoNumber; }

    get complicityTypeDesc(): string { return this._complicityTypeDesc; }

    set complicityTypeDesc(complicityTypeDesc: string) { this._complicityTypeDesc = complicityTypeDesc; }

    get lpcComplicityTypeCode(): string { return this._lpcComplicityTypeCode; }

    set lpcComplicityTypeCode(lpcComplicityTypeCode: string) { this._lpcComplicityTypeCode = lpcComplicityTypeCode; }

    get offenceRangeDate(): Date { return this._offenceRangeDate; }

    set offenceRangeDate(offenceRangeDate: Date) { this._offenceRangeDate = offenceRangeDate; }

    get vclFlag(): string { return this._vclFlag; }

    set vclFlag(vclFlag: string) { this._vclFlag = vclFlag; }

    get resultcode2desc(): string { return this._resultcode2desc; }

    set resultcode2desc(resultcode2desc: string) { this._resultcode2desc = resultcode2desc; }

    get resultcode2(): string { return this._resultcode2; }

    set resultcode2(resultcode2: string) { this._resultcode2 = resultcode2; }

    get resultcode2indicator(): string { return this._resultcode2indicator; }

    set resultcode2indicator(resultcode2indicator: string) { this._resultcode2indicator = resultcode2indicator; }

    get applyFlagTemp(): boolean { return this._applyFlagTemp; }

    set applyFlagTemp(applyFlagTemp: boolean) { this._applyFlagTemp = applyFlagTemp; }

    get resultcode1desc(): string { return this._resultcode1desc; }

    set resultcode1desc(resultcode1desc: string) { this._resultcode1desc = resultcode1desc; }

    get checksum(): string { return this._checksum; }

    set checksum(checksum: string) { this._checksum = checksum; }

    get applyflag(): string { return this._applyflag; }

    set applyflag(applyflag: string) { this._applyflag = applyflag; }

    get resultcode1(): string { return this._resultcode1; }

    set resultcode1(resultcode1: string) { this._resultcode1 = resultcode1; }

    get resultcode1indicator(): string { return this._resultcode1indicator; }

    set resultcode1indicator(resultcode1indicator: string) { this._resultcode1indicator = resultcode1indicator; }

    get offenseDescription(): string { return this._offenseDescription; }

    set offenseDescription(offenseDescription: string) { this._offenseDescription = offenseDescription; }

    get apply(): string { return this._apply; }

    set apply(apply: string) { this._apply = apply; }

    get offense(): string { return this._offense; }

    set offense(offense: string) { this._offense = offense; }

    get offenseType(): string { return this._offenseType; }

    set offenseType(offenseType: string) { this._offenseType = offenseType; }

    get plea(): string { return this._plea; }

    set plea(plea: string) { this._plea = plea; }

    get offenseDate(): Date { return this._offenseDate; }

    set offenseDate(offenseDate: Date) { this._offenseDate = offenseDate; }

    get range(): Date { return this._range; }

    set range(range: Date) { this._range = range; }

    get result(): string { return this._result; }

    set result(result: string) { this._result = result; }

    get flag(): string { return this._flag; }

    set flag(flag: string) { this._flag = flag; }

    get statuteCode(): string { return this._statuteCode; }

    set statuteCode(statuteCode: string) { this._statuteCode = statuteCode; }

    get offenceCode(): string { return this._offenceCode; }

    set offenceCode(offenceCode: string) { this._offenceCode = offenceCode; }

    get resultButton(): string { return this._resultButton; }

    set resultButton(resultButton: string) { this._resultButton = resultButton; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(offenderBookId: number) { this._offenderBookId = offenderBookId; }

    get offenderChargeId(): number { return this._offenderChargeId; }

    set offenderChargeId(offenderChargeId: number) { this._offenderChargeId = offenderChargeId; }

    get sentenceSeq(): number { return this._sentenceSeq; }

    set sentenceSeq(sentenceSeq: number) { this._sentenceSeq = sentenceSeq; }

    get button(): string { return this._button; }

    set button(pbutton: string) { this._button = pbutton; }

    get eventId(): number { return this._eventId; }

    set eventId(eventId: number) { this._eventId = eventId; }

    get mostseriousflag(): string { return this._mostseriousflag; }

    set mostseriousflag(mostseriousflag: string) { this._mostseriousflag = mostseriousflag; }

    get caseId(): number { return this._caseId; }

    set caseId(caseId: number) { this._caseId = caseId; }

    get disposition(): string { return this._disposition; }

    set disposition(disposition: string) { this._disposition = disposition; }

    get modifyDateTime(): Date { return this._modifyDateTime; }

    set modifyDateTime(modifyDateTime: Date) { this._modifyDateTime = modifyDateTime; }

    get createDateTime(): Date { return this._createDateTime; }

    set createDateTime(createDateTime: Date) { this._createDateTime = createDateTime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(modifyUserId: string) { this._modifyUserId = modifyUserId; }

    get outOffenceLaunchButton(): string { return this._outOffenceLaunchButton; }

    set outOffenceLaunchButton(outOffenceLaunchButton: string) { this._outOffenceLaunchButton = outOffenceLaunchButton; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(createUserId: string) { this._createUserId = createUserId; }

    get outcomeLaunchButton(): string { return this._outcomeLaunchButton; }

    set outcomeLaunchButton(outcomeLaunchButton: string) { this._outcomeLaunchButton = outcomeLaunchButton; }

    get chargeStatus(): string { return this._chargeStatus; }

    set chargeStatus(chargeStatus: string) { this._chargeStatus = chargeStatus; }

    get propertyValue(): string { return this._propertyValue; }

    set propertyValue(propertyValue: string) { this._propertyValue = propertyValue; }

    get vclFlagDbVal(): string { return this._vclFlagDbVal; }

    set vclFlagDbVal(vclFlagDbVal: string) { this._vclFlagDbVal = vclFlagDbVal; }

    get dummyOffenderChargeId(): number { return this._dummyOffenderChargeId; }

    set dummyOffenderChargeId(dummyOffenderChargeId: number) { this._dummyOffenderChargeId = dummyOffenderChargeId; }

    get dummyOffenseId(): number { return this._dummyOffenseId; }

    set dummyOffenseId(dummyOffenseId: number) { this._dummyOffenseId = dummyOffenseId; }

    get commitFlag(): string { return this._commitFlag; }

    set commitFlag(commitFlag: string) { this._commitFlag = commitFlag; }

    get category(): string { return this._category; }

    set category(category: string) { this._category = category; }

    get sentenceCalcType(): string { return this._sentenceCalcType; }

    set sentenceCalcType(sentenceCalcType: string) { this._sentenceCalcType = sentenceCalcType; }

    get sentenceType(): string { return this._sentenceType; }

    set sentenceType(sentenceType: string) { this._sentenceType = sentenceType; }

    get dummyEventId(): number { return this._dummyEventId; }

    set dummyEventId(dummyEventId: number) { this._dummyEventId = dummyEventId; }

    get offenseDateDisplay(): string { return this._offenseDateDisplay; }
    set offenseDateDisplay( pOffenseDateDisplay: string ) { this._offenseDateDisplay = pOffenseDateDisplay; }

    get applyFlagDbVal(): string { return this._applyFlagDbVal; }

    set applyFlagDbVal(applyFlagDbVal: string) { this._applyFlagDbVal = applyFlagDbVal; }

    get countNumber(): number { return this._countNumber; }

    set countNumber(countNumber: number) { this._countNumber = countNumber; }

    get expectedReleaseDate(): string {  return this._expectedReleaseDate; }

    set expectedReleaseDate(value: string) { this._expectedReleaseDate = value; }

    get paroleEligibilityDate(): string { return this._paroleEligibilityDate; }

    set paroleEligibilityDate(value: string) { this._paroleEligibilityDate = value; }

    get remissionEligibilityDate(): string { return this._remissionEligibilityDate; }

    set remissionEligibilityDate(value: string) { this._remissionEligibilityDate = value; }

    get latestReleaseDate(): string { return this._latestReleaseDate; } 

    set latestReleaseDate(value: string) { this._latestReleaseDate = value; }

    get custodyStatus(): string { return this._custodyStatus; }
     
    set custodyStatus(value: string) { this._custodyStatus = value; } 

    get confirmedReleaseDate(): string { return this._confirmedReleaseDate; } 

    set confirmedReleaseDate(value: string) { this._confirmedReleaseDate = value; }

    toJSON(): any {
        return {
            'offenderBookId': this._offenderBookId,
            'eventId': this._eventId,
            'offenderChargeId': this._offenderChargeId,
            'caseId': this._caseId,
            'offenseDescription': this._offenseDescription,
            'offenceCode': this._offenceCode,
            'statuteCode': this._statuteCode,
            'mostseriousflag': this._mostseriousflag,
            'plea': this._plea,
            'offenseDate': this._offenseDate,
            'range': this._range,
            'resultcode1': this._resultcode1,
            'resultcode1indicator': this._resultcode1indicator,
            'chargeStatus': this._chargeStatus,
            'apply': this._apply,
            'offenseType': this._offenseType,
            'offense': this._offense,
            'result': this._result,
            'flag': this._flag,
            'sentenceSeq': this._sentenceSeq,
            'button': this._button,
            'disposition': this._disposition,
            'resultButton': this._resultButton,
            'applyFlagTemp': this._applyFlagTemp,
            'outcomeLaunchButton': this._outcomeLaunchButton,
            'propertyValue': this._propertyValue,
            'dummyOffenderChargeId': this._dummyOffenderChargeId,
            'commitFlag': this._commitFlag,
            'sentenceCalcType': this._sentenceCalcType,
            'sentenceType': this._sentenceType,
            'category': this._category,
            'resultcode1desc': this._resultcode1desc,
            'checksum': this._checksum,
            'applyflag': this._applyflag,
            'chargeInfoNumber': this._chargeInfoNumber,
            'complicityTypeDesc': this._complicityTypeDesc,
            'lpcComplicityTypeCode': this._lpcComplicityTypeCode,
            'offenceRangeDate': this._offenceRangeDate,
            'vclFlag': this._vclFlag,
            'resultcode2desc': this._resultcode2desc,
            'resultcode2': this._resultcode2,
            'dummyEventId': this._dummyEventId,
            'resultcode2indicator': this._resultcode2indicator,
            'cjitoffencecode1': this._cjitoffencecode1,
            'cjitoffencecode2': this._cjitoffencecode2,
            'cjitoffencecode3': this._cjitoffencecode3,
            'noofoffences': this._noofoffences,
            'countNumber': this._countNumber,
            'totalpropertyvalue': this._totalpropertyvalue,
            'offenderId': this._offenderId,
            'expectedReleaseDate': this._expectedReleaseDate,
            'paroleEligibilityDate': this._paroleEligibilityDate,
            'remissionEligibilityDate':this._remissionEligibilityDate,
            'latestReleaseDate': this._latestReleaseDate,
            'custodyStatus': this._custodyStatus,
            'confirmedReleaseDate': this._confirmedReleaseDate,
        };
    }
}