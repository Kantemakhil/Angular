import { OffenderNonAssociations } from "@common/beans/OffenderNonAssociations";
import { Offenders } from "@common/beans/Offenders";
import { OffenderStgAffiliations } from "@instSecurityThreatGroupsbeans/OffenderStgAffiliations";

export class VOffenderPrgObligations {
    private _statusChangeReason: string;
    private _endDate: Date;
    private _offenderAgyLocId: string;
    private _offenderBookId: number;
    private _orderId: number;
    private _statusChangeDate: Date;
    private _activityCode: string;
    private _specialNeedFlag: string;
    private _programCategory: string;
    private _serviceObligationCode: string;
    private _referralDate: Date;
    private _sexDesc: string;
    private _sentenceEndDate: Date;
    private _sentenceStartDate: Date;
    private _raceDesc: string;
    private _sentenceCalcType: string;
    private _riskCode: string;
    private _eventType: string;
    private _availabilityDesc: string;
    private _sentenceSeq: number;
    private _categoryType: string;
    private _firstName: string;
    private _obligationSource: string;
    private _lengthUnit: string;
    private _checkSum: number;
    private _legalEndDate: Date;
    private _offenderName: string;
    private _offenceTypes: string;
    private _offenderId: number;
    private _startDate: Date;
    private _status: string;
    private _lastName: string;
    private _communityActiveFlag: string;
    private _offenderIdDisplay: string;
    private _availabilityCode: string;
    private _courtAgyLocId: string;
    private _commConditionCode: string;
    private _commentText: string;
    private _activityDesc: string;
    private _creditedUnits: string;
    private _courtEventId: number;
    private _serialVersionUID: number;
    private _offenderSentCondActId: number;
    private _courtName: string;
    private _activeFlag: string;
    private _programLength: string;
    private _sentenceCategory: string;
    private _eventSubType: string;
    private _length: number;
    private _sentenceDesc: string;
    private _offenderCommunityAgyLocId: string;
    private _obligationSourceDesc: string;
    private _commConditionType: string;
    private _sexCode: string;
    private _caseInfoNumber: string;
    private _sentenceStatus: string;
    private _waitDays: number;
    private _offenderPrgObligationId: number;
    private _offenderSentConditionId: number;
    private _sentenceConditionDesc: string;
    private _age: number;
    private _programId: number;
    private _raceCode: string;
    private _nbtActivityDesc: string;
    private _nbtArea: string;
    private _nbtAgyLocId: string;
    private _nbtRegion: string;
    private _nbtTeam: string;
    private _nbtActivityCode: string;
    private _caseLoadType: string;
    private _nbtBulkAssign: boolean;
    private _firstFlag: string;
    private _test: number;
    private _specialNeedFlagTemp: string;
    private _teamId: number;
    private _allocCount: number;
    private _courseProfile: number;
    private _chkAppointment: number;
    private _statusDesc: string;
    private _availabilityCodeTemp: string;
    private _assignFlag: string;
    private _coursePhaseId: number;
    private _pQueryOnly: string;
    private _nonAssocationByIngAndGang: string;
    private __legalEndDateTemp: string;
    public get _legalEndDateTemp(): string {
        return this.__legalEndDateTemp;
    }
    public set _legalEndDateTemp(value: string) {
        this.__legalEndDateTemp = value;
    }

    public get nonAssocationByIngAndGang(): string {
        return this._nonAssocationByIngAndGang;
    }
    public set nonAssocationByIngAndGang(value: string) {
        this._nonAssocationByIngAndGang = value;
    }
    private _offenderNonAssociations: Array<OffenderNonAssociations>;
    private _offenderNonAssociationsByGang: Array<Offenders>;
    private _offenderNonAssociationsByInd: Array<Offenders>;
    public get offenderNonAssociationsByInd(): Array<Offenders> {
        return this._offenderNonAssociationsByInd;
    }
    public set offenderNonAssociationsByInd(value: Array<Offenders>) {
        this._offenderNonAssociationsByInd = value;
    }

    public get offenderNonAssociationsByGang(): Array<Offenders> {
        return this._offenderNonAssociationsByGang;
    }
    public set offenderNonAssociationsByGang(value: Array<Offenders>) {
        this._offenderNonAssociationsByGang = value;
    }

