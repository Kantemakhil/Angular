import { BaseModel } from "../../../common/beans/BaseModel";
export class OffenderTierLevel extends BaseModel {
    private _tierLevel: string;
    private _dateAssigned: Date;
    private _assignmentReason: string;
    private _assignedBy: string;
    private _approveFlag: any;
    private _approvedBy: string;
    private _nextReviewDate: Date;
    private _comment: string;
    private _offenderBookId: number;
    private _editableBtn: number;
    private _caseLoadId: string;
    private _code: string;
    private _description: string;
    private _assignedByStaffId: number;
    private _approvedByStaffId: number;
    private _createUserId: string;
    private _modifyUserId: string;
    private _createDateTime: Date;
    private _recordCreationDatetime: Date;
    private _offenderTierLevelId: number;
    private _activeFlag: any;
    private _deactivatedDate: any;
    private _versionId: number;




    

    get tierLevel(): string { return this._tierLevel; }
    set tierLevel(value: string) { this._tierLevel = value; }
    get dateAssigned(): Date { return this._dateAssigned; }
    set dateAssigned(value: Date) { this._dateAssigned = value; }
    get assignmentReason(): string { return this._assignmentReason; }
    set assignmentReason(value: string) { this._assignmentReason = value; }
    get assignedBy(): string { return this._assignedBy; }
    set assignedBy(value: string) { this._assignedBy = value; }
    get approveFlag(): any { return this._approveFlag; }
    set approveFlag(value: any) { this._approveFlag = value; }
    get approvedBy(): string { return this._approvedBy; }
    set approvedBy(value: string) { this._approvedBy = value; }
    get nextReviewDate(): Date { return this._nextReviewDate; }
    set nextReviewDate(value: Date) { this._nextReviewDate = value; }
    get comment(): string { return this._comment; }
    set comment(value: string) { this._comment = value; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(value: number) { this._offenderBookId = value; }
    get editableBtn(): number { return this._editableBtn; }
    set editableBtn(value: number) { this._editableBtn = value; }
    get caseLoadId(): string {return this._caseLoadId;}
    set caseLoadId(value: string) {this._caseLoadId = value;}
    get code(): string {return this._code;}
    set code(value: string) {this._code = value;}
    get description(): string {return this._description;}
    set description(value: string) {this._description = value;}
    get assignedByStaffId(): number {return this._assignedByStaffId;}
    set assignedByStaffId(value: number) {this._assignedByStaffId = value;}
    get approvedByStaffId(): number {return this._approvedByStaffId;}
    set approvedByStaffId(value: number) {this._approvedByStaffId = value;}
    get createUserId(): string {return this._createUserId;}
    set createUserId(value: string) {this._createUserId = value;}
    get modifyUserId(): string {return this._modifyUserId;}
    set modifyUserId(value: string) {this._modifyUserId = value;}
    get createDateTime(): Date {return this._createDateTime;}
    set createDateTime(value: Date) {this._createDateTime = value;}
    get recordCreationDatetime(): Date {return this._recordCreationDatetime;}
    set recordCreationDatetime(value: Date) {this._recordCreationDatetime = value;}
    get offenderTierLevelId(): number {return this._offenderTierLevelId;}
    set offenderTierLevelId(value: number) {this._offenderTierLevelId = value;}
    get activeFlag(): any {return this._activeFlag;}
    set activeFlag(value: any) {this._activeFlag = value;}
    get deactivatedDate(): any {return this._deactivatedDate;}
    set deactivatedDate(value: any) {this._deactivatedDate = value;}
    get versionId(): number { return this._versionId;}
    set versionId(value: number) {this._versionId = value;}

    toJSON(): any {
        return {
            'tierLevel': this._tierLevel,
            'dateAssigned': this._dateAssigned,
            'assignmentReason': this._assignmentReason,
            'assignedBy': this._assignedBy,
            'approve': this._approveFlag,
            'approvedBy': this._approvedBy,
            'nextReviewDate': this._nextReviewDate,
            'comment': this._comment,
            'offenderBookId': this._offenderBookId,
            'editableBtn': this._editableBtn,
            'caseLoadId' : this._caseLoadId,
            'code': this._code,
            'description': this._description,
            'assignedByStaffId' : this._assignedByStaffId,
            'approvedByStaffId' : this._approvedByStaffId,
            'createUserId' : this._createUserId,
            'modifyUserId' : this._modifyUserId,
            'createDateTime' : this._createDateTime,
            'recordCreationDatetime' : this._recordCreationDatetime,
            'offenderTierLevelId' : this._offenderTierLevelId,
            'activeFlag' : this._activeFlag,
            'deactivatedDate' : this._deactivatedDate,
            'versionId' : this._versionId,
        };

    }



}