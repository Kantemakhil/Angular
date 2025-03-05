import { BaseModel } from '@commonbeans/BaseModel';

export class Condition extends BaseModel {

    private _sentenceSeq: number;

    private _conditionTypeCode: string;

    private _conditionCode: string;

    private _categoryTypeCode: string;

    private _length: number;

    private _lengthUnit: string;

    private _startDate: Date;

    private _endDate: Date;

    private _status: string;

    private _program: string;

    private _programId: number;

    private _commentText: string;

    private _offenderBookId: number;

    private _modifyDateTime: Date;

    private _modifyUserId: string;

    private _createUserId: string;

    private _createDateTime: Date;

    private _appliedFlag: string;

    private _sentConditionId: number;

    private _sortComment: string;

    private _conditionType: string;
    private _conditionStatus: string;
    private _statusUpdateComment: string;
    private _statusUpdateStaffId: number;
    private _statusUpdateReason: string;
    private _offenderSentConditionId: number;
    private _category: string;
    private _description: string;
    private _code: string;
    private _condition: string;
    private _verifiedFlagBolean: boolean;

    private _curfewStartTime: Date;

    private _curfewEndTime: Date;

    private _finTotalAmount: number;

    private _nonAssociationText: string;

    private _prohibitedContact: string;
    private _calledFrom: string;

    get calledFrom(): string { return this._calledFrom; }
    set calledFrom(pcalledFrom: string) { this._calledFrom = pcalledFrom; }

    get sentenceSeq(): number { return this._sentenceSeq; }
    set sentenceSeq(seq: number) { this._sentenceSeq = seq; }

    get conditionCode(): string { return this._conditionCode; }
    set conditionCode(code: string) { this._conditionCode = code; }

    get conditionTypeCode(): string { return this._conditionTypeCode; }
    set conditionTypeCode(code: string) { this._conditionTypeCode = code; }

    get categoryTypeCode(): string { return this._categoryTypeCode; }
    set categoryTypeCode(code: string) { this._categoryTypeCode = code; }

    get length(): number { return this._length; }
    set length(length: number) { this._length = length; }

    get lengthUnit(): string { return this._lengthUnit; }
    set lengthUnit(seq: string) { this._lengthUnit = seq; }

    get verifiedFlagBolean(): boolean { return this._verifiedFlagBolean; }
    set verifiedFlagBolean(pverifiedFlagBolean: boolean) { this._verifiedFlagBolean = pverifiedFlagBolean; }

    get startDate(): Date { return this._startDate; }
    set startDate(date: Date) { this._startDate = date; }

    get endDate(): Date { return this._endDate; }
    set endDate(seq: Date) { this._endDate = seq; }

    get status(): string { return this._status; }
    set status(seq: string) { this._status = seq; }

    get program(): string { return this._program; }
    set program(seq: string) { this._program = seq; }

    get programId(): number { return this._programId; }
    set programId(programId: number) { this._programId = programId; }

    get commentText(): string { return this._commentText; }
    set commentText(seq: string) { this._commentText = seq; }

    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(seq: number) { this._offenderBookId = seq; }

    get modifyDateTime(): Date { return this._modifyDateTime; }
    set modifyDateTime(seq: Date) { this._modifyDateTime = seq; }

    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(seq: string) { this._modifyUserId = seq; }

    get createUserId(): string { return this._createUserId; }
    set createUserId(seq: string) { this._createUserId = seq; }

    get createDateTime(): Date { return this._createDateTime; }
    set createDateTime(seq: Date) { this._createDateTime = seq; }

    get appliedFlag(): string { return this._appliedFlag; }
    set appliedFlag(seq: string) { this._appliedFlag = seq; }

    get statusUpdateComment(): string { return this._statusUpdateComment; }

    set statusUpdateComment(statusUpdateComment: string) { this._statusUpdateComment = statusUpdateComment; }

