import { BaseModel } from '@commonbeans/BaseModel';
export class AssessmentResults extends BaseModel {
    private _activeFlag: string;

    private _cellSharingAlertFlag: string;

    private _createDatetime: Date;

    private _createUserId: string;

    private _expiryDate: Date;

    private _listSeq: number;

    private _modifyDatetime: Date;

    private _modifyUserId: string;

    private _sealFlag: string;

    private _updateAllowedFlag: string;

    private _assessmentId: number;

    private _supervisionLevelType: string;

    private _code: string;

    private _description: string;

    get activeFlag(): string { return this._activeFlag }

    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag }

    get cellSharingAlertFlag(): string { return this._cellSharingAlertFlag }

    set cellSharingAlertFlag(pcellSharingAlertFlag: string) { this._cellSharingAlertFlag = pcellSharingAlertFlag }

    get createDatetime(): Date { return this._createDatetime }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime }

    get createUserId(): string { return this._createUserId }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId }

    get expiryDate(): Date { return this._expiryDate }

    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate }

    get listSeq(): number { return this._listSeq }

    set listSeq(plistSeq: number) { this._listSeq = plistSeq }

    get modifyDatetime(): Date { return this._modifyDatetime }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime }

    get modifyUserId(): string { return this._modifyUserId }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId }

    get sealFlag(): string { return this._sealFlag }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag }

    get updateAllowedFlag(): string { return this._updateAllowedFlag }

    set updateAllowedFlag(pupdateAllowedFlag: string) { this._updateAllowedFlag = pupdateAllowedFlag }

    get assessmentId(): number { return this._assessmentId }

    set assessmentId(passessmentId: number) { this._assessmentId = passessmentId }


    get supervisionLevelType(): string { return this._supervisionLevelType }

    set supervisionLevelType(psupervisionLevelType: string) { this._supervisionLevelType = psupervisionLevelType }

    get code(): string { return this._code }

    set code(pcode: string) { this._code = pcode }

    get description(): string { return this._description }

    set description(pdescription: string) { this._description = pdescription }


    toJSON(): any {
        return {
            'activeFlag': this._activeFlag,
            'cellSharingAlertFlag': this._cellSharingAlertFlag,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'expiryDate': this._expiryDate,
            'listSeq': this._listSeq,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'updateAllowedFlag': this._updateAllowedFlag,
            'assessmentId': this._assessmentId,
            'supervisionLevelType': this._supervisionLevelType,
            'code': this._code,
            'description': this._description,
        };
    }
}
