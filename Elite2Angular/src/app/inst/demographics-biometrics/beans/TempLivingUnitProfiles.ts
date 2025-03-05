import {BaseModel} from '@commonbeans/BaseModel';

export class TempLivingUnitProfiles extends BaseModel {

  private _createDatetime: Date;
  private _createUserId: string;
  private _modifyDatetime: Date;
  private _modifyUserId: string;
  private _profileCode: string;
  private _profileType: string;
  private _profileTypeOne: string;
  private _profileCodeOne: string;

  get createDatetime(): Date { return this._createDatetime; }

  set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime; }
  
  get createUserId(): string { return this._createUserId; }

  set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId; }
  
  get modifyDatetime(): Date { return this._modifyDatetime; }

  set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime; }
  
  get modifyUserId(): string { return this._modifyUserId; }

  set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId; }
  
  get profileCode(): string { return this._profileCode; }

  set profileCode(pprofileCode: string){ this._profileCode = pprofileCode; }
  
  get profileType(): string { return this._profileType; }

  set profileType(pprofileType: string){ this._profileType = pprofileType; }

  get profileTypeOne(): string { return this._profileTypeOne; }

  set profileTypeOne(pprofileTypeOne: string){ this._profileTypeOne = pprofileTypeOne; }

  get profileCodeOne(): string { return this._profileCodeOne; }

  set profileCodeOne(pprofileCodeOne: string){ this._profileCodeOne = pprofileCodeOne; }

  

  toJSON(): any {
    return {
      'createDatetime': this._createDatetime,
      'createUserId': this._createUserId,
      'modifyDatetime': this._modifyDatetime,
      'modifyUserId': this._modifyUserId,
      'profileCode': this._profileCode,
      'profileType': this._profileType,
      'profileTypeOne': this._profileTypeOne,
      'profileCodeOne': this._profileCodeOne
    };
  }
}