    get statusUpdateStaffId(): number { return this._statusUpdateStaffId; }

    set statusUpdateStaffId(statusUpdateStaffId: number) { this._statusUpdateStaffId = statusUpdateStaffId; }

    get statusUpdateReason(): string { return this._statusUpdateReason; }

    set statusUpdateReason(statusUpdateReason: string) { this._statusUpdateReason = statusUpdateReason; }

    get conditionType(): string { return this._conditionType; }

    set conditionType(conditionType: string) { this._conditionType = conditionType; }

    get conditionStatus(): string { return this._conditionStatus; }

    set conditionStatus(conditionStatus: string) { this._conditionStatus = conditionStatus; }

    get offenderSentConditionId(): number { return this._offenderSentConditionId; }

    set offenderSentConditionId(offenderSentConditionId: number) { this._offenderSentConditionId = offenderSentConditionId; }

    get category(): string { return this._category; }
    set category(category: string) { this._category = category; }

    get description(): string { return this._description; }
    set description(description: string) { this._description = description; }

    get code(): string { return this._code; }
    set code(code: string) { this._code = code; }

    get condition(): string { return this._condition; }
    set condition(condition: string) { this._condition = condition; }

    get sentConditionId(): number { return this._sentConditionId; }
    set sentConditionId(seq: number) { this._sentConditionId = seq; }

    get curfewStartTime(): Date { return this._curfewStartTime; }
    set curfewStartTime(start: Date) { this._curfewStartTime = start; }

    get curfewEndTime(): Date { return this._curfewEndTime; }
    set curfewEndTime(curfewEndTime: Date) { this._curfewEndTime = curfewEndTime; }

    get finTotalAmount(): number { return this._finTotalAmount; }
    set finTotalAmount(finTotalAmount: number) { this._finTotalAmount = finTotalAmount; }

    get nonAssociationText(): string { return this._nonAssociationText; }
    set nonAssociationText(nonAssociationText: string) { this._nonAssociationText = nonAssociationText; }

    get prohibitedContact(): string { return this._prohibitedContact; }
    set prohibitedContact(prohibitedContact: string) { this._prohibitedContact = prohibitedContact; }

    get sortComment(): string { return this._sortComment; }
    set sortComment(sortComment: string) { this._sortComment = sortComment; }

    toJSON(): any {
        return {

            'sentenceSeq': this._sentenceSeq,
            'conditionTypeCode': this._conditionTypeCode,
            'categoryTypeCode': this._categoryTypeCode,
            'length': this._length,
            'lengthUnit': this._lengthUnit,
            'startDate': this._startDate,
            'endDate': this._endDate,
            'modifyDateTime': this._modifyDateTime,
            'modifyUserId': this._modifyUserId,
            'createUserId': this._createUserId,
            'createDateTime': this._createDateTime,
            'status': this._status,
            'program': this._program,
            'programId': this._programId,
            'commentText': this._commentText,
            'offenderBookId': this._offenderBookId,
            'statusUpdateReason': this._statusUpdateReason,
            'statusUpdateComment': this._statusUpdateComment,
            'statusUpdateStaffId': this._statusUpdateStaffId,
            'conditionStatus': this._conditionStatus,
            'conditionType': this._conditionStatus,
            'offenderSentConditionId': this._offenderSentConditionId,
            'category': this._category,
            'description': this._description,
            'code': this._code,
            'condition': this._condition,
            'appliedFlag': this._appliedFlag,
            'sentConditionId': this._sentConditionId,
            'curfewStartTime': this._curfewStartTime,
            'curfewEndTime': this._curfewEndTime,
            'finTotalAmount': this._finTotalAmount,
            'nonAssociationText': this._nonAssociationText,
            'prohibitedContact': this._prohibitedContact,
            'sortComment': this._sortComment,
            'verifiedFlagBolean': this._verifiedFlagBolean,
            'calledFrom': this._calledFrom,
        };
    }

}
