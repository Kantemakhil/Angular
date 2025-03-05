import { BaseModel } from '@commonbeans/BaseModel';

export class TagWorkflowBrowseQueue extends BaseModel {
    private _lastName: string;
    private _offenderBookId: number;
    private _teamMemberId: number;
    private _dueDate: Date;
    private _offenderIdDisplay: string;
    private _msgId: string;
    private _clusterId: string;
    private _acknowledgementSubject: string;
    private _serialVersionUID: number;
    private _senderId: string;
    private _workflowType: string;
    private _functionType: string;
    private _severityCode: string;
    private _completeReasonode: string;
    private _workSubType: string;
    private _messageText: string;
    private _acknowledgementRequired: string;
    private _completeCommentText: string;
    private _workId: number;
    private _completeUserId: string;
    private _firstName: string;
    private _queueName: string;
    private _teamId: number;
    private _workType: string;
    private _originalMsgId: string;
    private _assignmentDate: Date;
    private _staffId: number;
    private _eventDate: Date;
    private _assignedFlag: boolean;
    private _assignedTeamId: number;
    private _completeFlag: boolean;
    private _assignOtherTeam: boolean;
    private _dButton: string;
    private _goButton: string;
    private _moduleName: string;
    private _manualCloseFlag: string;
    private _butIwp: string;
    private _enableOrDisable: number;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _taskId: string;
    private _teamCode: string;
    private _assignedTeamCode: string;

    private _completionDate: Date;
    private _sourceName: string;
    private _agyLocId: string;
    private _userId: string;
    private _assignee: string;
    private _assignToOtherUser: boolean;
    private _assignToUser: boolean;
    private _assigneeOtherUser: string;
    private _assignFromUserToTeam: boolean;
    private _offenderId: number;
    private _offenderFullName : string;


