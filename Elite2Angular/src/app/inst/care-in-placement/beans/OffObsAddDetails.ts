import { BaseModel } from "@common/beans/BaseModel";

export class OffObsAddDetails extends BaseModel {
     
    private _observationType: string;
	private _profileType: string;
	private _description: string;
	private _formatType: string;
	private _listSeq: number;
	private _activeFlag: string;
	private _expiryDate: Date;
	private _createDatetime: Date;
	private _placementType: string;
	private _modifyDatetime: Date;
	private _modifyUserId: string;
    private _sealFlag: string;
    private _createUserId: string;
    

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }


    get formatType(): string { return this._formatType; }

    set formatType(pformatType: string) { this._formatType = pformatType; }


    get profileType(): string { return this._profileType; }

    set profileType(pprofileType: string) { this._profileType = pprofileType; }

    get observationType(): string { return this._observationType; }

    set observationType(pobservationType: string) { this._observationType = pobservationType; }

    get description(): string { return this._description; }

    set description(pdescription: string) { this._description = pdescription; }

     get placementType(): string { return this._placementType; }

    set placementType(pplacementType: string) { this._placementType = pplacementType; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get expiryDate(): Date { return this._expiryDate; }

    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

    get listSeq(): number { return this._listSeq; }

    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }


    toJSON(): any {
        return {
             'placementType': this._placementType,
             'createDatetime': this._createDatetime,
             'modifyDatetime': this._modifyDatetime,
             'modifyUserId': this._modifyUserId,
             'expiryDate': this._expiryDate,
             'activeFlag': this._activeFlag,
             'listSeq': this._listSeq,
             'sealFlag': this._sealFlag,
             'observationType': this._observationType,
             'profileType' : this._profileType,
	         'description' : this._description,
             'formatType' : this._formatType,
             'createUserId': this._createUserId,
        };
    }

}
