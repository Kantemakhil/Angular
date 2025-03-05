    export class TaskAssignmentHty {
         private _createUserId: string;
         private _modifyDatetime: number;
         private _offenderBookId: number;
         private _triggerName: string;
         private _dueDate: number;
         private _modifyUserId: string;
         private _workTypeDescription: string;
         private _workflowHistoryId: number;
         private _serialVersionUID: number;
         private _details: string;
         private _functionType: string;
         private _originalMessageId: string;
         private _sealFlag: string;
         private _assignmentStatus: string;
         private _completeCommentText: string;
         private _messageId: string;
         private _completeReasonCode: string;
         private _workId: number;
         private _completeUserId: string;
         private _createDatetime: number;
         private _assignmentDate: Date;
         private _completionDate: number;
         private _taskAssignmentHtyId: number;
         private _taskAssignmentId: number;
         private _staffId: number;
         private _eventDate: number;
         private _workType: string;
         private _workSubType: string;
         private _teamCode: number;
         private _officerName: string;
         private _code: string;
         private _description: string;
         private _firstName: string;
         private _lastName: string;
         private _flag: boolean;
        public get flag(): boolean {
            return this._flag;
        }
        public set flag(value: boolean) {
            this._flag = value;
        }
        public get code(): string {
            return this._code;
        }
        public set code(value: string) {
            this._code = value;
        }
        public get description(): string {
            return this._description;
        }
        public set description(value: string) {
            this._description = value;
        }
        public get firstName(): string {
            return this._firstName;
        }
        public set firstName(value: string) {
            this._firstName = value;
        }
        public get lastName(): string {
            return this._lastName;
        }
        public set lastName(value: string) {
            this._lastName = value;
        }

        get workType(): string { return this._workType; }

        set workType(pworkType: string) { this._workType = pworkType; }

        get workSubType(): string { return this._workSubType; }

        set workSubType(pworkSubType: string) { this._workSubType = pworkSubType; }

        get teamCode(): number { return this._teamCode; }

        set teamCode(pteamCode: number) { this._teamCode = pteamCode; }

        get workTypeDescription(): string { return this._workTypeDescription; }

        set workTypeDescription(workTypeDescription: string) { this._workTypeDescription = workTypeDescription; }

        get officerName(): string { return this._officerName; }

        set officerName(pofficerName: string) { this._officerName = pofficerName; }

         get createUserId(): string { return  this._createUserId; }

         set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

         get modifyDatetime(): number { return  this._modifyDatetime; }

         set modifyDatetime(pmodifyDatetime: number) { this._modifyDatetime = pmodifyDatetime; }

         get offenderBookId(): number { return  this._offenderBookId; }

         set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

         get triggerName(): string { return  this._triggerName; }

         set triggerName(ptriggerName: string) { this._triggerName = ptriggerName; }

         get dueDate(): number { return  this._dueDate; }

         set dueDate(pdueDate: number) { this._dueDate = pdueDate; }

         get modifyUserId(): string { return  this._modifyUserId; }

         set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

         get workflowHistoryId(): number { return  this._workflowHistoryId; }

         set workflowHistoryId(pworkflowHistoryId: number) { this._workflowHistoryId = pworkflowHistoryId; }

         get serialVersionUID(): number { return  this._serialVersionUID; }

         set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

         get details(): string { return  this._details; }

         set details(pdetails: string) { this._details = pdetails; }

         get functionType(): string { return  this._functionType; }

         set functionType(pfunctionType: string) { this._functionType = pfunctionType; }

         get originalMessageId(): string { return  this._originalMessageId; }

         set originalMessageId(poriginalMessageId: string) { this._originalMessageId = poriginalMessageId; }

         get sealFlag(): string { return  this._sealFlag; }

         set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

         get assignmentStatus(): string { return  this._assignmentStatus; }

         set assignmentStatus(passignmentStatus: string) { this._assignmentStatus = passignmentStatus; }

         get completeCommentText(): string { return  this._completeCommentText; }

         set completeCommentText(pcompleteCommentText: string) { this._completeCommentText = pcompleteCommentText; }

         get messageId(): string { return  this._messageId; }

         set messageId(pmessageId: string) { this._messageId = pmessageId; }

         get completeReasonCode(): string { return  this._completeReasonCode; }

         set completeReasonCode(pcompleteReasonCode: string) { this._completeReasonCode = pcompleteReasonCode; }

         get workId(): number { return  this._workId; }

         set workId(pworkId: number) { this._workId = pworkId; }

         get completeUserId(): string { return  this._completeUserId; }

         set completeUserId(pcompleteUserId: string) { this._completeUserId = pcompleteUserId; }

         get createDatetime(): number { return  this._createDatetime; }

         set createDatetime(pcreateDatetime: number) { this._createDatetime = pcreateDatetime; }

         get assignmentDate(): Date { return  this._assignmentDate; }

         set assignmentDate(passignmentDate: Date) { this._assignmentDate = passignmentDate; }

         get completionDate(): number { return  this._completionDate; }

         set completionDate(pcompletionDate: number) { this._completionDate = pcompletionDate; }

         get taskAssignmentHtyId(): number { return  this._taskAssignmentHtyId; }

         set taskAssignmentHtyId(ptaskAssignmentHtyId: number) { this._taskAssignmentHtyId = ptaskAssignmentHtyId; }

         get taskAssignmentId(): number { return  this._taskAssignmentId; }

         set taskAssignmentId(ptaskAssignmentId: number) { this._taskAssignmentId = ptaskAssignmentId; }

         get staffId(): number { return  this._staffId; }

         set staffId(pstaffId: number) { this._staffId = pstaffId; }

         get eventDate(): number { return  this._eventDate; }

         set eventDate(peventDate: number) { this._eventDate = peventDate; }


     toJSON(): any {
         return {
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'offenderBookId': this._offenderBookId,
            'triggerName': this._triggerName,
            'dueDate': this._dueDate,
            'modifyUserId': this._modifyUserId,
            'workflowHistoryId': this._workflowHistoryId,
            'serialVersionUID': this._serialVersionUID,
            'details': this._details,
            'functionType': this._functionType,
            'originalMessageId': this._originalMessageId,
            'sealFlag': this._sealFlag,
            'assignmentStatus': this._assignmentStatus,
            'completeCommentText': this._completeCommentText,
            'messageId': this._messageId,
            'completeReasonCode': this._completeReasonCode,
            'workId': this._workId,
            'completeUserId': this._completeUserId,
            'createDatetime': this._createDatetime,
            'assignmentDate': this._assignmentDate,
            'completionDate': this._completionDate,
            'taskAssignmentHtyId': this._taskAssignmentHtyId,
            'taskAssignmentId': this._taskAssignmentId,
            'staffId': this._staffId,
            'eventDate': this._eventDate,
            'workTypeDescription': this._workTypeDescription,
            'code': this._code,
            'description': this._description,
            'lastName': this._lastName,
            'firstName': this._firstName,
            'flag': this._flag,
             };
         }
 }
