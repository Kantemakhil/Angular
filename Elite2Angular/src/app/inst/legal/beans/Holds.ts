import {BaseModel} from '@commonbeans/BaseModel'

export class Holds extends BaseModel {
    
    private _orderId:number;
    private _orderType: string;
    private _court: string;
    private _orderDate: Date;
    private _expiryDate: Date;
    private _commentsText: string;
    private _orderStatus: string;
    private _caseId: number;
    private _offenderBookId: number;
    private _dueDate: Date;
    private _requestDate: Date;
    private _completeDate: Date;
    private _issueDate: Date;
    private _modifyDateTime: Date;
    private _createDateTime: Date;
    private _courtDate: Date;
    private _modifyUserId: string;
    private _createUserId: string;
    private _issuingAgyLocId: string;
    private _courtInfoId: string;
    private _courtSeriousnessLevel: string;
    private _orderSeriousnessLevel: string;
    private _staffWorkId: number;
    private _eventId: number;
    private _completeStaffId:number;
    private _interventionatierCode: string;
    private _nonReportFlag: string;
    private _cpsReceivedDate: Date;
    private _messageId: string;
    private _workFlowId: number;
    private _offenderProceedingId: number;
    private _sealFlag:string;



get orderId(): number { return this._orderId; }

set orderId(orderId: number ) { this._orderId = orderId; }

get orderType(): string { return this._orderType; }

set orderType(orderType: string ) { this._orderType = orderType; }

get court(): string { return this._court; }

set court(court: string ) { this._court = court; }

get orderDate(): Date{ return this._orderDate; }

set orderDate(orderDate: Date ) { this._orderDate = orderDate; }

get expiryDate(): Date{ return this._expiryDate; }

set expiryDate(expiryDate: Date ) { this._expiryDate = expiryDate; }

get commentsText(): string { return this._commentsText; }

set commentsText(commentsText: string ) { this._commentsText = commentsText; }

get orderStatus(): string { return this._orderStatus; }

set orderStatus(orderStatus: string ) { this._orderStatus = orderStatus; }

get caseId(): number { return this._caseId; }

set caseId( caseId: number ) { this._caseId = caseId; }

get offenderBookId(): number { return this._offenderBookId; }

set offenderBookId( offenderBookId: number ) { this._offenderBookId = offenderBookId; }

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

get requestDate(): Date { return this._requestDate; }

set requestDate( requestDate: Date ) { this._requestDate = requestDate; }

get completeDate(): Date { return this._completeDate; }

set completeDate( completeDate: Date ) { this._completeDate = completeDate; }

get issueDate(): Date { return this._issueDate; }

set issueDate( issuDate: Date ) { this._issueDate = issuDate; }

get cpsReceivedDate(): Date { return this._cpsReceivedDate; }

set cpsReceivedDate( cpsReceivedDate: Date ) { this._cpsReceivedDate = cpsReceivedDate; }

get issuingAgyLocId(): string { return this._issuingAgyLocId; }

set issuingAgyLocId(issuingAgyLocId: string ) { this._issuingAgyLocId = issuingAgyLocId; }

get courtInfoId(): string { return this._courtInfoId; }

set courtInfoId(courtInfoId: string ) { this._courtInfoId = courtInfoId; }

get courtSeriousnessLevel(): string { return this._courtSeriousnessLevel; }

set courtSeriousnessLevel(courtSeriousnessLevel: string ) { this._courtSeriousnessLevel = courtSeriousnessLevel; }

get orderSeriousnessLevel(): string { return this._orderSeriousnessLevel; }

set orderSeriousnessLevel(orderSeriousnessLevel: string ) { this._orderSeriousnessLevel = orderSeriousnessLevel; }

get staffWorkId(): number { return this._staffWorkId; }

set staffWorkId( staffWorkId: number ) { this._staffWorkId = staffWorkId; }

get eventId(): number { return this._eventId; }

set eventId( eventId: number ) { this._eventId = eventId; }

get completeStaffId(): number { return this._completeStaffId; }

set completeStaffId( completeStaffId: number ) { this._completeStaffId = completeStaffId; }

get workFlowId(): number { return this._workFlowId; }

set workFlowId( workFlowId: number ) { this._workFlowId = workFlowId; }

get offenderProceedingId(): number { return this._offenderProceedingId; }

set offenderProceedingId( offenderProceedingId: number ) { this._offenderProceedingId = offenderProceedingId; }

get interventionatierCode(): string { return this._interventionatierCode; }

set interventionatierCode( interventionatierCode: string ) { this._interventionatierCode = interventionatierCode; }

get nonReportFlag(): string { return this._nonReportFlag; }

set nonReportFlag(nonReportFlag: string ) { this._nonReportFlag = nonReportFlag; }

get messageId(): string { return this._messageId; }

set messageId(messageId: string ) { this._messageId = messageId; }

get sealFlag(): string { return this._sealFlag; }

set sealFlag(sealFlag: string ) { this._sealFlag = sealFlag; }

toJSON(): any {
    return {
        'caseId': this._caseId,
        'offenderBookId': this._offenderBookId,
        'orderType': this._orderType,
        'court': this._court,
        'orderDate':this._orderDate,
        'expiryDate':this._expiryDate,
        'comments':this._commentsText,
        'stauts':this._orderStatus,
        'modifyDateTime': this._modifyDateTime,
        'modifyUserId':  this._modifyUserId,
        'createUserId': this._createUserId,
        'createDateTime':  this._createDateTime,
        'dueDate': this._dueDate,
        'requestDate': this._requestDate,
        'completeDate':this._completeDate,
        'issueDate': this._issueDate,
        'cpsReceivedDate': this._cpsReceivedDate,
        'courtDate':this._courtDate,
        'issuingAgyLocId': this._issuingAgyLocId,
        'courtInfoId': this._courtInfoId,
        'courtSeriousnessLevel':this._courtSeriousnessLevel,
        'orderSeriousnessLevel':this._orderSeriousnessLevel,
        'staffWorkId': this._staffWorkId,
        'eventId': this._eventId,
        'completeStaffId': this._completeStaffId,
        'workFlowId': this._workFlowId,
        'offenderProceedingId': this._offenderProceedingId,
        'interventionatierCode': this._interventionatierCode,
        'nonReportFlag': this._nonReportFlag,
        'messageId':  this._messageId,
        'sealFlag': this._sealFlag,
        
    };
}
}