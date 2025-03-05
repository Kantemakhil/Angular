import {BaseModel} from '@commonbeans/BaseModel';
import { OffenderAttributes } from '@inst/demographics-biometrics/beans/OffenderAttributes';

export class FindHousingExecuteQueryBean extends BaseModel {

    private _personalAttributeList: Array<OffenderAttributes>;
    private _agencyLocId: string
    private _offenderBookId: string;
    private _pLivingUnitType:string;

  get personalAttributeList(): Array<OffenderAttributes> { return this._personalAttributeList; }

  set personalAttributeList(ppersonalAttributeList: Array<OffenderAttributes>){ this._personalAttributeList = ppersonalAttributeList; }

  get agencyLocId(): string { return this._agencyLocId; }

  set agencyLocId( agencyLocId: string ) { this._agencyLocId = agencyLocId; }

  get offenderBookId(): string { return this._offenderBookId; }

  set offenderBookId( offenderBookId: string ) { this._offenderBookId = offenderBookId; }


  toJSON(): any {
    return {
      'personalAttributeList': this._personalAttributeList,
      'agencyLocId': this._agencyLocId,
      'offenderBookId': this._offenderBookId
    }

  }
}
