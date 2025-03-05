
import { BaseModel } from '@commonbeans/BaseModel';

export class VStgMembershipInquiry extends BaseModel {
    private _lastName: string;
    private _offenderBookId: number;
    private _offenderIdDisplay: string;
    private _appealDate: Date;
    private _description: string;
    private _stgSeq: number;
    private _rootOffenderId: number;
    private _stgId: number;
    private _expiryDate: Date;
    private _firstName: string;
    private _serialVersionUID: number;
    private _statusReason: string;
    private _expiredBy: string;
    private _stgAffActiveFlag: string;
    private _valDate: Date;
    private _expiryReasonCode: string;
    private _notifiedBy: string;
    private _actionCode: string;
    private _offenderId: number;
    private _reasonCode: string;
    private _notifiedDate: Date;
    private _activeFlag: string;

    get lastName(): string { return this._lastName; }

    set lastName( plastName: string ) { this._lastName = plastName; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId( poffenderBookId: number ) { this._offenderBookId = poffenderBookId; }

    get offenderIdDisplay(): string { return this._offenderIdDisplay; }

    set offenderIdDisplay( poffenderIdDisplay: string ) { this._offenderIdDisplay = poffenderIdDisplay; }

    get appealDate(): Date { return this._appealDate; }

    set appealDate( pappealDate: Date ) { this._appealDate = pappealDate; }

    get description(): string { return this._description; }

    set description( pdescription: string ) { this._description = pdescription; }

    get stgSeq(): number { return this._stgSeq; }

    set stgSeq( pstgSeq: number ) { this._stgSeq = pstgSeq; }

    get rootOffenderId(): number { return this._rootOffenderId; }

    set rootOffenderId( prootOffenderId: number ) { this._rootOffenderId = prootOffenderId; }

    get stgId(): number { return this._stgId; }

    set stgId( pstgId: number ) { this._stgId = pstgId; }

    get expiryDate(): Date { return this._expiryDate; }

    set expiryDate( pexpiryDate: Date ) { this._expiryDate = pexpiryDate; }

    get firstName(): string { return this._firstName; }

    set firstName( pfirstName: string ) { this._firstName = pfirstName; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID( pserialVersionUID: number ) { this._serialVersionUID = pserialVersionUID; }

    get statusReason(): string { return this._statusReason; }

    set statusReason( pstatusReason: string ) { this._statusReason = pstatusReason; }

    get expiredBy(): string { return this._expiredBy; }

    set expiredBy( pexpiredBy: string ) { this._expiredBy = pexpiredBy; }

    get stgAffActiveFlag(): string { return this._stgAffActiveFlag; }

    set stgAffActiveFlag( pstgAffActiveFlag: string ) { this._stgAffActiveFlag = pstgAffActiveFlag; }

    get valDate(): Date { return this._valDate; }

    set valDate( pvalDate: Date ) { this._valDate = pvalDate; }

    get expiryReasonCode(): string { return this._expiryReasonCode; }

    set expiryReasonCode( pexpiryReasonCode: string ) { this._expiryReasonCode = pexpiryReasonCode; }

    get notifiedBy(): string { return this._notifiedBy; }

    set notifiedBy( pnotifiedBy: string ) { this._notifiedBy = pnotifiedBy; }

    get actionCode(): string { return this._actionCode; }

    set actionCode( pactionCode: string ) { this._actionCode = pactionCode; }

    get offenderId(): number { return this._offenderId; }

    set offenderId( poffenderId: number ) { this._offenderId = poffenderId; }

    get reasonCode(): string { return this._reasonCode; }

    set reasonCode( preasonCode: string ) { this._reasonCode = preasonCode; }

    get notifiedDate(): Date { return this._notifiedDate; }

    set notifiedDate( pnotifiedDate: Date ) { this._notifiedDate = pnotifiedDate; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag( pactiveFlag: string ) { this._activeFlag = pactiveFlag; }


    toJSON(): any {
        return {
            'lastName': this._lastName,
            'offenderBookId': this._offenderBookId,
            'offenderIdDisplay': this._offenderIdDisplay,
            'appealDate': this._appealDate,
            'description': this._description,
            'stgSeq': this._stgSeq,
            'rootOffenderId': this._rootOffenderId,
            'stgId': this._stgId,
            'expiryDate': this._expiryDate,
            'firstName': this._firstName,
            'serialVersionUID': this._serialVersionUID,
            'statusReason': this._statusReason,
            'expiredBy': this._expiredBy,
            'stgAffActiveFlag': this._stgAffActiveFlag,
            'valDate': this._valDate,
            'expiryReasonCode': this._expiryReasonCode,
            'notifiedBy': this._notifiedBy,
            'actionCode': this._actionCode,
            'offenderId': this._offenderId,
            'reasonCode': this._reasonCode,
            'notifiedDate': this._notifiedDate,
            'activeFlag': this._activeFlag,
        };
    }
 }
