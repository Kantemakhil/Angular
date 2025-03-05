import {BaseModel} from '@commonbeans/BaseModel';
import {Offenders} from '@commonbeans/Offenders';

export class OffenderIdentifier extends BaseModel {

	private _caseloadType: string;
	private _createDateTime: Date;
	private _createUserId: string;
	private _identifier: string;
	private _identifierType: string;
	private _issuedAuthorityText: string;
	private _issuedDate: Date;
	private _modifyDateTime: Date;
	private _modifyUserId: string;
	private _rootOffenderId: number;
	private _sealFlag: string;
	private _verifiedFlag: string;
	private _oFFENDERS: Offenders;
	private _offenderId: number;
	private _offenderIdSeq: string;
    private _verifiedFlag1: boolean;

	get caseloadType(): string { return this._caseloadType; }

	set caseloadType(pcaseloadType: string){ this._caseloadType = pcaseloadType; }

	get createDateTime(): Date { return this._createDateTime; }

	set createDateTime(pcreateDateTime: Date){ this._createDateTime = pcreateDateTime; }

	get createUserId(): string { return this._createUserId; }

	set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId; }

	get identifier(): string { return this._identifier; }

	set identifier(pidentifier: string){ this._identifier = pidentifier; }

	get identifierType(): string { return this._identifierType; }

	set identifierType(pidentifierType: string){ this._identifierType = pidentifierType; }

	get issuedAuthorityText(): string { return this._issuedAuthorityText; }

	set issuedAuthorityText(pissuedAuthorityText: string){ this._issuedAuthorityText = pissuedAuthorityText; }

	get issuedDate(): Date { return this._issuedDate; }

	set issuedDate(pissuedDate: Date){ this._issuedDate = pissuedDate; }

	get modifyDateTime(): Date { return this._modifyDateTime; }

	set modifyDateTime(pmodifyDateTime: Date){ this._modifyDateTime = pmodifyDateTime; }

	get modifyUserId(): string { return this._modifyUserId; }

	set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId; }

	get rootOffenderId(): number { return this._rootOffenderId; }

	set rootOffenderId(prootOffenderId: number){ this._rootOffenderId = prootOffenderId; }

	get sealFlag(): string { return this._sealFlag; }

	set sealFlag(psealFlag: string){ this._sealFlag = psealFlag; }

	get verifiedFlag(): string { return this._verifiedFlag; }

	set verifiedFlag(pverifiedFlag: string){ this._verifiedFlag = pverifiedFlag; }
    
    get verifiedFlag1(): boolean { return this._verifiedFlag1; }

    set verifiedFlag1(pverifiedFlag1: boolean){ this._verifiedFlag1 = pverifiedFlag1; }

	get oFFENDERS(): Offenders { return this._oFFENDERS; }

	set oFFENDERS(poFFENDERS: Offenders){ this._oFFENDERS = poFFENDERS; }

	get offenderId(): number { return this._offenderId; }

	set offenderId(poffenderId: number){ this._offenderId = poffenderId; }

	get offenderIdSeq(): string { return this._offenderIdSeq; }

	set offenderIdSeq(poffenderIdSeq: string){ this._offenderIdSeq = poffenderIdSeq; }

	toJSON(): any {
		return {
			'caseloadType': this._caseloadType,
			'createDateTime': this._createDateTime,
			'createUserId': this._createUserId,
			'identifier': this._identifier,
			'identifierType': this._identifierType,
			'issuedAuthorityText': this._issuedAuthorityText,
			'issuedDate': this._issuedDate,
			'modifyDateTime': this._modifyDateTime,
			'modifyUserId': this._modifyUserId,
			'rootOffenderId': this._rootOffenderId,
			'sealFlag': this._sealFlag,
			'verifiedFlag': this._verifiedFlag,
            'verifiedFlag1': this._verifiedFlag1,
			'oFFENDERS': this._oFFENDERS,
			'offenderId': this._offenderId,
			'offenderIdSeq': this._offenderIdSeq
		};
	}
}