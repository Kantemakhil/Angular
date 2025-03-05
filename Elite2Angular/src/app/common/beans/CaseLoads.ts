import { BaseModel } from './BaseModel';

export class CaseLoads extends BaseModel {

    private _communityTrustCaseload: string;
    private _deactivationDate: Date;
    private _createUserId: string;
    private _payrollFlag: string;
    private _modifyDatetime: Date;
    private _commissaryTrustCaseload: string;
    private _mdtFlag: string;
    private _modifyUserId: string;
    private _accessPropertyFlag: string;
    private _payrollTrustCaseload: string;
    private _description: string;
    private _caseloadType: string;
    private _trustCommissaryCaseload: string;
    private _createDatetime: Date;
    private _trustCaseloadId: string;
    private _caseloadId: string;
    private _listSeq: number;
    private _trustAccountsFlag: string;
    private _commissaryFlag: string;
    private _sealFlag: string;
    private _billingFlag: string;
    private _activeFlag: string;
    private _button: string;
    private _updateAllowedFlag: string;

    get updateAllowedFlag(): string {
        return this._updateAllowedFlag;
    }
    set updateAllowedFlag(value: string) {
        this._updateAllowedFlag = value;
    }

    get communityTrustCaseload(): string { return this._communityTrustCaseload; }

    set communityTrustCaseload( pcommunityTrustCaseload: string ) { this._communityTrustCaseload = pcommunityTrustCaseload; }

    get deactivationDate(): Date { return this._deactivationDate; }

    set deactivationDate( pdeactivationDate: Date ) { this._deactivationDate = pdeactivationDate; }

    get createUserId(): string { return this._createUserId; }

    set createUserId( pcreateUserId: string ) { this._createUserId = pcreateUserId; }

    get payrollFlag(): string { return this._payrollFlag; }

    set payrollFlag( ppayrollFlag: string ) { this._payrollFlag = ppayrollFlag; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime( pmodifyDatetime: Date ) { this._modifyDatetime = pmodifyDatetime; }

    get commissaryTrustCaseload(): string { return this._commissaryTrustCaseload; }

    set commissaryTrustCaseload( pcommissaryTrustCaseload: string ) { this._commissaryTrustCaseload = pcommissaryTrustCaseload; }

    get mdtFlag(): string { return this._mdtFlag; }

    set mdtFlag( pmdtFlag: string ) { this._mdtFlag = pmdtFlag; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId( pmodifyUserId: string ) { this._modifyUserId = pmodifyUserId; }

    get accessPropertyFlag(): string { return this._accessPropertyFlag; }

    set accessPropertyFlag( paccessPropertyFlag: string ) { this._accessPropertyFlag = paccessPropertyFlag; }

    get payrollTrustCaseload(): string { return this._payrollTrustCaseload; }

    set payrollTrustCaseload( ppayrollTrustCaseload: string ) { this._payrollTrustCaseload = ppayrollTrustCaseload; }

    get description(): string { return this._description; }

    set description( pdescription: string ) { this._description = pdescription; }

    get caseloadType(): string { return this._caseloadType; }

    set caseloadType( pcaseloadType: string ) { this._caseloadType = pcaseloadType; }

    get trustCommissaryCaseload(): string { return this._trustCommissaryCaseload; }

    set trustCommissaryCaseload( ptrustCommissaryCaseload: string ) { this._trustCommissaryCaseload = ptrustCommissaryCaseload; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime( pcreateDatetime: Date ) { this._createDatetime = pcreateDatetime; }

    get trustCaseloadId(): string { return this._trustCaseloadId; }

    set trustCaseloadId( ptrustCaseloadId: string ) { this._trustCaseloadId = ptrustCaseloadId; }

    get caseloadId(): string { return this._caseloadId; }

    set caseloadId( pcaseloadId: string ) { this._caseloadId = pcaseloadId; }

    get listSeq(): number { return this._listSeq; }

    set listSeq( plistSeq: number ) { this._listSeq = plistSeq; }

    get trustAccountsFlag(): string { return this._trustAccountsFlag; }

    set trustAccountsFlag( ptrustAccountsFlag: string ) { this._trustAccountsFlag = ptrustAccountsFlag; }

    get commissaryFlag(): string { return this._commissaryFlag; }

    set commissaryFlag( pcommissaryFlag: string ) { this._commissaryFlag = pcommissaryFlag; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }

    get billingFlag(): string { return this._billingFlag; }

    set billingFlag( pbillingFlag: string ) { this._billingFlag = pbillingFlag; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag( pactiveFlag: string ) { this._activeFlag = pactiveFlag; }

    get caseDescription(): string { return this._button; }

    set caseDescription( pbutton: string ) { this._button = pbutton; }

    toJSON(): any {
        return {
            'communityTrustCaseload': this._communityTrustCaseload,
            'deactivationDate': this._deactivationDate,
            'createUserId': this._createUserId,
            'payrollFlag': this._payrollFlag,
            'modifyDatetime': this._modifyDatetime,
            'commissaryTrustCaseload': this._commissaryTrustCaseload,
            'mdtFlag': this._mdtFlag,
            'modifyUserId': this._modifyUserId,
            'accessPropertyFlag': this._accessPropertyFlag,
            'payrollTrustCaseload': this._payrollTrustCaseload,
            'description': this._description,
            'caseloadType': this._caseloadType,
            'trustCommissaryCaseload': this._trustCommissaryCaseload,
            'createDatetime': this._createDatetime,
            'trustCaseloadId': this._trustCaseloadId,
            'caseloadId': this._caseloadId,
            'listSeq': this._listSeq,
            'trustAccountsFlag': this._trustAccountsFlag,
            'commissaryFlag': this._commissaryFlag,
            'sealFlag': this._sealFlag,
            'billingFlag': this._billingFlag,
            'activeFlag': this._activeFlag,
            'button': this._button
        };
    }
}