    private _orderType: string;
    public get orderType(): string {
        return this._orderType;
    }
    public set orderType(value: string) {
        this._orderType = value;
    }

    set assignFlag(value: string) {
        this._assignFlag = value;
    }
    get assignFlag(): string {
        return this._assignFlag;
    }
    

    set coursePhaseId(value: number) {
        this._coursePhaseId = value;
    }
    get coursePhaseId(): number {
        return this._coursePhaseId;
    }

    set availabilityCodeTemp(value: string) {
        this._availabilityCodeTemp = value;
    }
    get availabilityCodeTemp(): string {
        return this._availabilityCodeTemp;
    }

    set statusDesc(value: string) {
        this._statusDesc = value;
    }
    get statusDesc(): string {
        return this._statusDesc;
    }
    set chkAppointment(value: number) {
        this._chkAppointment = value;
    }
    get chkAppointment(): number {
        return this._chkAppointment;
    }
    set courseProfile(value: number) {
        this._courseProfile = value;
    }
    get courseProfile(): number {
        return this._courseProfile;
    }
    set allocCount(value: number) {
        this._allocCount = value;
    }
    get allocCount(): number {
        return this._allocCount;
    }

    set teamId(value: number) {
        this._teamId = value;
    }
    get teamId(): number {
        return this._teamId;
    }
    set specialNeedFlagTemp(value: string) {
        this._specialNeedFlagTemp = value;
    }
    get specialNeedFlagTemp(): string {
        return this._specialNeedFlagTemp;
    }
    set firstFlag(value: string) {
        this._firstFlag = value;
    }
    get firstFlag(): string {
        return this._firstFlag;
    }
    set nbtBulkAssign(value: boolean) {
        this._nbtBulkAssign = value;
    }
    get nbtBulkAssign(): boolean {
        return this._nbtBulkAssign;
    }
    set caseLoadType(value: string) {
        this._caseLoadType = value;
    }
    get caseLoadType(): string {
        return this._caseLoadType;
    }
    set nbtActivityCode(value: string) {
        this._nbtActivityCode = value;
    }
    get nbtActivityCode(): string {
        return this._nbtActivityCode;
    }
    set nbtTeam(value: string) {
        this._nbtTeam = value;
    }
    get nbtTeam(): string {
        return this._nbtTeam;
    }
    set nbtRegion(value: string) {
        this._nbtRegion = value;
    }
    get nbtRegion(): string {
        return this._nbtRegion;
    }
    set nbtAgyLocId(value: string) {
        this._nbtAgyLocId = value;
    }
    get nbtAgyLocId(): string {
        return this._nbtAgyLocId;
    }
    set nbtArea(value: string) {
        this._nbtArea = value;
    }
    get nbtArea(): string {
        return this._nbtArea;
    }

    set nbtActivityDesc(value: string) {
        this._nbtActivityDesc = value;
    }
    get nbtActivityDesc(): string {
        return this._nbtActivityDesc;
    }
    get test(): number { return this._test; }

    set test(test: number) { this._test = test; }

    get statusChangeReason(): string { return this._statusChangeReason; }

    set statusChangeReason(pstatusChangeReason: string) { this._statusChangeReason = pstatusChangeReason; }

    get endDate(): Date { return this._endDate; }

    set endDate(pendDate: Date) { this._endDate = pendDate; }

    get offenderAgyLocId(): string { return this._offenderAgyLocId; }

