import { BaseModel } from '@commonbeans/BaseModel'
import { CourtEvents } from "../beans/CourtEvents";
import { OffenderSentences } from "../beans/OffenderSentences";
import { OffenderBailDetails } from "../beans/OffenderBailDetails";

export class CourtCase extends BaseModel {

    private _caseId: number;
    private _offenderBookId: number;
    private _caseInfoNumber: string;
    private _caseType: string;
    private _caseStatus: string;
    private _combinedCaseId: number;
    private _modifyDateTime: Date;
    private _modifyUserId: string;
    private _beginDate: Date;
    private _agy_loc_id: string;
    private _createUserId: string;
    private _creatDateTime: Date;
    private _caseInfoPrefix: string;
    private _victimLiaisonUnit: string;
    private _statusUpdateReason: string;
    private _statusUpdateComment: string;
    private _statusUpdateDate: Date;
    private _statusUpdateStaffId: number;
    private _lidsCaseNumber: number;
    private _caseSeq: number;
    private _flag: string;
    private _linkCaseSeq: number;
    private _eventInsertList: CourtEvents[] = [];
    private _eventUpdateList: CourtEvents[] = [];
    private _dummyCaseId =  0;
    private _commitFlag = "";
    private _courtEventList: CourtEvents[] = [];
    private _dummyEventId = 0;
    private _sentencesList: OffenderSentences[] = [];
    private _ordersList: OffenderSentences[] = [];
    private _bailDetailsList: OffenderBailDetails[] = [];
    private _rowId: string;
    private _calledFrom: string;

    get calledFrom(): string { return this._calledFrom; }
    set calledFrom(pcalledFrom: string) { this._calledFrom = pcalledFrom; }
    get rowId(): string { return this._rowId; }
    set rowId(prowId: string) { this._rowId = prowId; }
    get caseId(): number { return this._caseId; }

