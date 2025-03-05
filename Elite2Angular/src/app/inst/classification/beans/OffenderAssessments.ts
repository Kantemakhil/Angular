import { BaseModel } from '@commonbeans/BaseModel';

export class OffenderAssessments extends BaseModel {
    private _assessCommentText: string;
    private _createUserId: string;
    private _reviewPlaceAgyLocId: string;
    private _creationUser: string;
    private _reviewSupLevelText: string;
    private _modifyDatetime: Date;
    private _offenderBookId: number;
    private _assessmentDate: Date;
    private _modifyUserId: string;
    private _overrideReason: string;
    private _assessmentSeq: number;
    private _score: number;
    private _serialVersionUID: number;
    private _nextReviewDate: Date;
    private _reviewCommitteCode: string;
    private _overrideCommentText: string;
    private _assessorStaffId: any;
    private _assessmentTypeId: number;
    private _overridedSupLevelType: string;
    private _evaluationResultCode: string;
    private _sealFlag: string;
    private _reviewPlacementText: string;
    private _assessmentCreateLocation: string;
    private _assessStatus: string;
    private _approvedSupLevelType: string;
    private _calcSupLevelType: string;
    private _overrideReasonText: string;
    private _creationDate: Date;
    private _overrideUserId: string;
    private _createDatetime: Date;
    private _reviewSupLevelType: string;
    private _placeAgyLocId: string;
    private _assessCommitteCode: string;
    private _evaluationDate: Date;
    private _committeCommentText: string;
    private _assessStaffId: number;
    private _overrideStaffId: number;
    private _calcSupLevelTypeDesc: string;
    private _overridedSupLevelTypeDesc: string;
    private _assessmentTypeCode: string;
    private _reqFlag: any;
    private _assessorName: string;
    private _assessmentStatus: string;
    private _overrideScore: number;
    private _reviewCycleDays: number;

    public get overrideScore(): number {
        return this._overrideScore;
    }
    public set overrideScore(value: number) {
        this._overrideScore = value;
    }


    get assessorName(): string { return this._assessorName; }

    set assessorName(passessorName: string) { this._assessorName = passessorName; }

    get assessmentTypeCode(): string { return this._assessmentTypeCode; }

    set assessmentTypeCode(passessmentTypeCode: string) { this._assessmentTypeCode = passessmentTypeCode; }

    get calcSupLevelTypeDesc(): string { return this._calcSupLevelTypeDesc; }

    set calcSupLevelTypeDesc(pcalcSupLevelTypeDesc: string) { this._calcSupLevelTypeDesc = pcalcSupLevelTypeDesc; }

    get overridedSupLevelTypeDesc(): string { return this._overridedSupLevelTypeDesc; }

    set overridedSupLevelTypeDesc(poverridedSupLevelTypeDesc: string) { this._overridedSupLevelTypeDesc = poverridedSupLevelTypeDesc; }

    get assessCommentText(): string { return this._assessCommentText; }

