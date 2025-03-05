import { BaseModel } from '@commonbeans/BaseModel';

export class StaffAccessibleCaseloads extends BaseModel {

  private _staffId: number;
  private _updateAllowedFlag: string;
  private _createDatetime: Date;
  private _createUserId: string;
  private _modifyDatetime: Date;
  private _modifyUserId: string;
  private _sealFlag: string;
  private _inserted: Boolean;
  private _caseloadId: string;
  private _description: string;

   get staffId(): number { return this._staffId; }

    set staffId(pstaffId: number){ this._staffId = pstaffId;}
    
    get updateAllowedFlag(): string { return this._updateAllowedFlag; }

    set updateAllowedFlag(pupdateAllowedFlag: string){ this._updateAllowedFlag = pupdateAllowedFlag; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime;}

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag; }

    get inserted(): Boolean { return this._inserted; }

    set inserted(pinserted: Boolean){ this._inserted = pinserted; }
    
    get caseloadId(): string { return this._caseloadId; }

    set caseloadId(pcaseloadId: string){ this._caseloadId = pcaseloadId; }
    
    get description(): string { return this._description; }

    set description(pdescription: string){ this._description = pdescription; }

          toJSON(): any {
        return {
          'staffId': this._staffId,
          'updateAllowedFlag': this._updateAllowedFlag,
          'createDatetime': this._createDatetime,
          'createUserId': this._createUserId,
          'modifyDatetime': this._modifyDatetime,
          'modifyUserId': this._modifyUserId,
          'sealFlag': this._sealFlag,
          'inserted': this._inserted,
          'caseloadId': this._caseloadId,
          'description': this._description,
        };
    }

}