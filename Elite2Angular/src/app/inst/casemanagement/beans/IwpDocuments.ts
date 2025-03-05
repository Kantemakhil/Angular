import { BaseModel } from '@commonbeans/BaseModel';

export class IwpDocuments extends BaseModel {

    private _documentId: number;
    private _offenderBookId: number;
    private _documentName: string;
    private _templateId: number;
    private _commentText: string;
    private _activeFlag: string;
    private _location: string;
    private _objectId: string;
    private _objectType: string;
    private _documentStatus: string;
    private _documentBody: any;
    private _dateCreated: Date;
    private _dateModified: Date;
    private _userCreated: string;
    private _userModified: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _documentContext: string;
    private _nbtStatus: string;
    private _signatureAccess: string;
    private _completeButton: string;
    

    get documentId(): number { return this._documentId; }

    set documentId(pdocumentId: number) { this._documentId = pdocumentId; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get documentName(): string { return this._documentName; }

    set documentName(pdocumentName: string) { this._documentName = pdocumentName; }

    get templateId(): number { return this._templateId; }

    set templateId(ptemplateId: number) { this._templateId = ptemplateId; }

    get commentText(): string { return this._commentText; }

    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

    get location(): string { return this._location; }

    set location(plocation: string) { this._location = plocation; }

    get objectId(): string { return this._objectId; }

    set objectId(pobjectId: string) { this._objectId = pobjectId; }

    get objectType(): string { return this._objectType; }

    set objectType(pobjectType: string) { this._objectType = pobjectType; }

    get documentStatus(): string { return this._documentStatus; }

    set documentStatus(pdocumentStatus: string) { this._documentStatus = pdocumentStatus; }

    get documentBody(): any { return this._documentBody; }

    set documentBody(pdocumentBody: any) { this._documentBody = pdocumentBody; }

    get dateCreated(): Date { return this._dateCreated; }

    set dateCreated(pdateCreated: Date) { this._dateCreated = pdateCreated; }

    get dateModified(): Date { return this._dateModified; }

    set dateModified(pdateModified: Date) { this._dateModified = pdateModified; }


    get userCreated(): string { return this._userCreated; }

    set userCreated(puserCreated: string) { this._userCreated = puserCreated; }


    get userModified(): string { return this._userModified; }

    set userModified(puserModified: string) { this._userModified = puserModified; }

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

    get documentContext(): string { return this._documentContext; }

    set documentContext(pdocumentContext: string) { this._documentContext = pdocumentContext; }

    get nbtStatus(): string { return this._nbtStatus; }

    set nbtStatus(pnbtStatus: string) { this._nbtStatus = pnbtStatus; }

    get signatureAccess(): string { return this._signatureAccess; }

    set signatureAccess(psignatureAccess: string) { this._signatureAccess = psignatureAccess; }
    
    get completeButton(): string { return this._completeButton; }

    set completeButton(pcompleteButton: string) { this._completeButton = pcompleteButton; }
    
    toJSON(): any {
        return {
            'documentId': this._documentId,
            'offenderBookId': this._offenderBookId,
            'documentName': this._documentName,
            'templateId': this._templateId,
            'commentText': this._commentText,
            'activeFlag': this._activeFlag,
            'location': this._location,
            'objectId': this._objectId,
            'objectType': this._objectType,
            'documentStatus': this._documentBody,
            'dateCreated': this._dateCreated,
            'dateModified': this._dateModified,
            'userCreated': this._userCreated,
            'userModified': this._userModified,
            'createDatetime': this._createDatetime,
            'modifyDatetime': this._modifyDatetime,
            'createUserId': this._createUserId,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'documentContext': this._documentContext,
            'nbtStatus': this._nbtStatus,
            'signatureAccess':this._signatureAccess,
            'completeButton':this._completeButton
        };
    }
}