    get offenderId(): number { return this._offenderId; }

    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }
    set assignFromUserToTeam(passignFromUserToTeam: boolean) { this._assignFromUserToTeam = passignFromUserToTeam; }
    get assignFromUserToTeam(): boolean { return this._assignFromUserToTeam; }
    get assigneeOtherUser(): string { return this._assigneeOtherUser; }

    set assigneeOtherUser(p_assigneeOtherUser: string) { this._assigneeOtherUser = p_assigneeOtherUser; }
    get assignToUser(): boolean { return this._assignToUser; }

    set assignToUser(passignToUser: boolean) { this._assignToUser = passignToUser; }
    get assignToOtherUser(): boolean { return this._assignToOtherUser; }

    set assignToOtherUser(passignToOtherUser: boolean) { this._assignToOtherUser = passignToOtherUser; }
    get assignee(): string { return this._assignee; }

    set assignee(passignee: string) { this._assignee = passignee; }

    get userId(): string { return this._userId; }

    set userId(puserId: string) { this._userId = puserId; }
    get agyLocId(): string { return this._agyLocId; }

    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }


    get sourceName(): string { return this._sourceName; }

    set sourceName(psourceName: string) { this._sourceName = psourceName; }

    get completionDate(): Date { return this._completionDate; }

    set completionDate(pcompletionDate: Date) { this._completionDate = pcompletionDate; }
    get assignedTeamCode(): string { return this._assignedTeamCode; }

    set assignedTeamCode(passignedTeamCode: string) { this._assignedTeamCode = passignedTeamCode; }

    get teamCode(): string { return this._teamCode; }

    set teamCode(pteamCode: string) { this._teamCode = pteamCode; }

    get taskId(): string { return this._taskId; }

    set taskId(ptaskId: string) { this._taskId = ptaskId; }

    get enableOrDisable(): number { return this._enableOrDisable; }

    set enableOrDisable(penableOrDisable: number) { this._enableOrDisable = penableOrDisable; }

    get manualCloseFlag(): string { return this._manualCloseFlag; }

    set manualCloseFlag(pmanualCloseFlag: string) { this._manualCloseFlag = pmanualCloseFlag; }

    get butIwp(): string { return this._butIwp; }

    set butIwp(pbutIwp: string) { this._butIwp = pbutIwp; }

    get moduleName(): string { return this._moduleName; }

    set moduleName(pmoduleName: string) { this._moduleName = pmoduleName; }

    get assignOtherTeam(): boolean { return this._assignOtherTeam; }

    set assignOtherTeam(passignOtherTeam: boolean) { this._assignOtherTeam = passignOtherTeam; }

    get completeFlag(): boolean { return this._completeFlag; }

    set completeFlag(pcompleteFlag: boolean) { this._completeFlag = pcompleteFlag; }

    get assignedTeamId(): number { return this._assignedTeamId; }

    set assignedTeamId(passignedTeamId: number) { this._assignedTeamId = passignedTeamId; }

    get assignedFlag(): boolean { return this._assignedFlag; }

    set assignedFlag(passignedFlag: boolean) { this._assignedFlag = passignedFlag; }

    get lastName(): string { return this._lastName; }

    set lastName(plastName: string) { this._lastName = plastName; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get teamMemberId(): number { return this._teamMemberId; }

    set teamMemberId(pteamMemberId: number) { this._teamMemberId = pteamMemberId; }

    get dueDate(): Date { return this._dueDate; }

    set dueDate(pdueDate: Date) { this._dueDate = pdueDate; }

    get offenderIdDisplay(): string { return this._offenderIdDisplay; }

    set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }

    get msgId(): string { return this._msgId; }

    set msgId(pmsgId: string) { this._msgId = pmsgId; }

    get clusterId(): string { return this._clusterId; }

    set clusterId(pclusterId: string) { this._clusterId = pclusterId; }

    get acknowledgementSubject(): string { return this._acknowledgementSubject; }

    set acknowledgementSubject(packnowledgementSubject: string) { this._acknowledgementSubject = packnowledgementSubject; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get senderId(): string { return this._senderId; }

    set senderId(psenderId: string) { this._senderId = psenderId; }

    get workflowType(): string { return this._workflowType; }

    set workflowType(pworkflowType: string) { this._workflowType = pworkflowType; }

    get functionType(): string { return this._functionType; }

    set functionType(pfunctionType: string) { this._functionType = pfunctionType; }

    get severityCode(): string { return this._severityCode; }

    set severityCode(pseverityCode: string) { this._severityCode = pseverityCode; }

    get completeReasonode(): string { return this._completeReasonode; }

    set completeReasonode(pcompleteReasonode: string) { this._completeReasonode = pcompleteReasonode; }

    get workSubType(): string { return this._workSubType; }

    set workSubType(pworkSubType: string) { this._workSubType = pworkSubType; }

    get messageText(): string { return this._messageText; }

    set messageText(pmessageText: string) { this._messageText = pmessageText; }

    get acknowledgementRequired(): string { return this._acknowledgementRequired; }

    set acknowledgementRequired(packnowledgementRequired: string) { this._acknowledgementRequired = packnowledgementRequired; }

    get completeCommentText(): string { return this._completeCommentText; }

    set completeCommentText(pcompleteCommentText: string) { this._completeCommentText = pcompleteCommentText; }

    get workId(): number { return this._workId; }

    set workId(pworkId: number) { this._workId = pworkId; }

    get completeUserId(): string { return this._completeUserId; }

    set completeUserId(pcompleteUserId: string) { this._completeUserId = pcompleteUserId; }

    get firstName(): string { return this._firstName; }

    set firstName(pfirstName: string) { this._firstName = pfirstName; }

    get queueName(): string { return this._queueName; }

    set queueName(pqueueName: string) { this._queueName = pqueueName; }

    get teamId(): number { return this._teamId; }

    set teamId(pteamId: number) { this._teamId = pteamId; }

    get workType(): string { return this._workType; }

    set workType(pworkType: string) { this._workType = pworkType; }

    get originalMsgId(): string { return this._originalMsgId; }

    set originalMsgId(poriginalMsgId: string) { this._originalMsgId = poriginalMsgId; }

    get assignmentDate(): Date { return this._assignmentDate; }

    set assignmentDate(passignmentDate: Date) { this._assignmentDate = passignmentDate; }

    get staffId(): number { return this._staffId; }

    set staffId(pstaffId: number) { this._staffId = pstaffId; }

    get eventDate(): Date { return this._eventDate; }

    set eventDate(peventDate: Date) { this._eventDate = peventDate; }

    get dButton(): string { return this._dButton; }

    set dButton(pdButton: string) { this._dButton = pdButton; }

    get goButton(): string { return this._goButton; }

    set goButton(pgoButton: string) { this._goButton = pgoButton; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get offenderFullName(): string { return this._offenderFullName; }

    set offenderFullName(poffenderFullName: string) { this._offenderFullName = poffenderFullName; }




    toJSON(): any {
        return {
            'lastName': this._lastName,
            'pbutIwp': this._butIwp,
            'offenderBookId': this._offenderBookId,
            'teamMemberId': this._teamMemberId,
            'dueDate': this._dueDate,
            'offenderIdDisplay': this._offenderIdDisplay,
            'msgId': this._msgId,
            'clusterId': this._clusterId,
            'acknowledgementSubject': this._acknowledgementSubject,
            'serialVersionUID': this._serialVersionUID,
            'senderId': this._senderId,
            'workflowType': this._workflowType,
            'functionType': this._functionType,
            'severityCode': this._severityCode,
            'completeReasonode': this._completeReasonode,
            'workSubType': this._workSubType,
            'messageText': this._messageText,
            'acknowledgementRequired': this._acknowledgementRequired,
            'completeCommentText': this._completeCommentText,
            'workId': this._workId,
            'completeUserId': this._completeUserId,
            'firstName': this._firstName,
            'queueName': this._queueName,
            'teamId': this._teamId,
            'workType': this._workType,
            'originalMsgId': this._originalMsgId,
            'assignmentDate': this._assignmentDate,
            'staffId': this._staffId,
            'eventDate': this._eventDate,
            'assignedFlag': this._assignedFlag,
            'assignedTeamId': this._assignedTeamId,
            'completeFlag': this._completeFlag,
            'assignOtherTeam': this._assignOtherTeam,
            'dButton': this._dButton,
            'goButton': this._goButton,
            'moduleName': this._moduleName,
            'manualCloseFlag': this._manualCloseFlag,
            'enableOrDisable': this._enableOrDisable,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'taskId': this._taskId,
            'teamCode': this._teamCode,
            'assignedTeamCode': this._assignedTeamCode,
            'completionDate': this._completionDate,
            'sourceName': this._sourceName,
            'agyLocId': this._agyLocId,
            'userId': this._userId,
            'assignee': this._assignee,
            'assignToOtherUser': this._assignToOtherUser,
            'assignToUser': this._assignToUser,
            'assigneeOtherUser': this._assigneeOtherUser,
            'assignFromUserToTeam': this.assignFromUserToTeam,
            'offenderId': this._offenderId,
            'offenderFullName':this._offenderFullName
        };
    }
}
