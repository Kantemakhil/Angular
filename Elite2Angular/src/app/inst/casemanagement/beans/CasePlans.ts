import { CasePlanStaff } from "./CasePlanStaff";

export class CasePlans {
    private _casePlanId: number;
    private _instPosition: string;
    private _createUserId: string;
    private _creationUser: string;
    private _role: string;
    private _endDate: Date;
    private _offenderBookId: number;
    private _changes: string;
    private _modifyUserId: string;
    private _instSacStaffId: number;
    private _supervisionLevel: string;
    private _verifiedFlag: string;
    private _serialVersionUID: number;
    private _instRole: string;
    private _nextReviewDate: Date;
    private _sacStaffId: number;
    private _calAgyLocId: string;
    private _instFromDate: Date;
    private _sealFlag: any;
    private _autoAssessModifyDatetime: Date;
    private _autoConditionModifyDatetime: Date;
    private _caseloadType: string;
    private _creationDate: Date;
    private _createDateTime: Date;
    private _instCalAgyLocId: string;
    private _fromDate: Date;
    private _modifyDateTime: Date;
    private _agyLocId: string;
    private _position: string;
    private _casePlanStatus: string;
    private _startDate: Date;
    private _firstName: string;
    private _userId: string;
    private _lastName: string;
    private _officer: string;
    private _supervisionLevelDesc: string;
    private _instCalAgyLocIdDesc: string;
    private _casePlanStatusDesc: string;
    private _calAgyLocIdDesc: string;
    private _sacStaffIdDesc: string;
    private _reqReview: string;
    private _custodialLocation: string;
    private _list: Array<CasePlanStaff>;
    private _lastPcoDate: Date;
    private _casePlanUserId: string;
    private _reviewFlag: string;
    private _workFlowStatus: string;
    private _cpOwnerName: string;
    private _instStaffName: string;
    private _staffIdList: Array<number>;

    private _communityLocation: string;
    public get communityLocation(): string {
        return this._communityLocation;
    }
    public set communityLocation(value: string) {
        this._communityLocation = value;
    }
    private _communityStaffName: string;
    public get communityStaffName(): string {
        return this._communityStaffName;
    }
    public set communityStaffName(value: string) {
        this._communityStaffName = value;
    }

    public get workFlowStatus(): string {
        return this._workFlowStatus;
    }
    public set workFlowStatus(value: string) {
        this._workFlowStatus = value;
    }


    public get reviewFlag(): string {
        return this._reviewFlag;
    }
    public set reviewFlag(value: string) {
        this._reviewFlag = value;
    }
    
    get casePlanUserId(): string {  return this._casePlanUserId;}
    set casePlanUserId(value: string) {this._casePlanUserId = value;}


    get lastPcoDate(): Date {return this._lastPcoDate;  }
    set lastPcoDate(value: Date) { this._lastPcoDate = value;}

