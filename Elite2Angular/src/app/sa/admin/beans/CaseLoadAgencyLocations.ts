import {BaseModel} from '@commonbeans/BaseModel';


export class CaseLoadAgencyLocations extends BaseModel {


    private _caseloadId: string;
    private _agyLocId: string;
    private _description: string;
    private _updateAllowedFlag: string;
    private _createDateTime: Date;
    private _createUserId: string;
    private _modifyDateTime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _dspAgencyLocationType: string;
  

    get caseloadId(): string { return this._caseloadId; }

    set caseloadId( pcaseloadId: string ) { this._caseloadId = pcaseloadId; }

    get agyLocId(): string { return this._agyLocId; }

    set agyLocId( pagyLocId: string ) { this._agyLocId = pagyLocId; }

    get description(): string { return this._description; }

    set description( pdescription: string ) { this._description = pdescription; }

    get updateAllowedFlag(): string { return this._updateAllowedFlag; }

    set updateAllowedFlag( pupdateAllowedFlag: string ) { this._updateAllowedFlag = pupdateAllowedFlag; }

    get createDateTime(): Date { return this._createDateTime; }

    set createDateTime( pcreateDateTime: Date ) { this._createDateTime = pcreateDateTime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId( pcreateUserId: string ) { this._createUserId = pcreateUserId; }

    get modifyDateTime(): Date { return this._modifyDateTime; }

    set modifyDateTime( pmodifyDateTime: Date ) { this._modifyDateTime = pmodifyDateTime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId( pmodifyUserId: string ) { this._modifyUserId = pmodifyUserId; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }
  
   get dspAgencyLocationType(): string { return this._dspAgencyLocationType; }

   set dspAgencyLocationType(pdspAgencyLocationType: string){ this._dspAgencyLocationType = pdspAgencyLocationType; }

    toJSON(): any {
        return {
            'caseloadId': this._caseloadId,
            'agyLocId': this._agyLocId,
            'description': this._description,
            'updateAllowedFlag': this._updateAllowedFlag,
            'createDateTime': this._createDateTime,
            'createUserId': this._createUserId,
            'modifyDateTime': this._modifyDateTime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'dspAgencyLocationType': this._dspAgencyLocationType
        };
    }
}