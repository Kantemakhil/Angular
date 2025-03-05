import { BaseModel } from '@commonbeans/BaseModel';
import { AssessSectionNotifications } from '../assessmentmaintenance/beans/AssessSectionNotifications';
export class Assessments extends BaseModel {
    private _assessmentType: string;
    private _createUserId: string;
    private _highValue: number;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _description: string;
    private _mutualExclusiveFlag: string;
    private _medicalFlag: string;
    private _expiryDate: Date;
    private _reviewFlag: string;
    private _score: number;
    private _serialVersionUID: number;
    private _reviewCycleDays: number;
    private _assessmentCode: string;
    private _determineSupLevelFlag: string;
    private _sealFlag: string;
    private _sectScoreOverrideFlag: string;
    private _updateAllowedFlag: string;
    private _assessmentId: number;
    private _requireEvaluationFlag: string;
    private _activeFlag: string;
    private _createDate: Date;
    private _scheduleCompleteDays: number;
    private _caseloadType: string;
    private _cellSharingAlertFlag: string;
    private _screenCode: string;
    private _createDatetime: Date;
    private _lowValue: number;
    private _requireApprovalFlag: string;
    private _searchCriteriaFlag: string;
    private _sectScoreIncludeFlag: string;
    private _measure: string;
    private _calculateTotalFlag: string;
    private _assessComment: string;
    private _overrideableFlag: string;
    private _listSeq: number;
    private _assessmentClass: string;
    private _totalPercent: number;
    private _effectiveDate: Date;
    private _answers: string;
    private _offenderBookId: number;
    private _assessmentSeq: number;
    private _ansId: number;
    private _parentAssessmentId: number;
    private _sectionCode: string;
    private _determineSupLevelFlagTemp: string;
    private _requireApprovalFlagTemp: string;
    private _calculateTotalFlagTemp: string;
    private _reviewCycleDaysTemp: number;
    private _scheduleCompleteDaysTemp: number;
    private _screenCodeTemp: string;
    private _code: string;
    private _requiredFlag: string;
    private _ansBookMark: string;
    private _bookmarkCondition: string;
    private _minValue: number;
    private _maxValue: number;
    private _bookmarkValue: string;
    private _bookmarkStatus: string;
    private _age: number;
    private _answerValue: string;
    private _assSecNoti: Array<AssessSectionNotifications>;
    private _assCodeTemp: string;


    public get answerValue(): string {
        return this._answerValue;
    }
    public set answerValue(value: string) {
        this._answerValue = value;
    }
    
    public get age(): number {
        return this._age;
    }
    public set age(value: number) {
        this._age = value;
    }

    public get bookmarkStatus(): string {
        return this._bookmarkStatus;
    }
    public set bookmarkStatus(value: string) {
        this._bookmarkStatus = value;
    }
    public get bookmarkValue(): string {
        return this._bookmarkValue;
    }
    public set bookmarkValue(value: string) {
        this._bookmarkValue = value;
    }

    public get maxValue(): number {
        return this._maxValue;
    }
    public set maxValue(value: number) {
        this._maxValue = value;
    }
    
    public get minValue(): number {
        return this._minValue;
    }
    public set minValue(value: number) {
        this._minValue = value;
    }
    
    public get bookmarkCondition(): string {
        return this._bookmarkCondition;
    }
    public set bookmarkCondition(value: string) {
        this._bookmarkCondition = value;
    }


    get code(): string { return this._assessmentCode }

    set code(pcode: string) { this._code = pcode }

    get sectionCode(): string { return this._sectionCode }

    set sectionCode(psectionCode: string) { this._sectionCode = psectionCode }

    get assessmentType(): string { return this._assessmentType }

    set assessmentType(passessmentType: string) { this._assessmentType = passessmentType }