    get custodialLocation(): string { return this._custodialLocation; }
    set custodialLocation(value: string) { this._custodialLocation = value; }
    get list(): Array<CasePlanStaff> { return this._list; }
    set list(value: Array<CasePlanStaff>) { this._list = value;}
    get casePlanId(): number { return this._casePlanId; }
    set casePlanId( pcasePlanId: number ) { this._casePlanId = pcasePlanId; }
    get instPosition(): string { return this._instPosition; }
    set instPosition( pinstPosition: string ) { this._instPosition = pinstPosition; }
    get createUserId(): string { return this._createUserId; }
    set createUserId( pcreateUserId: string ) { this._createUserId = pcreateUserId; }
    get creationUser(): string { return this._creationUser; }
    set creationUser( pcreationUser: string ) { this._creationUser = pcreationUser; }
    get role(): string { return this._role; }
    set role( prole: string ) { this._role = prole; }
    get endDate(): Date { return this._endDate; }
    set endDate( pendDate: Date ) { this._endDate = pendDate; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId( poffenderBookId: number ) { this._offenderBookId = poffenderBookId; }
    get changes(): string { return this._changes; }
    set changes( pchanges: string ) { this._changes = pchanges; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId( pmodifyUserId: string ) { this._modifyUserId = pmodifyUserId; }
    get instSacStaffId(): number { return this._instSacStaffId; }
    set instSacStaffId( pinstSacStaffId: number ) { this._instSacStaffId = pinstSacStaffId; }
    get supervisionLevel(): string { return this._supervisionLevel; }
    set supervisionLevel( psupervisionLevel: string ) { this._supervisionLevel = psupervisionLevel; }
    get verifiedFlag(): string { return this._verifiedFlag; }
    set verifiedFlag( pverifiedFlag: string ) { this._verifiedFlag = pverifiedFlag; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID( pserialVersionUID: number ) { this._serialVersionUID = pserialVersionUID; }
    get instRole(): string { return this._instRole; }
    set instRole( pinstRole: string ) { this._instRole = pinstRole; }
    get nextReviewDate(): Date { return this._nextReviewDate; }
    set nextReviewDate( pnextReviewDate: Date ) { this._nextReviewDate = pnextReviewDate; }
    get sacStaffId(): number { return this._sacStaffId; }
    set sacStaffId( psacStaffId: number ) { this._sacStaffId = psacStaffId; }
    get calAgyLocId(): string { return this._calAgyLocId; }
    set calAgyLocId( pcalAgyLocId: string ) { this._calAgyLocId = pcalAgyLocId; }
    get instFromDate(): Date { return this._instFromDate; }
    set instFromDate( pinstFromDate: Date ) { this._instFromDate = pinstFromDate; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }
    get autoAssessModifyDatetime(): Date { return this._autoAssessModifyDatetime; }
    set autoAssessModifyDatetime( pautoAssessModifyDatetime: Date ) { this._autoAssessModifyDatetime = pautoAssessModifyDatetime; }
    get autoConditionModifyDatetime(): Date { return this._autoConditionModifyDatetime; }
    set autoConditionModifyDatetime( pautoConditionModifyDatetime: Date ) {
        this._autoConditionModifyDatetime =
            pautoConditionModifyDatetime;
    }
    get caseloadType(): string { return this._caseloadType; }
    set caseloadType( pcaseloadType: string ) { this._caseloadType = pcaseloadType; }
    get creationDate(): Date { return this._creationDate; }
    set creationDate( pcreationDate: Date ) { this._creationDate = pcreationDate; }
    get createDateTime(): Date { return this._createDateTime; }
    set createDateTime( pcreateDateTime: Date ) { this._createDateTime = pcreateDateTime; }
    get instCalAgyLocId(): string { return this._instCalAgyLocId; }
    set instCalAgyLocId( pinstCalAgyLocId: string ) { this._instCalAgyLocId = pinstCalAgyLocId; }
    get fromDate(): Date { return this._fromDate; }
    set fromDate( pfromDate: Date ) { this._fromDate = pfromDate; }
    get modifyDateTime(): Date { return this._modifyDateTime; }
    set modifyDateTime( pmodifyDateTime: Date ) { this._modifyDateTime = pmodifyDateTime; }
    get agyLocId(): string { return this._agyLocId; }
    set agyLocId( pagyLocId: string ) { this._agyLocId = pagyLocId; }
    get position(): string { return this._position; }
    set position( pposition: string ) { this._position = pposition; }
    get casePlanStatus(): string { return this._casePlanStatus; }
    set casePlanStatus( pcasePlanStatus: string ) { this._casePlanStatus = pcasePlanStatus; }
    get startDate(): Date { return this._startDate; }
    set startDate( pstartDate: Date ) { this._startDate = pstartDate; }
    get lastName(): string { return this._lastName; }
    set lastName( plastName: string ) { this._lastName = plastName; }
    get userId(): string { return this._userId; }
    set userId( puserId: string ) { this._userId = puserId; }
    get firstName(): string { return this._firstName; }
    set firstName( pfirstName: string ) { this._firstName = pfirstName; }
    get officer(): string { return this._officer; }
    set officer( pofficer: string ) { this._officer = pofficer; }
    get supervisionLevelDesc(): string { return this._supervisionLevelDesc; }
    set supervisionLevelDesc( psupervisionLevelDesc: string ) { this._supervisionLevelDesc = psupervisionLevelDesc; }
    get instCalAgyLocIdDesc(): string { return this._instCalAgyLocIdDesc; }
    set instCalAgyLocIdDesc( pinstCalAgyLocIdDesc: string ) { this._instCalAgyLocIdDesc = pinstCalAgyLocIdDesc; }
    get casePlanStatusDesc(): string { return this._casePlanStatusDesc; }
    set casePlanStatusDesc( pcasePlanStatusDesc: string ) { this._casePlanStatusDesc = pcasePlanStatusDesc; }
    get calAgyLocIdDesc(): string { return this._calAgyLocIdDesc; }
    set calAgyLocIdDesc( pcalAgyLocIdDesc: string ) { this._calAgyLocIdDesc = pcalAgyLocIdDesc; }
    get sacStaffIdDesc(): string { return this._sacStaffIdDesc; }
    set sacStaffIdDesc( psacStaffIdDesc: string ) { this._sacStaffIdDesc = psacStaffIdDesc; }
    get reqReview(): string { return this._reqReview; }
    set reqReview( preqReview: string ) { this._reqReview = preqReview; }
    public get cpOwnerName(): string { return this._cpOwnerName;}
    public set cpOwnerName(value: string) {this._cpOwnerName = value;}
    public get instStaffName(): string {
        return this._instStaffName;
    }
    public set instStaffName(value: string) {
        this._instStaffName = value;
    }

    get staffIdList(): Array<number> { return this._staffIdList; }
    set staffIdList(value: Array<number>) { this._staffIdList = value;}

    toJSON(): any {
        return {
            'casePlanId': this._casePlanId,
            'instPosition': this._instPosition,
            'createUserId': this._createUserId,
            'creationUser': this._creationUser,
            'role': this._role,
            'endDate': this._endDate,
            'offenderBookId': this._offenderBookId,
            'changes': this._changes,
            'modifyUserId': this._modifyUserId,
            'instSacStaffId': this._instSacStaffId,
            'supervisionLevel': this._supervisionLevel,
            'verifiedFlag': this._verifiedFlag,
            'serialVersionUID': this._serialVersionUID,
            'instRole': this._instRole,
            'nextReviewDate': this._nextReviewDate,
            'sacStaffId': this._sacStaffId,
            'calAgyLocId': this._calAgyLocId,
            'instFromDate': this._instFromDate,
            'sealFlag': this._sealFlag,
            'autoAssessModifyDatetime': this._autoAssessModifyDatetime,
            'autoConditionModifyDatetime': this._autoConditionModifyDatetime,
            'caseloadType': this._caseloadType,
            'creationDate': this._creationDate,
            'createDateTime': this._createDateTime,
            'instCalAgyLocId': this._instCalAgyLocId,
            'fromDate': this._fromDate,
            'modifyDateTime': this._modifyDateTime,
            'agyLocId': this._agyLocId,
            'position': this._position,
            'casePlanStatus': this._casePlanStatus,
            'startDate': this._startDate,
            'lastName': this._lastName,
            'userId': this._userId,
            'firstName': this._firstName,
            'officer': this._officer,
            'supervisionLevelDesc': this._supervisionLevelDesc,
            'instCalAgyLocIdDesc': this._instCalAgyLocIdDesc,
            'casePlanStatusDesc': this._casePlanStatusDesc,
            'calAgyLocIdDesc': this._calAgyLocIdDesc,
            'sacStaffIdDesc': this._sacStaffIdDesc,
            'reqReview': this._reqReview,
            'list':this._list,
            'lastPcoDate':this._lastPcoDate,
            'reviewFlag':this._reviewFlag,
            'workFlowStatus':this._workFlowStatus,
            'communityStaffName':this._communityStaffName,
            'communityLocation':this._communityLocation,
            'cpOwnerName': this._cpOwnerName,
            'instStaffName': this._instStaffName,
            'staffIdList': this._staffIdList
        };
    }
}