    set assessCommentText(passessCommentText: string) { this._assessCommentText = passessCommentText; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get reviewPlaceAgyLocId(): string { return this._reviewPlaceAgyLocId; }

    set reviewPlaceAgyLocId(previewPlaceAgyLocId: string) { this._reviewPlaceAgyLocId = previewPlaceAgyLocId; }

    get creationUser(): string { return this._creationUser; }

    set creationUser(pcreationUser: string) { this._creationUser = pcreationUser; }

    get reviewSupLevelText(): string { return this._reviewSupLevelText; }

    set reviewSupLevelText(previewSupLevelText: string) { this._reviewSupLevelText = previewSupLevelText; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get assessmentDate(): Date { return this._assessmentDate; }

    set assessmentDate(passessmentDate: Date) { this._assessmentDate = passessmentDate; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get overrideReason(): string { return this._overrideReason; }

    set overrideReason(poverrideReason: string) { this._overrideReason = poverrideReason; }

    get assessmentSeq(): number { return this._assessmentSeq; }

    set assessmentSeq(passessmentSeq: number) { this._assessmentSeq = passessmentSeq; }

    get score(): number { return this._score; }

    set score(pscore: number) { this._score = pscore; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get nextReviewDate(): Date { return this._nextReviewDate; }

    set nextReviewDate(pnextReviewDate: Date) { this._nextReviewDate = pnextReviewDate; }

    get reviewCommitteCode(): string { return this._reviewCommitteCode; }

    set reviewCommitteCode(previewCommitteCode: string) { this._reviewCommitteCode = previewCommitteCode; }

    get overrideCommentText(): string { return this._overrideCommentText; }

    set overrideCommentText(poverrideCommentText: string) { this._overrideCommentText = poverrideCommentText; }

    get assessorStaffId(): any { return this._assessorStaffId; }

    set assessorStaffId(passessorStaffId: any) { this._assessorStaffId = passessorStaffId; }

    get assessmentTypeId(): number { return this._assessmentTypeId; }

    set assessmentTypeId(passessmentTypeId: number) { this._assessmentTypeId = passessmentTypeId; }

    get overridedSupLevelType(): string { return this._overridedSupLevelType; }

    set overridedSupLevelType(poverridedSupLevelType: string) { this._overridedSupLevelType = poverridedSupLevelType; }

    get evaluationResultCode(): string { return this._evaluationResultCode; }

    set evaluationResultCode(pevaluationResultCode: string) { this._evaluationResultCode = pevaluationResultCode; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get reviewPlacementText(): string { return this._reviewPlacementText; }

    set reviewPlacementText(previewPlacementText: string) { this._reviewPlacementText = previewPlacementText; }

    get assessmentCreateLocation(): string { return this._assessmentCreateLocation; }

    set assessmentCreateLocation(passessmentCreateLocation: string) { this._assessmentCreateLocation = passessmentCreateLocation; }

    get assessStatus(): string { return this._assessStatus; }

    set assessStatus(passessStatus: string) { this._assessStatus = passessStatus; }

    get approvedSupLevelType(): string { return this._approvedSupLevelType; }

    set approvedSupLevelType(papprovedSupLevelType: string) { this._approvedSupLevelType = papprovedSupLevelType; }

    get calcSupLevelType(): string { return this._calcSupLevelType; }

    set calcSupLevelType(pcalcSupLevelType: string) { this._calcSupLevelType = pcalcSupLevelType; }

    get overrideReasonText(): string { return this._overrideReasonText; }

    set overrideReasonText(poverrideReasonText: string) { this._overrideReasonText = poverrideReasonText; }

    get creationDate(): Date { return this._creationDate; }

    set creationDate(pcreationDate: Date) { this._creationDate = pcreationDate; }

    get overrideUserId(): string { return this._overrideUserId; }

    set overrideUserId(poverrideUserId: string) { this._overrideUserId = poverrideUserId; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get reviewSupLevelType(): string { return this._reviewSupLevelType; }

    set reviewSupLevelType(previewSupLevelType: string) { this._reviewSupLevelType = previewSupLevelType; }

    get placeAgyLocId(): string { return this._placeAgyLocId; }

    set placeAgyLocId(pplaceAgyLocId: string) { this._placeAgyLocId = pplaceAgyLocId; }

    get assessCommitteCode(): string { return this._assessCommitteCode; }

    set assessCommitteCode(passessCommitteCode: string) { this._assessCommitteCode = passessCommitteCode; }

    get evaluationDate(): Date { return this._evaluationDate; }

    set evaluationDate(pevaluationDate: Date) { this._evaluationDate = pevaluationDate; }

    get committeCommentText(): string { return this._committeCommentText; }

    set committeCommentText(pcommitteCommentText: string) { this._committeCommentText = pcommitteCommentText; }

    get assessStaffId(): number { return this._assessStaffId; }

    set assessStaffId(passessStaffId: number) { this._assessStaffId = passessStaffId; }

    get overrideStaffId(): number { return this._overrideStaffId; }

    set overrideStaffId(poverrideStaffId: number) { this._overrideStaffId = poverrideStaffId; }

    get reqFlag(): any { return this._reqFlag; }

    set reqFlag(preqFlag: any) { this._reqFlag = preqFlag; }

    get assessmentStatus(): string {return this._assessmentStatus;}

    set assessmentStatus(value: string) {this._assessmentStatus = value;}


    public get reviewCycleDays(): number {
        return this._reviewCycleDays;
    }
    public set reviewCycleDays(value: number) {
        this._reviewCycleDays = value;
    }

    toJSON(): any {
        return {
            'assessCommentText': this._assessCommentText,
            'createUserId': this._createUserId,
            'reviewPlaceAgyLocId': this._reviewPlaceAgyLocId,
            'creationUser': this._creationUser,
            'reviewSupLevelText': this._reviewSupLevelText,
            'modifyDatetime': this._modifyDatetime,
            'offenderBookId': this._offenderBookId,
            'assessmentDate': this._assessmentDate,
            'modifyUserId': this._modifyUserId,
            'overrideReason': this._overrideReason,
            'assessmentSeq': this._assessmentSeq,
            'score': this._score,
            'serialVersionUID': this._serialVersionUID,
            'nextReviewDate': this._nextReviewDate,
            'reviewCommitteCode': this._reviewCommitteCode,
            'overrideCommentText': this._overrideCommentText,
            'assessorStaffId': this._assessorStaffId,
            'assessmentTypeId': this._assessmentTypeId,
            'overridedSupLevelType': this._overridedSupLevelType,
            'evaluationResultCode': this._evaluationResultCode,
            'sealFlag': this._sealFlag,
            'reviewPlacementText': this._reviewPlacementText,
            'assessmentCreateLocation': this._assessmentCreateLocation,
            'assessStatus': this._assessStatus,
            'approvedSupLevelType': this._approvedSupLevelType,
            'calcSupLevelType': this._calcSupLevelType,
            'overrideReasonText': this._overrideReasonText,
            'creationDate': this._creationDate,
            'overrideUserId': this._overrideUserId,
            'createDatetime': this._createDatetime,
            'reviewSupLevelType': this._reviewSupLevelType,
            'placeAgyLocId': this._placeAgyLocId,
            'assessCommitteCode': this._assessCommitteCode,
            'evaluationDate': this._evaluationDate,
            'committeCommentText': this._committeCommentText,
            'assessStaffId': this._assessStaffId,
            'overrideStaffId': this._overrideStaffId,
            'calcSupLevelTypeDesc': this._calcSupLevelTypeDesc,
            'overridedSupLevelTypeDesc': this._overridedSupLevelTypeDesc,
            'reqFlag': this._reqFlag,
            'assessorName': this._assessorName,
            'assessmentTypeCode': this._assessmentTypeCode,
            'assessmentStatus':this._assessmentStatus,
            'overrideScore':this._overrideScore,
            'reviewCycleDays': this._reviewCycleDays
        };
    }
}
