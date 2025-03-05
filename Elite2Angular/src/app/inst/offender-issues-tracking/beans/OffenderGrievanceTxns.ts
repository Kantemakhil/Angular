import { BaseModel } from '@commonbeans/BaseModel';

export class OffenderGrievanceTxns extends BaseModel {
       private _createUserId: string;
       private _grievLevel: string;
       private _endDate: Date;
       private _modifyDatetime: Date;
       private _officialResponse: string;
       private _modifyUserId: string;
       private _txnType: string;
       private _proposedResponse: string;
       private _finding: string;
       private _assignedStaffId: number;
       private _createDatetime: Date;
       private _grievType: string;
       private _txnSeq: number;
       private _grievanceId: number;
       private _sealFlag: string;
       private _startDate: Date;
       private _status: string;
       private _assignedStaffName: string;
       private _daysLeft: number;
       private _appendResponsecommentText: string;

       get appendResponsecommentText(): string { return this._appendResponsecommentText; }
       set appendResponsecommentText(pappendResponsecommentText: string) { this._appendResponsecommentText = pappendResponsecommentText; }
       get createUserId(): string { return this._createUserId; }
       set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
       get grievLevel(): string { return this._grievLevel; }
       set grievLevel(pgrievLevel: string) { this._grievLevel = pgrievLevel; }
       get endDate(): Date { return this._endDate; }
       set endDate(pendDate: Date) { this._endDate = pendDate; }
       get modifyDatetime(): Date { return this._modifyDatetime; }
       set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
       get officialResponse(): string { return this._officialResponse; }
       set officialResponse(pofficialResponse: string) { this._officialResponse = pofficialResponse; }
       get modifyUserId(): string { return this._modifyUserId; }
       set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
       get txnType(): string { return this._txnType; }
       set txnType(ptxnType: string) { this._txnType = ptxnType; }
       get proposedResponse(): string { return this._proposedResponse; }
       set proposedResponse(pproposedResponse: string) { this._proposedResponse = pproposedResponse; }
       get finding(): string { return this._finding; }
       set finding(pfinding: string) { this._finding = pfinding; }
       get assignedStaffId(): number { return this._assignedStaffId; }
       set assignedStaffId(passignedStaffId: number) { this._assignedStaffId = passignedStaffId; }
       get createDatetime(): Date { return this._createDatetime; }
       set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
       get grievType(): string { return this._grievType; }
       set grievType(pgrievType: string) { this._grievType = pgrievType; }
       get txnSeq(): number { return this._txnSeq; }
       set txnSeq(ptxnSeq: number) { this._txnSeq = ptxnSeq; }
       get grievanceId(): number { return this._grievanceId; }
       set grievanceId(pgrievanceId: number) { this._grievanceId = pgrievanceId; }
       get sealFlag(): string { return this._sealFlag; }
       set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
       get startDate(): Date { return this._startDate; }
       set startDate(pstartDate: Date) { this._startDate = pstartDate; }
       get status(): string { return this._status; }
       set status(pstatus: string) { this._status = pstatus; }
       get assignedStaffName(): string { return this._assignedStaffName; }
       set assignedStaffName(passignedStaffName: string) { this._assignedStaffName = passignedStaffName; }
       get daysLeft(): number { return this._daysLeft; }
       set daysLeft(pdaysLeft: number) { this._daysLeft = pdaysLeft; }

       toJSON(): any {
              return {
                     'createUserId': this._createUserId,
                     'grievLevel': this._grievLevel,
                     'endDate': this._endDate,
                     'modifyDatetime': this._modifyDatetime,
                     'officialResponse': this._officialResponse,
                     'modifyUserId': this._modifyUserId,
                     'txnType': this._txnType,
                     'proposedResponse': this._proposedResponse,
                     'finding': this._finding,
                     'assignedStaffId': this._assignedStaffId,
                     'createDatetime': this._createDatetime,
                     'grievType': this._grievType,
                     'txnSeq': this._txnSeq,
                     'grievanceId': this._grievanceId,
                     'sealFlag': this._sealFlag,
                     'startDate': this._startDate,
                     'status': this._status,
                     'assignedStaffName': this._assignedStaffName,
                     'daysLeft': this._daysLeft,
                     'appendResponsecommentText': this._appendResponsecommentText
              };
       }
}
