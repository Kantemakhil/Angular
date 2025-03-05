import {BaseModel} from '@commonbeans/BaseModel'

export class CourtReport extends BaseModel {
    
    private _orderId:number;
    private _reportType: string;
    private _nbtReportType:string;
    private _court: string;
    private _nbtcourtDesc:string;
    private _dateRequested: Date;
    private _dueDate: Date;
    private _dateOfCompletion: Date;
    private _reportStatus: string;
    private _nbtReportStatus:string;
    private _courtSeriousnessLevel: string;
    private _nbtcourtSeriousnessLevel:string;
    private _caseId: number;
    private _offenderBookId: number;
    private _issueDate: Date;
    private _modifyDateTime: Date;
    private _createDateTime: Date;
    private _courtDate: Date;
    private _modifyUserId: string;
    private _createUserId: string;
    private _agyLocId: string;
    private _comments:string;
    private _offenderProceedingId:number;
    private _functionType:string;
    private _teamResponsible: string;
    private _teamId: string;
    private _workflowId:number;
    private _teamName: string;
    private _lastName: string;
    private _firstName: string;
    private _areaType:string;
    private _area:string;
    private _workType:string
    //private _courtInfoId: string;
    //private _courtSeriousnessLevel: string;
    private _orderSeriousnessLevel: string;
    //private _staffWorkId: number;
    private _eventId: number;
    //private _completeStaffId:number;
    //private _interventionatierCode: string;
    private _nonReportFlag: string;
    private _cpsReceivedDate: Date;
    private _position:string;
    private _role:string;
    private _fromDate:Date;
    private _teamMemberId:string;

    private _assignmentDate: Date;

    private _offenderId: number;
    private _sourceName: string;

    /*private _messageId: string;
    private _workFlowId: number;
    private _offenderProceedingId: number;
    private _sealFlag:string;
*/

get offenderId(): number { return this._offenderId; }

set offenderId(poffenderId: number) { this._offenderId = poffenderId; }

get orderId(): number { return this._orderId; }

set orderId(orderId: number ) { this._orderId = orderId; }

get reportType(): string { return this._reportType; }

set reportType(reportType: string ) { this._reportType = reportType; }

get nbtreportType(): string { return this._nbtReportType; }

set nbtreportType(nbtReportType: string ) { this._nbtReportType = nbtReportType; }

get court(): string { return this._court; }

set court(court: string ) { this._court = court; }

get nbtcourtDesc(): string { return this._nbtcourtDesc; }

set nbtcourtDesc(nbtcourtDesc: string ) { this._nbtcourtDesc = nbtcourtDesc; }

get courtSeriousnessLevel(): string { return this._courtSeriousnessLevel; }

set courtSeriousnessLevel(courtSeriousnessLevel: string ) { this._courtSeriousnessLevel = courtSeriousnessLevel; }

/*get orderDate(): Date{ return this._orderDate; }

set orderDate(orderDate: Date ) { this._orderDate = orderDate; }

get expiryDate(): Date{ return this._expiryDate; }

set expiryDate(expiryDate: Date ) { this._expiryDate = expiryDate; }*/

get comments(): string { return this._comments; }

set comments(comments: string ) { this._comments = comments; }

get reportStatus(): string { return this._reportStatus; }

set reportStatus(reportStatus: string ) { this._reportStatus = reportStatus; }

get nbtReportStatus(): string { return this._nbtReportStatus; }

set nbtReportStatus(nbtReportStatus: string ) { this._nbtReportStatus = nbtReportStatus; }

get caseId(): number { return this._caseId; }

set caseId( caseId: number ) { this._caseId = caseId; }

get offenderBookId(): number { return this._offenderBookId; }

set offenderBookId( offenderBookId: number ) { this._offenderBookId = offenderBookId; }

get offenderProceedingId(): number { return this._offenderProceedingId; }

set offenderProceedingId( offenderProceedingId: number ) { this._offenderProceedingId = offenderProceedingId; }

get modifyDateTime(): Date { return this._modifyDateTime; }

set modifyDateTime( modifyDateTime: Date ) { this._modifyDateTime = modifyDateTime; }

get createDateTime(): Date { return this._createDateTime; }

set createDateTime( createDateTime: Date ) { this._createDateTime = createDateTime; }

get modifyUserId(): string { return this._modifyUserId; }

set modifyUserId( modifyUserId: string ) { this._modifyUserId = modifyUserId; }

get createUserId(): string { return this._createUserId; }

set createUserId( createUserId: string ) { this._createUserId = createUserId; }

get courtDate(): Date { return this._courtDate; }

set courtDate( courtDate: Date ) { this._courtDate = courtDate; }

get dueDate(): Date { return this._dueDate; }

set dueDate( dueDate: Date ) { this._dueDate = dueDate; }

get dateRequested(): Date { return this._dateRequested; }

set dateRequested( dateRequested: Date ) { this._dateRequested = dateRequested; }

get dateOfCompletion(): Date { return this._dateOfCompletion; }

set dateOfCompletion( dateOfCompletion: Date ) { this._dateOfCompletion = dateOfCompletion; }

get issueDate(): Date { return this._issueDate; }

set issueDate( issuDate: Date ) { this._issueDate = issuDate; }

get cpsReceivedDate(): Date { return this._cpsReceivedDate; }

set cpsReceivedDate( cpsReceivedDate: Date ) { this._cpsReceivedDate = cpsReceivedDate; }

get agyLocId(): string { return this._agyLocId; }

set agyLocId(issuingAgyLocId: string ) { this._agyLocId = issuingAgyLocId; }

/*get courtInfoId(): string { return this._courtInfoId; }

set courtInfoId(courtInfoId: string ) { this._courtInfoId = courtInfoId; }

get courtSeriousnessLevel(): string { return this._courtSeriousnessLevel; }

set courtSeriousnessLevel(courtSeriousnessLevel: string ) { this._courtSeriousnessLevel = courtSeriousnessLevel; }

get orderSeriousnessLevel(): string { return this._orderSeriousnessLevel; }

set orderSeriousnessLevel(orderSeriousnessLevel: string ) { this._orderSeriousnessLevel = orderSeriousnessLevel; }

get staffWorkId(): number { return this._staffWorkId; }

set staffWorkId( staffWorkId: number ) { this._staffWorkId = staffWorkId; }*/

get eventId(): number { return this._eventId; }

set eventId( eventId: number ) { this._eventId = eventId; }

/*get completeStaffId(): number { return this._completeStaffId; }

set completeStaffId( completeStaffId: number ) { this._completeStaffId = completeStaffId; }

get workFlowId(): number { return this._workFlowId; }

set workFlowId( workFlowId: number ) { this._workFlowId = workFlowId; }

get offenderProceedingId(): number { return this._offenderProceedingId; }

set offenderProceedingId( offenderProceedingId: number ) { this._offenderProceedingId = offenderProceedingId; }

get interventionatierCode(): string { return this._interventionatierCode; }

set interventionatierCode( interventionatierCode: string ) { this._interventionatierCode = interventionatierCode; }
*/
get nonReportFlag(): string { return this._nonReportFlag; }

set nonReportFlag(nonReportFlag: string ) { this._nonReportFlag = nonReportFlag; }

get functionType(): string { return this._functionType; }

set functionType(functionType: string ) { this._functionType = functionType; }

get teamResponsible(): string { return this._teamResponsible; }

set teamResponsible(teamResponsible: string ) { this._teamResponsible = teamResponsible; }

get teamName(): string { return this._teamName; }

set teamName(teamName: string ) { this._teamName = teamName; }

get lastName(): string { return this._lastName; }

set lastName(lastName: string ) { this._lastName = lastName; }

get areaType(): string { return this._areaType; }

set areaType(areaType: string ) { this._areaType = areaType; }

get area(): string { return this._area; }

set area(area: string ) { this._area = area; }

get teamId(): string { return this._teamId; }

set teamId(teamId: string ) { this._teamId = teamId; }

get workflowId(): number { return this._workflowId; }

set workflowId(workflowId: number ) { this._workflowId = workflowId; }

get position(): string { return this._position; }

set position(position: string ) { this._position = position; }

get role(): string { return this._role; }

set role(role: string ) { this._role = role; }

get fromDate(): Date { return this._fromDate; }

set fromDate( fromDate: Date ) { this.fromDate = fromDate; }

get teamMemberId(): string { return this._teamMemberId; }

set teamMemberId( teamMemberId: string ) { this._teamMemberId = teamMemberId; }

get assignmentDate(): Date { return this._assignmentDate; }

set assignmentDate( passignmentDate: Date ) { this._assignmentDate = passignmentDate; }
get workType(): string { return this._workType; }

set workType( pworkType: string ) { this._workType = pworkType; }

get sourceName(): string { return this._sourceName; }

