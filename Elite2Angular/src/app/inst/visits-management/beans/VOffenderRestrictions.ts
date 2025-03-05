import { BaseModel } from '@commonbeans/BaseModel';

export class VOffenderRestrictions extends BaseModel {
    private _authorisedStaffId: number;
    private _expiryDate: Date;
    private _restrictionDesc: string;
    private _serialVersionUID: number;
    private _restrictionType: string;
    private _enteredStaffName: string;
    private _offenderBookId: number;
    private _offenderRestrictionId: number;
    private _enteredStaffId: number;
    private _authroisedStaffName: string;
    private _commentText: string;
    private _effectiveDate: Date;

    get authorisedStaffId(): number { return this._authorisedStaffId }

    set authorisedStaffId( pauthorisedStaffId: number ) { this._authorisedStaffId = pauthorisedStaffId }

    get expiryDate(): Date { return this._expiryDate }

    set expiryDate( pexpiryDate: Date ) { this._expiryDate = pexpiryDate }

    get restrictionDesc(): string { return this._restrictionDesc }

    set restrictionDesc( prestrictionDesc: string ) { this._restrictionDesc = prestrictionDesc }

    get serialVersionUID(): number { return this._serialVersionUID }

    set serialVersionUID( pserialVersionUID: number ) { this._serialVersionUID = pserialVersionUID }

    get restrictionType(): string { return this._restrictionType }

    set restrictionType( prestrictionType: string ) { this._restrictionType = prestrictionType }

    get enteredStaffName(): string { return this._enteredStaffName }

    set enteredStaffName( penteredStaffName: string ) { this._enteredStaffName = penteredStaffName }

    get offenderBookId(): number { return this._offenderBookId }

    set offenderBookId( poffenderBookId: number ) { this._offenderBookId = poffenderBookId }

    get offenderRestrictionId(): number { return this._offenderRestrictionId }

    set offenderRestrictionId( poffenderRestrictionId: number ) { this._offenderRestrictionId = poffenderRestrictionId }

    get enteredStaffId(): number { return this._enteredStaffId }

    set enteredStaffId( penteredStaffId: number ) { this._enteredStaffId = penteredStaffId }

    get authroisedStaffName(): string { return this._authroisedStaffName }

    set authroisedStaffName( pauthroisedStaffName: string ) { this._authroisedStaffName = pauthroisedStaffName }

    get commentText(): string { return this._commentText }

    set commentText( pcommentText: string ) { this._commentText = pcommentText }

    get effectiveDate(): Date { return this._effectiveDate }

    set effectiveDate( peffectiveDate: Date ) { this._effectiveDate = peffectiveDate }


    toJSON(): any {
        return {
            'authorisedStaffId': this._authorisedStaffId,
            'expiryDate': this._expiryDate,
            'restrictionDesc': this._restrictionDesc,
            'serialVersionUID': this._serialVersionUID,
            'restrictionType': this._restrictionType,
            'enteredStaffName': this._enteredStaffName,
            'offenderBookId': this._offenderBookId,
            'offenderRestrictionId': this._offenderRestrictionId,
            'enteredStaffId': this._enteredStaffId,
            'authroisedStaffName': this._authroisedStaffName,
            'commentText': this._commentText,
            'effectiveDate': this._effectiveDate,
        };
    }
 }