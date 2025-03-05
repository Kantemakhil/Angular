import { BaseModel } from '@commonbeans/BaseModel';
export class TagWorkflowAdmQueryTeamTasks extends BaseModel {
    private _pCaseloadId: string;
    private _caseloadId: string;
    private _pOffenderBookId: number;
    private _pWorkType: string;
    private _pWorkSubType: string;
    private _pTeamId: number;
    private _pStaffId: number;
    private _pCompletionStatus: string;
    private _pDueFromDate: Date;
    private _pDueToDate: Date;
    private _assignmentDate: string;
    private _workType: string;
    private _workTypeDesc: string;
    private _workTypeDescription: string;
    private _officerName: string;
    private _offenderIdDisplay: string;
    private _offenderName: string;
    private _dueDate: string;
    private _completionDate: string;
    private _completeReasonDesc: string;
    private _details: string;
    private _workId: number;
    private _offenderFirstName: string;
    private _offenderLastName: string;
    private _taskAssignmentHtyId: number;
    private _workflowHistoryId: number;
    private _offenderBookId: number;
    private _workSubType: string;
    private _completeReasonCode: string;
    

    get completeReasonCode(): string { return this._completeReasonCode; }
    set completeReasonCode(completeReasonCode: string) { this._completeReasonCode = completeReasonCode; }

    get taskAssignmentHtyId(): number { return this._taskAssignmentHtyId; }
    set taskAssignmentHtyId(taskAssignmentHtyId: number) { this._taskAssignmentHtyId = taskAssignmentHtyId; }

    get workflowHistoryId(): number { return this._workflowHistoryId; }
    set workflowHistoryId(workflowHistoryId: number) { this._workflowHistoryId = workflowHistoryId; }

    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(offenderBookId: number) { this._offenderBookId = offenderBookId; }

    get workSubType(): string { return this._workSubType; }
    set workSubType(workSubType: string) { this._workSubType = workSubType; }

    get offenderFirstName(): string { return this._offenderFirstName; }
    set offenderFirstName(offenderFirstName: string) { this._offenderFirstName = offenderFirstName; }

    get offenderLastName(): string { return this._offenderLastName; }
    set offenderLastName(offenderLastName: string) { this._offenderLastName = offenderLastName; }

    get pCaseloadId(): string { return this._pCaseloadId; }
    set pCaseloadId(pCaseloadId: string) { this._pCaseloadId = pCaseloadId; }

    get caseloadId(): string { return this._caseloadId; }
    set caseloadId(caseloadId: string) { this._caseloadId = caseloadId; }

    get pOffenderBookId(): number { return this._pOffenderBookId; }
    set pOffenderBookId(pOffenderBookId: number) { this._pOffenderBookId = pOffenderBookId; }

    get pWorkType(): string { return this._pWorkType; }
    set pWorkType(pWorkType: string) { this._pWorkType = pWorkType; }

    get pWorkSubType(): string { return this._pWorkSubType; }
    set pWorkSubType(pWorkSubType: string) { this._pWorkSubType = pWorkSubType; }

    get pTeamId(): number { return this._pTeamId; }
    set pTeamId(pTeamId: number) { this._pTeamId = pTeamId; }

    get pStaffId(): number { return this._pStaffId; }
    set pStaffId(pStaffId: number) { this._pStaffId = pStaffId; }

    get pCompletionStatus(): string { return this._pCompletionStatus; }
    set pCompletionStatus(pCompletionStatus: string) { this._pCompletionStatus = pCompletionStatus; }

    get pDueFromDate(): Date { return this._pDueFromDate; }
    set pDueFromDate(pDueFromDate: Date) { this._pDueFromDate = pDueFromDate; }

    get pDueToDate(): Date { return this._pDueToDate; }
    set pDueToDate(pDueToDate: Date) { this._pDueToDate = pDueToDate; }

    get assignmentDate(): string { return this._assignmentDate; }
    set assignmentDate(assignmentDate: string) { this._assignmentDate = assignmentDate; }

    get workType(): string { return this._workType; }
    set workType(workType: string) { this._workType = workType; }

    get workTypeDescription(): string { return this._workTypeDescription; }
    set workTypeDescription(workTypeDescription: string) { this._workTypeDescription = workTypeDescription; }

    get workTypeDesc(): string { return this._workTypeDesc; }
    set workTypeDesc(workTypeDesc: string) { this._workTypeDesc = workTypeDesc; }

    get officerName(): string { return this._officerName; }
    set officerName(officerName: string) { this._officerName = officerName; }

    get offenderIdDisplay(): string { return this._offenderIdDisplay; }
    set offenderIdDisplay(offenderIdDisplay: string) { this._offenderIdDisplay = offenderIdDisplay; }

    get offenderName(): string { return this._offenderName; }
    set offenderName(offenderName: string) { this._offenderName = offenderName; }

    get dueDate(): string { return this._dueDate; }
    set dueDate(dueDate: string) { this._dueDate = dueDate; }

    get completionDate(): string { return this._completionDate; }
    set completionDate(completionDate: string) { this._completionDate = completionDate; }

    get completeReasonDesc(): string { return this._completeReasonDesc; }
    set completeReasonDesc(completeReasonDesc: string) { this._completeReasonDesc = completeReasonDesc; }

    get details(): string { return this._details; }
    set details(details: string) { this._details = details; }

    get workId(): number { return  this._workId; }

         set workId(pworkId: number) { this._workId = pworkId; }


    toJSON(): any {
        return {
            'pCaseloadId': this._pCaseloadId,
            'caseloadId': this._caseloadId,
            'pOffenderBookId': this._pOffenderBookId,
            'pWorkType': this._pWorkType,
            'pWorkSubType': this._pWorkSubType,
            'pTeamId': this._pTeamId,
            'pStaffId': this._pStaffId,
            'pCompletionStatus': this._pCompletionStatus,
            'pDueFromDate': this._pDueFromDate,
            'pDueToDate': this._pDueToDate,
            'assignmentDate': this._assignmentDate,
            'workType': this._workType,
            'workTypeDesc': this._workTypeDesc,
            'officerName': this._officerName,
            'offenderIdDisplay': this._offenderIdDisplay,
            'offenderName': this._offenderName,
            'dueDate': this._dueDate,
            'completionDate': this._completionDate,
            'completeReasonDesc': this._completeReasonDesc,
            'details': this._details,
            'offenderFirstName': this._offenderFirstName,
            'offenderLastName': this._offenderLastName,
            'taskAssignmentHtyId': this._taskAssignmentHtyId,
            'workflowHistoryId': this._workflowHistoryId,
            'workSubType': this._workSubType,
            'offenderBookId': this._offenderBookId,
            'completeReasonCode': this._completeReasonCode,
            'workId': this._workId,
            'workTypeDescription': this._workTypeDescription,
        };
    }
}