    get createUserId(): string { return this._createUserId }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId }

    get highValue(): number { return this._highValue }

    set highValue(phighValue: number) { this._highValue = phighValue }

    get modifyDatetime(): Date { return this._modifyDatetime }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime }

    get modifyUserId(): string { return this._modifyUserId }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId }

    get description(): string { return this._description }

    set description(pdescription: string) { this._description = pdescription }

    get mutualExclusiveFlag(): string { return this._mutualExclusiveFlag }

    set mutualExclusiveFlag(pmutualExclusiveFlag: string) { this._mutualExclusiveFlag = pmutualExclusiveFlag }

    get medicalFlag(): string { return this._medicalFlag }

    set medicalFlag(pmedicalFlag: string) { this._medicalFlag = pmedicalFlag }

    get expiryDate(): Date { return this._expiryDate }

    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate }

    get reviewFlag(): string { return this._reviewFlag }

    set reviewFlag(previewFlag: string) { this._reviewFlag = previewFlag }

    get score(): number { return this._score }

    set score(pscore: number) { this._score = pscore }

    get serialVersionUID(): number { return this._serialVersionUID }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID }

    get reviewCycleDays(): number { return this._reviewCycleDays }

    set reviewCycleDays(previewCycleDays: number) { this._reviewCycleDays = previewCycleDays }

    get assessmentCode(): string { return this._assessmentCode }

    set assessmentCode(passessmentCode: string) { this._assessmentCode = passessmentCode }

    get determineSupLevelFlag(): string { return this._determineSupLevelFlag }

    set determineSupLevelFlag(pdetermineSupLevelFlag: string) { this._determineSupLevelFlag = pdetermineSupLevelFlag }

    get sealFlag(): string { return this._sealFlag }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag }

    get sectScoreOverrideFlag(): string { return this._sectScoreOverrideFlag }

    set sectScoreOverrideFlag(psectScoreOverrideFlag: string) { this._sectScoreOverrideFlag = psectScoreOverrideFlag }

    get updateAllowedFlag(): string { return this._updateAllowedFlag }

    set updateAllowedFlag(pupdateAllowedFlag: string) { this._updateAllowedFlag = pupdateAllowedFlag }

    get assessmentId(): number { return this._assessmentId }

    set assessmentId(passessmentId: number) { this._assessmentId = passessmentId }

    get requireEvaluationFlag(): string { return this._requireEvaluationFlag }

    set requireEvaluationFlag(prequireEvaluationFlag: string) { this._requireEvaluationFlag = prequireEvaluationFlag }

    get activeFlag(): string { return this._activeFlag }

    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag }

    get createDate(): Date { return this._createDate }

    set createDate(pcreateDate: Date) { this._createDate = pcreateDate }

    get scheduleCompleteDays(): number { return this._scheduleCompleteDays }

    set scheduleCompleteDays(pscheduleCompleteDays: number) { this._scheduleCompleteDays = pscheduleCompleteDays }

    get caseloadType(): string { return this._caseloadType }

    set caseloadType(pcaseloadType: string) { this._caseloadType = pcaseloadType }

    get cellSharingAlertFlag(): string { return this._cellSharingAlertFlag }

    set cellSharingAlertFlag(pcellSharingAlertFlag: string) { this._cellSharingAlertFlag = pcellSharingAlertFlag }

    get screenCode(): string { return this._screenCode }

    set screenCode(pscreenCode: string) { this._screenCode = pscreenCode }

    get createDatetime(): Date { return this._createDatetime }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime }

    get lowValue(): number { return this._lowValue }

    set lowValue(plowValue: number) { this._lowValue = plowValue }

    get requireApprovalFlag(): string { return this._requireApprovalFlag }

    set requireApprovalFlag(prequireApprovalFlag: string) { this._requireApprovalFlag = prequireApprovalFlag }

    get searchCriteriaFlag(): string { return this._searchCriteriaFlag }

    set searchCriteriaFlag(psearchCriteriaFlag: string) { this._searchCriteriaFlag = psearchCriteriaFlag }

    get sectScoreIncludeFlag(): string { return this._sectScoreIncludeFlag }

    set sectScoreIncludeFlag(psectScoreIncludeFlag: string) { this._sectScoreIncludeFlag = psectScoreIncludeFlag }

    get measure(): string { return this._measure }

    set measure(pmeasure: string) { this._measure = pmeasure }

    get calculateTotalFlag(): string { return this._calculateTotalFlag }

    set calculateTotalFlag(pcalculateTotalFlag: string) { this._calculateTotalFlag = pcalculateTotalFlag }

    get assessComment(): string { return this._assessComment }

    set assessComment(passessComment: string) { this._assessComment = passessComment }

    get overrideableFlag(): string { return this._overrideableFlag }

    set overrideableFlag(poverrideableFlag: string) { this._overrideableFlag = poverrideableFlag }

    get listSeq(): number { return this._listSeq }

    set listSeq(plistSeq: number) { this._listSeq = plistSeq }

    get assessmentClass(): string { return this._assessmentClass }

    set assessmentClass(passessmentClass: string) { this._assessmentClass = passessmentClass }

    get totalPercent(): number { return this._totalPercent }

    set totalPercent(ptotalPercent: number) { this._totalPercent = ptotalPercent }

    get effectiveDate(): Date { return this._effectiveDate }

    set effectiveDate(peffectiveDate: Date) { this._effectiveDate = peffectiveDate }

    get answers(): string { return this._answers }

    set answers(panswers: string) { this._answers = panswers }

    get offenderBookId(): number { return this._offenderBookId }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId }

    get assessmentSeq(): number { return this._assessmentSeq }

    set assessmentSeq(passessmentSeq: number) { this._assessmentSeq = passessmentSeq }

    get ansId(): number { return this._ansId }

    set ansId(pansId: number) { this._ansId = pansId }

    get parentAssessmentId(): number { return this._parentAssessmentId }

    set parentAssessmentId(pparentAssessmentId: number) { this._parentAssessmentId = pparentAssessmentId }

    get determineSupLevelFlagTemp(): string { return this._determineSupLevelFlagTemp }

    set determineSupLevelFlagTemp(pdetermineSupLevelFlagTemp: string) { this._determineSupLevelFlagTemp = pdetermineSupLevelFlagTemp }

    get requireApprovalFlagTemp(): string { return this._requireApprovalFlagTemp }

    set requireApprovalFlagTemp(prequireApprovalFlagTemp: string) { this._requireApprovalFlagTemp = prequireApprovalFlagTemp }

    get calculateTotalFlagTemp(): string { return this._calculateTotalFlagTemp }

    set calculateTotalFlagTemp(pcalculateTotalFlagTemp: string) { this._calculateTotalFlagTemp = pcalculateTotalFlagTemp }

    get reviewCycleDaysTemp(): number { return this._reviewCycleDaysTemp }

    set reviewCycleDaysTemp(previewCycleDaysTemp: number) { this._reviewCycleDaysTemp = previewCycleDaysTemp }

    get scheduleCompleteDaysTemp(): number { return this._scheduleCompleteDaysTemp }

    set scheduleCompleteDaysTemp(pscheduleCompleteDaysTemp: number) { this._scheduleCompleteDaysTemp = pscheduleCompleteDaysTemp }

    get screenCodeTemp(): string { return this._screenCodeTemp }

    set screenCodeTemp(pscreenCodeTemp: string) { this._screenCodeTemp = pscreenCodeTemp }

    get requiredFlag(): string { return this._requiredFlag }

    set requiredFlag(value: string) { this._requiredFlag = value }

    get ansBookMark(): string {return this._ansBookMark;}

    set ansBookMark(value: string) {this._ansBookMark = value;}

    get assSecNoti(): Array<AssessSectionNotifications> {return this._assSecNoti;}

    set assSecNoti(value: Array<AssessSectionNotifications>) {this._assSecNoti = value;}

    get assCodeTemp(): string {return this._assCodeTemp;}

    set assCodeTemp(value: string) {this._assCodeTemp = value;}

    toJSON(): any {
        return {
            'assessmentType': this._assessmentType,
            'createUserId': this._createUserId,
            'highValue': this._highValue,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'description': this._description,
            'mutualExclusiveFlag': this._mutualExclusiveFlag,
            'medicalFlag': this._medicalFlag,
            'expiryDate': this._expiryDate,
            'reviewFlag': this._reviewFlag,
            'score': this._score,
            'serialVersionUID': this._serialVersionUID,
            'reviewCycleDays': this._reviewCycleDays,
            'assessmentCode': this._assessmentCode,
            'determineSupLevelFlag': this._determineSupLevelFlag,
            'sealFlag': this._sealFlag,
            'sectScoreOverrideFlag': this._sectScoreOverrideFlag,
            'updateAllowedFlag': this._updateAllowedFlag,
            'assessmentId': this._assessmentId,
            'requireEvaluationFlag': this._requireEvaluationFlag,
            'activeFlag': this._activeFlag,
            'createDate': this._createDate,
            'scheduleCompleteDays': this._scheduleCompleteDays,
            'caseloadType': this._caseloadType,
            'cellSharingAlertFlag': this._cellSharingAlertFlag,
            'screenCode': this._screenCode,
            'createDatetime': this._createDatetime,
            'lowValue': this._lowValue,
            'requireApprovalFlag': this._requireApprovalFlag,
            'searchCriteriaFlag': this._searchCriteriaFlag,
            'sectScoreIncludeFlag': this._sectScoreIncludeFlag,
            'measure': this._measure,
            'calculateTotalFlag': this._calculateTotalFlag,
            'assessComment': this._assessComment,
            'overrideableFlag': this._overrideableFlag,
            'listSeq': this._listSeq,
            'assessmentClass': this._assessmentClass,
            'totalPercent': this._totalPercent,
            'effectiveDate': this._effectiveDate,
            'answers': this._answers,
            'offenderBookId': this._offenderBookId,
            'assessmentSeq': this._assessmentSeq,
            'ansId': this._ansId,
            'parentAssessmentId': this._parentAssessmentId,
            'sectionCode': this._sectionCode,
            'code': this._code,
            'requiredFlag': this._requiredFlag,
            'ansBookMark' : this._ansBookMark,
            'bookmarkCondition' : this._bookmarkCondition,
            'minValue' : this._minValue,
            'maxValue' : this._maxValue,
            'bookmarkValue' : this._bookmarkValue,
            'bookmarkStatus' : this._bookmarkStatus,
            '_answerValue' : this._answerValue,
            'assSecNoti': this._assSecNoti,
            'assCodeTemp': this._assCodeTemp,
        };
    }
}