    set offenderAgyLocId(poffenderAgyLocId: string) { this._offenderAgyLocId = poffenderAgyLocId; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get orderId(): number { return this._orderId; }

    set orderId(porderId: number) { this._orderId = porderId; }

    get statusChangeDate(): Date { return this._statusChangeDate; }

    set statusChangeDate(pstatusChangeDate: Date) { this._statusChangeDate = pstatusChangeDate; }

    get activityCode(): string { return this._activityCode; }

    set activityCode(pactivityCode: string) { this._activityCode = pactivityCode; }

    get specialNeedFlag(): string { return this._specialNeedFlag; }

    set specialNeedFlag(pspecialNeedFlag: string) { this._specialNeedFlag = pspecialNeedFlag; }

    get programCategory(): string { return this._programCategory; }

    set programCategory(pprogramCategory: string) { this._programCategory = pprogramCategory; }

    get serviceObligationCode(): string { return this._serviceObligationCode; }

    set serviceObligationCode(pserviceObligationCode: string) { this._serviceObligationCode = pserviceObligationCode; }

    get referralDate(): Date { return this._referralDate; }

    set referralDate(preferralDate: Date) { this._referralDate = preferralDate; }

    get sexDesc(): string { return this._sexDesc; }

    set sexDesc(psexDesc: string) { this._sexDesc = psexDesc; }

    get sentenceEndDate(): Date { return this._sentenceEndDate; }

    set sentenceEndDate(psentenceEndDate: Date) { this._sentenceEndDate = psentenceEndDate; }

    get sentenceStartDate(): Date { return this._sentenceStartDate; }

    set sentenceStartDate(psentenceStartDate: Date) { this._sentenceStartDate = psentenceStartDate; }

    get raceDesc(): string { return this._raceDesc; }

    set raceDesc(praceDesc: string) { this._raceDesc = praceDesc; }

    get sentenceCalcType(): string { return this._sentenceCalcType; }

    set sentenceCalcType(psentenceCalcType: string) { this._sentenceCalcType = psentenceCalcType; }

    get riskCode(): string { return this._riskCode; }

    set riskCode(priskCode: string) { this._riskCode = priskCode; }

    get eventType(): string { return this._eventType; }

    set eventType(peventType: string) { this._eventType = peventType; }

    get availabilityDesc(): string { return this._availabilityDesc; }

    set availabilityDesc(pavailabilityDesc: string) { this._availabilityDesc = pavailabilityDesc; }

    get sentenceSeq(): number { return this._sentenceSeq; }

    set sentenceSeq(psentenceSeq: number) { this._sentenceSeq = psentenceSeq; }

    get categoryType(): string { return this._categoryType; }

    set categoryType(pcategoryType: string) { this._categoryType = pcategoryType; }

    get firstName(): string { return this._firstName; }

    set firstName(pfirstName: string) { this._firstName = pfirstName; }

    get obligationSource(): string { return this._obligationSource; }

    set obligationSource(pobligationSource: string) { this._obligationSource = pobligationSource; }

    get lengthUnit(): string { return this._lengthUnit; }

    set lengthUnit(plengthUnit: string) { this._lengthUnit = plengthUnit; }

    get checkSum(): number { return this._checkSum; }

    set checkSum(pcheckSum: number) { this._checkSum = pcheckSum; }

    get legalEndDate(): Date { return this._legalEndDate; }

    set legalEndDate(plegalEndDate: Date) { this._legalEndDate = plegalEndDate; }

    get offenderName(): string { return this._offenderName; }

    set offenderName(poffenderName: string) { this._offenderName = poffenderName; }

    get offenceTypes(): string { return this._offenceTypes; }

    set offenceTypes(poffenceTypes: string) { this._offenceTypes = poffenceTypes; }

    get offenderId(): number { return this._offenderId; }

    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }

    get startDate(): Date { return this._startDate; }

    set startDate(pstartDate: Date) { this._startDate = pstartDate; }

    get status(): string { return this._status; }

    set status(pstatus: string) { this._status = pstatus; }

    get lastName(): string { return this._lastName; }

    set lastName(plastName: string) { this._lastName = plastName; }

    get communityActiveFlag(): string { return this._communityActiveFlag; }

    set communityActiveFlag(pcommunityActiveFlag: string) { this._communityActiveFlag = pcommunityActiveFlag; }

    get offenderIdDisplay(): string { return this._offenderIdDisplay; }

