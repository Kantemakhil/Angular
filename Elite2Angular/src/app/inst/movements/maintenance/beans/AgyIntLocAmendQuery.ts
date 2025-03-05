

import { BaseModel } from "@common/beans/BaseModel";

export class AgyIntLocAmendQuery extends BaseModel{
private _pAgyLocId :string;
private _pLevel1Code:string;
private _pLevel2Code: string;
private _pLevel4Code: string;
private _pLevel3Code: string;
private _pAmendDateFrom: Date;
private _pAmendDateTo: Date;
private _amendUserDate: string;
private  _description : string;
private _columnName:string;
private _oldValue: string;
private _newValue:string;
private _deactivateReasonCode:string;
private _actionCode:string;
private _amendDate:Date;
private _amendUserId:string;
private _livingUnitCode:string;
 

get pAgyLocId(): string { return this._pAgyLocId; }

  set pAgyLocId(ppAgyLocId: string) { this._pAgyLocId = ppAgyLocId; }

  get pLevel1Code(): string { return this._pLevel1Code; }

  set pLevel1Code(ppLevel1Code: string) { this._pLevel1Code = ppLevel1Code; }


  get pLevel2Code(): string { return this._pLevel2Code; }

  set pLevel2Code(ppLevel2Code: string) { this._pLevel2Code = ppLevel2Code; }


  get pLevel4Code(): string { return this._pLevel4Code; }

  set pLevel4Code(ppLevel4Code: string) { this._pLevel4Code = ppLevel4Code; }


  get pLevel3Code(): string { return this._pLevel3Code; }

  set pLevel3Code(ppLevel3Code: string) { this._pLevel3Code = ppLevel3Code; }


  get pAmendDateFrom(): Date { return this._pAmendDateFrom; }

  set pAmendDateFrom(ppAmendDateFrom: Date) { this._pAmendDateFrom = ppAmendDateFrom; }


  get pAmendDateTo(): Date { return this._pAmendDateTo; }

  set pAmendDateTo(ppAmendDateTo: Date) { this._pAmendDateTo = ppAmendDateTo; }

  get amendUserDate(): string { return this._amendUserDate; }

  set amendUserDate(pamendUserDate: string) { this._amendUserDate = pamendUserDate; }

  get description(): string { return this._description; }

  set description(pdescription: string) { this._description = pdescription; }

  get columnName(): string { return this._columnName; }

  set columnName(pcolumnName: string) { this._columnName = pcolumnName; }

  get oldValue(): string { return this._oldValue; }

  set oldValue(poldValue: string) { this._oldValue = poldValue; }

  get newValue(): string { return this._newValue; }

  set newValue(pnewValue: string) { this._newValue = pnewValue; }

  get deactivateReasonCode(): string { return this._deactivateReasonCode; }

  set deactivateReasonCode(pdeactivateReasonCode: string) { this._deactivateReasonCode = pdeactivateReasonCode; }

  get actionCode(): string { return this._actionCode; }

  set actionCode(pactionCode: string) { this._actionCode = pactionCode; }

  get _mendDate(): Date { return this._amendDate; }

  set amendDate(pamendDate: Date) { this._amendDate = pamendDate; }

  get amendUserId(): string { return this._amendUserId; }

  set amendUserId(pamendUserId: string) { this._amendUserId = pamendUserId; }

  get livingUnitCode(): string { return this._livingUnitCode; }

  set livingUnitCode(plivingUnitCode: string) { this._livingUnitCode = plivingUnitCode; }






  toJSON(): any {
    return {
     
      'pAgyLocId': this._pAgyLocId,
      'pLevel1Code': this._pLevel1Code,
      'pLevel2Code': this._pLevel2Code,
      'pLevel4Code': this._pLevel4Code,
      'pLevel3Code': this._pLevel3Code,
      'pAmendDateFrom': this._pAmendDateFrom,
      'pAmendDateTo': this._pAmendDateTo,
      'amendUserDate': this._amendUserDate,
      'description': this._description,
      'columnName': this._columnName,
      'oldValue': this._oldValue,
      'newValue': this._newValue,
      'deactivateReasonCode': this._deactivateReasonCode,
      'actionCode': this._actionCode,
      'amendDate': this._amendDate,
      'amendUserId': this._amendUserId,
      'livingUnitCode': this._livingUnitCode,

 
    };
      };
}
