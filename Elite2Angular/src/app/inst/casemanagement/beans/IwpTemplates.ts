import { BaseModel } from '@commonbeans/BaseModel';

export class IwpTemplates extends BaseModel {


    private _templateName: string;
    private _templateId: number;
    private _location: string;
    private _description: string;
    private _activeFlag: string;
    private _templateBody: any;
    private _documentId: number;
    private _offenderBookId: number;
    private _lockPassword: string;
    private _objectType: string;
    private _dateCreated: Date;
    private _userCreated: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _expiryDate: Date;
    private _code: string;
    private _relCount: number;
    private _contextRuleCount: number;
    private _activeCheckFlag: string;
    private _iwpDocCount: number;
    private _isTempalte:string;
    private _signatureAccess:string;


    get iwpDocCount(): number { return this._iwpDocCount; }

    set iwpDocCount(piwpDocCount: number) { this._iwpDocCount = piwpDocCount; }

    get activeCheckFlag(): string { return this._activeCheckFlag; }

    set activeCheckFlag(pactiveCheckFlag: string) { this._activeCheckFlag = pactiveCheckFlag; }

    get contextRuleCount(): number { return this._contextRuleCount; }

    set contextRuleCount(pcontextRuleCount: number) { this._contextRuleCount = pcontextRuleCount; }

    get relCount(): number { return this._relCount; }

   set relCount(prelCount: number) { this._relCount = prelCount; }

    get documentId(): number { return this._documentId; }

    set documentId(pdocumentId: number) { this._documentId = pdocumentId; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get templateName(): string { return this._templateName; }

    set templateName(ptemplateName: string) { this._templateName = ptemplateName; }

    get lockPassword(): string { return this._lockPassword; }

    set lockPassword(plockPassword: string) { this._lockPassword = plockPassword; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

    get location(): string { return this._location; }

    set location(plocation: string) { this._location = plocation; }


    get objectType(): string { return this._objectType; }

    set objectType(pobjectType: string) { this._objectType = pobjectType; }

    get description(): string { return this._description; }

    set description(pdescription: string) { this._description = pdescription; }

    get templateBody(): any { return this._templateBody; }

    set templateBody(ptemplateBody: any) { this._templateBody = ptemplateBody; }

    get dateCreated(): Date { return this._dateCreated; }

    set dateCreated(pdateCreated: Date) { this._dateCreated = pdateCreated; }

    get expiryDate(): Date { return this._expiryDate; }

    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }

    get userCreated(): string { return this._userCreated; }

    set userCreated(puserCreated: string) { this._userCreated = puserCreated; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get code(): string { return this._code; }

    set code(pcode: string) { this._code = pcode; }

    get templateId(): number { return this._templateId; }

    set templateId(ptemplateId: number) { this._templateId = ptemplateId; }
    
    get isTemplate(): string { return this._isTempalte; }

    set isTemplate(pcode: string) { this._isTempalte = pcode; }

    get signatureAccess(): string { return this._signatureAccess; }

    set signatureAccess(psignatureAccess: string) { this._signatureAccess = psignatureAccess; }

    

    toJSON(): any {
        return {
            'documentId': this._documentId,
            'offenderBookId': this._offenderBookId,
            'templateName': this._templateName,
            'templateId': this._templateId,
            'lockPassword': this._lockPassword,
            'activeFlag': this._activeFlag,
            'location': this._location,
            'objectType': this._objectType,
            'description': this._description,
            'dateCreated': this._dateCreated,
            'expiryDate': this._expiryDate,
            'userCreated': this._userCreated,
            'createDatetime': this._createDatetime,
            'modifyDatetime': this._modifyDatetime,
            'createUserId': this._createUserId,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'code': this._code,
            'relCount': this._relCount,
            'contextRuleCount': this._contextRuleCount,
            'activeCheckFlag': this._activeCheckFlag,
            'iwpDocCount': this._iwpDocCount,
            'isTemplate':this._isTempalte,
            'signatureAccess':this._signatureAccess
        };
    }
}