 set sourceName(psourceName: string) { this._sourceName = psourceName; }


/*get messageId(): string { return this._messageId; }

set messageId(messageId: string ) { this._messageId = messageId; }

get sealFlag(): string { return this._sealFlag; }

set sealFlag(sealFlag: string ) { this._sealFlag = sealFlag; }*/

toJSON(): any {
    return {
        'orderId':this._orderId,
        'caseId': this._caseId,
        'offenderBookId': this._offenderBookId,
        'reportType': this._reportType,
        'nbtReportType':this._nbtReportType,
        'court': this._court,
        'nbtcourtDesc':this._nbtcourtDesc,
        'dateRequested':this._dateRequested,
        'dateOfCompletion':this._dateOfCompletion,
        'comments':this._comments,
        'reportStatus':this._reportStatus,
        'nbtReportStatus':this._nbtReportStatus,
        'modifyDateTime': this._modifyDateTime,
        'modifyUserId':  this._modifyUserId,
        'createUserId': this._createUserId,
        'createDateTime':  this._createDateTime,
        'dueDate': this._dueDate,
        'issueDate': this._issueDate,
        'cpsReceivedDate': this._cpsReceivedDate,
        'courtDate':this._courtDate,
        'agyLocId': this._agyLocId,
        'offenderProceedingId':this._offenderProceedingId,
        /*'courtInfoId': this._courtInfoId,
        'courtSeriousnessLevel':this._courtSeriousnessLevel,
        'orderSeriousnessLevel':this._orderSeriousnessLevel,
        'staffWorkId': this._staffWorkId,*/
        'eventId': this._eventId,
        /*'completeStaffId': this._completeStaffId,
        'workFlowId': this._workFlowId,*/
        /*'offenderProceedingId': this._offenderProceedingId,
        'interventionatierCode': this._interventionatierCode,*/
        'nonReportFlag': this._nonReportFlag,
        'courtSeriousnessLevel':this._courtSeriousnessLevel,
        'nbtcourtSeriousnessLevel':this._nbtcourtSeriousnessLevel,
        'functionType': this._functionType,
        'teamResponsible': this._teamResponsible,
        'teamName': this._teamName,
        'lastName': this._lastName,
        'firstName': this._firstName,
        'teamId':this._teamId,
        'position':this._position,
        'fromdate':this._fromDate,
        'role':this._role,
        'teamMemberId':this._teamMemberId,
        'assignmentDate':this._assignmentDate,
        'workType':this._workType,
        'offenderId': this._offenderId,
        'sourceName': this._sourceName,
        
        
    
       /* 'messageId':  this._messageId,
        'sealFlag': this._sealFlag,*/
        
    };
}
}