    set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }

    get availabilityCode(): string { return this._availabilityCode; }

    set availabilityCode(pavailabilityCode: string) { this._availabilityCode = pavailabilityCode; }

    get courtAgyLocId(): string { return this._courtAgyLocId; }

    set courtAgyLocId(pcourtAgyLocId: string) { this._courtAgyLocId = pcourtAgyLocId; }

    get commConditionCode(): string { return this._commConditionCode; }

    set commConditionCode(pcommConditionCode: string) { this._commConditionCode = pcommConditionCode; }

    get commentText(): string { return this._commentText; }

    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    get activityDesc(): string { return this._activityDesc; }

    set activityDesc(pactivityDesc: string) { this._activityDesc = pactivityDesc; }

    get creditedUnits(): string { return this._creditedUnits; }

    set creditedUnits(pcreditedUnits: string) { this._creditedUnits = pcreditedUnits; }

    get courtEventId(): number { return this._courtEventId; }

    set courtEventId(pcourtEventId: number) { this._courtEventId = pcourtEventId; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get offenderSentCondActId(): number { return this._offenderSentCondActId; }

    set offenderSentCondActId(poffenderSentCondActId: number) { this._offenderSentCondActId = poffenderSentCondActId; }

    get courtName(): string { return this._courtName; }

    set courtName(pcourtName: string) { this._courtName = pcourtName; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

    get programLength(): string { return this._programLength; }

    set programLength(pprogramLength: string) { this._programLength = pprogramLength; }

    get sentenceCategory(): string { return this._sentenceCategory; }

    set sentenceCategory(psentenceCategory: string) { this._sentenceCategory = psentenceCategory; }

    get eventSubType(): string { return this._eventSubType; }

    set eventSubType(peventSubType: string) { this._eventSubType = peventSubType; }

    get length(): number { return this._length; }

    set length(plength: number) { this._length = plength; }

    get sentenceDesc(): string { return this._sentenceDesc; }

    set sentenceDesc(psentenceDesc: string) { this._sentenceDesc = psentenceDesc; }

    get offenderCommunityAgyLocId(): string { return this._offenderCommunityAgyLocId; }

    set offenderCommunityAgyLocId(poffenderCommunityAgyLocId: string) { this._offenderCommunityAgyLocId = poffenderCommunityAgyLocId; }

    get obligationSourceDesc(): string { return this._obligationSourceDesc; }

    set obligationSourceDesc(pobligationSourceDesc: string) { this._obligationSourceDesc = pobligationSourceDesc; }

    get commConditionType(): string { return this._commConditionType; }

    set commConditionType(pcommConditionType: string) { this._commConditionType = pcommConditionType; }

    get sexCode(): string { return this._sexCode; }

    set sexCode(psexCode: string) { this._sexCode = psexCode; }

    get caseInfoNumber(): string { return this._caseInfoNumber; }

    set caseInfoNumber(pcaseInfoNumber: string) { this._caseInfoNumber = pcaseInfoNumber; }

    get sentenceStatus(): string { return this._sentenceStatus; }

    set sentenceStatus(psentenceStatus: string) { this._sentenceStatus = psentenceStatus; }

    get waitDays(): number { return this._waitDays; }

    set waitDays(pwaitDays: number) { this._waitDays = pwaitDays; }

    get offenderPrgObligationId(): number { return this._offenderPrgObligationId; }

    set offenderPrgObligationId(poffenderPrgObligationId: number) { this._offenderPrgObligationId = poffenderPrgObligationId; }

    get offenderSentConditionId(): number { return this._offenderSentConditionId; }

    set offenderSentConditionId(poffenderSentConditionId: number) { this._offenderSentConditionId = poffenderSentConditionId; }

    get sentenceConditionDesc(): string { return this._sentenceConditionDesc; }

    set sentenceConditionDesc(psentenceConditionDesc: string) { this._sentenceConditionDesc = psentenceConditionDesc; }

    get age(): number { return this._age; }

    set age(page: number) { this._age = page; }

    get programId(): number { return this._programId; }

    set programId(pprogramId: number) { this._programId = pprogramId; }

    get raceCode(): string { return this._raceCode; }

    set raceCode(praceCode: string) { this._raceCode = praceCode; }


    get pQueryOnly(): string { return this._pQueryOnly; }

    set pQueryOnly(ppQueryOnly: string) { this._pQueryOnly = ppQueryOnly; }

    get offenderNonAssociations(): Array<OffenderNonAssociations> { return this._offenderNonAssociations; }
    set offenderNonAssociations(value: Array<OffenderNonAssociations>) { this._offenderNonAssociations = value; }


    toJSON(): any {
        return {
            'statusChangeReason': this._statusChangeReason,
            'endDate': this._endDate,
            'offenderAgyLocId': this._offenderAgyLocId,
            'offenderBookId': this._offenderBookId,
            'orderId': this._orderId,
            'statusChangeDate': this._statusChangeDate,
            'activityCode': this._activityCode,
            'specialNeedFlag': this._specialNeedFlag,
            'programCategory': this._programCategory,
            'serviceObligationCode': this._serviceObligationCode,
            'referralDate': this._referralDate,
            'sexDesc': this._sexDesc,
            'sentenceEndDate': this._sentenceEndDate,
            'sentenceStartDate': this._sentenceStartDate,
            'raceDesc': this._raceDesc,
            'sentenceCalcType': this._sentenceCalcType,
            'riskCode': this._riskCode,
            'eventType': this._eventType,
            'availabilityDesc': this._availabilityDesc,
            'sentenceSeq': this._sentenceSeq,
            'categoryType': this._categoryType,
            'firstName': this._firstName,
            'obligationSource': this._obligationSource,
            'lengthUnit': this._lengthUnit,
            'checkSum': this._checkSum,
            'legalEndDate': this._legalEndDate,
            'offenderName': this._offenderName,
            'offenceTypes': this._offenceTypes,
            'offenderId': this._offenderId,
            'startDate': this._startDate,
            'status': this._status,
            'lastName': this._lastName,
            'communityActiveFlag': this._communityActiveFlag,
            'offenderIdDisplay': this._offenderIdDisplay,
            'availabilityCode': this._availabilityCode,
            'courtAgyLocId': this._courtAgyLocId,
            'commConditionCode': this._commConditionCode,
            'commentText': this._commentText,
            'activityDesc': this._activityDesc,
            'creditedUnits': this._creditedUnits,
            'courtEventId': this._courtEventId,
            'serialVersionUID': this._serialVersionUID,
            'offenderSentCondActId': this._offenderSentCondActId,
            'courtName': this._courtName,
            'activeFlag': this._activeFlag,
            'programLength': this._programLength,
            'sentenceCategory': this._sentenceCategory,
            'eventSubType': this._eventSubType,
            'length': this._length,
            'sentenceDesc': this._sentenceDesc,
            'offenderCommunityAgyLocId': this._offenderCommunityAgyLocId,
            'obligationSourceDesc': this._obligationSourceDesc,
            'commConditionType': this._commConditionType,
            'sexCode': this._sexCode,
            'caseInfoNumber': this._caseInfoNumber,
            'sentenceStatus': this._sentenceStatus,
            'waitDays': this._waitDays,
            'offenderPrgObligationId': this._offenderPrgObligationId,
            'offenderSentConditionId': this._offenderSentConditionId,
            'sentenceConditionDesc': this._sentenceConditionDesc,
            'age': this._age,
            'programId': this._programId,
            'raceCode': this._raceCode,
            'nbtActivityDesc': this._nbtActivityDesc,
            'nbtArea': this._nbtArea,
            'nbtAgyLocId': this._nbtAgyLocId,
            'nbtRegion': this._nbtRegion,
            'nbtTeam': this._nbtTeam,
            'nbtActivityCode': this._nbtActivityCode,
            'caseLoadType': this._caseLoadType,
            'nbtBulkAssign': this._nbtBulkAssign,
            'firstFlag': this._firstFlag,
            'test': this._test,
            'specialNeedFlagTemp': this._specialNeedFlagTemp,
            'teamId': this._teamId,
            'allocCount': this._allocCount,
            'courseProfile': this._courseProfile,
            'chkAppointment': this._chkAppointment,
            'statusDesc': this._statusDesc,
            'availabilityCodeTemp': this._availabilityCodeTemp,
            'assignFlag': this._assignFlag,
            'coursePhaseId': this._coursePhaseId,
            'pQueryOnly': this._pQueryOnly,
            'offenderNonAssociations': this._offenderNonAssociations,
            'offenderNonAssociationsByGang':this._offenderNonAssociationsByGang,
            'offenderNonAssociationsByInd':this._offenderNonAssociationsByInd,
            'nonAssocationByIngAndGang':this._nonAssocationByIngAndGang,
            'orderType' : this._orderType,
            'legalEndDateTemp' : this.__legalEndDateTemp
        };
    }
}
