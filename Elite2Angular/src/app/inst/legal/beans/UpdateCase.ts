import { BaseModel } from "@common/beans/BaseModel";

export class UpdateCase extends BaseModel{
    private _calledFrom: string;
    private _updateReason: string;
    private _updateDate : Date;
    private _stafId: number;
    private _userName:string;
    private _comment: string;
    private _lastName: string;
    private _firstName: string;
    private _staffId: number;
    private _rowId: string;
    private _offenderBookId: number;
    private _caseStatus: string;
    private _sentenceCalcType: string;
    private _category: string;
    private _caseId: number;
    private _sentConditionId: number;
    private _returnValue: number;
private _sentenceSeq: number;
    get sentenceCalcType(): string { return this._sentenceCalcType; }
    set sentenceCalcType(psentenceCalcType: string) { this._sentenceCalcType = psentenceCalcType; }

    get category(): string { return this._category; }
    set category(pcategory: string) { this._category = pcategory; }

    get sentConditionId(): number { return this._sentConditionId; }
    set sentConditionId( psentConditionId: number ) { this._sentConditionId = psentConditionId; }

    get returnValue(): number { return this._returnValue; }
    set returnValue( preturnValue: number ) { this._returnValue = preturnValue; }

    get sentenceSeq(): number { return this._sentConditionId; }
    set sentenceSeq( psentenceSeq: number ) { this._sentenceSeq = psentenceSeq; }
    
    get caseStatus(): string { return this._caseStatus; }
    set caseStatus(caseStatus: string) { this._caseStatus = caseStatus; }
    get rowId(): string { return this._rowId; }
	set rowId(prowId: string) { this._rowId = prowId; }
    get calledFrom(): string { return this._calledFrom; }
    set calledFrom( calledFrom: string ) { this._calledFrom = calledFrom; }
    
    get updateReason(): string { return this._updateReason; }
    set updateReason( updateReason: string ) { this._updateReason = updateReason; }
    
    get updateDate(): Date { return this._updateDate; }
    set updateDate( updateDate: Date ) { this._updateDate = updateDate; }
    
    get stafId(): number { return this._stafId; }
    set stafId( id: number ) { this._stafId = id; }
    
    get userName(): string { return this._userName; }
    set userName( user: string ) { this._userName = user; }
    
    get comment(): string { return this._comment; }
    set comment( comment: string ) { this._comment = comment; }
    
     get lastName(): string { return this._lastName; }
    set lastName( lastName: string ) { this._lastName = lastName; }
    
    get firstName(): string { return this._firstName; }
    set firstName( firstName: string ) { this._firstName = firstName; }

    get caseId(): number { return this._caseId; }
    set caseId( caseId: number ) { this._caseId = caseId; }

    
     get staffId(): number { return this._staffId; }
    set staffId( staffId: number ) { this._staffId = staffId; }
    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(offenderBookId: number) { this._offenderBookId = offenderBookId; }
    
    toJSON(): any {
        return {       
        'statusUpdateReason':  this._updateReason,
        'statusUpdateComment':  this._comment,
        'statusUpdateDate':  this._updateDate,
        'statusUpdateStaffId':  this._stafId,
        'calledFrom' : this._calledFrom,
        'userName' : this._userName,
		'lastName': this._lastName,
        'firstName': this._firstName,
        'staffId': this._staffId,
        'rowId': this._rowId,
        'offenderBookId': this._offenderBookId,
        'caseStatus': this._caseStatus,
        'sentenceCalcType': this._sentenceCalcType,
        'caseId': this._caseId,
        'category': this._category,
        'sentConditionId': this._sentConditionId,
        'returnValue': this._returnValue,
        'sentenceSeq': this._sentenceSeq,
        };
     }
}
