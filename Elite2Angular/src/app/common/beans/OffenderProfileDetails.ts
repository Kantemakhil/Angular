import { BaseModel } from './BaseModel';

export class OffenderProfileDetails extends BaseModel {

    private _caseloadType: string;
    private _commentText: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _listSeq: number;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _profileCode: string;
    private _sealFlag: string;
    private _offenderBookId: number;
    private _profileSeq: number;
    private _profileType: string;
    private _nbtCharacteristic: string;
    private _nbtDetailDesc: string;
    private _profileTypeDesc: string;
    private _codeValueType: string;
    private _profileCodeTemp: string;
    private _updatedAllowedFlag: string;
    private _mandatoryFlag: string;
    private _prevProfileCode: string;
    private _activeFlag: string;

    set caseloadType(pcaseloadType: string) { this._caseloadType = pcaseloadType; }

    get caseloadType(): string { return this._caseloadType; }

    get commentText(): string { return this._commentText; }

    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get listSeq(): number { return this._listSeq; }

    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get profileCode(): string { return this._profileCode; }

    set profileCode(pprofileCode: string) { this._profileCode = pprofileCode; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get profileSeq(): number { return this._profileSeq; }

    set profileSeq(pprofileSeq: number) { this._profileSeq = pprofileSeq; }

    get profileType(): string { return this._profileType; }

    set profileType(pprofileType: string) { this._profileType = pprofileType; }

    get nbtCharacteristic(): string { return this._nbtCharacteristic; }

    set nbtCharacteristic(pnbtCharacteristic: string) { this._nbtCharacteristic = pnbtCharacteristic; }

    get nbtDetailDesc(): string { return this._nbtDetailDesc; }

    set nbtDetailDesc(pnbtDetailDesc: string) { this._nbtDetailDesc = pnbtDetailDesc; }
    
    get codeValueType() : string {return this._codeValueType;}
    
    set codeValueType(codeValueTypeN :string ) {this._codeValueType = codeValueTypeN;}

    
    get profileTypeDesc(): string { return this._profileTypeDesc; }

    set profileTypeDesc(pprofileTypeDesc: string) { this._profileTypeDesc = pprofileTypeDesc; }

    get profileCodeTemp(): string { return this._profileCodeTemp; }

    set profileCodeTemp(pprofileCodeTemp: string) { this._profileCodeTemp = pprofileCodeTemp; }

    get mandatoryFlag(): string{ return  this._mandatoryFlag }

    set mandatoryFlag(pmandatoryFlag: string){ this._mandatoryFlag = pmandatoryFlag }

    get updatedAllowedFlag(): string{ return  this._updatedAllowedFlag }

    set updatedAllowedFlag(pupdatedAllowedFlag: string){ this._updatedAllowedFlag = pupdatedAllowedFlag }

    get prevProfileCode(): string{ return  this._prevProfileCode }

    set prevProfileCode(pprevProfileCode: string){ this._prevProfileCode = pprevProfileCode }
    

    get activeFlag(): string { return this._activeFlag; }
    
    set activeFlag(activeFlag: string) { this._activeFlag = activeFlag; }

    
    
    toJSON(): any {
        return {
            'caseloadType': this._caseloadType,
            'commentText': this._commentText,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'listSeq': this._listSeq,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'profileCode': this._profileCode,
            'sealFlag': this._sealFlag,
            'offenderBookId': this._offenderBookId,
            'profileSeq': this._profileSeq,
            'profileType': this._profileType,
            'nbtCharacteristic': this._nbtCharacteristic,
            'nbtDetailDesc': this._nbtCharacteristic,
            'profileTypeDesc': this._profileTypeDesc,
            'mandatoryFlag': this.mandatoryFlag,
            'updatedAllowedFlag': this._updatedAllowedFlag,
            'prevProfileCode': this._prevProfileCode,
            'activeFlag': this._activeFlag
        };
    }
}