    set caseId(caseId: number) { this._caseId = caseId; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(offenderBookId: number) { this._offenderBookId = offenderBookId; }

    get caseInfoNumber(): string { return this._caseInfoNumber; }

    set caseInfoNumber(caseInfoNumber: string) { this._caseInfoNumber = caseInfoNumber; }

    get caseType(): string { return this._caseType; }

    set caseType(caseType: string) { this._caseType = caseType; }

    get caseStatus(): string { return this._caseStatus; }

    set caseStatus(caseStatus: string) { this._caseStatus = caseStatus; }

    get combinedCaseId(): number { return this._combinedCaseId; }

    set combinedCaseId(combinedCaseId: number) { this._combinedCaseId = combinedCaseId; }

    get modifyDateTime(): Date { return this._modifyDateTime; }

    set modifyDateTime(modifyDateTime: Date) { this._modifyDateTime = modifyDateTime; }

    get creatDateTime(): Date { return this._creatDateTime; }

    set creatDateTime(creatDateTime: Date) { this._creatDateTime = creatDateTime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(modifyUserId: string) { this._modifyUserId = modifyUserId; }

    get beginDate(): Date { return this._beginDate; }

    set beginDate(beginDate: Date) { this._beginDate = beginDate; }

    get agy_loc_id(): string { return this.agy_loc_id; }

    set agy_loc_id(agy_loc_id: string) { this.agy_loc_id = agy_loc_id; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(createUserId: string) { this._createUserId = createUserId; }

    get caseInfoPrefix(): string { return this._caseInfoPrefix; }

    set caseInfoPrefix(caseInfoPrefix: string) { this._caseInfoPrefix = caseInfoPrefix; }

    get victimLiaisonUnit(): string { return this._victimLiaisonUnit; }

    set victimLiaisonUnit(victimLiaisonUnit: string) { this._victimLiaisonUnit = victimLiaisonUnit; }

    get statusUpdateReason(): string { return this._statusUpdateReason; }

    set statusUpdateReason(statusUpdateReason: string) { this._statusUpdateReason = statusUpdateReason; }

    get statusUpdateComment(): string { return this._statusUpdateComment; }

    set statusUpdateComment(statusUpdateComment: string) { this._statusUpdateComment = statusUpdateComment; }

    get statusUpdateDate(): Date { return this._statusUpdateDate; }

    set statusUpdateDate(statusUpdateDate: Date) { this._statusUpdateDate = statusUpdateDate; }

    get statusUpdateStaffId(): number { return this._statusUpdateStaffId; }

    set statusUpdateStaffId(statusUpdateStaffId: number) { this._statusUpdateStaffId = statusUpdateStaffId; }

    get lidsCaseNumber(): number { return this._lidsCaseNumber; }

    set lidsCaseNumber(lidsCaseNumber: number) { this._lidsCaseNumber = lidsCaseNumber; }

    get caseSeq(): number { return this._caseSeq; }

    set caseSeq(caseSeq: number) { this._caseSeq = caseSeq; }

    get flag(): string { return this._flag; }

    set flag(flag: string) { this._flag = flag; }

    get linkCaseSeq(): number { return this._linkCaseSeq; }

    set linkCaseSeq(linkCaseSeq: number) { this._linkCaseSeq = linkCaseSeq; }

    get eventInsertList(): CourtEvents[] { return this._eventInsertList };

    set eventInsertList(eventInsertList: CourtEvents[]) { this._eventInsertList = eventInsertList; }

    get eventUpdateList(): CourtEvents[] { return this._eventUpdateList };

    set eventUpdateList(eventUpdateList: CourtEvents[]) { this._eventUpdateList = eventUpdateList; }

    get dummyCaseId(): number { return this._dummyCaseId; }

    set dummyCaseId(dummyCaseId: number) { this._dummyCaseId = dummyCaseId; }

    get commitFlag(): string { return this._commitFlag; }

    set commitFlag(commitFlag: string) { this._commitFlag = commitFlag; }

    get courtEventList(): CourtEvents[] { return this._eventUpdateList };

    set courtEventList(courtEventList: CourtEvents[]) { this._courtEventList = courtEventList; }

    get dummyEventId(): number { return this._dummyEventId; }

    set dummyEventId(dummyEventId: number) { this._dummyEventId = dummyEventId; }

    get sentencesList(): OffenderSentences[] { return this._sentencesList };

    set sentencesList(sentencesList: OffenderSentences[]) { this._sentencesList = sentencesList; }

    get ordersList(): OffenderSentences[] { return this._ordersList };

    set ordersList(ordersList: OffenderSentences[]) { this._ordersList = ordersList; }

    get bailDetailsList(): OffenderBailDetails[] { return this._bailDetailsList };

    set bailDetailsList(bailDetailsList: OffenderBailDetails[]) { this._bailDetailsList = bailDetailsList; }


    toJSON(): any {
        return {

            'caseId': this._caseId,
            'offenderBookId': this._offenderBookId,
            'caseInfoNumber': this._caseInfoNumber,
            'caseType': this._caseType,
            'caseStatus': this._caseStatus,
            'combinedCaseId': this._combinedCaseId,
            'modifyDateTime': this._modifyDateTime,
            'modifyUserId': this._modifyUserId,
            'beginDate': this._beginDate,
            'agyLocId': this._agy_loc_id,
            'createUserId': this._createUserId,
            'creatDateTime': this._creatDateTime,
            'caseInfoPrefix': this._caseInfoPrefix,
            'victimLiaisonUnit': this._victimLiaisonUnit,
            'statusUpdateReason': this._statusUpdateReason,
            'statusUpdateComment': this._statusUpdateComment,
            'statusUpdateDate': this._statusUpdateDate,
            'statusUpdateStaffId': this._statusUpdateStaffId,
            'lidsCaseNumber': this._lidsCaseNumber,
            'caseSeq': this._caseSeq,
            'flag': this._flag,
            'linkCaseSeq': this._linkCaseSeq,
            'eventInsertList': this._eventInsertList,
            'eventUpdateList': this._eventUpdateList,
            'dummyCaseId': this._dummyCaseId,
            'commitFlag': this._commitFlag,
            'courtEventList': this._courtEventList,
            'dummyEventId': this._dummyEventId,
            'sentencesList': this._sentencesList,
            'bailDetailsList': this._bailDetailsList,
            'rowId': this._rowId,
            'calledFrom': this._calledFrom,
        };
    }
}